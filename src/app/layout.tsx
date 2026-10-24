import type { Metadata } from "next";
import "./globals.css";
import { ShieldAlert, Database, Brain, HeartPulse, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "CareSync | Family Health Evidence & Coordination Agent",
  description: "An evidence-backed family health coordination agent powered by Zetaris Data Fabric, Meterless H-MEM, and NVIDIA Nemotron 3.5.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#080E1A] text-slate-100 antialiased">
        {/* Top Clinical Safety Guardrail Banner (Mandatory Invariant) */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200/90 flex items-center justify-between no-print z-50">
          <div className="flex items-center gap-2 mx-auto">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="font-semibold text-amber-300">CLINICAL SAFETY NOTICE:</strong> CareSync is an evidence coordination tool for caregivers and does <span className="underline decoration-amber-400 font-medium">not</span> provide medical diagnoses or treatment directives. Always consult your licensed healthcare provider.
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 hidden sm:inline-block">
            NON-DIAGNOSTIC GUARDRAIL ACTIVE
          </span>
        </div>

        {/* Global Navigation Header */}
        <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-white tracking-tight">Care<span className="text-cyan-400">Sync</span></span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Open Agent Hackathon
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Family Health Evidence & Coordination Agent</p>
              </div>
            </div>

            {/* Sponsor Tech Status Indicators */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs">
              {/* Zetaris Status */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400 hidden md:inline">Data Fabric:</span>
                <span className="text-cyan-300 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Zetaris Live
                </span>
              </div>

              {/* Meterless Status */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-slate-400 hidden md:inline">Memory:</span>
                <span className="text-teal-300 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Meterless H-MEM
                </span>
              </div>

              {/* NVIDIA Nemotron Status */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <Brain className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400 hidden lg:inline">Reasoning:</span>
                <span className="text-emerald-300 font-medium">Nemotron 3.5</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Application Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500 no-print">
          <p>CareSync — Built for Open Agent Hackathon 2026. Powered by Zetaris Data Fabric, Meterless H-MEM, and NVIDIA Nemotron 3.5 Lightning.</p>
        </footer>
      </body>
    </html>
  );
}
