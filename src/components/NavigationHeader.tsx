"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, UserCheck, Check } from "lucide-react";
import { useCaregiver } from "@/context/CaregiverContext";

export function NavigationHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const { currentPatient, clearPatient } = useCaregiver();

  useEffect(() => {
    setMounted(true);
    const currentlyDark = document.documentElement.classList.contains("dark");
    setTheme(currentlyDark ? "dark" : "light");
  }, []);

  const selectTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("caresync_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("caresync_theme", "light");
    }
  };

  return (
    <header className="sticky top-3 sm:top-4 z-40 max-w-6xl mx-auto px-3 sm:px-6 w-full no-print">
      <div className="floating-island rounded-2xl px-3.5 sm:px-6 h-16 flex items-center justify-between border border-[#E2E7DE] dark:border-[#272727] shadow-sm">
        {/* Brand Identity */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex items-center gap-3 text-left group focus-ring rounded-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer"
          title="CareSync - Return to home timeline"
          aria-label="CareSync home"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0E6238] dark:bg-[#199A59] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-xs">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-[#0A0F0D] dark:text-[#FFFFFF] tracking-tight group-hover:text-[#0E6238] dark:group-hover:text-[#199A59] transition-colors">
                Care<span className="text-[#0E6238] dark:text-[#199A59]">Sync</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EBF7F0] dark:bg-[#1F1F1F] text-[#0E6238] dark:text-[#199A59] border border-[#CBD3C6] dark:border-[#313131] uppercase tracking-wider font-mono">
                Family care
              </span>
            </div>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium block -mt-0.5 truncate max-w-[160px] sm:max-w-none">
              Plain-language health clarity
            </span>
          </div>
        </button>

        {/* Right Controls: Patient Status & Segmented Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Active Patient Indicator */}
          {currentPatient && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727] text-[#27272A] dark:text-[#E5E7EB]">
              <span className="w-2 h-2 rounded-full bg-[#0E6238] dark:bg-[#199A59]"></span>
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">Active:</span>
              <strong className="text-[#0A0F0D] dark:text-[#FFFFFF] font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#0E6238] dark:text-[#199A59]" />
                {currentPatient.name}
              </strong>
              <button
                onClick={clearPatient}
                className="ml-1 text-xs text-[#6B7280] hover:text-[#BE123C] dark:hover:text-[#FB7185] font-semibold px-1.5 py-0.5 rounded hover:bg-[#FFF1F2] dark:hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                title="Clear patient record"
              >
                Clear
              </button>
            </div>
          )}

          {/* Segmented Theme Picker (Clean, Replaces Sun/Moon Toggle) */}
          <div
            role="group"
            aria-label="Theme selector"
            className="flex items-center p-1 rounded-xl bg-[#F4F6F2] dark:bg-[#1F1F1F] border border-[#E2E7DE] dark:border-[#272727]"
          >
            <button
              type="button"
              onClick={() => selectTheme("light")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mounted && theme === "light"
                  ? "bg-white text-[#0A0F0D] shadow-xs"
                  : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0A0F0D] dark:hover:text-white"
              }`}
              title="Use day mode"
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => selectTheme("dark")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mounted && theme === "dark"
                  ? "bg-[#272727] text-white shadow-xs"
                  : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0A0F0D] dark:hover:text-white"
              }`}
              title="Use night mode"
            >
              Night
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
