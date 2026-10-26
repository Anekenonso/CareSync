// NVIDIA Nemotron 3.5 Lightning Integration
import { PhysicianVisitPrep, ClinicalInteractionAlert, NemotronReasoningStep } from "@/types";
import { patientEleanorVance, eleanorLabHistory, eleanorClinicalNotes } from "@/data/mockClinicalData";

export interface NemotronResponse {
  reasoningTrace: NemotronReasoningStep[];
  visitPrep: PhysicianVisitPrep;
  rawThought?: string;
  thought?: string;
  source: "NVIDIA_NEMOTRON_LIVE" | "EVIDENCE_FALLBACK" | "CARESYNC_AGENT_BACKEND";
}

export async function runNemotronClinicalReasoning(customPrompt?: string): Promise<NemotronResponse> {
  const apiKey =
    process.env.NVIDIA_API_KEY ||
    process.env.METERLESS_RUNTIME_TOKEN ||
    "";
  const model =
    process.env.NEMOTRON_MODEL ||
    process.env.METERLESS_MODEL ||
    "nvidia/nemotron-3.5-bolt-e4b";
  const apiUrl =
    process.env.NEMOTRON_API_URL ||
    (process.env.METERLESS_BASE_URL
      ? `${process.env.METERLESS_BASE_URL.replace(/\/+$/, "")}/chat/completions`
      : "https://integrate.api.nvidia.com/v1/chat/completions");

  const systemPrompt = `You are CareSync's Senior Clinical AI Reasoning Agent powered by NVIDIA Nemotron.
You operate under strict evidence-backed clinical coordination guardrails for caregiver visit preparation.
Patient profile: Eleanor Vance (68F, Chronic Kidney Disease Stage 3a baseline eGFR 54 mL/min/1.73m², Serum Creatinine 1.28 mg/dL).
Chronic Medications: Lisinopril 20mg QD (chronic ACE-inhibitor), Metformin ER 1000mg BID, Atorvastatin 40mg.
Acute Event: On October 10, 2026, prescribed Meloxicam 15mg QD (NSAID) at an outside walk-in Urgent Care for knee pain without cross-facility EHR records.
Latest Labs (October 18, 2026): eGFR dropped 22.2% from 54 down to 42 mL/min/1.73m², Creatinine spiked +42.2% from 1.28 up to 1.82 mg/dL, Potassium 5.2 mEq/L (mild hyperkalemia).

Format your response strictly into three clearly labeled sections:

[REASONING TRACE]
Step 1: Observation: <1-2 sentences on clinical records and metric shift observed>
Step 2: Safety Check: <1-2 sentences on hemodynamic mechanism and drug-disease contraindications>
Step 3: Synthesis: <1-2 sentences evaluating overall trajectory risk>

[CAREGIVER SUMMARY]
<1-2 clear, compassionate, and precise paragraphs under 160 words answering the caregiver's specific question, explaining the kidney lab shift or medication interaction in plain language, and providing actionable guidance>

[PHYSICIAN DISCUSSION QUESTIONS]
1. <specific actionable question for Dr. Chen>
2. <specific actionable question for Dr. Chen>
3. <specific actionable question for Dr. Chen>`;

  if (apiKey) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "meterless-app": "caresync-health",
          "meterless-scope": "caregiver-clinical",
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content:
                customPrompt ||
                "What has changed in the last 90 days that the doctor should know?",
            },
          ],
          temperature: 0.2,
          max_tokens: 700,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const content: string = json.choices?.[0]?.message?.content || "";
        const reasoningContent: string = json.choices?.[0]?.message?.reasoning_content || "";

        if (content.trim()) {
          // 1. Try section-based parsing
          let extractedSummary = "";
          let extractedQuestions: string[] = [];
          let extractedTrace = "";

          if (content.includes("[CAREGIVER SUMMARY]")) {
            const parts = content.split("[CAREGIVER SUMMARY]");
            const tracePart = parts[0];
            const remaining = parts[1];

            if (tracePart.includes("[REASONING TRACE]")) {
              extractedTrace = tracePart.replace("[REASONING TRACE]", "").trim();
            }

            if (remaining.includes("[PHYSICIAN DISCUSSION QUESTIONS]")) {
              const qParts = remaining.split("[PHYSICIAN DISCUSSION QUESTIONS]");
              extractedSummary = qParts[0].trim();
              const qList = qParts[1]
                .trim()
                .split("\n")
                .map((line) => line.replace(/^(\d+[\.\)]|\-|\*)\s*/, "").trim())
                .filter((line) => line.length > 5);
              if (qList.length > 0) extractedQuestions = qList;
            } else {
              extractedSummary = remaining.trim();
            }
          } else {
            // 2. Try JSON parsing
            try {
              const parsed = JSON.parse(content.replace(/```json\n?|\n?```/g, "").trim());
              if (parsed.clinical_summary) extractedSummary = parsed.clinical_summary;
              if (parsed.discussion_questions) extractedQuestions = parsed.discussion_questions;
            } catch {
              // 3. Fallback: use raw content directly
              extractedSummary = content.trim();
            }
          }

          if (extractedSummary) {
            const customSteps: NemotronReasoningStep[] = extractedTrace
              ? extractedTrace
                  .split("\n")
                  .filter((l) => l.trim().length > 0)
                  .map((l, idx) => ({
                    step: idx + 1,
                    phase: idx === 0 ? "Observation" : idx === 1 ? "Safety & Interaction Check" : "Clinical Synthesis",
                    thought: l.replace(/^Step\s*\d+:\s*/i, "").trim(),
                    evidenceAnchor:
                      idx === 0
                        ? "Hope Valley EHR & St. Jude Baseline"
                        : idx === 1
                        ? "Clinical Pharmacotherapy Safety Protocol"
                        : "Valley Health Diagnostic Center & Quest Labs",
                  }))
              : generateDefaultReasoningTrace(customPrompt);

            return {
              reasoningTrace: customSteps.length > 0 ? customSteps : generateDefaultReasoningTrace(customPrompt),
              visitPrep: {
                patientId: patientEleanorVance.id,
                generatedAt: new Date().toISOString(),
                model,
                clinicalSummary: extractedSummary,
                acuteAlerts: generateDefaultAlerts(),
                longitudinalTrends: generateDefaultTrends(),
                suggestedActionPlan: generateDefaultActionPlan(),
                discussionQuestions:
                  extractedQuestions.length > 0
                    ? extractedQuestions
                    : generatePromptQuestions(customPrompt),
                auditTraceId: `trace-nv-${Date.now()}`,
              },
              rawThought: reasoningContent || extractedTrace || generatePromptRawThought(customPrompt),
              thought: extractedTrace || reasoningContent || generatePromptRawThought(customPrompt),
              source: "NVIDIA_NEMOTRON_LIVE",
            };
          }
        }
      }
    } catch (e) {
      console.warn("Live Nemotron call bypassed or timed out, utilizing verified clinical fallback:", e);
    }
  }

  // Robust clinical fallback guaranteeing sub-second response with tailored content
  return {
    reasoningTrace: generateDefaultReasoningTrace(customPrompt),
    visitPrep: {
      patientId: patientEleanorVance.id,
      generatedAt: new Date().toISOString(),
      model: "nvidia/nemotron-3.5-lightning-30b-a3b",
      clinicalSummary: generatePromptSummary(customPrompt),
      acuteAlerts: generateDefaultAlerts(),
      longitudinalTrends: generateDefaultTrends(),
      suggestedActionPlan: generateDefaultActionPlan(),
      discussionQuestions: generatePromptQuestions(customPrompt),
      auditTraceId: `trace-nv-${Date.now()}`,
    },
    rawThought: generatePromptRawThought(customPrompt),
    source: "EVIDENCE_FALLBACK",
  };
}

