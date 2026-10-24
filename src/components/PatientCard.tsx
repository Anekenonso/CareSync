"use client";

import React from "react";
import { User, AlertCircle, Heart, Pill, Calendar, Clock, Sparkles, UserPlus } from "lucide-react";
import { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
  isDemo?: boolean;
  onOpenIntake?: () => void;
  onSwitchToDemo?: () => void;
}

export function PatientCard({ patient, isDemo = true, onOpenIntake, onSwitchToDemo }: PatientCardProps) {
  return (
    <div className="glass-panel rounded-2xl p-5 mb-6 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none blur-2xl"></div>

      {/* Top Demo Case Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          {isDemo ? (
            <>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                Sample Case Study
              </span>
              <span className="text-xs text-slate-300">
                You are viewing sample multi-doctor data for <strong>Eleanor Vance</strong> (74yo mother) to demonstrate how CareSync catches cross-portal risks.
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 shrink-0">
                My Family Member
              </span>
              <span className="text-xs text-slate-300">
                Active personal profile. Add records to build your family member&apos;s longitudinal timeline.
              </span>
            </>
          )}
        </div>

        {isDemo ? (
          <button
            onClick={onOpenIntake}
            className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Your Family Member Profile</span>
          </button>
        ) : (
          <button
            onClick={onSwitchToDemo}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Switch to Demo Case</span>
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Patient Identity */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20 shrink-0">
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white tracking-tight">{patient.name}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {patient.mrn}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                {patient.age > 0 ? `${patient.age} yrs • ${patient.gender}` : patient.gender}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                DOB: {patient.dob}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                PCP: {patient.primaryPhysician}
              </span>
              <span className="flex items-center gap-1 text-rose-300">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Allergies: {patient.allergies.length > 0 ? patient.allergies.join(", ") : "None reported"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Vitals Snapshot */}
        <div className="flex items-center gap-3 bg-slate-900/80 rounded-xl p-3 border border-slate-800 shrink-0">
          <div className="text-center px-3 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">BP</span>
            <span className="text-sm font-semibold text-white">{patient.recentVitals.bloodPressure || "--"}</span>
          </div>
          <div className="text-center px-3 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Heart Rate</span>
            <span className="text-sm font-semibold text-cyan-400">{patient.recentVitals.heartRate ? `${patient.recentVitals.heartRate} bpm` : "--"}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SpO2</span>
            <span className="text-sm font-semibold text-emerald-400">{patient.recentVitals.spO2 ? `${patient.recentVitals.spO2}%` : "--"}</span>
          </div>
        </div>
      </div>

      {/* Conditions & Medication Badges */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            Chronic Conditions:
          </span>
          {patient.conditions.length > 0 ? (
            patient.conditions.map((c) => (
              <span
                key={c.id}
                className={`px-2.5 py-1 rounded-lg border font-medium ${
                  c.name.includes("Kidney")
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                    : "bg-slate-800/60 border-slate-700 text-slate-300"
                }`}
              >
                {c.name}
              </span>
            ))
          ) : (
            <span className="text-slate-500 italic">No chronic conditions recorded yet</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Pill className="w-3.5 h-3.5 text-cyan-400" />
            Active Medications:
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
            {patient.activeMedications.length} Prescriptions
          </span>
        </div>
      </div>
    </div>
  );
}
