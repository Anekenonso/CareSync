"use client";

import React, { useState } from "react";
import {
  Printer,
  Copy,
  Check,
  FileCheck,
  AlertTriangle,
  Stethoscope,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  PlusCircle,
  FileText,
} from "lucide-react";
import { patientEleanorVance } from "@/data/mockClinicalData";

interface PhysicianVisitPrepViewProps {
  isCustomProfile?: boolean;
  onOpenIntake?: () => void;
  onSwitchToDemo?: () => void;
}

export function PhysicianVisitPrepView({
  isCustomProfile = false,
  onOpenIntake,
  onSwitchToDemo,
}: PhysicianVisitPrepViewProps) {
  const [copied, setCopied] = useState(false);

  if (isCustomProfile) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#0E1B15] rounded-2xl p-8 border border-dashed border-emerald-300 dark:border-emerald-800 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[#0D6832] dark:text-[#34D399] mx-auto flex items-center justify-center shadow-sm">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div className="max-w-lg mx-auto space-y-2">
            <h3 className="text-xl font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight">
              No Doctor Visit-Prep Package Generated Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#8FA698] leading-relaxed">
              CareSync automatically synthesizes this 1-click visit brief once you upload records for your loved one.
              It distills complex medical chronologies into a 1-page handout for the doctor with high-priority discussion questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenIntake}
              className="px-5 py-2.5 rounded-xl bg-[#0D6832] hover:bg-[#094D25] text-white font-semibold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Upload Medical Record
            </button>
            <button
              onClick={onSwitchToDemo}
              className="px-5 py-2.5 rounded-xl bg-[#F3F6F1] hover:bg-[#EAEFE7] dark:bg-[#13241C] text-[#0A0F0D] dark:text-[#F4FBF7] border border-[#CBD5C8] dark:border-[#274737] font-semibold text-xs flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
              View Eleanor Vance&apos;s Sample Doctor Brief
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const briefText = `CARESYNC PHYSICIAN ENCOUNTER BRIEF
Patient: Eleanor Vance | DOB: 1958-04-12 | MRN: MRN-49201 | Date: ${new Date().toLocaleDateString()}
Primary Care Physician: Dr. Marcus Chen, MD (Internal Medicine)

1. ACUTE CLINICAL CONCERN:
- eGFR declined 22.2% from 54 mL/min (2026-07-15) to 42 mL/min (2026-10-18).
- Serum Creatinine elevated from 1.28 mg/dL to 1.82 mg/dL.
- Serum Potassium elevated to 5.2 mEq/L.
- Event Trigger: Urgent Care initiation of Meloxicam 15mg daily on 2026-10-10 for knee flare, superimposed on chronic Lisinopril 20mg therapy in pre-existing CKD Stage 3a.

2. MEDICATION RECONCILIATION & SAFETY ALERTS:
- Lisinopril 20mg QD (Chronic)
- Meloxicam 15mg QD (Initiated 2026-10-10 by Urgent Care) -> ALERT: Severe hemodynamic nephrotoxicity & hyperkalemia risk with Lisinopril & CKD 3a.
- Metformin ER 1000mg BID -> CAUTION: Current eGFR 42 mL/min necessitates dosage ceiling review (< 45 mL/min threshold).
- Empagliflozin 10mg QD
- Atorvastatin 40mg Nightly

3. SUGGESTED DISCUSSION QUESTIONS FOR PHYSICIAN:
- Should Meloxicam be discontinued immediately and replaced with a topical analgesic (e.g. Voltaren gel) or intra-articular therapy?
- When should repeat renal function labs (BMP) be drawn to verify recovery of eGFR?
- Does Eleanor's Metformin dose need temporary downward titration while eGFR is under 45 mL/min?

DISCLAIMER: CareSync is a family health coordination tool, not a medical diagnosis. All insights must be confirmed by the attending clinician.`;

    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <div className="flex items-center gap-2 text-[#0D6832] dark:text-[#34D399]">
            <Stethoscope className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-widest uppercase font-mono">
              — CLINICAL VISIT-PREPARATION BRIEF
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight mt-1">
            Doctor Visit-Prep Package &amp; Encounter Brief
          </h3>
          <p className="text-xs text-[#71717A] dark:text-[#8FA698]">
            Synthesized for Eleanor&apos;s upcoming clinical consult with Dr. Marcus Chen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#F3F6F1] hover:bg-[#EAEFE7] dark:bg-[#13241C] dark:hover:bg-[#182C22] text-[#27272A] dark:text-[#D1E0D7] text-xs font-semibold border border-[#CBD5C8] dark:border-[#274737] flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied to Clipboard!" : "Copy Brief"}
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0D6832] hover:bg-[#094D25] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>Print 1-Page Handout</span>
          </button>
        </div>
      </div>

      {/* Printable Clinical Brief Container (Clean, Hospital Paper Style) */}
      <div className="bg-white dark:bg-[#0E1B15] rounded-2xl p-6 sm:p-8 border border-[#E3E8DE] dark:border-[#1C3328] shadow-sm relative">
        {/* Document Header */}
        <div className="border-b border-[#E3E8DE] dark:border-[#1C3328] pb-5 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0D6832] dark:text-[#34D399] block mb-1 font-mono">
                — EVIDENCE-BACKED CLINICAL VISIT BRIEF
              </span>
              <h2 className="text-2xl font-black text-[#0A0F0D] dark:text-[#F4FBF7]">Eleanor Vance</h2>
              <p className="text-xs text-[#71717A] dark:text-[#8FA698] mt-1 font-mono">
                MRN: {patientEleanorVance.mrn} • DOB: {patientEleanorVance.dob} (Age 68) • Sex: Female
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-[#71717A] dark:text-[#8FA698]">
              <span className="block font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">PCP: Dr. Marcus Chen, MD (Internal Medicine)</span>
              <span className="block text-[11px] mt-0.5">Encounter Prep Date: {new Date().toLocaleDateString()}</span>
              <span className="inline-block mt-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                AUDIT VERIFIED: TRACE-NV-49201
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Acute Chief Concern */}
        <div className="mb-6">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-2 font-mono">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            — 1. ACUTE CLINICAL ALERT: eGFR SHIFT FOLLOWING URGENT CARE NSAID INITIATION
          </h4>
          <div className="p-4 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm text-[#0A0F0D] dark:text-[#F4FBF7] leading-relaxed">
            Patient experienced a <strong className="text-rose-700 dark:text-rose-400">22.2% drop in eGFR</strong> (from 54 to 42 mL/min/1.73m²) and a Creatinine spike from 1.28 to 1.82 mg/dL over a recent interval. Chronological synthesis links this acute deterioration to the initiation of <strong>Meloxicam 15mg daily on 2026-10-10</strong> at Valley Urgent Care for right knee osteoarthritis pain, superimposed upon her baseline CKD Stage 3a and chronic <strong>Lisinopril 20mg</strong> regimen.
          </div>
        </div>

        {/* Section 2: Longitudinal Lab Metric Comparison Table */}
        <div className="mb-6">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0D6832] dark:text-[#34D399] flex items-center gap-1.5 mb-2 font-mono">
            <FileCheck className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            — 2. VERIFIED LONGITUDINAL METRIC SHIFTS (BASELINE VS RECENT)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-[#E3E8DE] dark:border-[#1C3328]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F3F6F1] dark:bg-[#13241C] text-[#27272A] dark:text-[#D1E0D7] border-b border-[#E3E8DE] dark:border-[#1C3328] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 font-bold">Test Name</th>
                  <th className="p-3 font-semibold">Baseline (2026-07-15)</th>
                  <th className="p-3 font-semibold">Recent (2026-10-18)</th>
                  <th className="p-3 font-semibold">Variance</th>
                  <th className="p-3 font-semibold">Source Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8DE] dark:divide-[#1C3328] bg-white dark:bg-[#0E1B15]">
                <tr className="hover:bg-[#F3F6F1]/50 dark:hover:bg-[#13241C]/40">
                  <td className="p-3 font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">eGFR (CKD-EPI)</td>
                  <td className="p-3 text-[#27272A] dark:text-[#D1E0D7]">54 mL/min</td>
                  <td className="p-3 font-extrabold text-rose-600 dark:text-rose-400">42 mL/min</td>
                  <td className="p-3 font-bold text-rose-700 dark:text-rose-400">-22.2% (Shift to Stage 3b)</td>
                  <td className="p-3 text-[#71717A] dark:text-[#8FA698] font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F3F6F1]/50 dark:hover:bg-[#13241C]/40">
                  <td className="p-3 font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">Serum Creatinine</td>
                  <td className="p-3 text-[#27272A] dark:text-[#D1E0D7]">1.28 mg/dL</td>
                  <td className="p-3 font-extrabold text-rose-600 dark:text-rose-400">1.82 mg/dL</td>
                  <td className="p-3 font-bold text-rose-700 dark:text-rose-400">+42.2% (Acute stress)</td>
                  <td className="p-3 text-[#71717A] dark:text-[#8FA698] font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F3F6F1]/50 dark:hover:bg-[#13241C]/40">
                  <td className="p-3 font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">Serum Potassium</td>
                  <td className="p-3 text-[#27272A] dark:text-[#D1E0D7]">4.4 mEq/L</td>
                  <td className="p-3 font-extrabold text-amber-600 dark:text-amber-400">5.2 mEq/L</td>
                  <td className="p-3 font-bold text-amber-700 dark:text-amber-400">+18.1% (Above range)</td>
                  <td className="p-3 text-[#71717A] dark:text-[#8FA698] font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F3F6F1]/50 dark:hover:bg-[#13241C]/40">
                  <td className="p-3 font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">Blood Urea Nitrogen (BUN)</td>
                  <td className="p-3 text-[#27272A] dark:text-[#D1E0D7]">22 mg/dL</td>
                  <td className="p-3 font-extrabold text-amber-600 dark:text-amber-400">36 mg/dL</td>
                  <td className="p-3 font-bold text-amber-700 dark:text-amber-400">+63.6% (Prerenal)</td>
                  <td className="p-3 text-[#71717A] dark:text-[#8FA698] font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F3F6F1]/50 dark:hover:bg-[#13241C]/40">
                  <td className="p-3 font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">Hemoglobin A1c</td>
                  <td className="p-3 text-[#27272A] dark:text-[#D1E0D7]">7.1%</td>
                  <td className="p-3 font-extrabold text-[#0D6832] dark:text-[#34D399]">6.9%</td>
                  <td className="p-3 font-bold text-[#0D6832] dark:text-[#34D399]">-0.2% (Controlled)</td>
                  <td className="p-3 text-[#71717A] dark:text-[#8FA698] font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommended Action Items for Clinician */}
        <div className="mb-6">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0D6832] dark:text-[#34D399] flex items-center gap-1.5 mb-2 font-mono">
            <Stethoscope className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            — 3. RECOMMENDED ACTION ITEMS FOR PHYSICIAN REVIEW
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#0A0F0D] dark:text-[#F4FBF7]">
            <li className="flex items-start gap-2 bg-[#F3F6F1] dark:bg-[#13241C] p-3 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328]">
              <span className="text-[#0D6832] dark:text-[#34D399] font-bold">•</span>
              <span><strong>Discontinue Meloxicam 15mg QD immediately</strong>: Reverse NSAID-mediated afferent arteriolar constriction and reduce hyperkalemia risk.</span>
            </li>
            <li className="flex items-start gap-2 bg-[#F3F6F1] dark:bg-[#13241C] p-3 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328]">
              <span className="text-[#0D6832] dark:text-[#34D399] font-bold">•</span>
              <span><strong>Alternative Osteoarthritis Therapy</strong>: Evaluate topical Diclofenac gel (minimal systemic absorption), acetaminophen, or physical therapy referral.</span>
            </li>
            <li className="flex items-start gap-2 bg-[#F3F6F1] dark:bg-[#13241C] p-3 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328]">
              <span className="text-[#0D6832] dark:text-[#34D399] font-bold">•</span>
              <span><strong>Repeat Renal Profile in 7-10 Days</strong>: Reassess eGFR, Creatinine, and Electrolytes post-NSAID cessation to verify reversible hemodynamics.</span>
            </li>
            <li className="flex items-start gap-2 bg-[#F3F6F1] dark:bg-[#13241C] p-3 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328]">
              <span className="text-[#0D6832] dark:text-[#34D399] font-bold">•</span>
              <span><strong>Metformin Dosing Surveillance</strong>: If eGFR remains between 30-44 mL/min at repeat follow-up, reduce Metformin ER ceiling to 1000mg total daily.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Caregiver Consultation Questions */}
        <div className="mb-6">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0D6832] dark:text-[#34D399] flex items-center gap-1.5 mb-2 font-mono">
            <HelpCircle className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            — 4. SPECIFIC DISCUSSION QUESTIONS FOR CAREGIVER TO ASK DR. CHEN
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm items-stretch">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-[#13241C]/60 border border-emerald-100 dark:border-[#1C3328] text-[#0A0F0D] dark:text-[#F4FBF7] flex flex-col justify-between hover:shadow-xs transition-all">
              <div>
                <strong className="text-[#0D6832] dark:text-[#34D399] block mb-1.5 font-bold font-mono text-xs uppercase tracking-wide">
                  Question 1: About the knee pain medication
                </strong>
                <p className="leading-relaxed">
                  &quot;Could the Meloxicam prescribed at Urgent Care be what dropped Eleanor&apos;s kidney filtration from 54 down to 42? Should we stop taking it immediately?&quot;
                </p>
              </div>
              <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] mt-3 block pt-2 border-t border-emerald-100 dark:border-[#1C3328]/60 font-medium">
                Goal: Prevent further acute kidney strain and reverse filtration loss.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-[#13241C]/60 border border-emerald-100 dark:border-[#1C3328] text-[#0A0F0D] dark:text-[#F4FBF7] flex flex-col justify-between hover:shadow-xs transition-all">
              <div>
                <strong className="text-[#0D6832] dark:text-[#34D399] block mb-1.5 font-bold font-mono text-xs uppercase tracking-wide">
                  Question 2: Kidney-safe pain relief options
                </strong>
                <p className="leading-relaxed">
                  &quot;What alternative options like topical gels (Voltaren) or joint injections can we use for her knee arthritis that won&apos;t hurt her kidneys?&quot;
                </p>
              </div>
              <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] mt-3 block pt-2 border-t border-emerald-100 dark:border-[#1C3328]/60 font-medium">
                Goal: Treat arthritis pain without systemic kidney absorption.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-[#13241C]/60 border border-emerald-100 dark:border-[#1C3328] text-[#0A0F0D] dark:text-[#F4FBF7] flex flex-col justify-between hover:shadow-xs transition-all">
              <div>
                <strong className="text-[#0D6832] dark:text-[#34D399] block mb-1.5 font-bold font-mono text-xs uppercase tracking-wide">
                  Question 3: Follow-up lab re-check
                </strong>
                <p className="leading-relaxed">
                  &quot;When can we repeat her blood test (BMP) to verify that her kidney numbers are bouncing back to her baseline of 54?&quot;
                </p>
              </div>
              <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] mt-3 block pt-2 border-t border-emerald-100 dark:border-[#1C3328]/60 font-medium">
                Goal: Establish clinical recovery timeline (usually 7-10 days).
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-[#13241C]/60 border border-emerald-100 dark:border-[#1C3328] text-[#0A0F0D] dark:text-[#F4FBF7] flex flex-col justify-between hover:shadow-xs transition-all">
              <div>
                <strong className="text-[#0D6832] dark:text-[#34D399] block mb-1.5 font-bold font-mono text-xs uppercase tracking-wide">
                  Question 4: Diabetes medication review
                </strong>
                <p className="leading-relaxed">
                  &quot;With her eGFR at 42, does Eleanor&apos;s Metformin dose need a temporary reduction until her kidneys recover?&quot;
                </p>
              </div>
              <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] mt-3 block pt-2 border-t border-emerald-100 dark:border-[#1C3328]/60 font-medium">
                Goal: Ensure Metformin remains within safe guidelines when filtration is &lt; 45.
              </span>
            </div>
          </div>
        </div>

        {/* Safety Disclaimer Footer in Brief */}
        <div className="mt-8 pt-4 border-t border-[#E3E8DE] dark:border-[#1C3328] flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300/80 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>IMPORTANT CLINICAL NOTICE:</strong> This brief is compiled by CareSync for caregiver consultation support. It is not an automated medical order or diagnosis. All decisions rest with the patient&apos;s licensed clinical team.
          </span>
        </div>
      </div>
    </div>
  );
}
