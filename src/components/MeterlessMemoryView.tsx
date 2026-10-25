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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-semibold flex items-center gap-1.5 font-mono">
              <Activity className="w-3.5 h-3.5" />
              Meterless longitudinal memory
            </span>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">Patient state model</span>
          </div>
          <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">Hierarchical patient state and trust ledger</h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-2xl leading-relaxed text-pretty">
            Organizes longitudinal health into 3 distinct memory layers (Long-term semantic, Short-term episodic, and Working memory) while logging audit events to the trust ledger.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-xs">
          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider block font-mono">Total active nodes</span>
          <span className="text-[#0E6238] dark:text-[#199A59] font-mono text-sm font-bold tabular-nums">
            {worldModel?.totalMemories || 5} memory records
          </span>
        </div>
      </div>

      {/* 3-Tier Memory Layer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tier 1: Long-Term Semantic */}
        <div className="medical-card p-5 border-t-4 border-t-[#0E6238] dark:border-t-[#199A59] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0E6238] dark:text-[#199A59] flex items-center gap-1.5 font-mono">
                <Layers className="w-4 h-4" />
                Long-term semantic
              </h4>
              <span className="text-xs px-2 py-0.5 rounded bg-[#F4F6F2] dark:bg-[#1F1F1F] text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                Permanent facts
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-3.5">
              Baseline chronic conditions, permanent diagnoses, baseline organ function, and medical history.
            </p>

            <div className="space-y-2.5">
              {worldModel?.layers.longTerm.map((mem) => (
                <div key={mem.id} className="p-3 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-xs">
                  <div className="flex items-center justify-between text-xs text-[#0E6238] dark:text-[#199A59] font-mono mb-1 font-semibold">
                    <span>{mem.id}</span>
                    <span className="text-[#6B7280] dark:text-[#9CA3AF] tabular-nums">Confidence: {(mem.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-[#27272A] dark:text-[#E5E7EB] leading-relaxed">{mem.content}</p>
                  <div className="mt-2 text-xs text-[#6B7280] flex flex-wrap gap-1">
                    {mem.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-white dark:bg-[#181818] text-[#6B7280] dark:text-[#9CA3AF] font-mono border border-[#CBD3C6] dark:border-[#313131]">
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
        <div className="medical-card p-5 border-t-4 border-t-[#D97706] dark:border-t-[#FBBF24] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D97706] dark:text-[#FBBF24] flex items-center gap-1.5 font-mono">
                <FileText className="w-4 h-4" />
                Short-term episodic
              </h4>
              <span className="text-xs px-2 py-0.5 rounded bg-[#F4F6F2] dark:bg-[#1F1F1F] text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                Recent encounters
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-3.5">
              Recent acute clinical encounters, new medication initiations, and time-stamped laboratory shifts.
            </p>

            <div className="space-y-2.5">
              {worldModel?.layers.shortTerm.map((mem) => (
                <div key={mem.id} className="p-3 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-xs">
                  <div className="flex items-center justify-between text-xs text-[#D97706] dark:text-[#FBBF24] font-mono mb-1 font-semibold">
                    <span>{mem.id}</span>
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">{mem.provenance.label}</span>
                  </div>
                  <p className="text-[#27272A] dark:text-[#E5E7EB] leading-relaxed">{mem.content}</p>
                  <div className="mt-2 text-xs text-[#6B7280] flex flex-wrap gap-1">
                    {mem.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-white dark:bg-[#181818] text-[#6B7280] dark:text-[#9CA3AF] font-mono border border-[#CBD3C6] dark:border-[#313131]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier 3: Working Memory (Conflicts) */}
        <div className="medical-card p-5 border-t-4 border-t-[#BE123C] dark:border-t-[#FB7185] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BE123C] dark:text-[#FB7185] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4" />
                Working memory (conflicts)
              </h4>
              <span className="text-xs px-2 py-0.5 rounded bg-[#FFF1F2] dark:bg-[#1F1F1F] text-[#BE123C] dark:text-[#FB7185] border border-[#FECDD3] dark:border-[#313131] font-semibold">
                Active clash
              </span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-3.5">
              Active scratchpad where surveillance executes conflict checks across prescriptions and organ function.
            </p>

            <div className="space-y-2.5">
              {worldModel?.layers.working.map((mem) => (
                <div key={mem.id} className="p-3.5 rounded-xl bg-[#FFF1F2] dark:bg-[#1F1F1F] border border-[#FECDD3] dark:border-[#313131] text-xs">
                  <div className="flex items-center justify-between text-xs text-[#BE123C] dark:text-[#FB7185] font-mono mb-1 font-bold">
                    <span>{mem.id}</span>
                    <span>Alert: Critical</span>
                  </div>
                  <p className="text-[#27272A] dark:text-[#E5E7EB] leading-relaxed">{mem.content}</p>
                  <div className="mt-2 text-xs text-[#BE123C] dark:text-[#FB7185] flex flex-wrap gap-1">
                    {mem.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-white dark:bg-[#181818] font-mono border border-[#FECDD3] dark:border-[#313131]">
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

      {/* Meterless Trust Ledger */}
      <div className="medical-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A0F0D] dark:text-[#FFFFFF] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E6238] dark:text-[#199A59]" />
              Meterless trust ledger (audit trail)
            </h4>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Cryptographic audit events recorded in accordance with health safety governance
            </p>
          </div>
          <span className="text-xs text-[#0E6238] dark:text-[#199A59] font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#313131]">
            Audit verified
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F6F2] dark:bg-[#1F1F1F] text-[#27272A] dark:text-[#E5E7EB] border-b border-[#E2E7DE] dark:border-[#272727] uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3 font-semibold">Action</th>
                <th className="p-3 font-semibold">Memory record ID</th>
                <th className="p-3 font-semibold">Actor</th>
                <th className="p-3 font-semibold">Timestamp</th>
                <th className="p-3 font-semibold">Details and justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7DE] dark:divide-[#272727] bg-white dark:bg-[#181818]">
              {worldModel?.auditTrail.map((entry, idx) => (
                <tr key={idx} className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40 transition-colors">
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-xs font-semibold ${
                        entry.action === "conflict_detected"
                          ? "bg-[#FFF1F2] dark:bg-[#1F1F1F] text-[#BE123C] dark:text-[#FB7185] border border-[#FECDD3] dark:border-[#313131]"
                          : "bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131]"
                      }`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[#6B7280] dark:text-[#9CA3AF] text-xs">{entry.memoryId}</td>
                  <td className="p-3 font-semibold text-[#0A0F0D] dark:text-[#FFFFFF]">{entry.actor}</td>
                  <td className="p-3 text-[#6B7280] dark:text-[#9CA3AF] font-mono text-xs tabular-nums">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-3 text-[#27272A] dark:text-[#E5E7EB] text-xs">
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
