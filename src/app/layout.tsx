import type { Metadata } from "next";
import "./globals.css";
import { ShieldAlert, HeartPulse, CheckCircle2 } from "lucide-react";
import { NavigationHeader } from "@/components/NavigationHeader";

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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090F1D] text-slate-900 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white transition-colors duration-200 relative">
        {/* Subtle Ambient Medical Mesh */}
        <div className="medical-ambient-bg" />

        {/* Top Clinical Safety Guardrail Notice */}
        <div className="bg-sky-50/90 dark:bg-sky-950/40 border-b border-sky-100 dark:border-sky-900/40 px-4 py-2 text-xs text-sky-950 dark:text-sky-200 no-print z-50 transition-colors">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>
                <strong className="font-semibold text-sky-900 dark:text-sky-300">Caregiver Advisory:</strong> CareSync organizes health records and prepares questions for doctor appointments. It does <span className="underline decoration-sky-500 font-medium">not</span> provide automated medical diagnoses or treatment directives.
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-sky-200/60 dark:bg-sky-900/60 border border-sky-300/60 dark:border-sky-800 text-sky-900 dark:text-sky-200 hidden md:inline-block">
              Non-Diagnostic • Decision Support
            </span>
          </div>
        </div>

        {/* Global Navigation Header with Clinical Theme Switcher */}
        <NavigationHeader />

        {/* Main Application Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 relative z-10">
          {children}
        </main>

        {/* Clean Clinical Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-[#070C16]/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400 no-print relative z-10 transition-colors">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
              <strong>CareSync</strong> — Empowering family caregivers with evidence-backed health clarity.
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              All synthesized findings cite original lab PDFs, hospital summaries, and doctor progress notes.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
