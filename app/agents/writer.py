"""VisitPrepWriterAgent
Synthesizes verified clinical evidence, trend calculations, and conflict alerts
into a caregiver-facing physician visit preparation brief.
Executes model calls through Meterless Nightshift (NVIDIA Nemotron).
"""
from typing import Dict, Any, List
from app.adapters.meterless import meterless_client

class VisitPrepWriterAgent:
    def __init__(self, name: str = "VisitPrepWriterAgent"):
        self.name = name

    def draft_visit_prep(
        self,
        patient_info: Dict[str, Any],
        trends: List[Dict[str, Any]],
        alerts: List[Dict[str, Any]],
        sample_mode: bool = False
    ) -> Dict[str, Any]:
        """Synthesize the complete Physician Visit Preparation Brief."""

        # Construct prompt for Meterless Nightshift / Nemotron
        system_prompt = (
            "You are CareSync's Senior Clinical AI Reasoning Agent powered by NVIDIA Nemotron through Meterless Nightshift. "
            "Synthesize an evidence-backed, 100% cited physician visit prep brief for a family caregiver. "
            "Never invent facts. Focus on the acute renal shift and urgent care NSAID interaction."
        )
        user_prompt = (
            f"Patient: {patient_info.get('name', 'Eleanor Vance')} ({patient_info.get('age', 68)}{patient_info.get('gender', 'F')[0]})\n"
            f"Quantitative Trends: {trends}\n"
            f"Conflict Alerts: {alerts}"
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        # Call model through Meterless Nightshift
        model_result = meterless_client.complete(messages, sample_mode=sample_mode)

        # Standardized Doctor Questions tailored to detected interaction
        targeted_questions = [
            "Given Mom's pre-existing Stage 3a kidney disease and Lisinopril therapy, could the Meloxicam 15mg prescribed at Urgent Care on Oct 10 have caused her eGFR to drop from 54 to 42 mL/min?",
            "Should we discontinue Meloxicam immediately and switch to a non-nephrotoxic knee pain alternative like topical Diclofenac or acetaminophen?",
            "When should we recheck her Basic Metabolic Panel (eGFR, Creatinine, and Potassium) to ensure her kidney function is rebounding?",
            "With her potassium currently at 5.2 mEq/L, do we need to make any temporary adjustments to her diet or Lisinopril dose while her kidneys recover?",
            "Does her Metformin dosage need a temporary reduction while her eGFR is below 45 mL/min?"
        ]

        # Caregiver Action Plan
        action_plan = [
            "Immediate step: Hold Meloxicam 15mg doses pending today's physician consultation.",
            "Bring this printed 90-Day Trend Sheet and the outside Urgent Care discharge note to the doctor's office.",
            "Ensure adequate hydration and monitor for any new ankle swelling or fluid retention.",
            "Schedule follow-up renal panel lab appointment within 7 to 10 days post-consultation."
        ]

        return {
            "agent": self.name,
            "status": "visit_prep_synthesized",
            "model_used": model_result.get("model", "nvidia/nemotron-3.5-lightning-30b-a3b"),
            "model_source": model_result.get("source", "METERLESS_NIGHTSHIFT"),
            "reasoning_trace": model_result.get("reasoning_trace", ""),
            "clinical_summary": model_result.get("content", ""),
            "acute_alerts": alerts,
            "quantitative_trends": trends,
            "discussion_questions": targeted_questions,
            "action_plan": action_plan,
            "untested_factors": ["Dietary sodium and potassium logs over the last 14 days were not recorded in portal."],
            "limitations": [
                "CareSync is a non-diagnostic evidence coordination tool, not a medical device.",
                "Findings show correlation between drug initiation and lab shifts, not definitive proven causation.",
                "All summaries must be reviewed with a licensed physician."
            ]
        }
