"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  PlusCircle,
  Sparkles,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
      {/* 1. Welcoming Clinical Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-sky-50/50 dark:from-[#0B1812] dark:via-[#0F221A] dark:to-[#0B1A24] border border-emerald-100/90 dark:border-emerald-900/40 rounded-2xl p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#059669] dark:text-[#34D399] tracking-widest uppercase font-mono">
              — CARESYNC CLINICAL SURVEILLANCE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight leading-snug">
            {currentPatient
              ? "Cross-referencing medical records to protect Mom's health and prepare for doctor visits."
              : "Cross-referencing medical records to protect your loved one's health."}
          </h1>
          <p className="text-xs sm:text-sm text-[#27272A] dark:text-[#D1E0D7] leading-relaxed">
            Upload hospital discharge notes, urgent care prescriptions, or lab PDFs. CareSync spots hidden drug-disease clashes and builds your doctor discussion brief.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => setIsIntakeOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D287] via-[#10B981] to-[#059669] hover:from-[#00b975] hover:to-[#047857] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer min-h-[48px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Doctor Note or Lab (PDF)</span>
          </button>

          {!currentPatient && (
            <button
              onClick={loadDemoPatient}
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50/70 dark:bg-[#13241C] dark:hover:bg-[#182C22] border-2 border-emerald-300 dark:border-emerald-700/80 text-[#059669] dark:text-[#34D399] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer min-h-[48px]"
              title="Load Eleanor Vance's sample chronic care records"
            >
              <Sparkles className="w-4 h-4 text-[#00D287]" />
              <span>Load Demo Case (Eleanor Vance)</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Content: Empty Onboarding State OR Active Patient View */}
      {currentPatient ? (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Patient Context Card */}
          <PatientCard patient={currentPatient} onClearPatient={clearPatient} />

          {/* Clinical Segmented Tab Navigation */}
          <div className="border-b border-[#E3E8DE] dark:border-[#1C3328] pb-3 no-print">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm bg-[#F3F6F1] dark:bg-[#13241C] p-1.5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] w-full max-w-xl">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white dark:bg-[#182C22] text-[#059669] dark:text-[#34D399] shadow-xs border border-[#E3E8DE] dark:border-[#274737]"
                    : "text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#182C22]/50"
                }`}
              >
                <Clock className="w-4 h-4 text-[#059669] dark:text-[#34D399] shrink-0" />
                <span>Health Timeline &amp; What Changed</span>
              </button>

              <button
                onClick={() => setActiveTab("visitPrep")}
                className={`px-3.5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
                  activeTab === "visitPrep"
                    ? "bg-white dark:bg-[#182C22] text-[#059669] dark:text-[#34D399] shadow-xs border border-[#E3E8DE] dark:border-[#274737]"
                    : "text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#182C22]/50"
                }`}
              >
                <Stethoscope className="w-4 h-4 text-[#059669] dark:text-[#34D399] shrink-0" />
                <span>Doctor Visit-Prep Package</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#059669] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                  Printable
                </span>
              </button>
            </div>
          </div>

          {/* Tab Views */}
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
        /* Empty / Onboarding State (Option A) */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 3 Step Guidance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0E1B15] border border-[#CBD5C8] dark:border-[#274737] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#059669] dark:text-[#34D399] flex items-center justify-center font-bold text-sm mb-3 border border-emerald-200 dark:border-emerald-800">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#0A0F0D] dark:text-[#F4FBF7] mb-1">
                  1. Upload Any Medical Record
                </h3>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                  Upload doctor consult notes, hospital discharge instructions, or lab test PDFs. CareSync decodes clinical jargon into clear, plain English.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E3E8DE] dark:border-[#1C3328] text-[11px] font-bold text-[#059669] dark:text-[#34D399]">
                PDFs, Scans &amp; Doctor Notes
              </div>
            </div>

            <div className="bg-white dark:bg-[#0E1B15] border border-[#CBD5C8] dark:border-[#274737] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm mb-3 border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#0A0F0D] dark:text-[#F4FBF7] mb-1">
                  2. Cross-Doctor Surveillance
                </h3>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                  When different clinics prescribe without seeing previous records, CareSync spots hidden drug-disease clashes and sudden lab trajectory drops.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E3E8DE] dark:border-[#1C3328] text-[11px] font-bold text-amber-700 dark:text-amber-400">
                Automatic Drug-Disease Checks
              </div>
            </div>

            <div className="bg-white dark:bg-[#0E1B15] border border-[#CBD5C8] dark:border-[#274737] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm mb-3 border border-teal-200 dark:border-teal-800">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#0A0F0D] dark:text-[#F4FBF7] mb-1">
                  3. Doctor Visit-Prep Package
                </h3>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                  Get a concise, printable clinical brief with prioritized questions to ask at the next doctor visit, complete with verifiable timeline evidence.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E3E8DE] dark:border-[#1C3328] text-[11px] font-bold text-teal-700 dark:text-teal-400">
                1-Click Printable Brief
              </div>
            </div>
          </div>

          {/* Interactive Demo Explorer Box */}
          <div className="bg-white dark:bg-[#0E1B15] border-2 border-emerald-300 dark:border-emerald-700/80 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#059669] dark:text-emerald-300 font-mono tracking-wide uppercase">
                  Sample Clinical Case
                </span>
                <span className="text-xs text-[#52525B] dark:text-[#A1A1AA]">• Test CareSync without real files</span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight">
                Explore Eleanor Vance&apos;s Sample Health Record
              </h2>
              <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#CBD5E1] leading-relaxed">
                See how CareSync caught a critical kidney contraindication when an urgent care clinic prescribed Meloxicam (NSAID) on top of her baseline Lisinopril, causing kidney filtration to plunge 22%.
              </p>
            </div>

            <button
              onClick={loadDemoPatient}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D287] via-[#10B981] to-[#059669] hover:from-[#00b975] hover:to-[#047857] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:shadow-lg active:scale-95 transition-all shrink-0 cursor-pointer min-h-[48px]"
            >
              <span>Load Eleanor Vance Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Medical Document Intake Modal (Rendered in React Portal directly to body) */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
