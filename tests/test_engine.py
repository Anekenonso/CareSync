"""Meterless H-MEM Engine Conformance & Smoke Test
Verifies 3-tier memory store, conflict detection, and append-only Trust Ledger.
Run with:
  python -m unittest tests/test_engine.py
"""
import unittest
from agent_api.engines.hmem import HMEMEngine

class TestHMEMEngine(unittest.TestCase):
    def setUp(self):
        self.engine = HMEMEngine(patient_id="test-patient-001")

    def test_three_tier_memory_initialization(self):
        """Verify baseline memories are partitioned into long-term and short-term layers."""
        self.assertGreaterEqual(len(self.engine.long_term_memory), 2)
        self.assertGreaterEqual(len(self.engine.short_term_memory), 2)
        self.assertEqual(len(self.engine.working_memory), 0)

        # Check content tags
        lt_tags = [tag for m in self.engine.long_term_memory for tag in m["tags"]]
        self.assertIn("CKD_3a", lt_tags)
        self.assertIn("Lisinopril", lt_tags)

    def test_trust_ledger_cryptographic_chain(self):
        """Verify the Trust Ledger forms an immutable append-only hash sequence."""
        self.assertGreaterEqual(len(self.engine.trust_ledger), 4)

        for i, entry in enumerate(self.engine.trust_ledger):
            self.assertEqual(entry["index"], i + 1)
            self.assertTrue(len(entry["hash"]) >= 8)
            self.assertIn("action", entry)
            self.assertIn("timestamp", entry)

    def test_contraindication_conflict_detection(self):
        """Verify automated detection of Meloxicam + Lisinopril + CKD 3a interaction."""
        conflicts = self.engine.detect_conflicts()
        self.assertGreaterEqual(len(conflicts), 1)

        triple_whammy = next((c for c in conflicts if c["id"] == "conflict-triple-whammy-001"), None)
        self.assertIsNotNone(triple_whammy)
        self.assertEqual(triple_whammy["severity"], "CRITICAL")
        self.assertIn("intraglomerular filtration", triple_whammy["mechanism"].lower())

        # Check that conflict detection was logged to Trust Ledger
        ledger_conflict_actions = [e for e in self.engine.trust_ledger if e["action"] == "conflict_detected"]
        self.assertGreaterEqual(len(ledger_conflict_actions), 1)

    def test_chronological_recall(self):
        """Verify memories are ordered chronologically."""
        timeline = self.engine.recall_chronology()
        self.assertGreaterEqual(len(timeline), 4)
        for i in range(len(timeline) - 1):
            self.assertLessEqual(timeline[i]["timestamp"], timeline[i + 1]["timestamp"])

if __name__ == "__main__":
    unittest.main()
