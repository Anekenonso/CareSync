"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  FileSpreadsheet,
  AlertTriangle,
  Stethoscope,
  ArrowRight,
  Sparkles,
  Info,
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
    <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-slate-900/95 via-teal-950/20 to-slate-950 p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-bl from-teal-500/15 via-cyan-500/10 to-transparent pointer-events-none blur-3xl"></div>

      {/* Header bar with toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-sm">
            <Compass className="w-4 h-4 text-teal-300" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Welcome to CareSync
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                How It Works
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              The health coordination agent for families caring for an aging parent or loved one with complex care.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-1.5 transition-colors shrink-0"
        >
          {isCollapsed ? (
            <>
              <span>Show Guide</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Hide Guide</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4">
          {/* Why CareSync exists */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p>
              When a family member visits multiple specialists, clinics, and labs, their records are scattered across different portals and paper summaries. 
              <strong> CareSync connects those fragmented pieces</strong>, automatically checks for safety risks (like medications that clash with kidney function), 
              and creates a clear, 1-page brief for your next doctor appointment.
            </p>
          </div>

          {/* 3 Step Visual Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 relative">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold text-[11px] flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-semibold text-white">Connect or Upload Records</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Upload lab PDFs, after-visit summaries, or connect patient portals. CareSync unifies everything into one chronological health timeline.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 relative">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px] flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-semibold text-white">CareSync Spots What Changed</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Our agent analyzes 90-day trajectory shifts and highlights dangerous drug-disease interactions across different doctors before appointments.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 relative">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-[11px] flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-semibold text-white">1-Click Doctor Visit-Prep</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Print or copy a concise brief with the exact questions you need to ask the doctor during your rushed 15-minute appointment.
              </p>
            </div>
          </div>

          {/* Patient Profile Selector / Action Bar */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">Current View:</span>
              <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-slate-800 text-xs">
                <button
                  onClick={() => onSelectProfile("eleanor")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    activeProfile === "eleanor"
                      ? "bg-teal-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Demo Story (Eleanor Vance, 74)
                </button>
                <button
                  onClick={() => onSelectProfile("custom")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    activeProfile === "custom"
                      ? "bg-teal-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  My Family Member (Start Fresh)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeProfile === "eleanor" ? (
                <div className="text-[11px] text-teal-300/90 bg-teal-950/40 border border-teal-500/30 px-2.5 py-1 rounded-lg">
                  💡 Notice how CareSync detected Eleanor&apos;s urgent care knee pill (Meloxicam) clashed with her kidney condition.
                </div>
              ) : (
                <button
                  onClick={onOpenIntake}
                  className="text-xs px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Upload First Record
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
