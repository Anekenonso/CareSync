"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, X, Sparkles } from "lucide-react";

interface DocumentIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: () => void;
}

export function DocumentIntakeModal({ isOpen, onClose, onDocumentAdded }: DocumentIntakeModalProps) {
  const [docType, setDocType] = useState<"lab" | "consult" | "medication">("lab");
  const [facility, setFacility] = useState("Valley Health Diagnostic Center");
  const [docText, setDocText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate structured clinical extraction & Meterless H-MEM ingestion
    setTimeout(async () => {
      try {
        await fetch("/api/meterless", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create",
            memoryId: `mem-intake-${Date.now()}`,
            actor: "Caregiver Intake Portal",
            details: {
              documentType: docType,
              facility,
              summary: docText || "Simulated lab upload: Complete Metabolic Panel",
            },
          }),
        });

        setIsProcessing(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onDocumentAdded();
          onClose();
        }, 1200);
      } catch {
        setIsProcessing(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass-panel-elevated w-full max-w-xl rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Intake Health Document</h3>
            <p className="text-xs text-slate-400">Add a lab PDF, doctor consult note, or pharmacy printout</p>
          </div>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">Document Processed Successfully!</h4>
            <p className="text-xs text-slate-300">
              Extracted key metrics and registered into Meterless H-MEM longitudinal state.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSimulateIntake} className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Document Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDocType("lab")}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    docType === "lab"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  Lab Report (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => setDocType("consult")}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    docType === "consult"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  Doctor Note
                </button>
                <button
                  type="button"
                  onClick={() => setDocType("medication")}
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    docType === "medication"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  Prescription
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Originating Facility / Provider</label>
              <input
                type="text"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g. St. Jude Outpatient Lab"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Paste Document Text or Drag &amp; Drop PDF
              </label>
              <textarea
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                rows={4}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 resize-none"
                placeholder="Paste clinical text, lab results, or medication change summary..."
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-mono">
                Extraction: Deterministic Date/Value Parser
              </span>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    Extracting Facts...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Process &amp; Ingest
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
