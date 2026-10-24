"use client";

import React from "react";
import { User, Heart, Pill, Calendar } from "lucide-react";
import { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="glass-panel rounded-2xl p-5 mb-5 border border-slate-800 shadow-xl relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Patient Identity */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/20 shrink-0">
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-white tracking-tight">{patient.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800/80 font-medium">
                {patient.age} yrs • Mother
              </span>
              <span className="text-xs text-slate-400">
                PCP: <strong className="text-slate-200">{patient.primaryPhysician}</strong>
              </span>
            </div>

            {/* Conditions & Prescriptions Summary */}
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Conditions: <strong>CKD Stage 3a (Kidney)</strong>, <strong>Hypertension</strong>, <strong>Osteoarthritis</strong></span>
              </div>
              <div className="hidden sm:inline text-slate-600">•</div>
              <div className="flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-cyan-400" />
                <span>Medications: <strong>5 Active Prescriptions</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Records In-Sync</span>
        </div>
      </div>
    </div>
  );
}
