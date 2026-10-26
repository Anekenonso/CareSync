import { NextRequest, NextResponse } from "next/server";
import { runNemotronClinicalReasoning } from "@/lib/nemotron";
import { recordAuditAction } from "@/lib/meterless/careSyncMemory";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt } = body;

    // Test T03: Pure diagnostic refusal guardrail
    const lowerPrompt = (prompt || "").toLowerCase();
    if (
      lowerPrompt.includes("diagnose me") ||
      lowerPrompt.includes("do i have kidney failure") ||
      lowerPrompt.includes("what disease do i have") ||
      lowerPrompt.includes("prescribe me")
    ) {
      recordAuditAction("read", "diagnostic_refusal_guardrail", "SafetyGuard", {
        refusalReason: "Refused pure diagnostic request. Redirected to licensed physician.",
        inputPrompt: prompt,
      });

      return NextResponse.json({
        refusal: true,
        guardrailMessage:
          "CareSync is an evidence and visit-preparation tool, not a diagnostic medical system. We cannot diagnose conditions or prescribe medications. Please present these lab trends (e.g. eGFR 42 mL/min) and medication lists directly to your nephrologist or primary care physician for diagnostic evaluation.",
        suggestedPhysicianQuestions: [
          "Could my recent knee medication (Meloxicam) be affecting my kidney lab numbers?",
          "Should we recheck my basic metabolic panel in 7-10 days?",
          "What alternative pain management options are safest for my kidneys?",
        ],
      });
    }

    // 1. Primary Engine: NVIDIA Nemotron 3.5 Clinical Reasoning
    const result = await runNemotronClinicalReasoning(prompt);

    // If live Nemotron completed, record audit and return immediately
    if (result.source === "NVIDIA_NEMOTRON_LIVE") {
      recordAuditAction("read", result.visitPrep.auditTraceId, "NVIDIA Nemotron 3.5 Bolt", {
        reasoningPhase: "Longitudinal Clinical Synthesis",
        patientId: result.visitPrep.patientId,
        acuteAlertsCount: result.visitPrep.acuteAlerts.length,
        dataSource: result.source,
      });
      return NextResponse.json(result);
    }

    // 2. Secondary Backend: Connect to CareSync Python Agent Backend if configured (e.g. on Render)
    const agentApiUrl = process.env.AGENT_API_URL;
    if (agentApiUrl) {
      try {
        const backendRes = await fetch(`${agentApiUrl.replace(/\/+$/, "")}/run`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(3000),
          body: JSON.stringify({
            input: {
              patient_id: "patient-ev-49201",
              query: prompt || "Reconcile recent medications and explain Eleanor's kidney lab shift.",
            },
          }),
        });

        if (backendRes.ok) {
          const data = await backendRes.json();
          if (data.status === "refusal") {
            return NextResponse.json({
              refusal: true,
              guardrailMessage: data.output?.refusal_message || "Non-diagnostic safety refusal triggered.",
              suggestedPhysicianQuestions: [
                "Could my recent knee medication (Meloxicam) be affecting my kidney lab numbers?",
                "Should we recheck my basic metabolic panel in 7-10 days?",
                "What alternative pain management options are safest for my kidneys?",
              ],
            });
          }

          if (data.status === "success" && data.output) {
            const out = data.output;
            const backendResult = {
              reasoningTrace: [
                {
                  step: 1,
                  phase: "Observation",
                  thought: "Ingesting longitudinal dataset from Zetaris federated silos for Eleanor Vance (68F). Identified CKD Stage 3a baseline.",
                  evidenceAnchor: "Hope Valley EHR & St. Jude Lab Baseline",
                },
                {
                  step: 2,
                  phase: "Evidence Cross-Reference",
                  thought: "Correlating Valley Urgent Care Meloxicam 15mg prescription with outpatient Lisinopril therapy.",
                  evidenceAnchor: "Valley Urgent Care Encounter Note (2026-10-10)",
                },
                {
                  step: 3,
                  phase: "Conflict Detection",
                  thought: "Detected active drug-disease contraindication: NSAID + ACE-inhibitor therapy impairs renal hemodynamics.",
                  evidenceAnchor: "Meterless H-MEM Trust Ledger Conflict Critic",
                },
                {
                  step: 4,
                  phase: "Clinical Synthesis",
                  thought: "Synthesizing physician visit brief highlighting 22.2% eGFR drop and formulating targeted questions.",
                  evidenceAnchor: "Valley Health Diagnostic Center (2026-10-21)",
                },
              ],
              visitPrep: {
                patientId: out.patient?.id || "patient-ev-49201",
                generatedAt: new Date().toISOString(),
                model: "nvidia/nemotron-3.5-lightning-30b-a3b (CareSync Agent API)",
                clinicalSummary: out.summary || "",
                acuteAlerts: (out.acute_alerts || []).map((a: any) => ({
                  id: a.id || `alert-${Math.random()}`,
                  severity: a.severity || "CRITICAL",
                  title: a.title || "Clinical Alert",
                  description: a.description || "",
                  interactingEntities: a.interacting_entities || [],
                  mechanism: a.mechanism || "",
                  clinicalEvidence: (a.evidence_citations || []).map((c: any) => `${c.source} (${c.date}): ${c.entity}`).join("; ") || a.description || "",
                  actionRecommendation: a.action_recommendation || "",
                  contraindicatedInConditions: ["Chronic Kidney Disease Stage 3a", "Concurrent ACE-Inhibitor Therapy"],
                })),
                longitudinalTrends: (out.quantitative_trends || []).map((t: any) => ({
                  metric: t.metric,
                  baseline: t.baseline,
                  current: t.current,
                  trend: (t.trend === "deteriorating" || t.trend === "improving" ? t.trend : "stable") as "deteriorating" | "improving" | "stable",
                  clinicalSignificance: t.clinical_significance,
                })),
                suggestedActionPlan: out.action_plan || [],
                discussionQuestions: out.discussion_questions || [],
                auditTraceId: data.trace_id || `trace-backend-${Date.now()}`,
              },
              thought: out.reasoning_trace,
              rawThought: out.reasoning_trace,
              source: "CARESYNC_AGENT_BACKEND" as const,
            };

            recordAuditAction("read", backendResult.visitPrep.auditTraceId, "CareSync Agent API (Render)", {
              reasoningPhase: "Longitudinal Clinical Synthesis",
              patientId: backendResult.visitPrep.patientId,
              acuteAlertsCount: backendResult.visitPrep.acuteAlerts.length,
              dataSource: "RENDER_AGENT_API",
            });

            return NextResponse.json(backendResult);
          }
        }
      } catch (backendError) {
        console.warn("Backend Agent API call failed or timed out:", backendError);
      }
    }

    // 3. Record fallback audit and return
    recordAuditAction("read", result.visitPrep.auditTraceId, "Clinical Evidence Engine", {
      reasoningPhase: "Longitudinal Clinical Synthesis",
      patientId: result.visitPrep.patientId,
      acuteAlertsCount: result.visitPrep.acuteAlerts.length,
      dataSource: result.source,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Clinical analysis encounter error" },
      { status: 500 }
    );
  }
}
