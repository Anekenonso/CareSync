"use client";

import React, { useEffect, useState } from "react";
import { Activity, Layers, ShieldCheck, FileText } from "lucide-react";
import { CareSyncPatientWorldModel } from "@/lib/meterless/careSyncMemory";

export function MeterlessMemoryView() {
  const [worldModel, setWorldModel] = useState<CareSyncPatientWorldModel | null>(null);

  useEffect(() => {
    fetch("/api/meterless")
      .then((res) => res.json())
      .then((data) => setWorldModel(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-semibold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Meterless H-MEM Longitudinal Memory
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Patient State Model</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Hierarchical Patient State &amp; Trust Ledger</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Meterless organizes Eleanor&apos;s longitudinal health into 3 distinct memory layers (Long-Term Semantic, Short-Term Episodic, and Working Memory) while logging immutable audit events to the Trust Ledger.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Active Nodes</span>
          <span className="text-teal-700 dark:text-teal-400 font-mono text-base font-bold">
            {worldModel?.totalMemories || 5} Memory Records
          </span>
        </div>
      </div>

      {/* 3-Tier Memory Layer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tier 1: Long-Term Semantic */}
        <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 border-t-4 border-t-sky-500 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Long-Term Semantic
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                Permanent Facts
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3.5">
              Baseline chronic conditions, permanent diagnoses, baseline organ function, and standing medical history.
            </p>

            <div className="space-y-2.5">
              {worldModel?.layers.longTerm.map((mem) => (
                <div key={mem.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-sky-700 dark:text-sky-400 font-mono mb-1 font-semibold">
                    <span>{mem.id}</span>
                    <span className="text-slate-500 dark:text-slate-400">Confidence: {(mem.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{mem.content}</p>
                  <div className="mt-2 text-[10px] text-slate-500 flex flex-wrap gap-1">
                    {mem.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier 2: Short-Term Episodic */}
        <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 border-t-4 border-t-teal-500 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Short-Term Episodic
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                Recent Encounters
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3.5">
              Recent acute clinical encounters, new medication initiations, and time-stamped laboratory shifts.
            </p>

            <div className="space-y-2.5">
              {worldModel?.layers.shortTerm.map((mem) => (
                <div key={mem.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-teal-700 dark:text-teal-400 font-mono mb-1 font-semibold">
                    <span>{mem.id}</span>
                    <span className="text-slate-500 dark:text-slate-400">Provenance: {mem.provenance.label}</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{mem.content}</p>
                  <div className="mt-2 text-[10px] text-slate-500 flex flex-wrap gap-1">
                    {mem.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier 3: Working Memory & Conflict Detection */}
        <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 border-t-4 border-t-rose-500 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Working Memory (Conflicts)
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-semibold">
                Active Conflict
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3.5">
              Real-time scratchpad where Nemotron executes conflict detection across active prescriptions and organ function.
            </p>

            <div className="space-y-2.5">
              {worldModel?.layers.working.map((mem) => (
                <div key={mem.id} className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-rose-700 dark:text-rose-400 font-mono mb-1 font-bold">
                    <span>{mem.id}</span>
                    <span>ALERT: CRITICAL</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{mem.content}</p>
                  <div className="mt-2 text-[10px] text-rose-700 dark:text-rose-300 flex flex-wrap gap-1">
                    {mem.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 font-mono border border-rose-200 dark:border-rose-800/50">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meterless Trust Ledger (Audit Trail) */}
      <div className="bg-white dark:bg-[#0F1A2E] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Meterless Trust Ledger (Tamper-Proof Audit Trail)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cryptographic audit events recorded in accordance with Meterless AGENTS.md Section 9.1
            </p>
          </div>
          <span className="text-xs text-emerald-800 dark:text-emerald-300 font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
            AUDIT ACTIVE
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 font-semibold">Action</th>
                <th className="p-3 font-semibold">Memory Record ID</th>
                <th className="p-3 font-semibold">Actor</th>
                <th className="p-3 font-semibold">Timestamp</th>
                <th className="p-3 font-semibold">Details / Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950/40">
              {worldModel?.auditTrail.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        entry.action === "conflict_detected"
                          ? "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                          : "bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                      }`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-300 text-[11px]">{entry.memoryId}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{entry.actor}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 text-[11px]">
                    {entry.details?.reason ? String(entry.details.reason) : JSON.stringify(entry.details || {})}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
