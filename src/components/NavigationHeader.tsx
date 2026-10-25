"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, Sun, Moon, UserCheck } from "lucide-react";
import { useCaregiver } from "@/context/CaregiverContext";

export function NavigationHeader() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { currentPatient, loadDemoPatient, clearPatient } = useCaregiver();

  useEffect(() => {
    setMounted(true);
    // Directly check DOM class which is already populated by layout.tsx script
    const currentlyDark = document.documentElement.classList.contains("dark");
    setIsDark(currentlyDark);
  }, []);

  const toggleTheme = () => {
    const isNowDark = document.documentElement.classList.contains("dark");
    if (isNowDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("caresync_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("caresync_theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="border-b border-[#E3E8DE] dark:border-[#1C3328] bg-white dark:bg-[#0E1B15] sticky top-0 z-40 no-print shadow-xs">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand (Clicking logo anywhere immediately returns home and refreshes state) */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl transition-transform active:scale-98 cursor-pointer"
          title="CareSync - Return to Home"
          aria-label="CareSync Home - Return to main timeline"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D287] via-[#10B981] to-[#059669] flex items-center justify-center shadow-md shadow-emerald-500/25 text-white ring-2 ring-emerald-300/40 dark:ring-emerald-400/30 shrink-0 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-lg text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Care<span className="text-[#059669] dark:text-[#34D399]">Sync</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-[#059669] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 tracking-wide uppercase shadow-xs">
                Family Care
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-medium block -mt-0.5 truncate max-w-[170px] sm:max-w-none">
              Plain-Language Health Clarity
            </span>
          </div>
        </button>

        {/* Right Side: Family Proxy Status & Instant Glitch-Free Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Active Patient Indicator (shown only when a record is active) */}
          {currentPatient && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F6F1] dark:bg-[#13241C] border border-[#CBD5C8] dark:border-[#274737] text-[#27272A] dark:text-[#D1E0D7]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[#52525B] dark:text-[#A1A1AA]">Active:</span>
              <strong className="text-[#0A0F0D] dark:text-[#F4FBF7] font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" />
                {currentPatient.name}
              </strong>
              <button
                onClick={clearPatient}
                className="ml-1 text-[10px] text-[#71717A] hover:text-rose-600 dark:hover:text-rose-400 font-bold px-1.5 py-0.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                title="Clear patient record"
              >
                ✕ Clear
              </button>
            </div>
          )}

          {/* Theme Toggle (Instant & Glitch-Free) */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Clean Light Theme" : "Switch to Night Shift Slate Theme"}
            aria-label="Toggle theme"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-[#CBD5C8] dark:border-[#274737] bg-[#F3F6F1] dark:bg-[#13241C] text-[#27272A] dark:text-[#D1E0D7] hover:text-[#059669] dark:hover:text-[#34D399] hover:bg-[#EAEFE7] dark:hover:bg-[#182C22] flex items-center gap-1.5 min-h-[40px] cursor-pointer"
          >
            {mounted && isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="hidden md:inline text-[11px] font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="hidden md:inline text-[11px] font-medium">Night Shift</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
