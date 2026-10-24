"use client";

import React, { useState } from "react";
import { Database, Play, Clock, CheckCircle2, Server, ArrowRight } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header & Concept */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              Zetaris Data Fabric Integration
            </span>
            <span className="text-xs text-slate-400 font-mono">Spark SQL Lightning Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white">Federated Clinical Virtualization</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Zetaris queries external health records in-situ without copying or centralizing patient data. Cross-reference hospital outpatient labs, urgent care EHR notes, and pharmacy claims through unified Spark SQL.
          </p>
        </div>

        {/* Live Codespace URL Indicator */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <Server className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Endpoint</span>
            <span className="text-emerald-400 font-mono font-medium">Zetaris Codespace Live</span>
          </div>
        </div>
      </div>

      {/* Query Templates Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0">Sample Queries:</span>
        <button
          onClick={() => {
            const q = "SELECT * FROM zetaris.clinical.labs_unified WHERE patient_id = 'patient-ev-49201';";
            setSql(q);
            handleRunQuery(q);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 whitespace-nowrap"
        >
          Unified Labs (eGFR & Creatinine)
        </button>
        <button
          onClick={() => {
            const q = "SELECT * FROM zetaris.clinical.active_medications_federated;";
            setSql(q);
            handleRunQuery(q);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 whitespace-nowrap"
        >
          Active Medication Roster (Meloxicam & Lisinopril)
        </button>
        <button
          onClick={() => {
            const q = "SELECT * FROM zetaris.clinical.encounter_transcriptions_virtual;";
            setSql(q);
            handleRunQuery(q);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 whitespace-nowrap"
        >
          Urgent Care Encounter Transcriptions
        </button>
      </div>

      {/* Interactive SQL Console */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400">SQL Virtualization Query</span>
          <button
            onClick={() => handleRunQuery()}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            Execute on Zetaris
          </button>
        </div>

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-slate-950/90 border border-slate-800 p-3.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors resize-none shadow-inner"
        />

        {/* Execution Metadata Pill Bar */}
        {result && (
          <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Query {result.status}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {result.executionTimeMs} ms
              </span>
              <span className="text-slate-400">
                Rows: <strong className="text-white">{result.rowCount}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Federated Sources:</span>
              {result.sourceFederation.sourcesQueried.map((src, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[10px] border border-slate-700">
                  {src.split("/").pop() || src}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Query Results Table */}
      {result && result.rows.length > 0 && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Query Result: {result.sourceFederation.virtualizedTables[0]}
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Query ID: {result.queryId}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  {result.columns.map((col) => (
                    <th key={col} className="p-3 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                {result.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    {result.columns.map((col) => (
                      <td key={col} className="p-3 text-slate-200 font-mono text-[11px]">
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
