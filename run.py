#!/usr/bin/env python3
"""CareSync Entry Point
Open Agent Hackathon 2026 | Technical Execution Guide Section 2

Usage:
  python run.py                                    # Starts the HTTP server on port 8000 (binds 0.0.0.0)
  python run.py --input input_examples/example_1.json # Runs the agent on one input and prints output
"""
import os
import sys
import json
import argparse
from typing import Dict, Any

from agent_api.config import cfg
from agent_api.agents.orchestrator import run_agent_workflow

def run_single_input(file_path: str, output_path: str = None) -> int:
    """Execute the agent workflow on a single input file."""
    if not os.path.exists(file_path):
        print(f"[ERROR] Input file not found: {file_path}", file=sys.stderr)
        return 1

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"[ERROR] Failed to parse input JSON: {e}", file=sys.stderr)
        return 1

    run_id = data.get("run_id", f"run-cli-{int(os.times().elapsed * 1000)}")
    input_data = data.get("input", {})
    query = input_data.get("query", "Analyze longitudinal shifts and outside prescriptions.")
    patient_id = input_data.get("patient_id", "patient-ev-49201")
    options = data.get("options", {})
    sample_mode = options.get("sample_mode", cfg.SAMPLE_MODE)

    result = run_agent_workflow(
        run_id=run_id,
        query=query,
        patient_id=patient_id,
        sample_mode=sample_mode
    )

    formatted_json = json.dumps(result, indent=2)
    print(formatted_json)

    if output_path:
        os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(formatted_json)
        print(f"[INFO] Saved output to {output_path}", file=sys.stderr)

    return 0

def start_server(port: int = 8000, host: str = "0.0.0.0"):
    """Start the HTTP server on 0.0.0.0:port."""
    print(f"[INFO] Starting CareSync Agent Server on {host}:{port}...", flush=True)

    # Try starting FastAPI via uvicorn
    try:
        import uvicorn
        uvicorn.run("agent_api.main:app", host=host, port=port, log_level="info")
        return
    except ImportError:
        print("[WARN] uvicorn not installed. Falling back to Python standard library HTTP server...", flush=True)

    # Resilient standard library fallback server guaranteeing zero-dependency operation
    from http.server import HTTPServer, BaseHTTPRequestHandler

    class StandaloneHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            if self.path in ("/", "/health"):
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                resp = {"status": "healthy", "service": "CareSync Standalone Server", "port": port}
                self.wfile.write(json.dumps(resp).encode("utf-8"))
            else:
                self.send_response(404)
                self.end_headers()

        def do_POST(self):
            if self.path == "/run":
                content_len = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
                try:
                    payload = json.loads(body)
                except Exception:
                    payload = {}

                run_id = payload.get("run_id", f"run-http-{int(os.times().elapsed * 1000)}")
                input_data = payload.get("input", {})
                query = input_data.get("query", "Analyze patient records and outside encounters.")
                patient_id = input_data.get("patient_id", "patient-ev-49201")
                sample_mode = payload.get("options", {}).get("sample_mode", cfg.SAMPLE_MODE)

                result = run_agent_workflow(
                    run_id=run_id,
                    query=query,
                    patient_id=patient_id,
                    sample_mode=sample_mode
                )

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(result, indent=2).encode("utf-8"))
            else:
                self.send_response(404)
                self.end_headers()

        def log_message(self, format, *args):
            pass # Keep stdout clean for agent traces

    server = HTTPServer((host, port), StandaloneHandler)
    print(f"[INFO] CareSync HTTP Server listening on http://{host}:{port}/run", flush=True)
    server.serve_forever()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CareSync Agent Runner")
    parser.add_argument("--input", type=str, help="Path to input JSON file")
    parser.add_argument("--output", type=str, help="Path to save output JSON file")
    parser.add_argument("--port", type=int, default=cfg.PORT, help="Port to bind server (default 8000)")
    parser.add_argument("--host", type=str, default="0.0.0.0", help="Host interface to bind (default 0.0.0.0)")

    args = parser.parse_args()

    if args.input:
        sys.exit(run_single_input(args.input, args.output))
    else:
        start_server(port=args.port, host=args.host)
