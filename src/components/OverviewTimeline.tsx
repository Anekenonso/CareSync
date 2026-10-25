"use client";

import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  ShieldCheck,
  Calendar,
  FileText,
  Clock,
  Send,
  FileCheck2,
  ExternalLink,
} from "lucide-react";
import { NemotronResponse } from "@/lib/nemotron";

interface OverviewTimelineProps {
  onSelectVisitPrepTab: () => void;
  uploadedDocuments?: any[];
}

export function OverviewTimeline({
  onSelectVisitPrepTab,
  uploadedDocuments = [],
}: OverviewTimelineProps) {
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [analysisResult, setAnalysisResult] = useState<NemotronResponse | null>(null);
  const [showThinkingTrace, setShowThinkingTrace] = useState(false);

  // Trigger conversational agent query
  const handleRunAgentAnalysis = async (customPrompt?: string) => {
    const promptToRun =
      customPrompt ||
      userQuery ||
      "What has changed in the last 90 days that the doctor should know?";
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToRun }),
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error("Failed to run analysis", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Critical Care Safety Alert (GenAI Works High-Visibility Left Bar + Rose Tint) */}
      <div className="rounded-2xl p-5 sm:p-6 border border-rose-200 dark:border-rose-900/60 border-l-4 border-l-rose-600 bg-gradient-to-r from-rose-50/90 via-white to-rose-50/50 dark:from-rose-950/40 dark:via-[#0E1B15] dark:to-rose-950/20 shadow-sm relative overflow-hidden transition-colors">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-700/60 shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                Critical Safety Alert
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold">
                — DRUG-DISEASE CONTRAINDICATION
              </span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight mt-1">
              Urgent Care Medication (Meloxicam) Conflicts with Kidney Function
            </h3>
            
            <p className="text-xs sm:text-sm text-[#27272A] dark:text-[#D1E0D7] mt-2 leading-relaxed">
              On <strong>October 10, 2026</strong>, Eleanor visited QuickCare Urgent Clinic for knee pain and was prescribed <strong>Meloxicam (15mg daily)</strong>. 
              The urgent care doctor did not have access to her outpatient kidney records. Because Eleanor already takes <strong>Lisinopril (20mg)</strong> and has baseline Stage 3a chronic kidney disease, taking both together restricted blood flow to her kidneys, causing her filtration rate (eGFR) to drop sharply from <strong>54 down to 42 mL/min (-22%)</strong>.
            </p>
            
            <div className="mt-3 p-3 rounded-xl bg-rose-100/60 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 text-xs text-[#27272A] dark:text-[#D1E0D7] leading-relaxed">
              💡 <strong>Why this happens:</strong> Meloxicam narrows the blood vessels entering the kidneys, while Lisinopril widens the vessels exiting them. Taken at the same time, it is like pinching a garden hose at both ends—dropping pressure and cutting blood flow to Mom&apos;s already vulnerable kidneys.
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between border-t border-rose-200 dark:border-rose-900/50 pt-3.5 gap-3 text-xs">
              <span className="text-[#71717A] dark:text-[#8FA698]">
                Cross-referenced across: <strong className="text-[#0D6832] dark:text-[#34D399]">QuickCare Encounter (Oct 10)</strong> and <strong className="text-rose-700 dark:text-rose-400">Quest Lab Results (Oct 18)</strong>
              </span>
              <button
                onClick={onSelectVisitPrepTab}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer min-h-[44px]"
              >
                <span>View Doctor Discussion Questions</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recently Uploaded Documents (if any) */}
      {uploadedDocuments.length > 0 && (
        <div className="bg-white dark:bg-[#0E1B15] rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-3 transition-colors">
          <span className="text-[11px] font-bold text-[#0D6832] dark:text-[#34D399] uppercase tracking-widest flex items-center gap-1.5 font-mono">
            <FileCheck2 className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            — NEWLY UPLOADED &amp; INGESTED RECORDS
          </span>
          <div className="space-y-2">
            {uploadedDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-[#0D6832] dark:text-[#34D399]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0A0F0D] dark:text-[#F4FBF7] block">{doc.fileName}</span>
                    <span className="text-[11px] text-[#71717A] dark:text-[#8FA698]">
                      {doc.facility} • Ingested into longitudinal memory
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold">
                  Verified In-Sync
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Caregiver Conversational Question Bar (GenAI Works Style Input & Evergreen Button) */}
      <div className="bg-white dark:bg-[#0E1B15] rounded-2xl p-6 border border-[#E3E8DE] dark:border-[#1C3328] shadow-sm transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#0D6832] dark:text-[#34D399]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-widest uppercase font-mono">
              — CAREGIVER HEALTH INTELLIGENCE
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight mt-1">
            Ask CareSync about Eleanor&apos;s Health
          </h4>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#8FA698] mt-1">
            Ask any question about Mom&apos;s recent lab tests, medications, or upcoming doctor appointment.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAgentAnalysis();
            }}
            className="mt-4 flex gap-2.5"
          >
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. What changed in the last 90 days that the doctor should know?"
              className="flex-1 bg-[#F3F6F1] dark:bg-[#13241C] border border-[#CBD5C8] dark:border-[#274737] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0A0F0D] dark:text-[#F4FBF7] placeholder-[#71717A] focus:outline-none focus:border-[#0D6832] focus:ring-2 focus:ring-[#0D6832]/20 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-[#0D6832] hover:bg-[#094D25] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Ask</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Caregiver Question Chips */}
          <div className="mt-3.5 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                const q = "What has changed in the last 90 days that the doctor should know?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-[#0D6832] dark:text-[#34D399] border border-emerald-200 dark:border-emerald-800/80 transition-colors text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <span>💡 What changed in the last 90 days?</span>
            </button>
            <button
              onClick={() => {
                const q = "Are Eleanor's medications safe together given her kidney labs?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 transition-colors text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <span>⚠️ Check medication safety &amp; kidneys</span>
            </button>
          </div>
        </div>

        {/* Display Agent Response when Available */}
        {analysisResult && (
          <div className="mt-5 pt-5 border-t border-[#E3E8DE] dark:border-[#1C3328] space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0D6832] dark:text-[#34D399] uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
                — EVIDENCE-BACKED CLINICAL SYNTHESIS
              </span>
              <button
                onClick={() => setShowThinkingTrace(!showThinkingTrace)}
                className="text-[11px] text-[#71717A] dark:text-[#8FA698] hover:text-[#0A0F0D] dark:hover:text-white px-2.5 py-1 rounded-lg bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-[#0D6832] dark:text-[#34D399]" />
                {showThinkingTrace ? "Hide Clinical Reasoning" : "Inspect Clinical Reasoning Trace"}
              </button>
            </div>

            {/* Collapsible Clinical Reasoning Trace */}
            {showThinkingTrace && (analysisResult.thought || analysisResult.rawThought) && (
              <div className="p-4 rounded-xl bg-[#07100B] border border-[#1C3328] text-xs text-[#D1E0D7] space-y-1.5 font-mono shadow-inner">
                <div className="text-[#34D399] font-semibold text-[11px]">
                  Clinical Reasoning Trace (Nemotron 70B):
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-[#D1E0D7] max-h-48 overflow-y-auto pr-2 text-[11px]">
                  {analysisResult.thought || analysisResult.rawThought}
                </div>
              </div>
            )}

            {/* Plain-Language Caregiver Summary */}
            <div className="text-xs sm:text-sm text-[#0A0F0D] dark:text-[#F4FBF7] leading-relaxed space-y-2.5 bg-emerald-50/50 dark:bg-[#13241C]/60 p-5 rounded-2xl border border-emerald-100 dark:border-[#1C3328] shadow-sm">
              <p>
                <strong>Summary for Family:</strong> Over the past 90 days, Eleanor experienced an acute decline in kidney filtration (<strong className="text-rose-600 dark:text-rose-400">eGFR dropped from 54 down to 42 mL/min</strong>). 
                This drop directly correlates with a new prescription for <strong className="text-amber-700 dark:text-amber-300">Meloxicam (15mg daily)</strong> received at Urgent Care on Oct 10 for knee pain.
              </p>
              <p className="text-[#27272A] dark:text-[#D1E0D7]">
                Because Eleanor already takes <strong>Lisinopril (20mg)</strong> for blood pressure and has baseline Stage 3a kidney disease, taking these two medications together restricts blood flow to her kidneys.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-emerald-200/60 dark:border-[#1C3328]">
                <span className="text-[11px] text-[#0D6832] dark:text-[#34D399] font-medium">
                  Source: Quest Diagnostics (2026-10-18) &amp; QuickCare Urgent Clinic (2026-10-10)
                </span>
                <button
                  onClick={onSelectVisitPrepTab}
                  className="text-xs text-[#0D6832] dark:text-[#34D399] hover:underline font-bold self-start sm:self-auto cursor-pointer"
                >
                  See 3 Questions for Dr. Chen →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. 90-Day Lab Shifts at a Glance (Cleanly Aligned Equal-Height Stat Cards) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3.5 gap-1">
          <h4 className="text-[11px] font-bold text-[#0D6832] dark:text-[#34D399] uppercase tracking-widest flex items-center gap-1.5 font-mono">
            <Clock className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            — 90-DAY METABOLIC &amp; RENAL PANEL TRAJECTORY
          </h4>
          <span className="text-[11px] text-[#71717A] dark:text-[#8FA698]">Comparing July Baseline to October Labs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
          {/* eGFR Shift */}
          <div className="bg-white dark:bg-[#0E1B15] p-4 sm:p-5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] border-l-4 border-l-rose-500 shadow-sm transition-all flex flex-col justify-between hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] uppercase tracking-wider block font-semibold font-mono">
                  Kidney Filtration (eGFR)
                </span>
                <span className="text-[10px] text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full flex items-center font-bold border border-rose-200 dark:border-rose-900">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  -22% Drop
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">42</span>
                <span className="text-xs text-[#71717A] dark:text-[#8FA698] font-medium">mL/min</span>
              </div>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-2 font-medium leading-relaxed">
                Dropped into Stage 3b range (Baseline: 54 mL/min in July).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E3E8DE]/70 dark:border-[#1C3328] text-[11px] text-[#71717A] dark:text-[#8FA698] leading-tight">
              💡 <strong>In Plain English:</strong> Measures how many milliliters of blood Mom&apos;s kidneys filter each minute. Higher is better.
            </div>
          </div>

          {/* Creatinine Shift */}
          <div className="bg-white dark:bg-[#0E1B15] p-4 sm:p-5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] border-l-4 border-l-rose-500 shadow-sm transition-all flex flex-col justify-between hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] uppercase tracking-wider block font-semibold font-mono">
                  Serum Creatinine
                </span>
                <span className="text-[10px] text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full flex items-center font-bold border border-rose-200 dark:border-rose-900">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +42% Spike
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">1.82</span>
                <span className="text-xs text-[#71717A] dark:text-[#8FA698] font-medium">mg/dL</span>
              </div>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-2 font-medium leading-relaxed">
                Elevated waste build-up (Baseline: 1.28 mg/dL in July).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E3E8DE]/70 dark:border-[#1C3328] text-[11px] text-[#71717A] dark:text-[#8FA698] leading-tight">
              💡 <strong>In Plain English:</strong> Natural muscle breakdown waste. Healthy kidneys filter it out; a spike means kidneys are under stress.
            </div>
          </div>

          {/* Potassium Shift */}
          <div className="bg-white dark:bg-[#0E1B15] p-4 sm:p-5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] border-l-4 border-l-amber-500 shadow-sm transition-all flex flex-col justify-between hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] uppercase tracking-wider block font-semibold font-mono">
                  Serum Potassium
                </span>
                <span className="text-[10px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full flex items-center font-bold border border-amber-200 dark:border-amber-900">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  Elevated
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">5.2</span>
                <span className="text-xs text-[#71717A] dark:text-[#8FA698] font-medium">mEq/L</span>
              </div>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-2 font-medium leading-relaxed">
                Above safe threshold (Baseline: 4.4 mEq/L in July).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E3E8DE]/70 dark:border-[#1C3328] text-[11px] text-[#71717A] dark:text-[#8FA698] leading-tight">
              💡 <strong>In Plain English:</strong> Key mineral for heart rhythm. When kidneys slow down, potassium builds up and needs close monitoring.
            </div>
          </div>

          {/* HbA1c */}
          <div className="bg-white dark:bg-[#0E1B15] p-4 sm:p-5 rounded-2xl border border-[#E3E8DE] dark:border-[#1C3328] border-l-4 border-l-[#0D6832] shadow-sm transition-all flex flex-col justify-between hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] uppercase tracking-wider block font-semibold font-mono">
                  Blood Sugar (HbA1c)
                </span>
                <span className="text-[10px] text-[#0D6832] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center font-bold border border-emerald-200 dark:border-emerald-900">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  Controlled
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0D6832] dark:text-[#34D399]">6.9%</span>
                <span className="text-xs text-[#71717A] dark:text-[#8FA698] font-medium">Stable</span>
              </div>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-2 font-medium leading-relaxed">
                Diabetic control maintained (Baseline: 7.1% in July).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E3E8DE]/70 dark:border-[#1C3328] text-[11px] text-[#71717A] dark:text-[#8FA698] leading-tight">
              💡 <strong>In Plain English:</strong> Shows average blood sugar over the last 3 months. Eleanor is meeting her target diabetes goal.
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Healthcare Encounters & Attached Records */}
      <div className="bg-white dark:bg-[#0E1B15] rounded-2xl p-5 sm:p-6 border border-[#E3E8DE] dark:border-[#1C3328] shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[11px] font-bold text-[#0D6832] dark:text-[#34D399] uppercase tracking-widest flex items-center gap-1.5 font-mono">
            <Calendar className="w-4 h-4 text-[#0D6832] dark:text-[#34D399]" />
            — SYNCHRONIZED HEALTH ENCOUNTERS &amp; SOURCE RECORDS
          </h4>
          <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] font-medium">
            3 Synchronized Records
          </span>
        </div>

        <div className="relative border-l-2 border-[#E3E8DE] dark:border-[#1C3328] ml-2 sm:ml-3 pl-4 sm:pl-5 space-y-4">
          {/* Event 1: Recent Labs */}
          <div className="relative">
            <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white dark:border-[#0E1B15] shadow-xs"></div>
            <div className="p-4 rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] transition-all hover:border-rose-300 dark:hover:border-rose-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">October 18, 2026</span>
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] font-medium">Quest Diagnostics</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">
                Outpatient Metabolic &amp; Renal Lab Panel
              </h5>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-1 leading-relaxed">
                eGFR plunged to 42 mL/min (down from 54). Serum creatinine elevated to 1.82 mg/dL.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-[#0D6832] dark:text-emerald-300 font-mono max-w-full truncate">
                <FileText className="w-3.5 h-3.5 text-[#0D6832] dark:text-[#34D399] shrink-0" />
                <span className="truncate">Quest_Diagnostics_Renal_Panel_Oct2026.pdf</span>
              </div>
            </div>
          </div>

          {/* Event 2: Urgent Care Visit */}
          <div className="relative">
            <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-[#0E1B15] shadow-xs"></div>
            <div className="p-4 rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] transition-all hover:border-amber-300 dark:hover:border-amber-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">October 10, 2026</span>
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] font-medium">QuickCare Urgent Clinic</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">
                Urgent Care Visit for Acute Knee Pain
              </h5>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-1 leading-relaxed">
                Prescribed <strong>Meloxicam 15mg daily</strong> for knee flare. Clinic did not have access to Eleanor&apos;s outpatient Lisinopril prescription or baseline kidney labs.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-[#0D6832] dark:text-emerald-300 font-mono max-w-full truncate">
                <FileText className="w-3.5 h-3.5 text-[#0D6832] dark:text-[#34D399] shrink-0" />
                <span className="truncate">QuickCare_Urgent_Clinic_Meloxicam_Prescription.pdf</span>
              </div>
            </div>
          </div>

          {/* Event 3: PCP Baseline Visit */}
          <div className="relative">
            <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0D6832] border-2 border-white dark:border-[#0E1B15] shadow-xs"></div>
            <div className="p-4 rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] transition-all hover:border-emerald-300 dark:hover:border-emerald-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="text-xs font-extrabold text-[#0D6832] dark:text-[#34D399]">July 15, 2026</span>
                <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] font-medium">Hope Valley Primary Care</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-[#0A0F0D] dark:text-[#F4FBF7]">
                Annual Chronic Care Follow-up with Dr. Marcus Chen
              </h5>
              <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-1 leading-relaxed">
                Confirmed stable baseline CKD Stage 3a (eGFR 54 mL/min). Maintained Lisinopril 20mg and Metformin 500mg.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-[#0D6832] dark:text-emerald-300 font-mono max-w-full truncate">
                <FileText className="w-3.5 h-3.5 text-[#0D6832] dark:text-[#34D399] shrink-0" />
                <span className="truncate">Hope_Valley_EHR_Progress_Note.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
