import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-[#EBF7F0] dark:bg-[#1F1F1F] border border-[#CBD3C6] dark:border-[#272727] flex items-center justify-center text-[#0E6238] dark:text-[#199A59] mb-6 shadow-sm">
        <Stethoscope className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0F0D] dark:text-[#FFFFFF] mb-3">
        Page not found
      </h1>
      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-md mb-8 leading-relaxed">
        The health record or view you requested does not exist or may have been moved. Return to Eleanor&apos;s longitudinal timeline.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-[#0E6238] hover:bg-[#0B4E2D] dark:bg-[#199A59] dark:hover:bg-[#22B56C] text-white text-sm font-semibold flex items-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-sm"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span>Return to timeline</span>
      </Link>
    </div>
  );
}
