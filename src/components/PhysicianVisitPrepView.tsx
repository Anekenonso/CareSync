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
  ArrowRight,
} from "lucide-react";
import { patientEleanorVance, eleanorLabHistory } from "@/data/mockClinicalData";

export function PhysicianVisitPrepView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const briefText = `CARESYNC PHYSICIAN ENCOUNTER BRIEF
Patient: Eleanor Vance | DOB: 1958-04-12 | MRN: MRN-49201 | Date: ${new Date().toLocaleDateString()}
Primary Care Physician: Dr. Marcus Chen, MD

1. ACUTE CLINICAL CONCERN:
- eGFR declined 22.2% from 54 mL/min (2026-04-15) to 42 mL/min (2026-10-21).
- Serum Creatinine elevated from 1.28 mg/dL to 1.82 mg/dL.
- Serum Potassium elevated to 5.2 mEq/L.
- Event Trigger: Urgent Care initiation of Meloxicam 15mg daily on 2026-10-10 for knee osteoarthritis flare, superimposed on chronic Lisinopril 20mg therapy in pre-existing CKD Stage 3a.

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
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            Physician Visit-Prep Brief & Consultation Package
          </h3>
          <p className="text-xs text-slate-400">
            Formulated for Eleanor&apos;s upcoming appointment with Dr. Marcus Chen.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied to Clipboard!" : "Copy Summary"}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Export PDF
          </button>
        </div>
      </div>

      {/* Printable Clinical Brief Container */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-5 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 block mb-1">
                EVIDENCE-BACKED CLINICAL VISIT BRIEF
              </span>
              <h2 className="text-2xl font-black text-white">Eleanor Vance</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                MRN: {patientEleanorVance.mrn} • DOB: {patientEleanorVance.dob} (Age 68) • Sex: Female
              </p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <span className="block font-semibold text-slate-300">PCP: Dr. Marcus Chen, MD</span>
              <span className="block text-[11px] mt-0.5">Encounter Prep Date: {new Date().toLocaleDateString()}</span>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                AUDIT VERIFIED: TRACE-NV-49201
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Acute Chief Concern */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            1. Acute Clinical Alert: eGFR Shift Following Urgent Care NSAID Initiation
          </h4>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 text-xs text-slate-200 leading-relaxed">
            Patient experienced a <strong>22.2% drop in eGFR</strong> (from 54 to 42 mL/min/1.73m²) and a Creatinine spike from 1.28 to 1.82 mg/dL over a 6-month interval. Chronological synthesis links this acute deterioration to the initiation of <strong>Meloxicam 15mg daily on 2026-10-10</strong> at Valley Urgent Care for right knee osteoarthritis pain, superimposed upon her baseline CKD Stage 3a and chronic <strong>Lisinopril 20mg</strong> regimen.
          </div>
        </div>

        {/* Section 2: Longitudinal Lab Metric Comparison Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            2. Verified Longitudinal Metric Shifts (Baseline vs Recent)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 font-semibold">Test Name</th>
                  <th className="p-3 font-semibold">Baseline (2026-04-15)</th>
                  <th className="p-3 font-semibold">Recent (2026-10-21)</th>
                  <th className="p-3 font-semibold">Variance</th>
                  <th className="p-3 font-semibold">Source Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                <tr>
                  <td className="p-3 font-medium text-white">eGFR (CKD-EPI)</td>
                  <td className="p-3 text-slate-300">54 mL/min</td>
                  <td className="p-3 font-bold text-rose-400">42 mL/min</td>
                  <td className="p-3 font-semibold text-rose-400">-22.2% (Shift to 3b)</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">Valley Health Diagnostics</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Serum Creatinine</td>
                  <td className="p-3 text-slate-300">1.28 mg/dL</td>
                  <td className="p-3 font-bold text-rose-400">1.82 mg/dL</td>
                  <td className="p-3 font-semibold text-rose-400">+42.2% (Acute stress)</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">Valley Health Diagnostics</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Serum Potassium</td>
                  <td className="p-3 text-slate-300">4.4 mEq/L</td>
                  <td className="p-3 font-bold text-amber-400">5.2 mEq/L</td>
                  <td className="p-3 font-semibold text-amber-400">+18.1% (Above range)</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">Valley Health Diagnostics</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Blood Urea Nitrogen (BUN)</td>
                  <td className="p-3 text-slate-300">22 mg/dL</td>
                  <td className="p-3 font-bold text-amber-400">36 mg/dL</td>
                  <td className="p-3 font-semibold text-amber-400">+63.6% (Prerenal)</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">Valley Health Diagnostics</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Hemoglobin A1c</td>
                  <td className="p-3 text-slate-300">7.1%</td>
                  <td className="p-3 font-bold text-emerald-400">6.9%</td>
                  <td className="p-3 font-semibold text-emerald-400">-0.2% (Improved)</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">Valley Health Diagnostics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommended Action Plan for Clinician */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
            <Stethoscope className="w-4 h-4 text-teal-400" />
            3. Recommended Action Items for Physician Review
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Discontinue Meloxicam 15mg QD immediately</strong>: Reverse NSAID-mediated afferent arteriolar constriction and reduce hyperkalemia risk.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Alternative Osteoarthritis Therapy</strong>: Evaluate topical Diclofenac gel (minimal systemic absorption), acetaminophen, or physical therapy referral.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Repeat Renal Profile in 7-10 Days</strong>: Reassess eGFR, Creatinine, and Electrolytes post-NSAID cessation to verify reversible hemodynamics.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Metformin Dosing Surveillance</strong>: If eGFR remains between 30-44 mL/min at repeat follow-up, reduce Metformin ER ceiling to 1000mg total daily.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Caregiver Consultation Questions */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            4. Questions Prepared for Caregiver to Ask the Doctor
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
              <strong className="text-cyan-300 block mb-1">Q1: About the knee pain medication:</strong>
              &quot;Could the Meloxicam prescribed at Urgent Care be what dropped Eleanor&apos;s kidney numbers from 54 to 42? Should we stop it now?&quot;
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
              <strong className="text-cyan-300 block mb-1">Q2: Safer pain relief:</strong>
              &quot;What alternative options like topical gels or joint injections can we use for her knee arthritis that won&apos;t hurt her kidneys?&quot;
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
              <strong className="text-cyan-300 block mb-1">Q3: Follow-up lab testing:</strong>
              &quot;When can we repeat her blood test to make sure her kidney function bounces back to its normal baseline?&quot;
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
              <strong className="text-cyan-300 block mb-1">Q4: Diabetes medication adjustment:</strong>
              &quot;Her eGFR is now 42. Does her Metformin 1000mg dose need to be adjusted down for kidney safety?&quot;
            </div>
          </div>
        </div>

        {/* Safety Disclaimer Footer in Brief */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] text-amber-300/80">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>IMPORTANT:</strong> This brief is compiled by CareSync for caregiver consultation support. It is not an automated medical order or diagnosis. All decisions rest with the patient&apos;s licensed clinical team.
          </span>
        </div>
      </div>
    </div>
  );
}
