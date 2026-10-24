"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, Sun, Moon, ShieldCheck, UserCheck } from "lucide-react";

export function NavigationHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check saved theme or system preference, default to clean clinical light
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
    <header className="border-b border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#0A1120]/90 backdrop-blur-md sticky top-0 z-40 no-print transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-teal-600 to-emerald-500 flex items-center justify-center shadow-md shadow-sky-600/20 text-white font-bold">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                Care<span className="text-sky-600 dark:text-sky-400">Sync</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Clinical Trust
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block -mt-0.5">
              Family Health Evidence &amp; Coordination
            </span>
          </div>
        </div>

        {/* Right Side: Proxy Status & Theme Switcher */}
        <div className="flex items-center gap-3 text-xs">
          {/* Family Proxy Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-500 dark:text-slate-400">Active Proxy:</span>
            <strong className="text-slate-900 dark:text-white font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Eleanor Vance (Mom)
            </strong>
          </div>

          {/* Theme Toggle (Clinical Light vs Night Shift) */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Clean Clinical Light Mode" : "Switch to Night Shift Slate Mode"}
            aria-label="Toggle theme"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-[11px] font-medium">Clinical Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-sky-600" />
                <span className="hidden md:inline text-[11px] font-medium">Night Shift</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
