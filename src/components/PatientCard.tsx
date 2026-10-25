"use client";

import React from "react";
import { Heart, Pill, ShieldCheck, Stethoscope } from "lucide-react";
import { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
  onClearPatient?: () => void;
}

export function PatientCard({ patient, onClearPatient }: PatientCardProps) {
  return (
    <div className="medical-card p-5 sm:p-6 mb-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Patient Identity */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0E6238] dark:bg-[#199A59] flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0">
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight">
                {patient.name}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-semibold tabular-nums">
                {patient.age} yrs • Mother
              </span>
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#9CA3AF]" />
                <span>PCP:</span>
                <strong className="text-[#0A0F0D] dark:text-[#FFFFFF] font-medium">{patient.primaryPhysician}</strong>
              </span>
            </div>

            {/* Conditions & Prescriptions Badges */}
            <div className="flex items-center gap-2 text-xs mt-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FEF3C7] dark:bg-[#1F1F1F] text-[#D97706] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#313131] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] dark:bg-[#FBBF24]"></span>
                <span>CKD stage 3a (kidney)</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF1F2] dark:bg-[#1F1F1F] text-[#BE123C] dark:text-[#FB7185] border border-[#FECDD3] dark:border-[#313131] font-medium">
                <Heart className="w-3 h-3 text-[#BE123C] dark:text-[#FB7185]" />
                <span>Hypertension</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4F6F2] dark:bg-[#1F1F1F] text-[#27272A] dark:text-[#E5E7EB] border border-[#E2E7DE] dark:border-[#272727] font-medium">
                <span>Osteoarthritis</span>
              </div>

              <span className="hidden sm:inline text-[#CBD3C6] dark:text-[#313131]">•</span>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-medium">
                <Pill className="w-3 h-3 text-[#0E6238] dark:text-[#199A59]" />
                <span className="tabular-nums"><strong className="font-semibold">5</strong> active prescriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Status Badge & Clear Option */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#313131] text-[#0E6238] dark:text-[#199A59]">
            <ShieldCheck className="w-4 h-4 text-[#0E6238] dark:text-[#199A59]" />
            <span>Records in-sync</span>
          </div>

          {onClearPatient && (
            <button
              type="button"
              onClick={onClearPatient}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#F4F6F2] hover:bg-[#FFF1F2] dark:bg-[#1F1F1F] dark:hover:bg-[#1F1F1F] border border-[#CBD3C6] hover:border-[#FECDD3] dark:border-[#313131] dark:hover:border-[#313131] text-[#6B7280] hover:text-[#BE123C] dark:text-[#9CA3AF] dark:hover:text-[#FB7185] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer"
              title="Clear active patient and return to initial state"
            >
              Clear record
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
