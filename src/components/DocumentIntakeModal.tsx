"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  FileText,
  FileUp,
  FileCheck2,
  Trash2,
} from "lucide-react";

interface DocumentIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded?: (extractedInfo?: any) => void;
}

export function DocumentIntakeModal({
  isOpen,
  onClose,
  onDocumentAdded,
}: DocumentIntakeModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [facility, setFacility] = useState("QuickCare Urgent Clinic");
  const [docType, setDocType] = useState<"medication" | "lab" | "consult">("medication");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionStep, setExtractionStep] = useState("");
  const [extractedResult, setExtractedResult] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle native drag & drop
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
      guessMetadataFromFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      guessMetadataFromFileName(file.name);
    }
  };

  const guessMetadataFromFileName = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("quest") || lower.includes("lab") || lower.includes("renal") || lower.includes("bmp")) {
      setDocType("lab");
      setFacility("Quest Diagnostics Outpatient Lab");
    } else if (lower.includes("urgent") || lower.includes("quickcare") || lower.includes("meloxicam") || lower.includes("rx")) {
      setDocType("medication");
      setFacility("QuickCare Urgent Clinic");
    } else {
      setDocType("consult");
      setFacility("Hope Valley Primary Care");
    }
  };

  // 1-Click Sample Document Loaders for Evaluators
  const handleLoadSample = (sampleType: "meloxicam" | "quest") => {
    if (sampleType === "meloxicam") {
      const mockFile = new File(
        [
          "QUICKCARE URGENT CLINIC - ENCOUNTER NOTE\nDate: 2026-10-10\nPatient: Eleanor Vance (DOB: 1958-04-12)\nChief Complaint: Severe right knee pain with effusion.\nPrescription: Meloxicam 15mg PO daily for 30 days.\nClinician Note: Knee joint osteoarthritis flare. Follow up with PCP."
        ],
        "QuickCare_Urgent_Clinic_Meloxicam_Prescription.pdf",
        { type: "application/pdf" }
      );
      setSelectedFile(mockFile);
      setDocType("medication");
      setFacility("QuickCare Urgent Clinic");
    } else {
      const mockFile = new File(
        [
          "QUEST DIAGNOSTICS - COMPREHENSIVE METABOLIC & RENAL PANEL\nCollection Date: 2026-10-18\nPatient: Eleanor Vance\neGFR (CKD-EPI): 42 mL/min/1.73m2 (Reference > 60 mL/min) [CRITICAL DECLINE]\nSerum Creatinine: 1.82 mg/dL (Reference 0.50 - 1.10 mg/dL)\nSerum Potassium: 4.9 mEq/L\nBUN: 36 mg/dL"
        ],
        "Quest_Diagnostics_Renal_Panel_Oct2026.pdf",
        { type: "application/pdf" }
      );
      setSelectedFile(mockFile);
      setDocType("lab");
      setFacility("Quest Diagnostics Outpatient Lab");
    }
  };

  // Run upload and extraction pipeline
  const handleUploadAndAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsProcessing(true);
    setExtractionStep("Parsing document contents via OCR & PDF extractors...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("facility", facility);
      formData.append("docType", docType);

      await new Promise((r) => setTimeout(r, 600));
      setExtractionStep("Cross-referencing against Eleanor's medication & renal baseline...");

      const res = await fetch("/api/intake", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setExtractionStep("Fact-checking clinical safety contraindications...");
      await new Promise((r) => setTimeout(r, 600));

      setExtractedResult(data);
      if (onDocumentAdded) {
        onDocumentAdded({
          fileName: selectedFile.name,
          facility,
          docType,
          extractedAt: new Date().toISOString(),
          data,
        });
      }
    } catch (err) {
      console.error("Intake failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    setSelectedFile(null);
    setExtractedResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white dark:bg-[#0E1B15] border border-[#E3E8DE] dark:border-[#1C3328] rounded-2xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#71717A] hover:text-[#0A0F0D] dark:hover:text-white p-1 rounded-lg hover:bg-[#F3F6F1] dark:hover:bg-[#13241C] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[#0D6832] dark:text-[#34D399]">
            <Upload className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-widest uppercase font-mono">
              — CLINICAL DOCUMENT INTAKE
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-[#0A0F0D] dark:text-[#F4FBF7] tracking-tight mt-1">
            Upload Doctor Note or Lab Report
          </h3>
          <p className="text-xs text-[#71717A] dark:text-[#8FA698]">
            Ingest PDFs or clinical notes into Eleanor&apos;s longitudinal patient record.
          </p>
        </div>

        {extractedResult ? (
          /* Extraction Success View */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0D6832] dark:text-[#34D399] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#0D6832] dark:text-emerald-300">
                  Document Ingested &amp; Cross-Referenced
                </h4>
                <p className="text-xs text-[#27272A] dark:text-[#D1E0D7] mt-0.5">
                  <strong>{selectedFile?.name}</strong> has been extracted and synthesized into Eleanor&apos;s care timeline.
                </p>
              </div>
            </div>

            {/* Extracted Facts Summary */}
            <div className="p-4 rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#E3E8DE] dark:border-[#1C3328] space-y-3">
              <span className="text-xs font-bold text-[#0A0F0D] dark:text-[#F4FBF7] uppercase tracking-wider block font-mono text-[11px]">
                — EXTRACTED CLINICAL HIGHLIGHTS:
              </span>
              <div className="text-xs space-y-1.5 text-[#27272A] dark:text-[#D1E0D7]">
                {extractedResult.extractedFacts?.details?.map((detail: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#0D6832] dark:text-[#34D399] mt-0.5">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {extractedResult.extractedFacts?.safetyAlert && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Safety Flag Detected:</strong> {extractedResult.extractedFacts.safetyAlert}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 rounded-xl bg-[#0D6832] hover:bg-[#094D25] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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
                  ? "border-[#0D6832] bg-emerald-50 dark:bg-emerald-950/40 scale-[1.01]"
                  : selectedFile
                  ? "border-[#0D6832]/60 bg-emerald-50/40 dark:bg-[#13241C]"
                  : "border-[#CBD5C8] dark:border-[#274737] hover:border-[#0D6832] bg-[#FAFBF8] dark:bg-[#13241C]/50 hover:bg-[#F3F6F1] dark:hover:bg-[#13241C]"
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
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0E1B15] border border-[#E3E8DE] dark:border-[#1C3328] text-left shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#0D6832] dark:text-[#34D399]">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0A0F0D] dark:text-[#F4FBF7] block truncate max-w-xs">
                        {selectedFile.name}
                      </span>
                      <span className="text-[11px] text-[#71717A] dark:text-[#8FA698]">
                        {Math.round(selectedFile.size / 1024 || 1)} KB • Ready to extract &amp; analyze
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="p-2 text-[#71717A] hover:text-rose-600 rounded-lg hover:bg-[#F3F6F1] dark:hover:bg-[#182C22] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[#0D6832] dark:text-[#34D399] mx-auto flex items-center justify-center">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0A0F0D] dark:text-white block">
                      Click to browse your computer or drag &amp; drop a PDF here
                    </span>
                    <span className="text-[11px] text-[#71717A] dark:text-[#8FA698] block mt-0.5">
                      Supports PDF, JPG/PNG scans, or clinical text summaries (up to 25 MB)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sample Test Buttons */}
            <div>
              <span className="text-[11px] font-bold text-[#71717A] dark:text-[#8FA698] uppercase tracking-wider block mb-2 font-mono">
                — OR TEST WITH SAMPLE PATIENT RECORDS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleLoadSample("meloxicam")}
                  className="p-3 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328] hover:border-amber-400 bg-[#F3F6F1] dark:bg-[#13241C] hover:bg-amber-50/50 dark:hover:bg-[#182C22] text-left text-[#0A0F0D] dark:text-[#F4FBF7] transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="truncate font-medium">QuickCare_Urgent_Care_Meloxicam.pdf</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample("quest")}
                  className="p-3 rounded-xl border border-[#E3E8DE] dark:border-[#1C3328] hover:border-emerald-500 bg-[#F3F6F1] dark:bg-[#13241C] hover:bg-emerald-50/50 dark:hover:bg-[#182C22] text-left text-[#0A0F0D] dark:text-[#F4FBF7] transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#0D6832] dark:text-[#34D399] shrink-0" />
                  <span className="truncate font-medium">Quest_Diagnostics_Renal_Panel.pdf</span>
                </button>
              </div>
            </div>

            {/* Document Details */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-bold text-[#27272A] dark:text-[#D1E0D7] block mb-1">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e: any) => setDocType(e.target.value)}
                  className="w-full rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#CBD5C8] dark:border-[#274737] p-2.5 text-xs text-[#0A0F0D] dark:text-[#F4FBF7] focus:outline-none focus:border-[#0D6832]"
                >
                  <option value="medication">Urgent Care / Prescription Note</option>
                  <option value="lab">Lab Panel (Metabolic / Blood)</option>
                  <option value="consult">Doctor Consultation / EHR Note</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#27272A] dark:text-[#D1E0D7] block mb-1">
                  Clinic or Lab Name
                </label>
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  className="w-full rounded-xl bg-[#F3F6F1] dark:bg-[#13241C] border border-[#CBD5C8] dark:border-[#274737] p-2.5 text-xs text-[#0A0F0D] dark:text-[#F4FBF7] focus:outline-none focus:border-[#0D6832]"
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
                className="w-full py-3.5 rounded-xl bg-[#0D6832] hover:bg-[#094D25] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-40 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
