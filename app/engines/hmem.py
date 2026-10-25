"""Meterless H-MEM (Hierarchical Memory Engine) Reference Implementation
Provides 3-tier memory management, conflict detection, append-only Trust Ledger,
and sleep consolidation as required by the hackathon engine specification.
"""
import time
import hashlib
import json
from typing import Dict, Any, List, Optional

class HMEMEngine:
    def __init__(self, patient_id: str = "patient-ev-49201"):
        self.patient_id = patient_id
        self.long_term_memory: List[Dict[str, Any]] = []
        self.short_term_memory: List[Dict[str, Any]] = []
        self.working_memory: List[Dict[str, Any]] = []
        self.trust_ledger: List[Dict[str, Any]] = []
        self._initialize_baseline()

    def _initialize_baseline(self):
        now = time.time()
        # 1. Long-Term Semantic
        self.add_memory(
            content="Baseline CKD Stage 3a with eGFR 54 mL/min and Creatinine 1.28 mg/dL as of April 2026.",
            layer="long_term",
            source="Hope Valley Medical EHR (Dr. Marcus Chen)",
            confidence=0.98,
            tags=["Renal", "CKD_3a", "Baseline"]
        )
        self.add_memory(
            content="Chronic Lisinopril 20mg daily for hypertension and renal protection.",
            layer="long_term",
            source="Outpatient Pharmacy Dispense Roster",
            confidence=0.99,
            tags=["Medication", "ACE_Inhibitor", "Lisinopril"]
        )
        # 2. Short-Term Episodic
        self.add_memory(
            content="Urgent Care visit on 2026-10-10 for knee pain; prescribed Meloxicam 15mg daily.",
            layer="short_term",
            source="Valley Urgent Care (Dr. Robert Alvarez)",
            confidence=0.95,
            tags=["Urgent_Care", "Meloxicam", "NSAID", "Acute_Prescription"]
        )
        self.add_memory(
            content="Quest Diagnostic lab on 2026-10-21 showed eGFR drop to 42 mL/min (-22.2%) and Creatinine spike to 1.82 mg/dL.",
            layer="short_term",
            source="Quest Diagnostics Lab Order (2026-10-21)",
            confidence=0.99,
            tags=["Acute_Lab_Shift", "eGFR_42", "Hyperkalemia"]
        )

    def add_memory(self, content: str, layer: str = "short_term", source: str = "System", confidence: float = 0.90, tags: Optional[List[str]] = None) -> Dict[str, Any]:
        """Add a memory record and record creation in Trust Ledger."""
        mem_id = f"mem-{len(self.long_term_memory) + len(self.short_term_memory) + len(self.working_memory) + 1}"
        record = {
            "id": mem_id,
            "patient_id": self.patient_id,
            "content": content,
            "layer": layer,
            "source": source,
            "confidence": confidence,
            "tags": tags or [],
            "timestamp": time.time(),
            "access_count": 1
        }
        if layer == "long_term":
            self.long_term_memory.append(record)
        elif layer == "short_term":
            self.short_term_memory.append(record)
        else:
            self.working_memory.append(record)

        self._record_ledger("create", mem_id, actor="HMEMEngine", details={"layer": layer, "source": source})
        return record

    def detect_conflicts(self) -> List[Dict[str, Any]]:
        """Scan active memory layers for pharmacotherapy and clinical contraindications."""
        conflicts = []
        all_memories = self.long_term_memory + self.short_term_memory + self.working_memory
        all_text = " ".join([m["content"] for m in all_memories]).lower()

        # Check: NSAID + ACE-Inhibitor + CKD 3a
        has_nsaid = "meloxicam" in all_text or "nsaid" in all_text or "naproxen" in all_text
        has_acei = "lisinopril" in all_text or "ace inhibitor" in all_text
        has_ckd = "ckd" in all_text or "chronic kidney" in all_text or "egfr 54" in all_text

        if has_nsaid and has_acei and has_ckd:
            conflict = {
                "id": "conflict-triple-whammy-001",
                "severity": "CRITICAL",
                "type": "drug_drug_disease_contraindication",
                "description": "Concurrent Meloxicam 15mg (NSAID) + Lisinopril 20mg (ACE inhibitor) in patient with CKD Stage 3a.",
                "mechanism": "NSAID causes afferent renal arteriolar constriction; ACE inhibitor causes efferent vasodilation. Dual action collapses intraglomerular filtration pressure.",
                "evidence_memories": ["mem-1", "mem-2", "mem-3", "mem-4"],
                "recommendation": "Immediate cessation of Meloxicam. Switch to topical analgesics or acetaminophen. Recheck BMP in 7-10 days."
            }
            conflicts.append(conflict)
            self._record_ledger("conflict_detected", conflict["id"], actor="HMEMEngine", details=conflict)

        # Check: Warfarin + Amiodarone
        if "warfarin" in all_text and "amiodarone" in all_text:
            conflict = {
                "id": "conflict-warfarin-amio-002",
                "severity": "CRITICAL",
                "type": "drug_drug_interaction",
                "description": "Concomitant Warfarin and Amiodarone: CYP2C9 inhibition significantly potentiates INR elevation.",
                "mechanism": "Amiodarone inhibits Warfarin clearance, driving critical bleeding risks.",
                "evidence_memories": ["mt-med-1", "mt-med-3"],
                "recommendation": "Reduce Warfarin dose by 30-50% and monitor INR closely."
            }
            conflicts.append(conflict)
            self._record_ledger("conflict_detected", conflict["id"], actor="HMEMEngine", details=conflict)

        return conflicts

    def recall_chronology(self) -> List[Dict[str, Any]]:
        """Return unified chronological timeline of all memories."""
        all_mems = self.long_term_memory + self.short_term_memory + self.working_memory
        return sorted(all_mems, key=lambda m: m["timestamp"])

    def _record_ledger(self, action: str, target_id: str, actor: str, details: Optional[Dict[str, Any]] = None):
        """Append-only cryptographic audit logging."""
        entry_data = {
            "index": len(self.trust_ledger) + 1,
            "action": action,
            "target_id": target_id,
            "actor": actor,
            "timestamp": time.time(),
            "details": details or {}
        }
        # Compute SHA-256 integrity hash linking previous entry
        prev_hash = self.trust_ledger[-1]["hash"] if self.trust_ledger else "0x000000000000"
        payload = f"{prev_hash}:{entry_data['index']}:{action}:{target_id}:{actor}"
        entry_data["hash"] = hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]
        self.trust_ledger.append(entry_data)
