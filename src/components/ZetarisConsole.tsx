"use client";

import React, { useState } from "react";
import { Database, Play, Clock, CheckCircle2, Server } from "lucide-react";
import { ZetarisQueryResponse } from "@/types";

export function ZetarisConsole() {
  const [sql, setSql] = useState("SELECT * FROM zetaris.clinical.labs_unified WHERE patient_id = 'patient-ev-49201';");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ZetarisQueryResponse | null>(null);

  const handleRunQuery = async (queryText?: string) => {
    const queryToRun = queryText || sql;
    setLoading(true);
    try {
      const res = await fetch("/api/zetaris/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: queryToRun }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Zetaris query error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] font-semibold flex items-center gap-1.5 font-mono">
              <Database className="w-3.5 h-3.5" />
              Zetaris data fabric integration
            </span>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">Spark SQL engine</span>
          </div>
          <h3 className="text-base font-bold text-[#0A0F0D] dark:text-[#FFFFFF]">Federated clinical virtualization</h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 max-w-2xl leading-relaxed text-pretty">
            Zetaris queries external health records in-situ without copying patient data. Cross-reference outpatient labs, urgent care EHR notes, and pharmacy claims through unified Spark SQL.
          </p>
        </div>

        {/* Endpoint Indicator */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-xs">
          <Server className="w-4 h-4 text-[#0E6238] dark:text-[#199A59]" />
          <div>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider block font-mono">Endpoint</span>
            <span className="text-[#0E6238] dark:text-[#199A59] font-mono font-semibold">Zetaris Spark SQL live</span>
          </div>
        </div>
      </div>

      {/* Query Templates Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[#6B7280] dark:text-[#9CA3AF] font-semibold shrink-0">Sample queries:</span>
        <button
          type="button"
          onClick={() => {
            const q = "SELECT * FROM zetaris.clinical.labs_unified WHERE patient_id = 'patient-ev-49201';";
            setSql(q);
            handleRunQuery(q);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#1F1F1F] dark:hover:bg-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] border border-[#CBD3C6] dark:border-[#313131] whitespace-nowrap transition-colors cursor-pointer"
        >
          Unified labs (eGFR and Creatinine)
        </button>
        <button
          type="button"
          onClick={() => {
            const q = "SELECT * FROM zetaris.clinical.active_medications_federated;";
            setSql(q);
            handleRunQuery(q);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#1F1F1F] dark:hover:bg-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] border border-[#CBD3C6] dark:border-[#313131] whitespace-nowrap transition-colors cursor-pointer"
        >
          Active medications (Meloxicam and Lisinopril)
        </button>
        <button
          type="button"
          onClick={() => {
            const q = "SELECT * FROM zetaris.clinical.encounter_transcriptions_virtual;";
            setSql(q);
            handleRunQuery(q);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#F4F6F2] hover:bg-[#E2E7DE] dark:bg-[#1F1F1F] dark:hover:bg-[#272727] text-[#0A0F0D] dark:text-[#FFFFFF] border border-[#CBD3C6] dark:border-[#313131] whitespace-nowrap transition-colors cursor-pointer"
        >
          Urgent care encounter notes
        </button>
      </div>

      {/* Interactive SQL Console */}
      <div className="medical-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF]">SQL virtualization query</span>
          <button
            type="button"
            onClick={() => handleRunQuery()}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-ring disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{loading ? "Executing..." : "Execute on Zetaris"}</span>
          </button>
        </div>

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-[#000000] border border-[#272727] p-3.5 text-xs font-mono text-[#199A59] focus-ring transition-colors resize-none shadow-inner"
        />

        {/* Execution Metadata Pill Bar */}
        {result && (
          <div className="mt-4 p-3 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-[#0E6238] dark:text-[#199A59] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Query {result.status}
              </span>
              <span className="text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5" />
                {result.executionTimeMs} ms
              </span>
              <span className="text-[#6B7280] dark:text-[#9CA3AF] tabular-nums">
                Rows: <strong className="text-[#0A0F0D] dark:text-[#FFFFFF]">{result.rowCount}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              <span>Federated sources:</span>
              {result.sourceFederation.sourcesQueried.map((src, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-[#181818] text-[#0A0F0D] dark:text-[#FFFFFF] font-mono border border-[#CBD3C6] dark:border-[#313131]">
                  {src.split("/").pop() || src}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Query Results Table */}
      {result && result.rows.length > 0 && (
        <div className="medical-card p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A0F0D] dark:text-[#FFFFFF]">
              Query result: {result.sourceFederation.virtualizedTables[0]}
            </h4>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">Query ID: {result.queryId}</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E2E7DE] dark:border-[#272727]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F6F2] dark:bg-[#1F1F1F] text-[#27272A] dark:text-[#E5E7EB] border-b border-[#E2E7DE] dark:border-[#272727] uppercase text-xs tracking-wider">
                <tr>
                  {result.columns.map((col) => (
                    <th key={col} className="p-3 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7DE] dark:divide-[#272727] bg-white dark:bg-[#181818]">
                {result.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F4F6F2]/50 dark:hover:bg-[#1F1F1F]/40 transition-colors">
                    {result.columns.map((col) => (
                      <td key={col} className="p-3 text-[#27272A] dark:text-[#E5E7EB] font-mono text-xs tabular-nums">
                        {typeof row[col] === "object" ? JSON.stringify(row[col]) : String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
