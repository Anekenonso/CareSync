"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  FileText,
  PlusCircle,
  Database,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { PatientCard } from "@/components/PatientCard";
import { OverviewTimeline } from "@/components/OverviewTimeline";
import { PhysicianVisitPrepView } from "@/components/PhysicianVisitPrepView";
import { ZetarisConsole } from "@/components/ZetarisConsole";
import { MeterlessMemoryView } from "@/components/MeterlessMemoryView";
import { DocumentIntakeModal } from "@/components/DocumentIntakeModal";
import { GettingStartedBanner } from "@/components/GettingStartedBanner";
import { patientEleanorVance } from "@/data/mockClinicalData";
import { Patient } from "@/types";

const customFamilyMemberTemplate: Patient = {
  id: "patient-custom",
  name: "My Loved One",
  mrn: "FAMILY-PROFILE-01",
  dob: "Pending Setup",
  age: 0,
  gender: "Family Member",
  primaryPhysician: "Pending Records",
  allergies: [],
  conditions: [],
  activeMedications: [],
  recentVitals: {
    bloodPressure: "--",
    heartRate: 0,
    spO2: 0,
    temperature: 0,
    bmi: 0,
    recordedAt: "None",
  },
};

export default function CareSyncApp() {
  const [activeTab, setActiveTab] = useState<"overview" | "visitPrep" | "records">("overview");
  const [activeProfile, setActiveProfile] = useState<"eleanor" | "custom">("eleanor");
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const activePatient = activeProfile === "eleanor" ? patientEleanorVance : customFamilyMemberTemplate;

  return (
    <div className="space-y-6">
      {/* Welcome & How It Works Onboarding Banner */}
      <GettingStartedBanner
        activeProfile={activeProfile}
        onSelectProfile={setActiveProfile}
        onOpenIntake={() => {
          setActiveProfile("custom");
          setIsIntakeOpen(true);
        }}
      />

      {/* Patient Profile Card */}
      <PatientCard
        patient={activePatient}
        isDemo={activeProfile === "eleanor"}
        onOpenIntake={() => {
          setActiveProfile("custom");
          setIsIntakeOpen(true);
        }}
        onSwitchToDemo={() => setActiveProfile("eleanor")}
      />

      {/* Navigation Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 no-print">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Clock className="w-4 h-4 text-teal-400" />
            Health Timeline &amp; Trends
          </button>

          <button
            onClick={() => setActiveTab("visitPrep")}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "visitPrep"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            Doctor Visit-Prep Package
          </button>

          <button
            onClick={() => setActiveTab("records")}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "records"
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            Connected Records &amp; Sources
          </button>
        </div>

        {/* Action: Add Health Record */}
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-teal-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Add Health Document
        </button>
      </div>

      {/* Main Tab Views */}
      <div>
        {activeTab === "overview" && (
          <OverviewTimeline
            onSelectVisitPrepTab={() => setActiveTab("visitPrep")}
            isCustomProfile={activeProfile === "custom"}
            onOpenIntake={() => setIsIntakeOpen(true)}
            onSwitchToDemo={() => setActiveProfile("eleanor")}
          />
        )}

        {activeTab === "visitPrep" && (
          <PhysicianVisitPrepView
            isCustomProfile={activeProfile === "custom"}
            onOpenIntake={() => setIsIntakeOpen(true)}
            onSwitchToDemo={() => setActiveProfile("eleanor")}
          />
        )}

        {activeTab === "records" && (
          <div className="space-y-6">
            {/* Connected Portals Summary */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {activeProfile === "eleanor" ? "Eleanor's Connected Patient Records" : "Connected Patient Records"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeProfile === "eleanor"
                      ? "Records unified in-situ across Hope Valley Primary Care, Quest Diagnostics, and QuickCare Urgent Clinic."
                      : "Portals and document sources unified for this family profile."}
                  </p>
                </div>
                <button
                  onClick={() => setIsIntakeOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-teal-400" />
                  Upload New Record
                </button>
              </div>

              {activeProfile === "eleanor" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-200">Hope Valley Primary Care</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">Connected</span>
                    </div>
                    <p className="text-xs text-slate-400">Dr. Marcus Chen, MD • Outpatient EHR</p>
                    <div className="mt-3 text-[11px] text-slate-500">Last Synced: 2026-07-15 • 12 clinical notes</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-200">Quest Diagnostics</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">Connected</span>
                    </div>
                    <p className="text-xs text-slate-400">Comprehensive Metabolic &amp; Renal Panels</p>
                    <div className="mt-3 text-[11px] text-slate-500">Last Synced: 2026-10-18 • 18 lab observations</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-200">QuickCare Urgent Clinic</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">Connected</span>
                    </div>
                    <p className="text-xs text-slate-400">Walk-in visit notes &amp; acute prescriptions</p>
                    <div className="mt-3 text-[11px] text-slate-500">Last Synced: 2026-10-10 • 1 encounter note</div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-3">
                  <p className="text-xs text-slate-400">
                    No hospital portals or laboratory systems connected yet for this family member.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsIntakeOpen(true)}
                      className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
                    >
                      Upload First Document
                    </button>
                    <button
                      onClick={() => setActiveProfile("eleanor")}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700"
                    >
                      Explore Eleanor&apos;s Demo Sources
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable Technical Verification Section for Evaluators / Engineers */}
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Database className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Technical Verification &amp; Data Fabric (Zetaris + Meterless)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Inspect live federated Spark SQL queries, 3-tier memory engine state, and cryptographic Trust Ledger logs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span>{showTechnicalDetails ? "Hide Proofs" : "Inspect Proofs"}</span>
                  {showTechnicalDetails ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {showTechnicalDetails && (
                <div className="p-6 border-t border-slate-800 space-y-8 bg-slate-950/40">
                  {/* Zetaris Spark SQL Console */}
                  <div>
                    <div className="mb-3">
                      <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                        1. Zetaris In-Situ Spark SQL Data Fabric
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Queries disparate health silos without centralizing raw PHI.
                      </p>
                    </div>
                    <ZetarisConsole />
                  </div>

                  {/* Meterless H-MEM Memory & Trust Ledger */}
                  <div>
                    <div className="mb-3">
                      <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                        2. Meterless H-MEM Longitudinal Memory &amp; Audit Trail
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        3-tier memory architecture with conflict detection and append-only Trust Ledger.
                      </p>
                    </div>
                    <MeterlessMemoryView />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Document Intake Modal */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={() => {
          setActiveProfile("custom");
          setActiveTab("overview");
        }}
      />
    </div>
  );
}
