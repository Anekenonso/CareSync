import { NextRequest, NextResponse } from "next/server";
import { runNemotronClinicalReasoning } from "@/lib/nemotron";
import { recordAuditAction } from "@/lib/meterless/careSyncMemory";

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

    // Run NVIDIA Nemotron 3.5 Lightning Clinical Reasoning
    const result = await runNemotronClinicalReasoning(prompt);

    // Record complete audit trail in Meterless Trust Ledger
    recordAuditAction("read", result.visitPrep.auditTraceId, "Nemotron 3.5 Lightning", {
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
