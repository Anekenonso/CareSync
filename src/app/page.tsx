"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  PlusCircle,
} from "lucide-react";
import { PatientCard } from "@/components/PatientCard";
import { OverviewTimeline } from "@/components/OverviewTimeline";
import { PhysicianVisitPrepView } from "@/components/PhysicianVisitPrepView";
import { DocumentIntakeModal } from "@/components/DocumentIntakeModal";
import { patientEleanorVance } from "@/data/mockClinicalData";

export default function CareSyncApp() {
  const [activeTab, setActiveTab] = useState<"overview" | "visitPrep">("overview");
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);

  const handleDocumentAdded = (extractedInfo?: any) => {
    if (extractedInfo) {
      setUploadedDocs((prev) => [extractedInfo, ...prev]);
    }
    setActiveTab("overview");
  };

  return (
    <div className="space-y-5">
      {/* 1. Welcoming Clinical Hero Banner (GenAI Works Inspired Mint-Sky Gradient & Evergreen Action) */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-sky-50/50 dark:from-[#0B1812] dark:via-[#0F221A] dark:to-[#0B1A24] border border-emerald-100/90 dark:border-emerald-900/40 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm transition-colors">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#0D6832] dark:text-[#34D399] tracking-widest uppercase font-mono">
              — CARESYNC CLINICAL SURVEILLANCE
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight leading-snug">
            Cross-referencing medical records to protect Mom&apos;s health and prepare for doctor visits.
          </h1>
          <p className="text-xs sm:text-sm text-[#27272A] dark:text-[#D1E0D7] leading-relaxed">
            Upload hospital discharge notes, urgent care prescriptions, or lab PDFs. CareSync spots hidden drug-disease clashes and builds your doctor discussion brief.
          </p>
        </div>

        {/* Single Primary Call-to-Action (Bright Vibrant Medical Emerald) */}
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D287] via-[#10B981] to-[#059669] hover:from-[#00b975] hover:to-[#047857] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shrink-0 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all self-stretch sm:self-auto cursor-pointer min-h-[48px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Doctor Note or Lab (PDF)</span>
        </button>
      </div>

      {/* 2. Patient Context Card */}
      <PatientCard patient={patientEleanorVance} />

      {/* 3. Clinical Segmented Tab Navigation (Responsive Full-Width on Mobile) */}
      <div className="border-b border-[#E3E8DE] dark:border-[#1C3328] pb-3 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm bg-[#F3F6F1] dark:bg-[#13241C] p-1.5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] w-full max-w-xl">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
              activeTab === "overview"
                ? "bg-white dark:bg-[#182C22] text-[#0D6832] dark:text-[#34D399] shadow-sm border border-[#E3E8DE] dark:border-[#274737]"
                : "text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#182C22]/50"
            }`}
          >
            <Clock className="w-4 h-4 text-[#0D6832] dark:text-[#34D399] shrink-0" />
            <span>Health Timeline &amp; What Changed</span>
          </button>

          <button
            onClick={() => setActiveTab("visitPrep")}
            className={`px-3.5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
              activeTab === "visitPrep"
                ? "bg-white dark:bg-[#182C22] text-[#0D6832] dark:text-[#34D399] shadow-sm border border-[#E3E8DE] dark:border-[#274737]"
                : "text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#182C22]/50"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-[#0D6832] dark:text-[#34D399] shrink-0" />
            <span>Doctor Visit-Prep Package</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
              Printable
            </span>
          </button>
        </div>
      </div>

      {/* 4. Tab Views with Smooth Fade Transitions */}
      <div className="transition-all duration-300 animate-in fade-in">
        {activeTab === "overview" && (
          <OverviewTimeline
            onSelectVisitPrepTab={() => setActiveTab("visitPrep")}
            uploadedDocuments={uploadedDocs}
          />
        )}

        {activeTab === "visitPrep" && <PhysicianVisitPrepView />}
      </div>

      {/* 5. Medical Document Intake Modal */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
