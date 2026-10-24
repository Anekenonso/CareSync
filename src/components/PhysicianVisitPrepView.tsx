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
        <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-8 border border-dashed border-sky-300 dark:border-sky-800 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center shadow-sm">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div className="max-w-lg mx-auto space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              No Doctor Visit-Prep Package Generated Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              CareSync automatically synthesizes this 1-click visit brief once you upload records for your loved one.
              It distills complex medical chronologies into a 1-page handout for the doctor with high-priority discussion questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenIntake}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Upload Medical Record
            </button>
            <button
              onClick={onSwitchToDemo}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
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
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            Physician Visit-Prep Package &amp; Encounter Brief
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Synthesized for Eleanor&apos;s upcoming clinical consult with Dr. Marcus Chen.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied to Clipboard!" : "Copy Brief"}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print 1-Page Handout</span>
          </button>
        </div>
      </div>

      {/* Printable Clinical Brief Container (Clean, Hospital Paper Style) */}
      <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm relative transition-colors">
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-sky-700 dark:text-sky-400 block mb-1">
                EVIDENCE-BACKED CLINICAL VISIT BRIEF
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Eleanor Vance</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                MRN: {patientEleanorVance.mrn} • DOB: {patientEleanorVance.dob} (Age 68) • Sex: Female
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-600 dark:text-slate-400">
              <span className="block font-bold text-slate-900 dark:text-slate-200">PCP: Dr. Marcus Chen, MD (Internal Medicine)</span>
              <span className="block text-[11px] mt-0.5">Encounter Prep Date: {new Date().toLocaleDateString()}</span>
              <span className="inline-block mt-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                AUDIT VERIFIED: TRACE-NV-49201
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Acute Chief Concern */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            1. Acute Clinical Alert: eGFR Shift Following Urgent Care NSAID Initiation
          </h4>
          <div className="p-4 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            Patient experienced a <strong className="text-rose-700 dark:text-rose-400">22.2% drop in eGFR</strong> (from 54 to 42 mL/min/1.73m²) and a Creatinine spike from 1.28 to 1.82 mg/dL over a recent interval. Chronological synthesis links this acute deterioration to the initiation of <strong>Meloxicam 15mg daily on 2026-10-10</strong> at Valley Urgent Care for right knee osteoarthritis pain, superimposed upon her baseline CKD Stage 3a and chronic <strong>Lisinopril 20mg</strong> regimen.
          </div>
        </div>

        {/* Section 2: Longitudinal Lab Metric Comparison Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400 flex items-center gap-1.5 mb-2">
            <FileCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            2. Verified Longitudinal Metric Shifts (Baseline vs Recent)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 font-bold">Test Name</th>
                  <th className="p-3 font-semibold">Baseline (2026-07-15)</th>
                  <th className="p-3 font-semibold">Recent (2026-10-18)</th>
                  <th className="p-3 font-semibold">Variance</th>
                  <th className="p-3 font-semibold">Source Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950/40">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">eGFR (CKD-EPI)</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">54 mL/min</td>
                  <td className="p-3 font-extrabold text-rose-600 dark:text-rose-400">42 mL/min</td>
                  <td className="p-3 font-bold text-rose-700 dark:text-rose-400">-22.2% (Shift to Stage 3b)</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Serum Creatinine</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">1.28 mg/dL</td>
                  <td className="p-3 font-extrabold text-rose-600 dark:text-rose-400">1.82 mg/dL</td>
                  <td className="p-3 font-bold text-rose-700 dark:text-rose-400">+42.2% (Acute stress)</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Serum Potassium</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">4.4 mEq/L</td>
                  <td className="p-3 font-extrabold text-amber-600 dark:text-amber-400">5.2 mEq/L</td>
                  <td className="p-3 font-bold text-amber-700 dark:text-amber-400">+18.1% (Above range)</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Blood Urea Nitrogen (BUN)</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">22 mg/dL</td>
                  <td className="p-3 font-extrabold text-amber-600 dark:text-amber-400">36 mg/dL</td>
                  <td className="p-3 font-bold text-amber-700 dark:text-amber-400">+63.6% (Prerenal)</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Hemoglobin A1c</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">7.1%</td>
                  <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400">6.9%</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">-0.2% (Controlled)</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">Quest Diagnostics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommended Action Items for Clinician */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 flex items-center gap-1.5 mb-2">
            <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            3. Recommended Action Items for Physician Review
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Discontinue Meloxicam 15mg QD immediately</strong>: Reverse NSAID-mediated afferent arteriolar constriction and reduce hyperkalemia risk.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Alternative Osteoarthritis Therapy</strong>: Evaluate topical Diclofenac gel (minimal systemic absorption), acetaminophen, or physical therapy referral.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Repeat Renal Profile in 7-10 Days</strong>: Reassess eGFR, Creatinine, and Electrolytes post-NSAID cessation to verify reversible hemodynamics.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Metformin Dosing Surveillance</strong>: If eGFR remains between 30-44 mL/min at repeat follow-up, reduce Metformin ER ceiling to 1000mg total daily.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Caregiver Consultation Questions */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400 flex items-center gap-1.5 mb-2">
            <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            4. Specific Discussion Questions for Caregiver to Ask Dr. Chen
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              <strong className="text-sky-900 dark:text-sky-300 block mb-1 font-bold">Q1: About the knee pain medication:</strong>
              &quot;Could the Meloxicam prescribed at Urgent Care be what dropped Eleanor&apos;s kidney numbers from 54 to 42? Should we stop it now?&quot;
            </div>
            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              <strong className="text-sky-900 dark:text-sky-300 block mb-1 font-bold">Q2: Safer pain relief options:</strong>
              &quot;What alternative options like topical gels or joint injections can we use for her knee arthritis that won&apos;t hurt her kidneys?&quot;
            </div>
            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              <strong className="text-sky-900 dark:text-sky-300 block mb-1 font-bold">Q3: Follow-up lab testing:</strong>
              &quot;When can we repeat her blood test to make sure her kidney function bounces back to its normal baseline?&quot;
            </div>
            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              <strong className="text-sky-900 dark:text-sky-300 block mb-1 font-bold">Q4: Diabetes medication adjustment:</strong>
              &quot;Her eGFR is now 42. Does her Metformin 1000mg dose need to be adjusted down for kidney safety?&quot;
            </div>
          </div>
        </div>

        {/* Safety Disclaimer Footer in Brief */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300/80 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>IMPORTANT CLINICAL NOTICE:</strong> This brief is compiled by CareSync for caregiver consultation support. It is not an automated medical order or diagnosis. All decisions rest with the patient&apos;s licensed clinical team.
          </span>
        </div>
      </div>
    </div>
  );
}
