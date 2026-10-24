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
      {/* 1. Welcoming Clinical Hero Banner (Clean, Reassuring, Human) */}
      <div className="bg-gradient-to-br from-white via-sky-50/70 to-teal-50/60 dark:from-[#0F1A2E] dark:via-[#13223B] dark:to-[#0F1E33] border border-sky-100/90 dark:border-sky-900/40 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm transition-colors">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              Family Health Coordination &amp; Clinical Safety
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
            Cross-referencing medical records to protect Mom&apos;s health and prepare for doctor visits.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Upload hospital discharge notes, urgent care prescriptions, or lab PDFs. CareSync spots hidden drug-disease clashes and builds your doctor discussion brief.
          </p>
        </div>

        {/* Single Primary Call-to-Action */}
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 via-teal-600 to-teal-700 hover:from-sky-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shrink-0 shadow-md shadow-sky-600/20 hover:shadow-lg active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Doctor Note or Lab (PDF)</span>
        </button>
      </div>

      {/* 2. Patient Context Card */}
      <PatientCard patient={patientEleanorVance} />

      {/* 3. Clinical Segmented Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 no-print">
        <div className="flex items-center gap-2 text-sm bg-slate-100/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-white dark:bg-sky-950/90 text-sky-900 dark:text-sky-300 shadow-sm border border-slate-200 dark:border-sky-800/80"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            Health Timeline &amp; What Changed
          </button>

          <button
            onClick={() => setActiveTab("visitPrep")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "visitPrep"
                ? "bg-white dark:bg-sky-950/90 text-sky-900 dark:text-sky-300 shadow-sm border border-slate-200 dark:border-sky-800/80"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Doctor Visit-Prep Package</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-semibold">
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
        <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Technical Architecture &amp; Audit Proofs (Zetaris Spark SQL &amp; Meterless Trust Ledger)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Inspect the in-situ queries, 3-tier memory engine, and cryptographic audit logs powering CareSync.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-400 font-semibold">
              <span>{showTechnicalDetails ? "Hide Proofs" : "Inspect Proofs"}</span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showTechnicalDetails && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-6 bg-slate-50/70 dark:bg-slate-950/40">
              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                    1. Zetaris In-Situ Spark SQL Data Fabric
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Queries federated outpatient EHR, Quest lab parquet files, and urgent care tables without centralizing raw PHI.
                  </p>
                </div>
                <ZetarisConsole />
              </div>

              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                    2. Meterless H-MEM Longitudinal Memory &amp; Audit Trail
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    3-tier memory architecture with conflict detection and append-only Trust Ledger.
                  </p>
                </div>
                <MeterlessMemoryView />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Intake & Upload Modal */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
