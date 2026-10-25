"""PlannerAgent
Decomposes caregiver health queries into clinical hypotheses and retrieval directives.
Revises plans dynamically based on EvidenceEvaluator feedback.
"""
from typing import Dict, Any, List

class PlannerAgent:
    def __init__(self, name: str = "PlannerAgent"):
        self.name = name

    def create_initial_plan(self, query: str, patient_id: str) -> Dict[str, Any]:
        """Formulate initial testable hypotheses and data retrieval needs."""
        hypotheses = [
            "Acute metric deviation hypothesis: Patient experienced a clinically significant shift in renal or metabolic markers over the last 90-180 days.",
            "Pharmacotherapy conflict hypothesis: A newly added prescription from an outside encounter (urgent care/specialist) may be interacting with pre-existing chronic regimens.",
            "Visit-prep actionability hypothesis: Caregiver needs high-signal, prioritized discussion questions for the upcoming clinical consultation."
        ]
        data_queries = [
            {"target": "labs", "description": "Longitudinal metabolic and renal panels (eGFR, Creatinine, Electrolytes)"},
            {"target": "medications", "description": "Active outpatient pharmacy records and recent external prescriptions"},
            {"target": "encounters", "description": "Outside walk-in urgent care and specialist consultation discharge notes"}
        ]
        return {
            "agent": self.name,
            "status": "plan_created",
            "hypotheses": hypotheses,
            "data_queries": data_queries,
            "iteration": 1
        }

    def revise_plan(self, original_plan: Dict[str, Any], feedback: str) -> Dict[str, Any]:
        """Revise plan in response to evaluator critique or missing evidence."""
        revised_hypotheses = list(original_plan["hypotheses"])
        revised_hypotheses.append(f"Targeted revision hypothesis: {feedback}")
        return {
            "agent": self.name,
            "status": "plan_revised",
            "hypotheses": revised_hypotheses,
            "data_queries": original_plan["data_queries"],
            "iteration": original_plan.get("iteration", 1) + 1
        }
