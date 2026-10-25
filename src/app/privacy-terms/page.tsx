import React from "react";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Clock,
  Activity,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Terms of Use | CareSync",
  description:
    "Patient health data sovereignty: CareSync never trains public AI models on patient records, never sells health data, and provides one-click export and deletion.",
};

export default function PrivacyTermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-16">
      {/* 1. THE 8-SECOND READ: HERO SECTION */}
      <section className="text-center sm:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] text-xs font-semibold text-[#0E6238] dark:text-[#199A59]">
          <Lock className="w-4 h-4 shrink-0" />
          <span>Patient data sovereignty &amp; service agreement</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E6238] dark:bg-[#199A59]" />
          <span className="font-mono tabular-nums text-[11px]">v2026.4</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF] max-w-2xl leading-[1.12] text-pretty">
          Your family&apos;s medical records belong solely to you
        </h1>

        <p className="text-base sm:text-lg text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl leading-relaxed text-pretty">
          CareSync is built for caregivers who demand strict privacy. We never monetize sensitive lab results, never sell patient data to insurance brokers, and never train public AI models on your loved one&apos;s health records.
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
            href="#privacy-pillars"
            className="px-4 py-2.5 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#181818] dark:hover:bg-[#272727] border border-[#CBD3C6] dark:border-[#272727] text-[#0A0F0D] dark:text-[#E5E7EB] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>View privacy guarantees</span>
          </a>
        </div>
      </section>

      {/* 2. PROOF STRIP: SECURITY & PRIVACY CERTIFICATIONS */}
      <section aria-label="Privacy & Security Certifications" className="py-4 border-y border-[#E2E7DE] dark:border-[#272727]">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>Zero public model training</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>256-bit AES encryption at rest</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>HIPAA-aligned access control</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
            <span>Instant one-click data purge</span>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM: UNETHICAL HEALTH DATA EXPLOITATION */}
      <section className="medical-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D97706] dark:text-[#FBBF24]">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>The data rights problem</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
          Healthcare software frequently sells patient data quietly
        </h2>
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty">
          Many consumer health apps claim free utility while quietly packaging de-identified patient records for pharmaceutical marketing, insurance pricing algorithms, and third-party advertising brokers. CareSync operates under a strict covenant: your medical data serves one person only — the patient.
        </p>
      </section>

      {/* 4. THE MECHANISM: 3 STRICT PRIVACY GUARANTEES */}
      <section id="privacy-pillars" className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59]">
            Core covenant
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            Three immutable privacy commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="medical-card p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                1. No AI training on your records
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                Your clinical records, medication lists, and physician notes are processed strictly in private memory contexts and never used to fine-tune AI foundation models.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-mono text-[#0E6238] dark:text-[#199A59]">
              Guarantee: Zero residual retention
            </div>
          </div>

          <div className="medical-card p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                2. Zero third-party monetization
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                CareSync does not sell, license, rent, or share patient data with health insurers, pharmaceutical marketers, or data broker syndicates. Period.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-mono text-[#0E6238] dark:text-[#199A59]">
              Guarantee: No marketing syndicates
            </div>
          </div>

          <div className="medical-card p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                3. Permanent export or deletion
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                You own 100% of your data. You can download Eleanor&apos;s complete longitudinal timeline as a portable JSON or PDF brief and purge all records instantly.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-mono text-[#0E6238] dark:text-[#199A59]">
              Guarantee: 1-click cryptographic wipe
            </div>
          </div>
        </div>
      </section>

      {/* 5. TERMS OF SERVICE & CAREGIVER RESPONSIBILITIES */}
      <section className="medical-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59]">
            Terms of use
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            Permitted usage and operational terms
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
          <p>
            <strong className="text-[#0A0F0D] dark:text-[#FFFFFF]">1. Caregiver Relationship:</strong> You affirm that you are the patient, legal guardian, or an authorized family caregiver possessing legitimate consent to review and organize these clinical records.
          </p>
          <p>
            <strong className="text-[#0A0F0D] dark:text-[#FFFFFF]">2. Decision Support Only:</strong> CareSync synthesizes and translates existing documents generated by licensed physicians. It does not provide medical diagnoses, treatment planning, or emergency clinical triage.
          </p>
          <p>
            <strong className="text-[#0A0F0D] dark:text-[#FFFFFF]">3. Account Security:</strong> You are responsible for safeguarding your session authentication. In shared household settings, always log out to prevent unauthorized family viewing of private health records.
          </p>
          <p>
            <strong className="text-[#0A0F0D] dark:text-[#FFFFFF]">4. Accuracy of Uploaded Artifacts:</strong> CareSync analysis is directly grounded in uploaded documents. We cannot verify errors or omissions originally committed by external lab clinics or physician EHRs.
          </p>
        </div>
      </section>

      {/* 6. HOW IT WORKS: DATA ENCLAVE LIFECYCLE */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59]">
            Data architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            How your information travels
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E2E7DE] dark:border-[#272727] flex items-start gap-4">
            <span className="w-7 h-7 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">
                Encrypted upload
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Records are transferred using TLS 1.3 encryption and stored in an isolated tenant enclave with per-patient key segmentation.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E2E7DE] dark:border-[#272727] flex items-start gap-4">
            <span className="w-7 h-7 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">
                Stateless reasoning session
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                The clinical reasoning engine extracts medication interactions and lab deltas in an isolated container that terminates upon query completion.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] border border-[#E2E7DE] dark:border-[#272727] flex items-start gap-4">
            <span className="w-7 h-7 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] font-mono font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">
                Sovereign patient ownership
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Your family retains sole control. Delete records at any point, and all physical and database fragments are permanently purged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE CLOSE: CONFIRMATION & CTAS */}
      <section className="medical-card p-8 sm:p-10 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF]">
            Your trust is our clinical foundation
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            Have questions about health data compliance or need a Business Associate Agreement (BAA) for clinical institutional use? Our compliance team responds within 24 business hours.
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
            href="/clinical-safety"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#181818] dark:hover:bg-[#272727] border border-[#CBD3C6] dark:border-[#272727] text-[#0A0F0D] dark:text-[#E5E7EB] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>Read clinical safety policy</span>
          </Link>
        </div>

        <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] font-mono">
          CareSync Data Protection &amp; Privacy Office • Last revised: October 2026
        </p>
      </section>
    </div>
  );
}
