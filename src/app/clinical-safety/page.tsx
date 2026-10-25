import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Stethoscope,
  FileCheck2,
  Activity,
  CheckCircle2,
  ArrowRight,
  Clock,
  Lock,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Safety Policy | CareSync",
  description:
    "How CareSync ensures deterministic clinical translation, zero AI hallucination, and physician-supervised decision support for family caregivers.",
};

export default function ClinicalSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-16">
      {/* 1. THE 8-SECOND READ: HERO SECTION */}
      <section className="text-center sm:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] text-xs font-semibold text-[#0E6238] dark:text-[#199A59]">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Clinical governance &amp; patient safety protocol</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E6238] dark:bg-[#199A59]" />
          <span className="font-mono tabular-nums text-[11px]">v2026.4</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF] max-w-2xl leading-[1.12] text-pretty">
          Zero-hallucination health translation for families and clinical teams
        </h1>

        <p className="text-base sm:text-lg text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl leading-relaxed text-pretty">
          Built specifically for adult children managing aging parents with multimorbidity. We convert chaotic discharge notes and lab trajectories into verifiable English without guessing, inferring, or replacing physician judgment.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-sm"
          >
            <span>Return to patient timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#mechanism"
            className="px-4 py-2.5 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#181818] dark:hover:bg-[#272727] border border-[#CBD3C6] dark:border-[#272727] text-[#0A0F0D] dark:text-[#E5E7EB] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>Explore the 3 safety guardrails</span>
          </a>
        </div>
      </section>

      {/* 2. PROOF STRIP: COMPLIANCE & CLINICAL GOVERNANCE */}
      <section aria-label="Clinical safety standards" className="py-4 border-y border-[#E2E7DE] dark:border-[#272727]">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>HL7 FHIR R4 standard</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>HIPAA &amp; HITECH certified workflow</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>Deterministic source attribution</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>Physician-in-the-loop boundary</span>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM: UNVERIFIED CLINICAL CLAIMS ARE DANGEROUS */}
      <section className="medical-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#BE123C] dark:text-[#FB7185]">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>The clinical problem</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
          Generic AI in healthcare makes dangerous assumptions
        </h2>
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty">
          When an urgent care clinic prescribes an NSAID for knee pain without seeing baseline stage 3a kidney disease from another hospital, drug clashes happen. Consumer AI summaries often gloss over or hallucinate critical drug interactions. CareSync was built to prevent that exact failure.
        </p>
      </section>

      {/* 4. THE MECHANISM: 3 STRICT SAFETY PILLARS */}
      <section id="mechanism" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59]">
            The safety mechanism
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            Three non-negotiable clinical guardrails
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="medical-card p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                1. 100% source-grounded
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                Every insight links directly to an uploaded clinician progress note, discharge summary, or lab panel with exact page and date provenance.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-mono text-[#0E6238] dark:text-[#199A59]">
              Proof: Zero unverified claims
            </div>
          </div>

          <div className="medical-card p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                2. Trajectory before diagnosis
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                We track longitudinal shifts over time (e.g. eGFR falling from 54 to 42 mL/min over 90 days) rather than issuing prescriptive automated medical diagnoses.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-mono text-[#0E6238] dark:text-[#199A59]">
              Proof: Verifiable lab delta audits
            </div>
          </div>

          <div className="medical-card p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
                <Stethoscope className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                3. Physician-in-the-loop
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                Our output prepares families for doctor appointments with prioritized, respectful questions rather than encouraging independent medication discontinuation.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-mono text-[#0E6238] dark:text-[#199A59]">
              Proof: Formatted for 15-min visits
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PROOF: AUDITABLE SAFETY METRICS */}
      <section className="medical-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59]">
            Auditable benchmarks
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            Measured evidence across every analysis run
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727]">
            <div className="text-2xl sm:text-3xl font-bold text-[#0E6238] dark:text-[#199A59] font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#0A0F0D] dark:text-[#FFFFFF] mt-1">
              Source document attribution
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              Every flagged clash cites exact provider name and document timestamp.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727]">
            <div className="text-2xl sm:text-3xl font-bold text-[#0E6238] dark:text-[#199A59] font-mono tabular-nums">
              0
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#0A0F0D] dark:text-[#FFFFFF] mt-1">
              Automated prescription changes
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              All therapeutic adjustments must be verified and executed by licensed MD/DOs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727]">
            <div className="text-2xl sm:text-3xl font-bold text-[#0E6238] dark:text-[#199A59] font-mono tabular-nums">
              70B
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#0A0F0D] dark:text-[#FFFFFF] mt-1">
              Clinical reasoning parameter audit
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              Powered by verifiable Nemotron-70B transparent clinical reasoning traces.
            </p>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS: 3 VERIFICATION STEPS */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59]">
            Workflow verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            How clinical review operates in CareSync
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E2E7DE] dark:border-[#272727] flex items-start gap-4">
            <span className="w-7 h-7 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">
                Primary intake &amp; text extraction
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Medical reports, PDF visit notes, and lab tables are parsed strictly into structured clinical entities with no imaginative embellishment.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E2E7DE] dark:border-[#272727] flex items-start gap-4">
            <span className="w-7 h-7 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">
                Cross-doctor discrepancy matching
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Active medications are checked against chronic conditions and renal/metabolic thresholds across disparate health providers.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E2E7DE] dark:border-[#272727] flex items-start gap-4">
            <span className="w-7 h-7 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">
                Printable brief for primary care appointment
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                A clean, single-page doctor visit prep sheet is prepared so the physician can review the exact evidence in under 90 seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE CLOSE: RESIDUAL DOUBT REMOVAL & CTA */}
      <section className="medical-card p-8 sm:p-10 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            Evidence-first peace of mind for family caregivers
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            CareSync operates as a caregiver decision-support tool. It does not replace licensed medical professionals. In emergency scenarios, always dial 911 immediately.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-sm"
          >
            <span>Return to patient timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/privacy-terms"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#181818] dark:hover:bg-[#272727] border border-[#CBD3C6] dark:border-[#272727] text-[#0A0F0D] dark:text-[#E5E7EB] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>Read privacy and terms</span>
          </Link>
        </div>

        <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">
          Reviewed &amp; certified by CareSync Clinical Advisory Board • Last revised: October 2026
        </p>
      </section>
    </div>
  );
}
