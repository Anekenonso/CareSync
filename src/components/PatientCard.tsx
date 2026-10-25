"use client";

import React from "react";
import { Heart, Pill, ShieldCheck, Stethoscope } from "lucide-react";
import { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="bg-white dark:bg-[#0E1B15] rounded-2xl p-5 sm:p-6 mb-5 border border-[#E3E8DE] dark:border-[#1C3328] shadow-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Patient Identity */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D287] via-[#10B981] to-[#059669] flex items-center justify-center text-white font-extrabold text-base shadow-sm ring-4 ring-emerald-50 dark:ring-emerald-950/40 shrink-0">
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight">
                {patient.name}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                {patient.age} yrs • Mother
              </span>
              <span className="text-xs text-[#71717A] dark:text-[#8FA698] flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-[#71717A]" />
                PCP: <strong className="text-[#27272A] dark:text-[#D1E0D7]">{patient.primaryPhysician}</strong>
              </span>
            </div>

            {/* Conditions & Prescriptions Summary Badges */}
            <div className="flex items-center gap-2 text-xs mt-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/60 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>CKD Stage 3a (Kidney)</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200/80 dark:border-rose-800/60 font-medium">
                <Heart className="w-3 h-3 text-rose-500" />
                <span>Hypertension</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F3F6F1] dark:bg-[#13241C] text-[#27272A] dark:text-[#D1E0D7] border border-[#E3E8DE] dark:border-[#1C3328] font-medium">
                <span>Osteoarthritis</span>
              </div>

              <div className="hidden sm:inline text-slate-300 dark:text-slate-700">•</div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#0D6832] dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 font-medium">
                <Pill className="w-3 h-3 text-[#0D6832] dark:text-[#34D399]" />
                <span><strong>5</strong> Active Prescriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[#0D6832] dark:text-emerald-300 self-start md:self-auto shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
          <span>Records In-Sync</span>
        </div>
      </div>
    </div>
  );
}
