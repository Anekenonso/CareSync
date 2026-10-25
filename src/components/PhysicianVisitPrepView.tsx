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
        <div className="medical-card p-8 border-dashed text-center space-y-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] text-[#0E6238] dark:text-[#199A59] mx-auto flex items-center justify-center shadow-xs">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div className="max-w-lg mx-auto space-y-2">
            <h3 className="text-xl font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight text-balance">
              No doctor visit prep package generated yet
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty">
              CareSync automatically synthesizes this one-click visit brief once you upload records for your loved one.
              It distills complex medical chronologies into a single-page handout with high-priority discussion questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenIntake}
              className="px-4 py-2.5 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-ring cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload medical record</span>
            </button>
            <button
              type="button"
              onClick={onSwitchToDemo}
              className="px-4 py-2.5 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#1F1F1F] dark:hover:bg-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] border border-[#CBD3C6] dark:border-[#313131] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-ring cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#0E6238] dark:text-[#199A59]" />
              <span>View sample case brief (Eleanor Vance)</span>
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
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <div className="flex items-center gap-2 text-[#0E6238] dark:text-[#199A59]">
            <Stethoscope className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase font-mono">
              Clinical visit preparation brief
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight mt-1">
            Doctor visit prep package and encounter brief
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            Synthesized for Eleanor&apos;s upcoming clinical consult with Dr. Marcus Chen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#1F1F1F] dark:hover:bg-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] text-xs font-semibold border border-[#CBD3C6] dark:border-[#313131] flex items-center justify-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-ring cursor-pointer min-h-[40px]"
          >
            {copied ? <Check className="w-4 h-4 text-[#0E6238] dark:text-[#199A59]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied to clipboard" : "Copy brief"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-ring cursor-pointer min-h-[40px]"
          >
            <Printer className="w-4 h-4" />
            <span>Print single-page handout</span>
          </button>
        </div>
      </div>

      {/* Printable Clinical Brief Container (Clean Clinical Paper Style) */}
      <article aria-label="Physician encounter handout" className="medical-card p-6 sm:p-8 space-y-6">
        {/* Document Header */}
        <div className="border-b border-[#E2E7DE] dark:border-[#272727] pb-5">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-[#0E6238] dark:text-[#199A59] block mb-1 font-mono">
                Evidence-backed clinical visit brief
              </span>
              <h2 className="text-2xl font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">Eleanor Vance</h2>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 font-mono tabular-nums">
                MRN: {patientEleanorVance.mrn} • DOB: {patientEleanorVance.dob} (Age 68) • Sex: Female
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              <span className="block font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">PCP: Dr. Marcus Chen, MD (Internal Medicine)</span>
              <span className="block text-xs mt-0.5 tabular-nums">Encounter prep date: {new Date().toLocaleDateString()}</span>
              <span className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-mono">
                Audit verified: TRACE-NV-49201
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Acute Chief Concern */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BE123C] dark:text-[#FB7185] flex items-center gap-1.5 font-mono">
            <AlertTriangle className="w-4 h-4" />
            1. Acute clinical alert: eGFR shift following urgent care NSAID initiation
          </h4>
          <div className="p-4 rounded-xl bg-[#FFF1F2] dark:bg-[#1F1F1F] border border-[#FECDD3] dark:border-[#313131] text-xs sm:text-sm text-[#0A0F0D] dark:text-[#FFFFFF] leading-relaxed text-pretty">
            Patient experienced a <strong className="text-[#BE123C] dark:text-[#FB7185] tabular-nums">22.2% drop in eGFR</strong> (from 54 to 42 mL/min/1.73m²) and a Creatinine spike from 1.28 to 1.82 mg/dL. Chronological synthesis links this acute deterioration to the initiation of <strong>Meloxicam 15mg daily on 2026-10-10</strong> at QuickCare Urgent Clinic for right knee osteoarthritis pain, superimposed upon her baseline CKD stage 3a and chronic <strong>Lisinopril 20mg</strong> regimen.
          </div>
        </div>

        {/* Section 2: Longitudinal Lab Metric Comparison Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0E6238] dark:text-[#199A59] flex items-center gap-1.5 font-mono">
            <FileCheck className="w-4 h-4" />
            2. Verified longitudinal metric shifts (baseline vs recent)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F6F2] dark:bg-[#1F1F1F] text-[#27272A] dark:text-[#E5E7EB] border-b border-[#E2E7DE] dark:border-[#272727] uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-3 font-semibold">Test name</th>
                  <th className="p-3 font-semibold">Baseline (2026-07-15)</th>
                  <th className="p-3 font-semibold">Recent (2026-10-18)</th>
                  <th className="p-3 font-semibold">Variance</th>
                  <th className="p-3 font-semibold">Source facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7DE] dark:divide-[#272727] bg-white dark:bg-[#181818] tabular-nums">
                <tr className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40">
                  <td className="p-3 font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">eGFR (CKD-EPI)</td>
                  <td className="p-3 text-[#27272A] dark:text-[#E5E7EB]">54 mL/min</td>
                  <td className="p-3 font-bold text-[#BE123C] dark:text-[#FB7185]">42 mL/min</td>
                  <td className="p-3 font-semibold text-[#BE123C] dark:text-[#FB7185]">-22.2% (Shift to stage 3b)</td>
                  <td className="p-3 text-[#6B7280] dark:text-[#9CA3AF] font-mono">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40">
                  <td className="p-3 font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">Serum creatinine</td>
                  <td className="p-3 text-[#27272A] dark:text-[#E5E7EB]">1.28 mg/dL</td>
                  <td className="p-3 font-bold text-[#BE123C] dark:text-[#FB7185]">1.82 mg/dL</td>
                  <td className="p-3 font-semibold text-[#BE123C] dark:text-[#FB7185]">+42.2% (Acute stress)</td>
                  <td className="p-3 text-[#6B7280] dark:text-[#9CA3AF] font-mono">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40">
                  <td className="p-3 font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">Serum potassium</td>
                  <td className="p-3 text-[#27272A] dark:text-[#E5E7EB]">4.4 mEq/L</td>
                  <td className="p-3 font-bold text-[#D97706] dark:text-[#FBBF24]">5.2 mEq/L</td>
                  <td className="p-3 font-semibold text-[#D97706] dark:text-[#FBBF24]">+18.1% (Above range)</td>
                  <td className="p-3 text-[#6B7280] dark:text-[#9CA3AF] font-mono">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40">
                  <td className="p-3 font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">Blood urea nitrogen (BUN)</td>
                  <td className="p-3 text-[#27272A] dark:text-[#E5E7EB]">22 mg/dL</td>
                  <td className="p-3 font-bold text-[#D97706] dark:text-[#FBBF24]">36 mg/dL</td>
                  <td className="p-3 font-semibold text-[#D97706] dark:text-[#FBBF24]">+63.6% (Prerenal)</td>
                  <td className="p-3 text-[#6B7280] dark:text-[#9CA3AF] font-mono">Quest Diagnostics</td>
                </tr>
                <tr className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40">
                  <td className="p-3 font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">Hemoglobin A1c</td>
                  <td className="p-3 text-[#27272A] dark:text-[#E5E7EB]">7.1%</td>
                  <td className="p-3 font-bold text-[#0E6238] dark:text-[#199A59]">6.9%</td>
                  <td className="p-3 font-semibold text-[#0E6238] dark:text-[#199A59]">-0.2% (Controlled)</td>
                  <td className="p-3 text-[#6B7280] dark:text-[#9CA3AF] font-mono">Quest Diagnostics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommended Action Items for Physician */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0E6238] dark:text-[#199A59] flex items-center gap-1.5 font-mono">
            <Stethoscope className="w-4 h-4" />
            3. Recommended action items for physician review
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#0A0F0D] dark:text-[#FFFFFF]">
            <li className="flex items-start gap-2.5 bg-[#F4F6F2] dark:bg-[#1F1F1F] p-3 rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
              <span className="text-[#0E6238] dark:text-[#199A59] font-bold">•</span>
              <span><strong>Discontinue Meloxicam 15mg QD immediately:</strong> Reverse NSAID-mediated afferent arteriolar constriction and reduce hyperkalemia risk.</span>
            </li>
            <li className="flex items-start gap-2.5 bg-[#F4F6F2] dark:bg-[#1F1F1F] p-3 rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
              <span className="text-[#0E6238] dark:text-[#199A59] font-bold">•</span>
              <span><strong>Alternative osteoarthritis therapy:</strong> Evaluate topical Diclofenac gel (minimal systemic absorption), acetaminophen, or physical therapy referral.</span>
            </li>
            <li className="flex items-start gap-2.5 bg-[#F4F6F2] dark:bg-[#1F1F1F] p-3 rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
              <span className="text-[#0E6238] dark:text-[#199A59] font-bold">•</span>
              <span><strong>Repeat renal profile in 7-10 days:</strong> Reassess eGFR, Creatinine, and Electrolytes post-NSAID cessation to verify reversible hemodynamics.</span>
            </li>
            <li className="flex items-start gap-2.5 bg-[#F4F6F2] dark:bg-[#1F1F1F] p-3 rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
              <span className="text-[#0E6238] dark:text-[#199A59] font-bold">•</span>
              <span><strong>Metformin dosing surveillance:</strong> If eGFR remains between 30-44 mL/min at repeat follow-up, reduce Metformin ER ceiling to 1000mg total daily.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Caregiver Discussion Questions */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0E6238] dark:text-[#199A59] flex items-center gap-1.5 font-mono">
            <HelpCircle className="w-4 h-4" />
            4. Specific discussion questions for caregiver to ask Dr. Chen
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm items-stretch">
            <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] flex flex-col justify-between">
              <div>
                <strong className="text-[#0E6238] dark:text-[#199A59] block mb-1.5 font-semibold font-mono text-xs uppercase tracking-wide">
                  Question 1: Knee pain medication
                </strong>
                <p className="leading-relaxed">
                  &quot;Could the Meloxicam prescribed at urgent care be what dropped Eleanor&apos;s kidney filtration from 54 down to 42? Should we discontinue it immediately?&quot;
                </p>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3 block pt-2 border-t border-[#E2E7DE] dark:border-[#272727]">
                Goal: Prevent further acute kidney strain and reverse filtration loss.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] flex flex-col justify-between">
              <div>
                <strong className="text-[#0E6238] dark:text-[#199A59] block mb-1.5 font-semibold font-mono text-xs uppercase tracking-wide">
                  Question 2: Kidney-safe pain relief options
                </strong>
                <p className="leading-relaxed">
                  &quot;What alternative options like topical Voltaren gel or joint injections can we use for her knee arthritis that will not stress her kidneys?&quot;
                </p>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3 block pt-2 border-t border-[#E2E7DE] dark:border-[#272727]">
                Goal: Treat arthritis pain without systemic kidney absorption.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] flex flex-col justify-between">
              <div>
                <strong className="text-[#0E6238] dark:text-[#199A59] block mb-1.5 font-semibold font-mono text-xs uppercase tracking-wide">
                  Question 3: Follow-up lab re-check
                </strong>
                <p className="leading-relaxed">
                  &quot;When can we repeat her blood work (BMP) to verify that her kidney numbers are returning to her baseline of 54?&quot;
                </p>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3 block pt-2 border-t border-[#E2E7DE] dark:border-[#272727]">
                Goal: Establish clinical recovery timeline (usually 7-10 days).
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] flex flex-col justify-between">
              <div>
                <strong className="text-[#0E6238] dark:text-[#199A59] block mb-1.5 font-semibold font-mono text-xs uppercase tracking-wide">
                  Question 4: Diabetes medication review
                </strong>
                <p className="leading-relaxed">
                  &quot;With her eGFR at 42, does Eleanor&apos;s Metformin dose need a temporary reduction until her filtration rate recovers?&quot;
                </p>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-3 block pt-2 border-t border-[#E2E7DE] dark:border-[#272727]">
                Goal: Ensure Metformin remains within safe guidelines when filtration is &lt; 45.
              </span>
            </div>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div id="clinical-disclaimer" className="pt-4 border-t border-[#E2E7DE] dark:border-[#272727] flex items-start gap-2.5 text-xs text-[#D97706] dark:text-[#FBBF24] bg-[#FEF3C7] dark:bg-[#1F1F1F] p-3 rounded-xl border border-[#FDE68A] dark:border-[#313131]">
          <ShieldAlert className="w-4 h-4 text-[#D97706] dark:text-[#FBBF24] shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>Clinical disclaimer:</strong> This brief is compiled by CareSync for caregiver consultation support. It is not an automated medical order or prescription. All clinical decisions remain with the patient&apos;s licensed attending physician.
          </span>
        </div>
      </article>
    </div>
  );
}
