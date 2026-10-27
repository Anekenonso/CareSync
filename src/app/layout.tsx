import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { ShieldAlert } from "lucide-react";
import { NavigationHeader } from "@/components/NavigationHeader";
import { CaregiverProvider } from "@/context/CaregiverContext";
import { Analytics } from "@vercel/analytics/next";

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
      <body className="min-h-[100dvh] flex flex-col bg-[#FAFBF8] dark:bg-[#000000] text-[#0A0F0D] dark:text-[#FFFFFF] antialiased selection:bg-[#0E6238] selection:text-white relative">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-[#181818] focus:text-[#0E6238] dark:focus:text-[#199A59] focus:border focus:border-[#CBD3C6] dark:focus:border-[#272727] focus:rounded-lg focus:shadow-md focus:text-sm font-semibold"
        >
          Skip to content
        </a>

        {/* Tactile Grain Overlay */}
        <div className="grain-overlay" />

        {/* Top Clinical Safety Guardrail Notice */}
        <aside aria-label="Clinical notice" className="bg-[#EBF7F0] dark:bg-[#181818] border-b border-[#E2E7DE] dark:border-[#272727] px-4 py-2 text-xs text-[#0E6238] dark:text-[#E5E7EB] no-print z-30">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-start sm:items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#0E6238] dark:text-[#199A59] shrink-0 mt-0.5 sm:mt-0" />
              <span className="leading-snug">
                <strong className="font-semibold text-[#0E6238] dark:text-[#199A59]">Caregiver note:</strong> CareSync translates complicated medical reports into plain English for family discussions. It does not replace your physician&apos;s medical advice.
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#313131] text-[#0E6238] dark:text-[#199A59] self-start sm:self-auto shrink-0 font-mono tabular-nums">
              Plain English • Decision support
            </span>
          </div>
        </aside>

        <CaregiverProvider>
          {/* Global Navigation Header with Floating Island Island Design */}
          <NavigationHeader />

          {/* Main Application Area */}
          <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
            {children}
          </main>

          {/* Clean, Visible Caregiver Footer with Legal & Compliance */}
          <footer className="mt-12 border-t border-[#E2E7DE] dark:border-[#272727] bg-[#FFFFFF] dark:bg-[#181818] py-6 text-xs text-[#6B7280] dark:text-[#9CA3AF] no-print relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0E6238] dark:bg-[#199A59] inline-block shrink-0"></span>
                <p className="text-[#0A0F0D] dark:text-[#FFFFFF] font-medium">
                  © {new Date().getFullYear()} <strong className="font-semibold text-[#0E6238] dark:text-[#199A59]">CareSync</strong>. Family health evidence and longitudinal coordination.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 font-medium">
                <span className="text-[#0A0F0D] dark:text-[#E5E7EB]">All source records verified</span>
                <span className="text-[#CBD3C6] dark:text-[#313131]">•</span>
                <span>HIPAA-safe data processing</span>
                <span className="text-[#CBD3C6] dark:text-[#313131]">•</span>
                <Link href="/clinical-safety" className="hover:text-[#0E6238] dark:hover:text-[#199A59] transition-colors underline-offset-2 hover:underline">
                  Clinical safety policy
                </Link>
                <span className="text-[#CBD3C6] dark:text-[#313131]">•</span>
                <Link href="/privacy-terms" className="hover:text-[#0E6238] dark:hover:text-[#199A59] transition-colors underline-offset-2 hover:underline">
                  Privacy and terms
                </Link>
              </div>
            </div>
          </footer>
        </CaregiverProvider>
        <Analytics />
      </body>
    </html>
  );
}
