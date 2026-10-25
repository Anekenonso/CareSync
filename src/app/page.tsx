"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  PlusCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { PatientCard } from "@/components/PatientCard";
import { OverviewTimeline } from "@/components/OverviewTimeline";
import { PhysicianVisitPrepView } from "@/components/PhysicianVisitPrepView";
import { DocumentIntakeModal } from "@/components/DocumentIntakeModal";
import { useCaregiver } from "@/context/CaregiverContext";

export default function CareSyncApp() {
  const { currentPatient, loadDemoPatient, clearPatient } = useCaregiver();
  const [activeTab, setActiveTab] = useState<"overview" | "visitPrep">("overview");
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);

  const handleDocumentAdded = (extractedInfo?: any) => {
    if (extractedInfo) {
      setUploadedDocs((prev) => [extractedInfo, ...prev]);
      if (!currentPatient) {
        loadDemoPatient();
      }
    }
    setActiveTab("overview");
  };

  return (
    <div className="space-y-6">
      {/* 1. Flat Clinical Hero Header */}
      <section
        aria-labelledby="hero-heading"
        className="medical-card p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="space-y-3 max-w-[680px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0E6238] dark:bg-[#199A59]"></span>
            <span className="text-xs font-semibold text-[#0E6238] dark:text-[#199A59] tracking-wider uppercase font-mono">
              CareSync clinical surveillance
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug text-balance hero-heading-gradient"
          >
            {currentPatient
              ? "Cross-referencing medical records to protect Mom's health and prepare for doctor visits."
              : "Cross-referencing medical records to protect your loved one's health."}
          </h1>

          <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty max-w-[620px]">
            Upload hospital discharge notes, urgent care prescriptions, or outpatient lab PDFs. CareSync spots hidden drug-disease clashes and builds your doctor discussion brief.
          </p>
        </div>

        {/* Hero Actions (Flat, High Contrast, Standard Spacing) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsIntakeOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus-ring cursor-pointer min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload doctor note or lab (PDF)</span>
          </button>

          {!currentPatient && (
            <button
              type="button"
              onClick={loadDemoPatient}
              className="px-4 py-2.5 rounded-xl bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#1F1F1F] dark:hover:bg-[#272727] border border-[#CBD3C6] dark:border-[#313131] text-[#0A0F0D] dark:text-[#FFFFFF] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus-ring cursor-pointer min-h-[44px]"
              title="Explore CareSync with Eleanor Vance's sample clinical records"
            >
              <FileCheck className="w-4 h-4 text-[#0E6238] dark:text-[#199A59]" />
              <span>Explore sample case (Eleanor Vance)</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. Main Content: Active Patient View OR Asymmetric Onboarding Architecture */}
      {currentPatient ? (
        <div className="space-y-6">
          {/* Patient Context Card */}
          <PatientCard patient={currentPatient} onClearPatient={clearPatient} />

          {/* Segmented Tab Navigation */}
          <nav aria-label="Caregiver views" className="border-b border-[#E2E7DE] dark:border-[#272727] pb-3 no-print">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm bg-[#F4F6F2] dark:bg-[#181818] p-1.5 rounded-2xl border border-[#E2E7DE] dark:border-[#272727] w-full max-w-xl">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-2.5 rounded-xl font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center gap-2 min-h-[42px] cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] shadow-xs border border-[#CBD3C6] dark:border-[#313131]"
                    : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0A0F0D] dark:hover:text-white"
                }`}
              >
                <Clock className="w-4 h-4 text-[#0E6238] dark:text-[#199A59] shrink-0" />
                <span>Health timeline and recent changes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("visitPrep")}
                className={`px-3.5 py-2.5 rounded-xl font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center gap-2 min-h-[42px] cursor-pointer ${
                  activeTab === "visitPrep"
                    ? "bg-white dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] shadow-xs border border-[#CBD3C6] dark:border-[#313131]"
                    : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0A0F0D] dark:hover:text-white"
                }`}
              >
                <Stethoscope className="w-4 h-4 text-[#0E6238] dark:text-[#199A59] shrink-0" />
                <span>Doctor visit prep brief</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-mono">
                  Printable
                </span>
              </button>
            </div>
          </nav>

          {/* Active Tab View */}
          <div>
            {activeTab === "overview" && (
              <OverviewTimeline
                onSelectVisitPrepTab={() => setActiveTab("visitPrep")}
                uploadedDocuments={uploadedDocs}
              />
            )}

            {activeTab === "visitPrep" && <PhysicianVisitPrepView />}
          </div>
        </div>
      ) : (
        /* Asymmetric Onboarding Architecture (Replaces Cliche 3-Equal Cards) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Primary Lead Card (5 columns) */}
          <div className="lg:col-span-5 medical-card p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] flex items-center justify-center font-bold text-sm border border-[#CBD3C6] dark:border-[#272727]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59] block mb-1">
                  Step 1 • Ingest records
                </span>
                <h3 className="text-lg font-bold text-[#0A0F0D] dark:text-[#FFFFFF] mb-2 tracking-tight">
                  Upload any paper or portal medical record
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty">
                  Upload doctor consult notes, hospital discharge instructions, or lab test PDFs. CareSync translates clinical jargon into clear, plain English for family discussions.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E7DE] dark:border-[#272727] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0E6238] dark:text-[#199A59]">
                Supports PDFs, scans, and notes
              </span>
              <button
                type="button"
                onClick={() => setIsIntakeOpen(true)}
                className="text-xs font-semibold text-[#0E6238] dark:text-[#199A59] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Upload now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Staggered Secondary Cards (7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="medical-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] dark:bg-[#1F1F1F] text-[#D97706] dark:text-[#FBBF24] flex items-center justify-center font-bold text-xs mb-3 border border-[#FDE68A] dark:border-[#313131]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#D97706] dark:text-[#FBBF24] block mb-1">
                  Step 2 • Surveillance
                </span>
                <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] mb-1.5 tracking-tight">
                  Cross-doctor surveillance
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty">
                  When different clinics prescribe without seeing previous records, CareSync spots hidden drug-disease clashes and sudden lab trajectory drops.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-semibold text-[#D97706] dark:text-[#FBBF24]">
                Automatic drug-disease checks
              </div>
            </div>

            <div className="medical-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] flex items-center justify-center font-bold text-xs mb-3 border border-[#CBD3C6] dark:border-[#272727]">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0E6238] dark:text-[#199A59] block mb-1">
                  Step 3 • Doctor prep
                </span>
                <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] mb-1.5 tracking-tight">
                  Doctor visit prep brief
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed text-pretty">
                  Get a concise, printable clinical brief with prioritized questions to ask at the next doctor visit, complete with verifiable timeline evidence.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E7DE] dark:border-[#272727] text-xs font-semibold text-[#0E6238] dark:text-[#199A59]">
                One-click printable brief
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Document Intake Modal */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
