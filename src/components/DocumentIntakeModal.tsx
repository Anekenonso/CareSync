"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  FileUp,
  FileCheck2,
  Trash2,
  ArrowRight,
} from "lucide-react";

interface DocumentIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (extractedInfo?: any) => void;
}

export function DocumentIntakeModal({
  isOpen,
  onClose,
  onDocumentAdded,
}: DocumentIntakeModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<"lab" | "consult" | "medication">("lab");
  const [facility, setFacility] = useState("QuickCare Urgent Clinic");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionStep, setExtractionStep] = useState("");
  const [extractedResult, setExtractedResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      guessDocType(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      guessDocType(file.name);
    }
  };

  const guessDocType = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("lab") || lower.includes("panel") || lower.includes("quest") || lower.includes("blood")) {
      setDocType("lab");
      setFacility("Quest Diagnostics");
    } else if (lower.includes("urgent") || lower.includes("rx") || lower.includes("prescription") || lower.includes("meloxicam")) {
      setDocType("medication");
      setFacility("QuickCare Urgent Clinic");
    } else {
      setDocType("consult");
      setFacility("Hope Valley Primary Care");
    }
  };

  // Quick sample loader so users don't have to search their hard drive for clinical PDFs
  const handleLoadSample = (sampleType: "meloxicam" | "quest") => {
    let mockFile: File;
    if (sampleType === "meloxicam") {
      mockFile = new File(
        [
          "QUICKCARE URGENT CLINIC - DISCHARGE SUMMARY\nPatient: Eleanor Vance | DOB: 1958-04-12\nDate: 2026-10-10\nChief Complaint: Severe right knee osteoarthritis pain.\nAssessment: Acute OA flare.\nRx Prescribed: Meloxicam 15mg tablet daily for 30 days.\nPrescriber: Dr. Sarah Jenkins, MD\nNotes: Patient did not disclose outpatient Lisinopril prescription.",
        ],
        "QuickCare_Urgent_Clinic_Meloxicam_Prescription.pdf",
        { type: "application/pdf" }
      );
      setDocType("medication");
      setFacility("QuickCare Urgent Clinic");
    } else {
      mockFile = new File(
        [
          "QUEST DIAGNOSTICS - COMPREHENSIVE METABOLIC PANEL\nPatient: Eleanor Vance | DOB: 1958-04-12\nDate Collected: 2026-10-21\neGFR: 42 mL/min/1.73m2 (CRITICAL LOW - Baseline 54 mL/min)\nCreatinine: 1.82 mg/dL (HIGH - Baseline 1.28 mg/dL)\nPotassium: 5.2 mEq/L (HIGH)\nBUN: 31 mg/dL (HIGH)\nSodium: 139 mEq/L\nOrdering Physician: Dr. Marcus Chen, MD",
        ],
        "Quest_Diagnostics_Renal_Panel_Oct2026.pdf",
        { type: "application/pdf" }
      );
      setDocType("lab");
      setFacility("Quest Diagnostics");
    }
    setSelectedFile(mockFile);
  };

  const handleUploadAndAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsProcessing(true);
    setExtractionStep("Reading file contents...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("documentType", docType);
      formData.append("facility", facility);

      setTimeout(() => setExtractionStep("Extracting medications & lab values..."), 600);
      setTimeout(() => setExtractionStep("Cross-referencing with Eleanor's chronic conditions..."), 1200);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setTimeout(() => {
        setIsProcessing(false);
        setExtractedResult(data);
      }, 1600);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    onDocumentAdded(extractedResult);
    onClose();
    setSelectedFile(null);
    setExtractedResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated w-full max-w-xl rounded-2xl p-6 border border-slate-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shadow-md shadow-teal-500/10">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Upload Medical Document</h3>
            <p className="text-xs text-slate-300">
              Upload a lab PDF, discharge summary, or doctor note to add to Eleanor&apos;s timeline.
            </p>
          </div>
        </div>

        {extractedResult ? (
          /* Extraction Success View */
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Document Successfully Ingested &amp; Parsed!</span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>{extractedResult.fileName}</strong> has been registered into CareSync&apos;s longitudinal memory.
              </p>
            </div>

            {/* Extracted Facts Summary */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Extracted Clinical Highlights:
              </span>
              <div className="text-xs space-y-1.5 text-slate-300">
                {extractedResult.extractedFacts?.details?.map((detail: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-teal-400 mt-0.5">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {extractedResult.extractedFacts?.safetyAlert && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Safety Flag Detected:</strong> {extractedResult.extractedFacts.safetyAlert}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
            >
              <span>View Updated Health Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Upload Form */
          <form onSubmit={handleUploadAndAnalyze} className="space-y-4">
            {/* Drag & Drop File Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 rounded-2xl border-2 border-dashed cursor-pointer text-center transition-all ${
                isDragging
                  ? "border-teal-400 bg-teal-500/10 scale-[1.01]"
                  : selectedFile
                  ? "border-teal-500/50 bg-slate-900/90"
                  : "border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700 text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block truncate max-w-xs">
                        {selectedFile.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {Math.round(selectedFile.size / 1024 || 1)} KB • Ready to analyze
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Click to browse your computer or drag &amp; drop a PDF here
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Supports PDF, JPG/PNG scans, or clinical text summaries (up to 25 MB)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sample Test Buttons */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Or test with sample patient records:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleLoadSample("meloxicam")}
                  className="p-2.5 rounded-xl border border-slate-800 hover:border-teal-500/40 bg-slate-900/80 hover:bg-slate-800 text-left text-slate-300 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">QuickCare_Urgent_Care_Meloxicam.pdf</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample("quest")}
                  className="p-2.5 rounded-xl border border-slate-800 hover:border-teal-500/40 bg-slate-900/80 hover:bg-slate-800 text-left text-slate-300 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">Quest_Diagnostics_Renal_Panel.pdf</span>
                </button>
              </div>
            </div>

            {/* Document Details */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e: any) => setDocType(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="medication">Urgent Care / Prescription Note</option>
                  <option value="lab">Lab Panel (Metabolic / Blood)</option>
                  <option value="consult">Doctor Consultation / EHR Note</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Clinic or Lab Name
                </label>
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  placeholder="e.g. QuickCare Urgent Clinic"
                  required
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!selectedFile || isProcessing}
                className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all disabled:opacity-40"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>{extractionStep}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Upload &amp; Extract Clinical Facts</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