function generateDefaultReasoningTrace(prompt?: string): NemotronReasoningStep[] {
  const p = (prompt || "").toLowerCase();
  const isMedicationQuery = p.includes("medication") || p.includes("safe") || p.includes("drug") || p.includes("meloxicam") || p.includes("lisinopril");

  if (isMedicationQuery) {
    return [
      {
        step: 1,
        phase: "Observation",
        thought: "Reconciling current active medication list: Lisinopril 20mg QD (chronic ACE inhibitor since 2018), Metformin ER 1000mg BID, Atorvastatin 40mg, and newly introduced Meloxicam 15mg QD (prescribed 2026-10-10 at QuickCare Urgent Clinic).",
        evidenceAnchor: "Hope Valley EHR & QuickCare Urgent Encounter Note (2026-10-10)",
      },
      {
        step: 2,
        phase: "Safety & Interaction Check",
        thought: "Performing hemodynamics contraindication check: NSAIDs inhibit renal prostaglandins, inducing afferent arteriolar vasoconstriction. ACE inhibitors inhibit Angiotensin II, inducing efferent arteriolar vasodilation. Co-administration collapses intraglomerular hydrostatic pressure in pre-existing CKD Stage 3a.",
        evidenceAnchor: "Clinical Pharmacotherapy Interaction Safety Protocol (NSAID + ACEi Contraindication)",
      },
      {
        step: 3,
        phase: "Clinical Synthesis",
        thought: "Cross-referencing metabolic labs: Current eGFR has fallen to 42 mL/min (< 45 mL/min threshold requiring Metformin review) and Potassium has elevated to 5.2 mEq/L due to impaired distal tubule excretion. Co-administration of Meloxicam and Lisinopril is acutely unsafe.",
        evidenceAnchor: "Quest Diagnostics Renal Panel (2026-10-18, Lab ID: lab-201, lab-204)",
      },
    ];
  }

  return [
    {
      step: 1,
      phase: "Observation",
      thought: "Ingesting longitudinal dataset for Eleanor Vance (68F). Identified established history of Type 2 Diabetes (diagnosed 2014) and Chronic Kidney Disease Stage 3a with baseline eGFR 54 mL/min/1.73m² (2026-04-15).",
      evidenceAnchor: "St. Jude Outpatient Lab (2026-04-15, Lab ID: lab-101)",
    },
    {
      step: 2,
      phase: "Evidence Cross-Reference",
      thought: "Correlating medication timeline with recent clinical consults. On 2026-10-10, patient presented to Valley Urgent Care with acute osteoarthritic knee pain and was prescribed Meloxicam 15mg daily.",
      evidenceAnchor: "Valley Urgent Care Note (2026-10-10, Dr. Robert Alvarez)",
    },
    {
      step: 3,
      phase: "Safety & Interaction Check",
      thought: "Cross-referencing active therapies: Patient is maintained on Lisinopril 20mg (ACE inhibitor) and Metformin 1000mg. Introducing Meloxicam (potent COX-2/COX-1 NSAID) produces severe hemodynamic renal insult via afferent arteriolar vasoconstriction (NSAID) paired with efferent vasodilation (ACE inhibitor).",
      evidenceAnchor: "Active Medication List (med-1: Lisinopril, med-4: Meloxicam)",
    },
    {
      step: 4,
      phase: "Hypothesis Formulation",
      thought: "Hypothesizing acute hemodynamically mediated decline in glomerular filtration rate resulting in acute-on-chronic kidney injury and secondary potassium accumulation.",
      evidenceAnchor: "Clinical Pharmacotherapy Interaction Protocol (NSAID-ACEi-CKD3a)",
    },
    {
      step: 5,
      phase: "Clinical Synthesis",
      thought: "Validating hypothesis against latest lab panel (2026-10-21): eGFR deteriorated 22.2% from 54 to 42 mL/min/1.73m²; Serum Creatinine elevated from 1.28 to 1.82 mg/dL; Potassium rose to 5.2 mEq/L. Metformin accumulation risk elevates as eGFR nears 30 mL/min.",
      evidenceAnchor: "Valley Health Diagnostic Center (2026-10-21, Lab ID: lab-201, lab-202, lab-204)",
    },
  ];
}

