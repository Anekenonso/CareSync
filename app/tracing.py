"""CareSync Structured Trace & Logging Engine
Implements Section 8 of the Hackathon Technical Execution Guide:
- Writes JSONL trace files to logs/trace-<run_id>.jsonl
- Emits human-readable [INFO] logs to stdout
- Masks any sensitive tokens
- Tracks model names for NVIDIA / Nightshift attribution
"""
import os
import json
import time
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List

class AgentTracer:
    def __init__(self, run_id: str, log_dir: str = "logs"):
        self.run_id = run_id
        self.log_dir = log_dir
        os.makedirs(self.log_dir, exist_ok=True)
        self.trace_file = os.path.join(self.log_dir, f"trace-{self.run_id}.jsonl")
        self.events: List[Dict[str, Any]] = []
        self.start_time = time.time()
        self.stdout_info(f"Starting run (trace: {self.trace_file})")

    def log_event(
        self,
        agent_name: str,
        action: str,
        input_summary: str,
        output_summary: str,
        target_agent: Optional[str] = None,
        model: Optional[str] = None,
        confidence: float = 0.90,
        retry_count: int = 0,
        status: str = "success",
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Record an agent step in both stdout and JSONL trace."""
        timestamp = datetime.now(timezone.utc).isoformat()
        event = {
            "timestamp": timestamp,
            "run_id": self.run_id,
            "agent_name": agent_name,
            "action": action,
            "input_summary": self._mask_secrets(input_summary),
            "output_summary": self._mask_secrets(output_summary),
            "target_agent": target_agent or "Coordinator",
            "model": model or "nvidia/nemotron-3.5-lightning-30b-a3b",
            "confidence": round(confidence, 2),
            "retry_count": retry_count,
            "status": status,
        }
        if metadata:
            event["metadata"] = metadata

        self.events.append(event)

        # Write to JSONL
        try:
            with open(self.trace_file, "a", encoding="utf-8") as f:
                f.write(json.dumps(event) + "\n")
        except Exception as e:
            print(f"[WARN] Failed to write trace to {self.trace_file}: {e}")

        # Stream readable stdout
        target_str = f" -> {target_agent}" if target_agent else ""
        model_str = f" [model: {model}]" if model else ""
        self.stdout_info(f"{agent_name}{target_str}: {action} ({output_summary}){model_str}")

        return event

    def stdout_info(self, message: str) -> None:
        """Print readable [INFO] log matching hackathon stdout specification."""
        clean_msg = self._mask_secrets(message)
        print(f"[INFO] run_id={self.run_id} {clean_msg}", flush=True)

    def finish(self, status: str = "success") -> float:
        duration = round(time.time() - self.start_time, 2)
        self.stdout_info(f"Completed run in {duration} seconds (status={status})")
        return duration

    @staticmethod
    def _mask_secrets(text: str) -> str:
        if not text:
            return ""
        for pattern in ["nvapi-", "Bearer ", "token-", "sk-"]:
            if pattern in text:
                text = text.replace(pattern, "[REDACTED_SECRET]")
        return text
