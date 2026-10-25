import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ShieldAlert } from "lucide-react";
import { NavigationHeader } from "@/components/NavigationHeader";

export const metadata: Metadata = {
  title: "CareSync | Family Health Evidence & Coordination",
  description: "A calm, plain-language health coordination agent for family caregivers managing an aging parent's chronic care.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/* Instant theme resolver before hydration to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem("caresync_theme");
                if (savedTheme === "dark") {
                  document.documentElement.classList.add("dark");
                } else if (savedTheme === "light") {
                  document.documentElement.classList.remove("dark");
                } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFBF8] dark:bg-[#07100B] text-[#0A0F0D] dark:text-[#F4FBF7] antialiased selection:bg-[#0D6832] selection:text-white relative">
        {/* Subtle Ambient Medical Mesh */}
        <div className="medical-ambient-bg" />

        {/* Top Clinical Safety Guardrail Notice */}
        <div className="bg-[#F0FDF4] dark:bg-[#0B1E14] border-b border-[#DCFCE7] dark:border-[#163826] px-3 sm:px-4 py-2 text-xs text-[#14532D] dark:text-[#A7F3D0] no-print z-30">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
            <div className="flex items-start sm:items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#059669] dark:text-[#34D399] shrink-0 mt-0.5 sm:mt-0" />
              <span className="leading-snug">
                <strong className="font-bold text-[#059669] dark:text-[#86EFAC]">Caregiver Note:</strong> CareSync translates complicated medical reports into plain English for family discussions. It does <span className="underline decoration-[#10B981] font-bold">not</span> replace your doctor&apos;s advice.
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-[#DCFCE7] dark:bg-[#133222] border border-[#BBF7D0] dark:border-[#1E4D34] text-[#14532D] dark:text-[#86EFAC] self-start sm:self-auto shrink-0 font-mono">
              Plain English • Decision Support
            </span>
          </div>
        </div>

        {/* Global Navigation Header with Clinical Theme Switcher */}
        <NavigationHeader />

        {/* Main Application Area (Responsive Mobile Padding) */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 relative z-10">
          {children}
        </main>

        {/* Prominent, Bold & High-Visibility Caregiver Footer */}
        <footer className="mt-8 border-t-2 border-[#CBD5C8] dark:border-[#274737] bg-white dark:bg-[#0E1B15] py-8 text-xs sm:text-sm text-[#27272A] dark:text-[#E2E8F0] no-print relative z-10 shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E3E8DE] dark:border-[#1C3328]">
              {/* Brand and Mission */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#00D287] inline-block shrink-0 shadow-xs"></span>
                  <strong className="text-base font-extrabold text-[#0A0F0D] dark:text-white tracking-tight">
                    Care<span className="text-[#059669] dark:text-[#34D399]">Sync</span>
                  </strong>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#059669] dark:text-emerald-300 font-bold font-mono">
                    Family Health Clarity
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#3F3F46] dark:text-[#CBD5E1] font-medium max-w-xl leading-relaxed">
                  CareSync translates doctor encounter notes, medication changes, and lab results into everyday English so ordinary families know what changed and what to ask.
                </p>
              </div>

              {/* Safety & Emergency Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs max-w-md shrink-0">
                <strong className="font-bold block mb-1">⚠️ Urgent Medical Notice:</strong>
                If your loved one is experiencing severe chest pain, breathing difficulties, or acute confusion, call 911 or visit the nearest emergency room immediately.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-[#52525B] dark:text-[#94A3B8] pt-1">
              <p>
                © {new Date().getFullYear()} CareSync. Dedicated to family caregivers and patient health safety.
              </p>
              <div className="flex items-center gap-3">
                <span>All source records verified</span>
                <span>•</span>
                <span>HIPAA-Safe Data Processing</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