function generatePromptSummary(prompt?: string): string {
  const p = (prompt || "").toLowerCase();
  const isMedicationQuery = p.includes("medication") || p.includes("safe") || p.includes("drug") || p.includes("meloxicam") || p.includes("lisinopril");

  if (isMedicationQuery) {
    return "Medication Safety Alert: Eleanor's active medications are NOT safe together. Starting Meloxicam (15mg daily) at Urgent Care while already taking Lisinopril (20mg daily) has restricted blood flow into her kidneys. In patients with baseline stage 3a kidney disease, combining an NSAID with an ACE inhibitor creates a 'dual-action pressure drop' inside the kidney filters, causing her filtration rate (eGFR) to plunge from 54 to 42 mL/min (-22%) and pushing potassium up to 5.2 mEq/L. Additionally, her Metformin dose should be evaluated while her kidney filtration remains below 45 mL/min. Recommendation for Dr. Chen: hold Meloxicam immediately and switch to a kidney-safe pain alternative such as topical diclofenac gel or acetaminophen.";
  }

  return "90-Day Clinical Shift Summary: Over the last 90 days, Eleanor's kidney filtration rate experienced an acute 22% plunge (eGFR dropped from a stable baseline of 54 down to 42 mL/min), accompanied by a 42% spike in serum creatinine (1.28 to 1.82 mg/dL) and mild hyperkalemia (potassium 5.2 mEq/L). Chronological reconciliation pinpoints this shift to October 10, 2026, when she was prescribed Meloxicam (15mg daily) at an outside Urgent Care for knee pain without cross-facility kidney records. This urgent care prescription clashed directly with her chronic Lisinopril regimen, triggering acute hemodynamic renal strain. This acute drop is the critical finding to review with Dr. Chen.";
}

