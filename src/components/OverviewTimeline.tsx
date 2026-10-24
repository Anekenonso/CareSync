"use client";

import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Brain,
  ShieldCheck,
  Calendar,
  FileText,
  Clock,
  ExternalLink,
  Send,
  HelpCircle,
} from "lucide-react";
import { NemotronResponse } from "@/lib/nemotron";

interface OverviewTimelineProps {
  onSelectVisitPrepTab: () => void;
}

export function OverviewTimeline({ onSelectVisitPrepTab }: OverviewTimelineProps) {
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [analysisResult, setAnalysisResult] = useState<NemotronResponse | null>(null);
  const [showThinkingTrace, setShowThinkingTrace] = useState(false);

  // Trigger conversational agent query
  const handleRunAgentAnalysis = async (customPrompt?: string) => {
    const promptToRun = customPrompt || userQuery || "What has changed in the last 90 days that the doctor should know?";
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
      {/* Friendly Caregiver Conversational Query Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-teal-500/30 shadow-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90">
        <div className="max-w-3xl">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400" />
            Ask CareSync about Eleanor&apos;s Health
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Ask any question about Mom&apos;s recent lab changes, medications, or upcoming doctor visits.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAgentAnalysis();
            }}
            className="mt-4 flex gap-2"
          >
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. What changed in the last 90 days that the doctor should know?"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md shadow-teal-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
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
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 text-[11px] self-center mr-1">Suggested:</span>
            <button
              onClick={() => {
                const q = "What has changed in the last 90 days that the doctor should know?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-slate-700 transition-colors"
            >
              💡 What changed in the last 90 days?
            </button>
            <button
              onClick={() => {
                const q = "Are Eleanor's medications safe together given her kidney labs?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-slate-700 transition-colors"
            >
              ⚠️ Check medication safety &amp; kidneys
            </button>
            <button
              onClick={() => {
                const q = "What questions should we ask the primary care doctor next week?";
                setUserQuery(q);
                handleRunAgentAnalysis(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-slate-700 transition-colors"
            >
              📋 Prepare doctor visit questions
            </button>
          </div>
        </div>

        {/* Display Agent Response when Available */}
        {analysisResult && (
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
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
                {showThinkingTrace ? "Hide Reasoning Trace" : "View Clinical Reasoning Trace"}
              </button>
            </div>

            {/* Collapsible Clinical Reasoning Trace (<thought>) */}
            {showThinkingTrace && analysisResult.thought && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 font-mono">
                <div className="text-teal-400 font-semibold mb-1 flex items-center gap-1.5">
                  <span>Chain-of-Reasoning Trace:</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-slate-400 max-h-60 overflow-y-auto pr-2">
                  {analysisResult.thought}
                </div>
              </div>
            )}

            {/* User-facing synthesis narrative */}
            <div className="text-sm text-slate-200 leading-relaxed space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <p>
                <strong>Summary for Caregiver:</strong> Over the past 90 days, Eleanor experienced an acute decline in kidney filtration (<strong className="text-rose-400">eGFR dropped from 54 to 42 mL/min</strong>). 
                This drop directly correlates with a new prescription for <strong className="text-amber-300">Meloxicam (15mg daily)</strong> received at Urgent Care on Oct 10 for knee pain.
              </p>
              <p className="text-xs text-slate-300">
                Because Eleanor already takes <strong>Lisinopril (20mg daily)</strong> for hypertension and has baseline Stage 3a kidney disease, taking these two medications together restricts blood flow through the kidneys.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-teal-400">
                  Source: Quest Diagnostics (2026-10-18) &amp; QuickCare Urgent Clinic (2026-10-10)
                </span>
                <button
                  onClick={onSelectVisitPrepTab}
                  className="text-xs text-teal-300 hover:text-white font-semibold underline flex items-center gap-1"
                >
                  View Doctor Visit Questions →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Critical Care Alert Card */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 border border-rose-500/40 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500 text-white uppercase tracking-wider">
                Critical Safety Alert
              </span>
              <h4 className="text-base font-bold text-white">
                Urgent Care Knee Medication (Meloxicam) Conflicts with Kidney Health
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              On <strong>October 10, 2026</strong>, Eleanor visited QuickCare Urgent Clinic for acute knee pain and was prescribed <strong>Meloxicam 15mg daily</strong>. 
              The urgent care provider did not have access to Eleanor&apos;s outpatient nephrology records. Meloxicam taken alongside her chronic blood pressure medication (<strong>Lisinopril 20mg</strong>) has caused her kidney filtration to decline from <strong>54 to 42 mL/min (-22.2%)</strong>.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-rose-900/40 pt-3 text-xs">
              <div className="text-slate-400">
                Verified across: <span className="text-teal-300">QuickCare Encounter (Oct 10)</span> and <span className="text-rose-400">Quest Lab Results (Oct 18)</span>
              </div>
              <button
                onClick={onSelectVisitPrepTab}
                className="text-xs text-teal-300 hover:text-teal-200 font-semibold underline flex items-center gap-1"
              >
                View Visit Checklist &amp; Questions →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 90-Day Trajectory Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-400" />
            90-Day Lab Shifts at a Glance
          </h4>
          <span className="text-xs text-slate-400">Comparing July 2026 Baseline to October 2026 Labs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* eGFR Shift */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-rose-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Kidney Filtration (eGFR)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-400">42</span>
              <span className="text-xs text-slate-400">mL/min</span>
              <span className="text-xs text-rose-300 flex items-center font-semibold ml-auto">
                <ArrowDownRight className="w-4 h-4" />
                -22.2% Drop
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">54 mL/min</span> (July 15) • Shifted from Stage 3a to 3b.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Source:</span>
              <span className="text-teal-400">Quest Diagnostics (2026-10-18)</span>
            </div>
          </div>

          {/* Creatinine Shift */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-rose-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Serum Creatinine</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-400">1.82</span>
              <span className="text-xs text-slate-400">mg/dL</span>
              <span className="text-xs text-rose-300 flex items-center font-semibold ml-auto">
                <ArrowUpRight className="w-4 h-4" />
                +42.2% Spike
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">1.28 mg/dL</span> (July 15) • Indicates acute kidney stress.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Source:</span>
              <span className="text-teal-400">Quest Diagnostics (2026-10-18)</span>
            </div>
          </div>

          {/* Potassium Shift */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-amber-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Potassium (K+)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-amber-400">5.2</span>
              <span className="text-xs text-slate-400">mEq/L</span>
              <span className="text-xs text-amber-300 flex items-center font-semibold ml-auto">
                <ArrowUpRight className="w-4 h-4" />
                Elevated
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">4.4 mEq/L</span> • Crossed normal threshold (5.0).
            </p>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Source:</span>
              <span className="text-teal-400">Quest Diagnostics (2026-10-18)</span>
            </div>
          </div>

          {/* HbA1c */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-emerald-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Blood Sugar (HbA1c)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">6.9%</span>
              <span className="text-xs text-emerald-300 flex items-center font-semibold ml-auto">
                <ArrowDownRight className="w-4 h-4" />
                Controlled
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">7.1%</span> • Stable diabetic control on Metformin.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Source:</span>
              <span className="text-teal-400">Quest Diagnostics (2026-10-18)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 90-Day Health Event Timeline */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-400" />
          Recent Healthcare Encounters &amp; Timeline
        </h4>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
          {/* Event 1: Recent Labs */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-slate-950"></div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-400">October 18, 2026</span>
                <span className="text-[11px] text-slate-400">Quest Diagnostics</span>
              </div>
              <h5 className="text-sm font-semibold text-white">Outpatient Metabolic &amp; Renal Lab Panel</h5>
              <p className="text-xs text-slate-300 mt-1">
                eGFR plunged to 42 mL/min (down from 54). Serum creatinine spiked to 1.82 mg/dL. Potassium elevated to 5.2 mEq/L.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Citation: <span className="text-teal-300">Quest Lab Report #QD-2026-9812</span>
              </div>
            </div>
          </div>

          {/* Event 2: Urgent Care Visit */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-950"></div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-400">October 10, 2026</span>
                <span className="text-[11px] text-slate-400">QuickCare Urgent Clinic</span>
              </div>
              <h5 className="text-sm font-semibold text-white">Urgent Care Visit for Acute Left Knee Pain</h5>
              <p className="text-xs text-slate-300 mt-1">
                Diagnosed with acute osteoarthritis flare. Prescribed <strong>Meloxicam 15mg PO daily</strong>. Urgent care doctor did not have access to Eleanor&apos;s outpatient baseline kidney records.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Citation: <span className="text-teal-300">QuickCare Encounter Note #QC-44102</span>
              </div>
            </div>
          </div>

          {/* Event 3: PCP Baseline Visit */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-950"></div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-teal-400">July 15, 2026</span>
                <span className="text-[11px] text-slate-400">Hope Valley Primary Care</span>
              </div>
              <h5 className="text-sm font-semibold text-white">Annual Wellness &amp; Chronic Care Follow-up</h5>
              <p className="text-xs text-slate-300 mt-1">
                Dr. Marcus Chen confirmed stable baseline CKD Stage 3a (eGFR 54 mL/min). Regimen confirmed: Lisinopril 20mg daily, Metformin 500mg BID. Blood pressure 128/82 mmHg.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Citation: <span className="text-teal-300">Hope Valley EHR Progress Note #HV-8921</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
