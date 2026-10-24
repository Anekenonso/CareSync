"use client";

import React, { useState } from "react";
import {
  Clock,
  Stethoscope,
  Database,
  Activity,
  PlusCircle,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<"overview" | "visitPrep" | "zetaris" | "meterless">("overview");
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div>
      {/* Patient Profile Card Header */}
      <PatientCard patient={patientEleanorVance} />

      {/* Navigation Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-3 no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            Overview &amp; 90-Day Trajectory
          </button>

          <button
            onClick={() => setActiveTab("visitPrep")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "visitPrep"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-md shadow-teal-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            Physician Visit-Prep Brief
          </button>

          <button
            onClick={() => setActiveTab("zetaris")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "zetaris"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Database className="w-4 h-4 text-cyan-400" />
            Zetaris Data Fabric
          </button>

          <button
            onClick={() => setActiveTab("meterless")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "meterless"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md shadow-emerald-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            Meterless H-MEM &amp; Audit
          </button>
        </div>

        {/* Action: Intake New Document */}
        <button
          onClick={() => setIsIntakeOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          Intake Document
        </button>
      </div>

      {/* Dynamic Tab Views */}
      <div className="transition-opacity duration-200">
        {activeTab === "overview" && (
          <OverviewTimeline onSelectVisitPrepTab={() => setActiveTab("visitPrep")} />
        )}

        {activeTab === "visitPrep" && <PhysicianVisitPrepView />}

        {activeTab === "zetaris" && <ZetarisConsole />}

        {activeTab === "meterless" && <MeterlessMemoryView />}
      </div>

      {/* Document Intake Modal */}
      <DocumentIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onDocumentAdded={() => setActiveTab("overview")}
      />
    </div>
  );
}