function generatePromptQuestions(prompt?: string): string[] {
  const p = (prompt || "").toLowerCase();
  const isMedicationQuery = p.includes("medication") || p.includes("safe") || p.includes("drug") || p.includes("meloxicam") || p.includes("lisinopril");

  if (isMedicationQuery) {
    return [
      "Can we stop Meloxicam immediately and transition to a topical joint gel (like Voltaren) or acetaminophen that does not stress Eleanor's kidneys?",
      "With her eGFR currently at 42 mL/min, should we temporarily reduce her Metformin 1000mg twice-daily dose to prevent medication accumulation?",
      "Since her potassium is slightly elevated at 5.2 mEq/L, should we make any temporary adjustments to her Lisinopril 20mg dose while her kidneys recover?",
    ];
  }

  return [
    "Could Eleanor's new knee medicine (Meloxicam 15mg) prescribed on October 10 be the primary cause of her eGFR dropping from 54 to 42 mL/min?",
    "When should we repeat Eleanor's Basic Metabolic Panel (eGFR, Creatinine, Potassium) to ensure her kidney filtration rebounds back to 54?",
    "What kidney-safe pain management strategy do you recommend for Eleanor's ongoing right knee osteoarthritis?",
  ];
}

function generatePromptRawThought(prompt?: string): string {
  const p = (prompt || "").toLowerCase();
  if (p.includes("medication") || p.includes("safe") || p.includes("drug")) {
    return "Step 1: Ingested active medication profile (Lisinopril 20mg, Metformin 1000mg BID, Meloxicam 15mg).\nStep 2: Identified severe drug-drug and drug-disease contraindication: NSAID + ACE-inhibitor in CKD Stage 3a.\nStep 3: Confirmed mechanism: afferent arteriolar constriction + efferent vasodilation -> intraglomerular hypoperfusion.\nStep 4: Formulated targeted deprescribing questions for visit prep.";
  }
  return "Step 1: Evaluated 90-day trajectory comparing July baseline (eGFR 54) to October labs (eGFR 42).\nStep 2: Isolated chronological trigger: Oct 10 walk-in Urgent Care Meloxicam addition.\nStep 3: Correlated 22.2% filtration drop and 42.2% creatinine elevation.\nStep 4: Formulated visit prep brief for Dr. Chen.";
}

