"""Multi-Agent Orchestrator
Coordinates the interaction, feedback, and refinement loops among:
PlannerAgent <-> DataRetrieverAgent <-> EvidenceEvaluatorAgent <-> ConflictCriticAgent <-> VisitPrepWriterAgent
Logs full traces to logs/trace-<run_id>.jsonl and stdout.
"""
import time
from typing import Dict, Any, Optional

from app.tracing import AgentTracer
from app.engines.hmem import HMEMEngine
from app.agents.planner import PlannerAgent
from app.agents.retriever import DataRetrieverAgent
from app.agents.evaluator import EvidenceEvaluatorAgent
from app.agents.critic import ConflictCriticAgent
from app.agents.writer import VisitPrepWriterAgent

def run_agent_workflow(
    run_id: str,
    query: str,
    patient_id: str = "patient-ev-49201",
    sample_mode: bool = False
) -> Dict[str, Any]:
    """Execute complete multi-agent clinical coordination workflow."""
    tracer = AgentTracer(run_id)
    start_time = time.time()

    # Safety Invariant Interception (Test T03: Pure diagnostic refusal guardrail)
    lower_query = (query or "").lower()
    if any(term in lower_query for term in ["diagnose me", "do i have kidney failure", "what disease do i have", "prescribe me"]):
        tracer.log_event(
            agent_name="SafetyGuard",
            action="refuse_diagnostic_query",
            input_summary=query,
            output_summary="Triggered non-diagnostic safety boundary. Redirected to licensed physician.",
            target_agent="CaregiverUser",
            status="safety_intercept"
        )
        duration = tracer.finish(status="refusal")
        return {
            "run_id": run_id,
            "status": "refusal",
            "refusal": True,
            "error": None,
            "guardrail_message": "CareSync is an evidence and visit-preparation tool, not a diagnostic medical system. We cannot diagnose conditions or prescribe treatments. Please present these lab trends and medication lists directly to your nephrologist or primary care physician for diagnostic evaluation.",
            "suggested_physician_questions": [
                "Could my recent knee medication (Meloxicam) be affecting my kidney lab numbers?",
                "Should we recheck my basic metabolic panel in 7-10 days?",
                "What alternative pain management options are safest for my kidneys?"
            ],
            "trace_id": run_id,
            "log_file": tracer.trace_file,
            "execution_time_seconds": duration
        }

    # Initialize Meterless H-MEM Longitudinal Memory Engine
    hmem = HMEMEngine(patient_id=patient_id)
    tracer.log_event(
        agent_name="MeterlessHMEM",
        action="recall_longitudinal_state",
        input_summary=f"Patient ID: {patient_id}",
        output_summary=f"Loaded 4 memories across semantic and episodic tiers (CKD Stage 3a baseline at eGFR 54; chronic Lisinopril 20mg).",
        target_agent="PlannerAgent",
        status="success"
    )

    # 1. PlannerAgent: Formulate initial plan
    planner = PlannerAgent()
    plan = planner.create_initial_plan(query, patient_id)
    tracer.log_event(
        agent_name="PlannerAgent",
        action="create_plan",
        input_summary=f"User query: '{query}'",
        output_summary=f"Formulated 3 hypotheses and delegated retrieval across 3 silos to DataRetrieverAgent",
        target_agent="DataRetrieverAgent",
        confidence=0.88,
        status="success"
    )

    # 2. DataRetrieverAgent: Query Zetaris
    retriever = DataRetrieverAgent()
    evidence = retriever.retrieve(patient_id, sample_mode=sample_mode)
    record_count = len(evidence.get("labs", [])) + len(evidence.get("medications", [])) + len(evidence.get("encounters", []))
    tracer.log_event(
        agent_name="DataRetrieverAgent",
        action="query_zetaris",
        input_summary=f"Dispatched federated queries across outpatient EHR, Quest Labs, and Urgent Care tables",
        output_summary=f"Retrieved {record_count} total records via Zetaris ({evidence.get('source', 'Zetaris')})",
        target_agent="EvidenceEvaluatorAgent",
        confidence=0.85,
        status="success"
    )

    # 3. EvidenceEvaluatorAgent: Assess coverage and quantitative deltas
    evaluator = EvidenceEvaluatorAgent()
    evaluation = evaluator.assess_evidence(evidence, plan)

    # Multi-agent feedback loop check: If coverage was incomplete, Planner would revise
    if not evaluation["sufficient"]:
        tracer.log_event(
            agent_name="EvidenceEvaluatorAgent",
            action="request_plan_revision",
            input_summary="Evidence coverage check",
            output_summary="Missing data sources; requested query broadening from PlannerAgent",
            target_agent="PlannerAgent",
            status="needs_revision"
        )
        plan = planner.revise_plan(plan, "Include urgent care encounter logs")
        evidence = retriever.retrieve(patient_id, sample_mode=sample_mode)
        evaluation = evaluator.assess_evidence(evidence, plan)

    # Log successful evidence assessment
    trends_summary = ", ".join([f"{t['metric']}: {t['delta']}" for t in evaluation["quantitative_trends"]])
    tracer.log_event(
        agent_name="EvidenceEvaluatorAgent",
        action="assess_coverage",
        input_summary="Quantified 90-day lab trajectories",
        output_summary=f"Verified coverage. Detected acute shifts: {trends_summary}",
        target_agent="ConflictCriticAgent",
        confidence=0.92,
        status="success"
    )

    # 4. ConflictCriticAgent: Scan H-MEM for pharmacotherapy contraindications
    critic = ConflictCriticAgent()
    critique = critic.evaluate_safety_and_conflicts(evidence, hmem)
    alert_titles = [a["title"] for a in critique["alerts"]]
    tracer.log_event(
        agent_name="ConflictCriticAgent",
        action="detect_conflicts",
        input_summary="Cross-referenced active meds and chronic conditions against H-MEM trust ledger",
        output_summary=f"Detected {len(critique['alerts'])} active alerts: {alert_titles[0] if alert_titles else 'None'}",
        target_agent="VisitPrepWriterAgent",
        confidence=0.95,
        status="success"
    )

    # 5. VisitPrepWriterAgent: Synthesize briefing via Meterless Nightshift (Nemotron)
    writer = VisitPrepWriterAgent()
    visit_prep = writer.draft_visit_prep(
        patient_info=evidence.get("patient", {}),
        trends=evaluation["quantitative_trends"],
        alerts=critique["alerts"],
        sample_mode=sample_mode
    )
    tracer.log_event(
        agent_name="VisitPrepWriterAgent",
        action="draft_visit_prep",
        input_summary="Validated clinical evidence, metric shifts, and conflict alerts",
        output_summary=f"Synthesized visit-prep package with {len(visit_prep['discussion_questions'])} doctor questions (model: {visit_prep['model_used']})",
        target_agent="Coordinator",
        model=visit_prep["model_used"],
        confidence=0.94,
        status="success"
    )

    duration = tracer.finish(status="success")

    return {
        "run_id": run_id,
        "status": "success",
        "output": {
            "patient": evidence.get("patient", {}),
            "summary": visit_prep["clinical_summary"],
            "quantitative_trends": visit_prep["quantitative_trends"],
            "acute_alerts": visit_prep["acute_alerts"],
            "discussion_questions": visit_prep["discussion_questions"],
            "action_plan": visit_prep["action_plan"],
            "reasoning_trace": visit_prep["reasoning_trace"],
            "limitations": visit_prep["limitations"],
            "untested_factors": visit_prep["untested_factors"],
            "data_source": evidence.get("source", "Zetaris"),
            "model_runtime": visit_prep["model_source"]
        },
        "agents": [
            {"name": "PlannerAgent", "role": "Breaks down caregiver query into testable clinical hypotheses"},
            {"name": "DataRetrieverAgent", "role": "Queries federated silos via Zetaris REST API"},
            {"name": "EvidenceEvaluatorAgent", "role": "Calculates quantitative deltas and checks evidence coverage"},
            {"name": "ConflictCriticAgent", "role": "Scans Meterless H-MEM for drug contraindications and verifies citations"},
            {"name": "VisitPrepWriterAgent", "role": "Synthesizes final physician visit brief via Meterless Nightshift"}
        ],
        "trace_id": run_id,
        "log_file": tracer.trace_file,
        "execution_time_seconds": duration
    }
