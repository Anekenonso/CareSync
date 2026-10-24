import type { Metadata } from "next";
import "./globals.css";
import { ShieldAlert, HeartPulse, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "CareSync | Family Health Evidence & Coordination",
  description: "A calm, evidence-backed health coordination agent for family caregivers managing an aging parent's chronic care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#070C16] text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
        {/* Top Clinical Safety Guardrail Notice */}
        <div className="bg-amber-950/40 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-200/90 no-print z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="font-semibold text-amber-300">Caregiver Notice:</strong> CareSync organizes health records and prepares questions for doctor appointments. It does <span className="underline decoration-amber-400 font-medium">not</span> provide medical diagnoses or treatment directives.
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300/80 hidden md:inline-block">
              Non-Diagnostic
            </span>
          </div>
        </div>

        {/* Global Navigation Header */}
        <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">Care<span className="text-teal-400">Sync</span></span>
                <span className="text-xs text-slate-400 ml-2 hidden sm:inline">Family Health Coordination</span>
              </div>
            </div>

            {/* Care Context & Status */}
            <div className="flex items-center gap-3 text-xs">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-slate-400">Caring for:</span>
                <span className="font-semibold text-white">Eleanor Vance (Mother)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>Records Connected</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Application Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 no-print">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>CareSync — Empowering family caregivers with evidence-backed health clarity.</p>
            <p className="text-slate-600">All synthesized observations cite original clinical records.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
