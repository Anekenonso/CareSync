"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  PlusCircle,
  Database,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
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
      {/* 1. Welcoming Hero Banner (Simple, Clear, Human) */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-cyan-950/60 border border-teal-500/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">
              Family Health Coordination
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Cross-referencing medical records to protect Mom&apos;s health and prepare for doctor visits.
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Upload hospital discharge notes, urgent care prescriptions, or lab PDFs. CareSync spots hidden drug-disease clashes and builds your doctor discussion brief.
          </p>
        </div>

        <button
          onClick={() => setIsIntakeOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-teal-500/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Doctor Note or Lab (PDF)</span>
        </button>
      </div>

      {/* 2. Patient Context Card */}
      <PatientCard patient={patientEleanorVance} />

      {/* 3. Simple 2-Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 no-print">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Clock className="w-4 h-4 text-teal-400" />
            Health Timeline &amp; What Changed
          </button>

          <button
            onClick={() => setActiveTab("visitPrep")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "visitPrep"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            Doctor Visit-Prep Package (Printable)
          </button>
        </div>
      </div>

      {/* 4. Tab Views */}
      <div>
        {activeTab === "overview" && (
          <OverviewTimeline
            onSelectVisitPrepTab={() => setActiveTab("visitPrep")}
            onOpenIntake={() => setIsIntakeOpen(true)}
            uploadedDocuments={uploadedDocs}
          />
        )}

        {activeTab === "visitPrep" && <PhysicianVisitPrepView />}
      </div>

      {/* 5. Bottom Technical Verification Drawer (Unobtrusive & Collapsible) */}
      <div className="pt-4 no-print">
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Technical Architecture &amp; Audit Proofs (Zetaris Spark SQL &amp; Meterless Trust Ledger)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Inspect the in-situ queries, 3-tier memory engine, and cryptographic audit logs powering CareSync.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>{showTechnicalDetails ? "Hide Proofs" : "Inspect Proofs"}</span>
              {showTechnicalDetails ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </button>

          {showTechnicalDetails && (
            <div className="p-5 border-t border-slate-800 space-y-6 bg-slate-950/40">
              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    1. Zetaris In-Situ Spark SQL Data Fabric
                  </span>
                  <p className="text-xs text-slate-400">
                    Queries federated outpatient EHR, Quest lab parquet files, and urgent care tables without centralizing raw PHI.
                  </p>
                </div>
                <ZetarisConsole />
              </div>

              <div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    2. Meterless H-MEM Longitudinal Memory &amp; Audit Trail
                  </span>
                  <p className="text-xs text-slate-400">
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
