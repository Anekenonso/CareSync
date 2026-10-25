"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  AlertTriangle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Compass,
} from "lucide-react";

interface GettingStartedBannerProps {
  activeProfile: "eleanor" | "custom";
  onSelectProfile: (profile: "eleanor" | "custom") => void;
  onOpenIntake: () => void;
}

export function GettingStartedBanner({
  activeProfile,
  onSelectProfile,
  onOpenIntake,
}: GettingStartedBannerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="medical-card p-5 sm:p-6 relative">
      {/* Header bar with toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight flex items-center gap-2">
              Welcome to CareSync
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131]">
                How it works
              </span>
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Health coordination for families managing an aging parent or loved one with complex care.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-[#6B7280] hover:text-[#0A0F0D] dark:text-[#9CA3AF] dark:hover:text-white px-2.5 py-1 rounded-lg bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center gap-1.5 transition-colors shrink-0"
        >
          {isCollapsed ? (
            <>
              <span>Show guide</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Hide guide</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mt-4 pt-4 border-t border-[#E2E7DE] dark:border-[#272727] space-y-4">
          {/* Mission context */}
          <div className="p-3.5 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-xs text-[#27272A] dark:text-[#E5E7EB] leading-relaxed">
            <p>
              When a family member visits multiple specialists, clinics, and labs, their records are scattered across different portals and paper summaries. 
              <strong> CareSync connects those fragmented pieces</strong>, automatically checks for safety risks (like medications that clash with kidney function), 
              and creates a clear, 1-page brief for your next doctor appointment.
            </p>
          </div>

          {/* 3 Step Visual Guide (Asymmetric Flow) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#EBF7F0] dark:bg-[#181818] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-bold text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <span className="text-xs font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">Connect or upload records</span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                Upload lab PDFs, after-visit summaries, or consult notes. CareSync unifies everything into one chronological health timeline.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#FEF3C7] dark:bg-[#181818] text-[#D97706] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#313131] font-bold text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <span className="text-xs font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">CareSync spots what changed</span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                Our agent analyzes 90-day trajectory shifts and highlights dangerous drug-disease interactions across different doctors before appointments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#EBF7F0] dark:bg-[#181818] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-bold text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <span className="text-xs font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">Doctor visit prep</span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                Print or copy a concise brief with the exact questions you need to ask the doctor during your rushed 15-minute appointment.
              </p>
            </div>
          </div>

          {/* Profile Switcher & Actions */}
          <div className="p-3.5 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">Current view:</span>
              <div className="inline-flex rounded-lg p-0.5 bg-white dark:bg-[#181818] border border-[#CBD3C6] dark:border-[#272727] text-xs">
                <button
                  type="button"
                  onClick={() => onSelectProfile("eleanor")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    activeProfile === "eleanor"
                      ? "bg-[#0E6238] dark:bg-[#199A59] text-white shadow-xs"
                      : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0A0F0D] dark:hover:text-white"
                  }`}
                >
                  Demo story (Eleanor Vance, 68)
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProfile("custom")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    activeProfile === "custom"
                      ? "bg-[#0E6238] dark:bg-[#199A59] text-white shadow-xs"
                      : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0A0F0D] dark:hover:text-white"
                  }`}
                >
                  My family member (start fresh)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeProfile === "eleanor" ? (
                <div className="text-xs text-[#0E6238] dark:text-[#199A59] bg-[#EBF7F0] dark:bg-[#181818] border border-[#CBD3C6] dark:border-[#313131] px-2.5 py-1 rounded-lg">
                  Notice how CareSync detected Eleanor&apos;s urgent care knee pill (Meloxicam) clashed with her kidney condition.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenIntake}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white font-semibold flex items-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Upload first record</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
