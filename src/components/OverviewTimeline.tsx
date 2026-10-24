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
  Layers,
  ExternalLink,
} from "lucide-react";
import { NemotronResponse } from "@/lib/nemotron";

interface OverviewTimelineProps {
  onSelectVisitPrepTab: () => void;
}

export function OverviewTimeline({ onSelectVisitPrepTab }: OverviewTimelineProps) {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<NemotronResponse | null>(null);
  const [showThinkingTrace, setShowThinkingTrace] = useState(true);

  // Trigger the flagship "What Changed?" agent query
  const handleRunAgentAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "What has changed in the last 90 days that the doctor should know?",
        }),
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
      {/* Flagship Hero Prompt Action Box */}
      <div className="glass-panel-elevated rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                90-Day Longitudinal Synthesis Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">NVIDIA Nemotron 3.5 Lightning</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              &quot;What has changed in the last 90 days that the doctor should know?&quot;
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              CareSync queries Eleanor&apos;s federated records across Zetaris, cross-references recent urgent care encounters with chronic prescriptions, and produces an evidence-backed timeline with explicit source citations.
            </p>
          </div>

          <button
            onClick={handleRunAgentAnalysis}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 shrink-0"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                Analyzing Federated Silos...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run Evidence Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* 90-Day Trajectory Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            90-Day Clinical Metric Shifts (Apr 2026 vs Oct 2026)
          </h4>
          <span className="text-xs text-slate-400 font-mono">Zetaris Federated Unified Labs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* eGFR Shift */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-rose-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">eGFR (CKD-EPI)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-400">42</span>
              <span className="text-xs text-slate-400">mL/min</span>
              <span className="text-xs text-rose-300 flex items-center font-semibold ml-auto">
                <ArrowDownRight className="w-4 h-4" />
                -22.2% Drop
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">54 mL/min</span> (Apr 15) • Stage 3a to 3b acute shift.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Anchor:</span>
              <span className="text-cyan-400">Valley Health Lab (2026-10-21)</span>
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
              Baseline: <span className="font-semibold text-slate-200">1.28 mg/dL</span> (Apr 15) • Exceeds KDIGO AKI stress.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Anchor:</span>
              <span className="text-cyan-400">Valley Health Lab (2026-10-21)</span>
            </div>
          </div>

          {/* Potassium Shift */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-amber-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Serum Potassium</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-amber-400">5.2</span>
              <span className="text-xs text-slate-400">mEq/L</span>
              <span className="text-xs text-amber-300 flex items-center font-semibold ml-auto">
                <ArrowUpRight className="w-4 h-4" />
                Above Normal
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">4.4 mEq/L</span> • Upper threshold 5.0 crossed.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Anchor:</span>
              <span className="text-cyan-400">Valley Health Lab (2026-10-21)</span>
            </div>
          </div>

          {/* HbA1c */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-emerald-500 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Hemoglobin A1c</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">6.9%</span>
              <span className="text-xs text-emerald-300 flex items-center font-semibold ml-auto">
                <ArrowDownRight className="w-4 h-4" />
                Controlled
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Baseline: <span className="font-semibold text-slate-200">7.1%</span> • Favorable glycemic control on Metformin + SGLT2.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1 border-t border-slate-800 pt-1.5">
              <span>Anchor:</span>
              <span className="text-cyan-400">Valley Health Lab (2026-10-21)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Interaction Alert Card */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 border border-rose-500/40 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500 text-white uppercase tracking-wider">
                CRITICAL CONTRAINDICATION
              </span>
              <h4 className="text-base font-bold text-white">
                Acute Hemodynamic Renal Insult: Meloxicam (NSAID) + Chronic Lisinopril (ACEi)
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              On <strong className="text-cyan-300">2026-10-10</strong>, Eleanor presented to Valley Urgent Care for right knee pain and was prescribed <strong>Meloxicam 15mg daily</strong>. Meloxicam was superimposed on her chronic <strong>Lisinopril 20mg</strong> regimen. 
              NSAIDs cause afferent arteriolar constriction while ACE-inhibitors promote efferent vasodilation, precipitating an acute drop in glomerular perfusion in a patient with pre-existing CKD Stage 3a.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-rose-900/40 pt-3 text-xs">
              <div className="text-slate-400 font-mono">
                Evidence: <span className="text-cyan-300">Dr. Robert Alvarez Urgent Care Note (2026-10-10)</span> + <span className="text-rose-400">Lab drop to 42 mL/min (2026-10-21)</span>
              </div>
              <button
                onClick={onSelectVisitPrepTab}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 underline"
              >
                View Physician Visit Brief & Actions →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NVIDIA Nemotron Step-by-Step Reasoning Trace */}
      {analysisResult && (
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  NVIDIA Nemotron 3.5 Lightning — Clinical Reasoning Trace
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Dual Output Verified
                  </span>
                </h4>
                <p className="text-xs text-slate-400">Step-by-step audit of how the agent connected fragmented sources</p>
              </div>
            </div>

            <button
              onClick={() => setShowThinkingTrace(!showThinkingTrace)}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-1"
            >
              {showThinkingTrace ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Collapse Trace
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> View 5 Thinking Steps
                </>
              )}
            </button>
          </div>

          {showThinkingTrace && (
            <div className="space-y-3 mt-4">
              {analysisResult.reasoningTrace.map((step) => (
                <div
                  key={step.step}
                  className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-xs font-bold text-cyan-300 shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-500" />
                        Anchor: {step.evidenceAnchor}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">{step.thought}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clinical Synthesis Summary */}
          <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
            <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Longitudinal Synthesis Conclusion
            </h5>
            <p className="text-xs text-slate-200 leading-relaxed">
              {analysisResult.visitPrep.clinicalSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
