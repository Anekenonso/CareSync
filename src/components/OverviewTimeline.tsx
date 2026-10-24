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
  PlusCircle,
  FileCheck2,
} from "lucide-react";
import { NemotronResponse } from "@/lib/nemotron";

interface OverviewTimelineProps {
  onSelectVisitPrepTab: () => void;
  onOpenIntake: () => void;
  uploadedDocuments?: any[];
}

export function OverviewTimeline({
  onSelectVisitPrepTab,
  onOpenIntake,
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
      {/* 1. Critical Care Safety Alert (Immediate Value) */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/40 border border-rose-500/50 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white uppercase tracking-wider">
                Critical Safety Alert
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Urgent Care Medication (Meloxicam) Conflicts with Kidney Health
              </h3>
            </div>
            <p className="text-xs text-slate-200 mt-2 leading-relaxed">
              On <strong>October 10, 2026</strong>, Eleanor visited QuickCare Urgent Clinic for knee pain and was prescribed <strong>Meloxicam (15mg daily)</strong>. 
              The urgent care doctor did not have her outpatient kidney records. Because Eleanor already takes <strong>Lisinopril (20mg)</strong> and has baseline Stage 3a kidney disease, taking both together caused her kidney blood filtration (eGFR) to drop sharply from <strong>54 down to 42 mL/min (-22%)</strong>.
            </p>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between border-t border-rose-900/50 pt-3 gap-2 text-xs">
              <span className="text-slate-400">
                Cross-referenced across: <strong className="text-teal-300">QuickCare Encounter (Oct 10)</strong> and <strong className="text-rose-400">Quest Lab Results (Oct 18)</strong>
              </span>
              <button
                onClick={onSelectVisitPrepTab}
                className="text-xs text-teal-300 hover:text-teal-200 font-bold underline flex items-center gap-1 shrink-0"
              >
                View Doctor Discussion Questions →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recently Uploaded Documents (if any) */}
      {uploadedDocuments.length > 0 && (
        <div className="glass-panel rounded-2xl p-4 border border-teal-500/40 bg-teal-950/20 space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-teal-400" />
            Newly Uploaded &amp; Ingested Records
          </span>
          <div className="space-y-2">
            {uploadedDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <div>
                    <span className="font-bold text-white block">{doc.fileName}</span>
                    <span className="text-[11px] text-slate-400">
                      {doc.facility} • Ingested into longitudinal memory
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Caregiver Conversational Question Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-teal-500/30 shadow-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90">
        <div className="max-w-3xl">
          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            Ask CareSync about Eleanor&apos;s Health
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Ask any question about Mom&apos;s recent lab tests, medications, or upcoming appointments.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAgentAnalysis();
            }}
            className="mt-3 flex gap-2"
          >
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. What changed in the last 90 days that the doctor should know?"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Caregiver Question Chips */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                const q = "What has changed in the last 90 days that the doctor should know?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors text-[11px]"
            >
              💡 What changed in the last 90 days?
            </button>
            <button
              onClick={() => {
                const q = "Are Eleanor's medications safe together given her kidney labs?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-teal-300 border border-slate-700 transition-colors text-[11px]"
            >
              ⚠️ Check medication safety &amp; kidneys
            </button>
          </div>
        </div>

        {/* Display Agent Response when Available */}
        {analysisResult && (
          <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Evidence-Backed Clinical Synthesis
              </span>
              <button
                onClick={() => setShowThinkingTrace(!showThinkingTrace)}
                className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 flex items-center gap-1"
              >
                <Brain className="w-3 h-3 text-teal-400" />
                {showThinkingTrace ? "Hide Reasoning" : "Inspect Reasoning Trace"}
              </button>
            </div>

            {/* Collapsible Clinical Reasoning Trace */}
            {showThinkingTrace && (analysisResult.thought || analysisResult.rawThought) && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
                <div className="text-teal-400 font-semibold text-[11px]">
                  Nemotron Chain-of-Reasoning Trace:
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-slate-400 max-h-48 overflow-y-auto pr-2 text-[11px]">
                  {analysisResult.thought || analysisResult.rawThought}
                </div>
              </div>
            )}

            {/* Plain-Language Caregiver Summary */}
            <div className="text-xs text-slate-200 leading-relaxed space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <p>
                <strong>Summary for Family:</strong> Over the past 90 days, Eleanor experienced an acute decline in kidney filtration (<strong className="text-rose-400">eGFR dropped from 54 down to 42 mL/min</strong>). 
                This drop directly correlates with a new prescription for <strong className="text-amber-300">Meloxicam (15mg daily)</strong> received at Urgent Care on Oct 10 for knee pain.
              </p>
              <p className="text-slate-300">
                Because Eleanor already takes <strong>Lisinopril (20mg)</strong> for blood pressure and has baseline Stage 3a kidney disease, taking these two medications together restricts blood flow to her kidneys.
              </p>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[11px] text-teal-400">
                  Source: Quest Diagnostics (2026-10-18) &amp; QuickCare Urgent Clinic (2026-10-10)
                </span>
                <button
                  onClick={onSelectVisitPrepTab}
                  className="text-xs text-teal-300 hover:text-white font-semibold underline"
                >
                  See Questions for Dr. Chen →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. 90-Day Lab Shifts at a Glance */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            90-Day Lab Trajectory Shifts
          </h4>
          <span className="text-[11px] text-slate-400">Comparing July Baseline to October Labs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* eGFR Shift */}
          <div className="glass-panel p-3.5 rounded-xl border-l-4 border-l-rose-500">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Kidney Filtration (eGFR)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-400">42</span>
              <span className="text-[11px] text-slate-400">mL/min</span>
              <span className="text-[11px] text-rose-300 flex items-center font-semibold ml-auto">
                <ArrowDownRight className="w-3.5 h-3.5" />
                -22% Drop
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5">
              Baseline: 54 mL/min (July 15). Dropped into Stage 3b range.
            </p>
          </div>

          {/* Creatinine Shift */}
          <div className="glass-panel p-3.5 rounded-xl border-l-4 border-l-rose-500">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Serum Creatinine</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-400">1.82</span>
              <span className="text-[11px] text-slate-400">mg/dL</span>
              <span className="text-[11px] text-rose-300 flex items-center font-semibold ml-auto">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +42% Spike
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5">
              Baseline: 1.28 mg/dL. Indicates kidney filtration stress.
            </p>
          </div>

          {/* Potassium Shift */}
          <div className="glass-panel p-3.5 rounded-xl border-l-4 border-l-amber-500">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Potassium</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-amber-400">5.2</span>
              <span className="text-[11px] text-slate-400">mEq/L</span>
              <span className="text-[11px] text-amber-300 flex items-center font-semibold ml-auto">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Elevated
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5">
              Baseline: 4.4 mEq/L. Needs doctor monitoring.
            </p>
          </div>

          {/* HbA1c */}
          <div className="glass-panel p-3.5 rounded-xl border-l-4 border-l-emerald-500">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Blood Sugar (HbA1c)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">6.9%</span>
              <span className="text-[11px] text-slate-400">Stable</span>
              <span className="text-[11px] text-emerald-300 flex items-center font-semibold ml-auto">
                <ArrowDownRight className="w-3.5 h-3.5" />
                Controlled
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5">
              Baseline: 7.1%. Good diabetic control.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Recent Healthcare Encounters & Attached Documents */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            Recent Healthcare Encounters &amp; Source Documents
          </h4>
          <button
            onClick={onOpenIntake}
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Upload New Document</span>
          </button>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-3 pl-5 space-y-4">
          {/* Event 1: Recent Labs */}
          <div className="relative">
            <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-slate-950"></div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-400">October 18, 2026</span>
                <span className="text-[11px] text-slate-400">Quest Diagnostics</span>
              </div>
              <h5 className="text-xs font-semibold text-white">Outpatient Metabolic &amp; Renal Lab Panel</h5>
              <p className="text-xs text-slate-300 mt-1">
                eGFR plunged to 42 mL/min (down from 54). Serum creatinine elevated to 1.82 mg/dL.
              </p>
              <div className="mt-2 text-[11px] text-teal-300 font-mono">
                Source Document: Quest_Diagnostics_Renal_Panel_Oct2026.pdf
              </div>
            </div>
          </div>

          {/* Event 2: Urgent Care Visit */}
          <div className="relative">
            <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-slate-950"></div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-400">October 10, 2026</span>
                <span className="text-[11px] text-slate-400">QuickCare Urgent Clinic</span>
              </div>
              <h5 className="text-xs font-semibold text-white">Urgent Care Visit for Acute Knee Pain</h5>
              <p className="text-xs text-slate-300 mt-1">
                Prescribed <strong>Meloxicam 15mg daily</strong> for knee flare. Clinic did not have access to Eleanor&apos;s outpatient Lisinopril prescription or baseline kidney labs.
              </p>
              <div className="mt-2 text-[11px] text-teal-300 font-mono">
                Source Document: QuickCare_Urgent_Clinic_Meloxicam_Prescription.pdf
              </div>
            </div>
          </div>

          {/* Event 3: PCP Baseline Visit */}
          <div className="relative">
            <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-teal-500 border-2 border-slate-950"></div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-teal-400">July 15, 2026</span>
                <span className="text-[11px] text-slate-400">Hope Valley Primary Care</span>
              </div>
              <h5 className="text-xs font-semibold text-white">Annual Chronic Care Follow-up with Dr. Marcus Chen</h5>
              <p className="text-xs text-slate-300 mt-1">
                Confirmed stable baseline CKD Stage 3a (eGFR 54 mL/min). Maintained Lisinopril 20mg and Metformin 500mg.
              </p>
              <div className="mt-2 text-[11px] text-teal-300 font-mono">
                Source Document: Hope_Valley_EHR_Progress_Note.pdf
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
