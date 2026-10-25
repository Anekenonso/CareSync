"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, Sun, Moon, UserCheck } from "lucide-react";

export function NavigationHeader() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    <header className="border-b border-[#E3E8DE] dark:border-[#1C3328] bg-white/95 dark:bg-[#0E1B15]/95 backdrop-blur-md sticky top-0 z-40 no-print transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0D6832] dark:bg-[#10B981] flex items-center justify-center shadow-sm shadow-[#0D6832]/25 text-white dark:text-[#07100B] font-bold shrink-0">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-lg text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight">
                Care<span className="text-[#0D6832] dark:text-[#34D399]">Sync</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 tracking-wide uppercase">
                Family Care
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#71717A] dark:text-[#8FA698] block -mt-0.5 truncate max-w-[170px] sm:max-w-none">
              Plain-Language Health Clarity
            </span>
          </div>
        </div>

        {/* Right Side: Family Proxy Status & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Family Proxy Indicator (Hidden on small mobile to prevent cramped headers) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] text-[#27272A] dark:text-[#D1E0D7]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[#71717A] dark:text-[#8FA698]">Mom&apos;s Record:</span>
            <strong className="text-[#0A0F0D] dark:text-[#F4FBF7] font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-[#0D6832] dark:text-[#34D399]" />
              Eleanor Vance
            </strong>
          </div>

          {/* Theme Toggle (Clinical Light vs Night Shift) */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Clean Light Theme" : "Switch to Night Shift Slate Theme"}
            aria-label="Toggle theme"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328] bg-[#F3F6F1]/90 dark:bg-[#13241C]/90 text-[#27272A] dark:text-[#D1E0D7] hover:text-[#0D6832] dark:hover:text-[#34D399] hover:bg-[#EAEFE7] dark:hover:bg-[#182C22] transition-all flex items-center gap-1.5 min-h-[40px] cursor-pointer"
          >
            {mounted && isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="hidden md:inline text-[11px] font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#0D6832] shrink-0" />
                <span className="hidden md:inline text-[11px] font-medium">Night Shift</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
