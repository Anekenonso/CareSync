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
      <body className="min-h-screen flex flex-col bg-[#FAFBF8] dark:bg-[#07100B] text-[#0A0F0D] dark:text-[#F4FBF7] antialiased selection:bg-[#0D6832] selection:text-white transition-colors duration-200 relative">
        {/* Subtle Ambient Medical Mesh */}
        <div className="medical-ambient-bg" />

        {/* Top Clinical Safety Guardrail Notice (GenAI Works Calm Sage & Emerald) */}
        <div className="bg-[#F0FDF4] dark:bg-[#0B1E14] border-b border-[#DCFCE7] dark:border-[#163826] px-4 py-2 text-xs text-[#14532D] dark:text-[#A7F3D0] no-print z-50 transition-colors">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#0D6832] dark:text-[#34D399] shrink-0" />
              <span>
                <strong className="font-semibold text-[#0D6832] dark:text-[#86EFAC]">Caregiver Advisory:</strong> CareSync organizes health records and prepares questions for doctor appointments. It does <span className="underline decoration-[#10B981] font-medium">not</span> provide automated medical diagnoses or treatment directives.
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-[#DCFCE7] dark:bg-[#133222] border border-[#BBF7D0] dark:border-[#1E4D34] text-[#14532D] dark:text-[#86EFAC] hidden md:inline-block">
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
        <footer className="border-t border-[#E3E8DE] dark:border-[#1C3328] bg-white/70 dark:bg-[#0E1B15]/70 py-6 text-center text-xs text-[#71717A] dark:text-[#8FA698] no-print relative z-10 transition-colors">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0D6832] dark:bg-[#10B981] inline-block"></span>
              <strong>CareSync</strong> — Empowering family caregivers with evidence-backed health clarity.
            </p>
            <p className="text-[#71717A] dark:text-[#8FA698]">
              All synthesized findings cite original lab PDFs, hospital summaries, and doctor progress notes.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
