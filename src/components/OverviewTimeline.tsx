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
      {/* 1. Critical Care Safety Alert (Reassuring, Clear, Hospital-Grade) */}
      <div className="rounded-2xl p-5 sm:p-6 border-2 border-rose-300 dark:border-rose-500/50 bg-gradient-to-r from-rose-50/90 via-white to-rose-50/60 dark:from-rose-950/40 dark:via-[#0F1A2E] dark:to-rose-950/30 shadow-sm relative overflow-hidden transition-colors">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-700/60 shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                Critical Safety Alert
              </span>
              <span className="text-xs font-semibold text-rose-700 dark:text-rose-400">
                Drug-Disease Contraindication
              </span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Urgent Care Medication (Meloxicam) Conflicts with Kidney Function
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2 leading-relaxed">
              On <strong>October 10, 2026</strong>, Eleanor visited QuickCare Urgent Clinic for knee pain and was prescribed <strong>Meloxicam (15mg daily)</strong>. 
              The urgent care doctor did not have access to her outpatient kidney records. Because Eleanor already takes <strong>Lisinopril (20mg)</strong> and has baseline Stage 3a chronic kidney disease, taking both together restricted blood flow to her kidneys, causing her filtration rate (eGFR) to drop sharply from <strong>54 down to 42 mL/min (-22%)</strong>.
            </p>
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between border-t border-rose-200 dark:border-rose-900/50 pt-3.5 gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-400">
                Cross-referenced across: <strong className="text-sky-700 dark:text-sky-300">QuickCare Encounter (Oct 10)</strong> and <strong className="text-rose-700 dark:text-rose-400">Quest Lab Results (Oct 18)</strong>
              </span>
              <button
                onClick={onSelectVisitPrepTab}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer"
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
        <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-5 border border-sky-200 dark:border-sky-800 shadow-sm space-y-3 transition-colors">
          <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            Newly Uploaded &amp; Ingested Records
          </span>
          <div className="space-y-2">
            {uploadedDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{doc.fileName}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {doc.facility} • Ingested into longitudinal memory
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold">
                  Verified In-Sync
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Caregiver Conversational Question Bar */}
      <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <Sparkles className="w-5 h-5" />
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ask CareSync about Eleanor&apos;s Health
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
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
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
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
              className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 transition-colors text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
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
          <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Evidence-Backed Clinical Synthesis
              </span>
              <button
                onClick={() => setShowThinkingTrace(!showThinkingTrace)}
                className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                {showThinkingTrace ? "Hide Clinical Reasoning" : "Inspect Clinical Reasoning Trace"}
              </button>
            </div>

            {/* Collapsible Clinical Reasoning Trace */}
            {showThinkingTrace && (analysisResult.thought || analysisResult.rawThought) && (
              <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-xs text-slate-200 space-y-1.5 font-mono shadow-inner">
                <div className="text-teal-400 font-semibold text-[11px]">
                  Clinical Reasoning Trace (Nemotron 70B):
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-slate-300 max-h-48 overflow-y-auto pr-2 text-[11px]">
                  {analysisResult.thought || analysisResult.rawThought}
                </div>
              </div>
            )}

            {/* Plain-Language Caregiver Summary */}
            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2.5 bg-sky-50/70 dark:bg-slate-900/70 p-5 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm">
              <p>
                <strong>Summary for Family:</strong> Over the past 90 days, Eleanor experienced an acute decline in kidney filtration (<strong className="text-rose-600 dark:text-rose-400">eGFR dropped from 54 down to 42 mL/min</strong>). 
                This drop directly correlates with a new prescription for <strong className="text-amber-700 dark:text-amber-300">Meloxicam (15mg daily)</strong> received at Urgent Care on Oct 10 for knee pain.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Because Eleanor already takes <strong>Lisinopril (20mg)</strong> for blood pressure and has baseline Stage 3a kidney disease, taking these two medications together restricts blood flow to her kidneys.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-sky-200/60 dark:border-slate-800/80">
                <span className="text-[11px] text-teal-800 dark:text-teal-300 font-medium">
                  Source: Quest Diagnostics (2026-10-18) &amp; QuickCare Urgent Clinic (2026-10-10)
                </span>
                <button
                  onClick={onSelectVisitPrepTab}
                  className="text-xs text-sky-700 dark:text-sky-400 hover:underline font-bold self-start sm:self-auto cursor-pointer"
                >
                  See 3 Questions for Dr. Chen →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. 90-Day Lab Shifts at a Glance (Telemetry Vitals) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            90-Day Lab Trajectory Shifts (Metabolic &amp; Renal Panel)
          </h4>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Comparing July Baseline to October Labs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* eGFR Shift */}
          <div className="bg-white dark:bg-[#0F1A2E] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 border-l-rose-500 shadow-sm transition-colors">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
              Kidney Filtration (eGFR)
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">42</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">mL/min</span>
              <span className="text-[11px] text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full flex items-center font-bold ml-auto border border-rose-200 dark:border-rose-900">
                <ArrowDownRight className="w-3.5 h-3.5" />
                -22% Drop
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">
              Baseline: 54 mL/min (July 15). Dropped into Stage 3b range.
            </p>
          </div>

          {/* Creatinine Shift */}
          <div className="bg-white dark:bg-[#0F1A2E] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 border-l-rose-500 shadow-sm transition-colors">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
              Serum Creatinine
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">1.82</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">mg/dL</span>
              <span className="text-[11px] text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full flex items-center font-bold ml-auto border border-rose-200 dark:border-rose-900">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +42% Spike
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">
              Baseline: 1.28 mg/dL. Indicates kidney filtration stress.
            </p>
          </div>

          {/* Potassium Shift */}
          <div className="bg-white dark:bg-[#0F1A2E] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-sm transition-colors">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
              Serum Potassium
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">5.2</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">mEq/L</span>
              <span className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full flex items-center font-bold ml-auto border border-amber-200 dark:border-amber-900">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Elevated
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">
              Baseline: 4.4 mEq/L. Needs close clinical monitoring.
            </p>
          </div>

          {/* HbA1c */}
          <div className="bg-white dark:bg-[#0F1A2E] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-sm transition-colors">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
              Blood Sugar (HbA1c)
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">6.9%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Stable</span>
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center font-bold ml-auto border border-emerald-200 dark:border-emerald-900">
                <ArrowDownRight className="w-3.5 h-3.5" />
                Controlled
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">
              Baseline: 7.1%. Good diabetic control maintained.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Recent Healthcare Encounters & Attached Records */}
      <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            Recent Healthcare Encounters &amp; Source Documents
          </h4>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            3 Synchronized Records
          </span>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-5 space-y-4">
          {/* Event 1: Recent Labs */}
          <div className="relative">
            <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white dark:border-[#0F1A2E] shadow-xs"></div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">October 18, 2026</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Quest Diagnostics</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Outpatient Metabolic &amp; Renal Lab Panel
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                eGFR plunged to 42 mL/min (down from 54). Serum creatinine elevated to 1.82 mg/dL.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300 font-mono">
                <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Quest_Diagnostics_Renal_Panel_Oct2026.pdf</span>
              </div>
            </div>
          </div>

          {/* Event 2: Urgent Care Visit */}
          <div className="relative">
            <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-[#0F1A2E] shadow-xs"></div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">October 10, 2026</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">QuickCare Urgent Clinic</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Urgent Care Visit for Acute Knee Pain
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Prescribed <strong>Meloxicam 15mg daily</strong> for knee flare. Clinic did not have access to Eleanor&apos;s outpatient Lisinopril prescription or baseline kidney labs.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300 font-mono">
                <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>QuickCare_Urgent_Clinic_Meloxicam_Prescription.pdf</span>
              </div>
            </div>
          </div>

          {/* Event 3: PCP Baseline Visit */}
          <div className="relative">
            <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-teal-500 border-2 border-white dark:border-[#0F1A2E] shadow-xs"></div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400">July 15, 2026</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Hope Valley Primary Care</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Annual Chronic Care Follow-up with Dr. Marcus Chen
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Confirmed stable baseline CKD Stage 3a (eGFR 54 mL/min). Maintained Lisinopril 20mg and Metformin 500mg.
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300 font-mono">
                <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Hope_Valley_EHR_Progress_Note.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
