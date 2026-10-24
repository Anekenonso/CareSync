"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  PlusCircle,
  Database,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { PatientCard } from "@/components/PatientCard";
import { OverviewTimeline } from "@/components/OverviewTimeline";
import { PhysicianVisitPrepView } from "@/components/PhysicianVisitPrepView";
import { ZetarisConsole } from "@/components/ZetarisConsole";
import { MeterlessMemoryView } from "@/components/MeterlessMemoryView";
import { DocumentIntakeModal } from "@/components/DocumentIntakeModal";
import { patientEleanorVance } from "@/data/mockClinicalData";

export default function CareSyncApp() {
  const [activeTab, setActiveTab] = useState<"overview" | "visitPrep">("overview");
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

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

        {/* Single Primary Call-to-Action (GenAI Works Signature Evergreen) */}
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="px-5 py-3 rounded-xl bg-[#0D6832] hover:bg-[#094D25] text-white font-semibold text-xs sm:text-sm flex items-center gap-2.5 shrink-0 shadow-sm hover:shadow-md active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Doctor Note or Lab (PDF)</span>
        </button>
      </div>

      {/* 2. Patient Context Card */}
      <PatientCard patient={patientEleanorVance} />

      {/* 3. Clinical Segmented Tab Navigation */}
      <div className="flex items-center justify-between border-b border-[#E3E8DE] dark:border-[#1C3328] pb-3 no-print">
        <div className="flex items-center gap-2 text-sm bg-[#F3F6F1] dark:bg-[#13241C] p-1.5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-white dark:bg-[#182C22] text-[#0D6832] dark:text-[#34D399] shadow-sm border border-[#E3E8DE] dark:border-[#274737]"
                : "text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#182C22]/50"
            }`}
          >
            <Clock className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            Health Timeline &amp; What Changed
          </button>

          <button
            onClick={() => setActiveTab("visitPrep")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "visitPrep"
                ? "bg-white dark:bg-[#182C22] text-[#0D6832] dark:text-[#34D399] shadow-sm border border-[#E3E8DE] dark:border-[#274737]"
                : "text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#182C22]/50"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            <span>Doctor Visit-Prep Package</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
              Printable
            </span>
          </button>
        </div>
      </div>

      {/* 4. Tab Views */}
      <div>
        {activeTab === "overview" && (
          <OverviewTimeline
            onSelectVisitPrepTab={() => setActiveTab("visitPrep")}
            uploadedDocuments={uploadedDocs}
          />
        )}

        {activeTab === "visitPrep" && <PhysicianVisitPrepView />}
      </div>

      {/* 5. Bottom Technical Verification Drawer (Discreet & Collapsible) */}
      <div className="pt-4 no-print">
        <div className="bg-white dark:bg-[#0E1B15] rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] overflow-hidden shadow-sm transition-colors">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#F3F6F1]/60 dark:hover:bg-[#13241C]/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#0D6832] dark:text-[#34D399]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0A0F0D] dark:text-[#F4FBF7] uppercase tracking-wider">
                  Technical Architecture &amp; Audit Proofs (Zetaris Spark SQL &amp; Meterless Trust Ledger)
                </h4>
                <p className="text-[11px] text-[#71717A] dark:text-[#8FA698]">
                  Inspect the in-situ queries, 3-tier memory engine, and cryptographic audit logs powering CareSync.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#0D6832] dark:text-[#34D399] font-semibold">
              <span>{showTechnicalDetails ? "Hide Proofs" : "Inspect Proofs"}</span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showTechnicalDetails && (
            <div className="p-5 border-t border-[#E3E8DE] dark:border-[#1C3328] space-y-6 bg-[#FAFBF8] dark:bg-[#07100B]">
              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-[#0D6832] dark:text-[#34D399] uppercase tracking-wider">
                    1. Zetaris In-Situ Spark SQL Data Fabric
                  </span>
                  <p className="text-xs text-[#71717A] dark:text-[#8FA698]">
                    Queries federated outpatient EHR, Quest lab parquet files, and urgent care tables without centralizing raw PHI.
                  </p>
                </div>
                <ZetarisConsole />
              </div>

              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-[#0D6832] dark:text-[#34D399] uppercase tracking-wider">
                    2. Meterless 3-Tier Long-Term Memory Engine
                  </span>
                  <p className="text-xs text-[#71717A] dark:text-[#8FA698]">
                    Hot Session Working Memory, Semantic Cluster Vector Store, and Merkle Immutable Verification Ledger.
                  </p>
                </div>
                <MeterlessMemoryView />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Medical Document Intake Modal */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