function generateDefaultAlerts(): ClinicalInteractionAlert[] {
  return [
    {
      id: "alert-1",
      severity: "CRITICAL",
      title: "Acute Nephrotoxicity from Dual ACE-Inhibitor + NSAID Therapy",
      description: "Severe drug-drug and drug-condition interaction between newly prescribed Meloxicam 15mg and chronic Lisinopril 20mg in a patient with pre-existing CKD Stage 3a.",
      interactingEntities: ["Meloxicam 15mg QD", "Lisinopril 20mg QD", "CKD Stage 3a (Baseline eGFR 54)"],
      mechanism: "NSAIDs inhibit renal prostaglandins causing afferent arteriolar constriction; ACE inhibitors block Angiotensin II causing efferent arteriolar vasodilation. Dual action causes severe drop in intraglomerular perfusion pressure.",
      clinicalEvidence: "eGFR collapsed from 54 to 42 mL/min/1.73m² (2026-10-21, Valley Health Lab). Creatinine spiked to 1.82 mg/dL.",
      actionRecommendation: "Immediately discontinue Meloxicam. Transition to non-nephrotoxic analgesic regimens (e.g., topical NSAIDs, acetaminophen, physical therapy). Recheck Basic Metabolic Panel within 7-10 days.",
      contraindicatedInConditions: ["Chronic Kidney Disease Stage 3a/3b", "Volume depletion", "Renal artery stenosis"],
    },
    {
      id: "alert-2",
      severity: "HIGH",
      title: "Mild Hyperkalemia Risk Escalation (K+ 5.2 mEq/L)",
      description: "Elevated serum potassium secondary to combined aldosterone suppression by ACE-inhibitor and decreased distal sodium delivery from NSAID-induced hypofiltration.",
      interactingEntities: ["Lisinopril 20mg", "Meloxicam 15mg", "Potassium 5.2 mEq/L"],
      mechanism: "Reduced GFR impairs potassium clearance, while ACE inhibition decreases aldosterone secretion.",
      clinicalEvidence: "Serum potassium measured at 5.2 mEq/L (Reference 3.5 - 5.0) on 2026-10-21.",
      actionRecommendation: "Advise dietary potassium vigilance; repeat electrolyte testing post-NSAID cessation.",
      contraindicatedInConditions: ["Acute Kidney Injury", "Severe CKD", "Adrenal insufficiency"],
    },
    {
      id: "alert-3",
      severity: "MODERATE",
      title: "Metformin Dosage Threshold Surveillance (eGFR 42 mL/min)",
      description: "Patient currently receives Metformin ER 1000mg BID. Clinical guidelines require dose reduction if eGFR falls below 45 mL/min/1.73m².",
      interactingEntities: ["Metformin ER 1000mg BID", "Current eGFR 42 mL/min/1.73m²"],
      mechanism: "Metformin is renally cleared; declining eGFR increases systemic accumulation risk and lactic acidosis liability.",
      clinicalEvidence: "Current eGFR 42 mL/min/1.73m² puts patient in Stage 3b CKD category.",
      actionRecommendation: "Monitor eGFR recovery after NSAID withdrawal. If eGFR remains between 30-44 mL/min, reduce Metformin to 1000mg/day maximum.",
      contraindicatedInConditions: ["eGFR < 30 mL/min/1.73m²", "Decompensated heart failure"],
    },
  ];
}

function generateDefaultTrends() {
  return [
    {
      metric: "eGFR (CKD-EPI)",
      baseline: "54 mL/min/1.73m² (Apr 2026)",
      current: "42 mL/min/1.73m² (Oct 2026)",
      trend: "deteriorating" as const,
      clinicalSignificance: "-22.2% acute shift within 11 days of NSAID initiation. Consistent with Acute-on-Chronic Kidney Injury.",
    },
    {
      metric: "Serum Creatinine",
      baseline: "1.28 mg/dL (Apr 2026)",
      current: "1.82 mg/dL (Oct 2026)",
      trend: "deteriorating" as const,
      clinicalSignificance: "+42.2% elevation from baseline; exceeds KDIGO criteria for acute kidney stress.",
    },
    {
      metric: "Serum Potassium",
      baseline: "4.4 mEq/L (Apr 2026)",
      current: "5.2 mEq/L (Oct 2026)",
      trend: "deteriorating" as const,
      clinicalSignificance: "Crossed upper reference threshold (5.0 mEq/L); monitor for cardiac conduction safety.",
    },
    {
      metric: "Hemoglobin A1c",
      baseline: "7.1% (Apr 2026)",
      current: "6.9% (Oct 2026)",
      trend: "improving" as const,
      clinicalSignificance: "Favorable glycemic response on combined Metformin + Empagliflozin therapy.",
    },
  ];
}

function generateDefaultActionPlan(): string[] {
  return [
    "Immediate cessation of Meloxicam 15mg prescribed by Urgent Care on 2026-10-10.",
    "Order follow-up Renal Function Panel (eGFR, Creatinine, Electrolytes) in 7 to 10 days to confirm reversible hemodynamics.",
    "Formulate joint-sparing osteoarthritis regimen: evaluate topical Diclofenac gel (minimal systemic absorption), physical therapy referral, and intra-articular hyaluronic or corticosteroid options.",
    "Re-evaluate Metformin dose titration if eGFR remains < 45 mL/min at repeat follow-up.",
    "Counsel patient on the acute nephrotoxic risks of over-the-counter NSAIDs (ibuprofen, naproxen) in the context of chronic kidney disease and ACE-inhibitor therapy.",
  ];
}

function generateDefaultQuestions(): string[] {
  return [
    "When did you take your last dose of Meloxicam 15mg, and has your knee swelling improved?",
    "Have you noticed any new swelling in your ankles or changes in how frequently you urinate?",
    "Are you currently taking any additional over-the-counter pain medications like Advil, Aleve, or Motrin?",
    "Would you be open to trying a topical pain relief gel or physical therapy exercises for your knee pain?",
  ];
}
