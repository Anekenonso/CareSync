"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, Sun, Moon, ShieldCheck, UserCheck } from "lucide-react";

export function NavigationHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("caresync_theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0D6832] dark:bg-[#10B981] flex items-center justify-center shadow-sm shadow-[#0D6832]/25 text-white dark:text-[#07100B] font-bold">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight">
                Care<span className="text-[#0D6832] dark:text-[#34D399]">Sync</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#0D6832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 tracking-wide uppercase">
                Clinical Trust
              </span>
            </div>
            <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] block -mt-0.5">
              Family Health Evidence &amp; Coordination
            </span>
          </div>
        </div>

        {/* Right Side: Family Proxy Status & Theme Switcher */}
        <div className="flex items-center gap-3 text-xs">
          {/* Family Proxy Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] text-[#27272A] dark:text-[#D1E0D7]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[#71717A] dark:text-[#8FA698]">Active Proxy:</span>
            <strong className="text-[#0A0F0D] dark:text-[#F4FBF7] font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-[#0D6832] dark:text-[#34D399]" />
              Eleanor Vance (Mom)
            </strong>
          </div>

          {/* Theme Toggle (Clinical Light vs Night Shift) */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Clean Clinical Light Mode" : "Switch to Night Shift Slate Mode"}
            aria-label="Toggle theme"
            className="p-2 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328] bg-[#F3F6F1]/80 dark:bg-[#13241C]/80 text-[#27272A] dark:text-[#D1E0D7] hover:text-[#0D6832] dark:hover:text-[#34D399] hover:bg-[#EAEFE7] dark:hover:bg-[#182C22] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-[11px] font-medium">Clinical Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#0D6832]" />
                <span className="hidden md:inline text-[11px] font-medium">Night Shift</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
