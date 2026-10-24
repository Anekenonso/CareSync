// CareSync Meterless H-MEM Longitudinal Memory & Trust Ledger Adapter
import { MemoryRecord, LedgerEntry, MemoryLayer, MemoryType } from "./engine/src/types";
import { patientEleanorVance, eleanorLabHistory, eleanorClinicalNotes } from "@/data/mockClinicalData";

export interface CareSyncPatientWorldModel {
  patientId: string;
  totalMemories: number;
  layers: {
    longTerm: MemoryRecord[];
    shortTerm: MemoryRecord[];
    working: MemoryRecord[];
  };
  auditTrail: LedgerEntry[];
  activeClinicalFlags: string[];
}

// In-memory persistent state for active session (can also be saved to data/meterless/)
let patientMemories: MemoryRecord[] = [];
let trustLedgerLogs: LedgerEntry[] = [];

// Initialize Eleanor Vance's initial world-model from clinical records
export function initializeCareSyncHMEM(): CareSyncPatientWorldModel {
  if (patientMemories.length > 0) {
    return getPatientWorldModel();
  }

  const now = Date.now();

  // 1. Long-Term / Semantic Layer (Chronic Conditions & Baseline Regimen)
  const ckdBaseline: MemoryRecord = {
    id: "mem-ckd-baseline",
    content: "Eleanor Vance has documented Chronic Kidney Disease (Stage 3a baseline) with eGFR 54 mL/min/1.73m² and Serum Creatinine 1.28 mg/dL as of April 2026.",
    type: "factual",
    layer: "long_term",
    timestamp: now - 180 * 24 * 3600 * 1000, // 6 months ago
    lastAccessed: now,
    accessCount: 14,
    tags: ["Renal", "CKD_Stage_3a", "eGFR_54", "Baseline"],
    confidence: 0.98,
    source: "St. Jude Comprehensive Medical Group (Dr. Marcus Chen)",
    provenance: {
      origin: "document",
      learnedAt: now - 180 * 24 * 3600 * 1000,
      label: "Baseline Renal Panel",
      refs: ["lab-101", "lab-102"],
    },
    domain: "clinical_nephrology",
    namespace: "patient_records",
    entities: ["Eleanor Vance", "CKD Stage 3a", "eGFR", "Creatinine"],
    relatedTo: ["mem-lisinopril-chronic"],
    embedding: [],
  };

  const lisinoprilChronic: MemoryRecord = {
    id: "mem-lisinopril-chronic",
    content: "Chronic daily therapy with Lisinopril 20mg daily for hypertension and renal protection.",
    type: "factual",
    layer: "long_term",
    timestamp: now - 365 * 24 * 3600 * 1000,
    lastAccessed: now,
    accessCount: 22,
    tags: ["Medication", "ACE_Inhibitor", "Lisinopril_20mg", "Antihypertensive"],
    confidence: 0.99,
    source: "Pharmacy Dispense Records & PCP Note",
    provenance: {
      origin: "document",
      learnedAt: now - 365 * 24 * 3600 * 1000,
      label: "Active Medication Roster",
      refs: ["med-1"],
    },
    domain: "pharmacology",
    namespace: "patient_records",
    entities: ["Lisinopril", "ACE Inhibitor", "Hypertension"],
    relatedTo: ["mem-ckd-baseline"],
    embedding: [],
  };

  // 2. Short-Term / Episodic Layer (Recent Urgent Care & Lab Shift)
  const urgentCareNSAID: MemoryRecord = {
    id: "mem-urgentcare-nsaid",
    content: "Acute right knee osteoarthritic flare treated at Valley Urgent Care on 2026-10-10. Prescribed Meloxicam 15mg once daily PRN.",
    type: "personal",
    layer: "short_term",
    timestamp: now - 14 * 24 * 3600 * 1000,
    lastAccessed: now,
    accessCount: 8,
    tags: ["Urgent_Care", "Osteoarthritis", "Meloxicam_15mg", "NSAID", "Acute_Prescription"],
    confidence: 0.95,
    source: "Valley Urgent Care (Dr. Robert Alvarez)",
    provenance: {
      origin: "file_save",
      learnedAt: now - 14 * 24 * 3600 * 1000,
      label: "Urgent Care Encounter Note",
      refs: ["note-1", "med-4"],
    },
    domain: "clinical_encounters",
    namespace: "patient_records",
    entities: ["Meloxicam", "NSAID", "Knee Osteoarthritis", "Urgent Care"],
    relatedTo: ["mem-lisinopril-chronic"],
    embedding: [],
  };

  const acuteLabShift: MemoryRecord = {
    id: "mem-acute-lab-shift",
    content: "Repeat metabolic profile on 2026-10-21 revealed acute eGFR decline to 42 mL/min/1.73m² (down 22%), Creatinine rise to 1.82 mg/dL, and Potassium elevation to 5.2 mEq/L.",
    type: "factual",
    layer: "short_term",
    timestamp: now - 3 * 24 * 3600 * 1000,
    lastAccessed: now,
    accessCount: 12,
    tags: ["Acute_Shift", "eGFR_42", "Creatinine_1.82", "Hyperkalemia", "AKI_on_CKD"],
    confidence: 0.99,
    source: "Valley Health Diagnostic Center (Lab Order: 2026-10-21)",
    provenance: {
      origin: "document",
      learnedAt: now - 3 * 24 * 3600 * 1000,
      label: "Renal Panel Alert",
      refs: ["lab-201", "lab-202", "lab-204"],
    },
    domain: "clinical_labs",
    namespace: "patient_records",
    entities: ["eGFR", "Creatinine", "Potassium", "Acute Kidney Injury"],
    relatedTo: ["mem-ckd-baseline", "mem-urgentcare-nsaid"],
    embedding: [],
  };

  // 3. Working Memory Layer (Live Synthesis & Active Conflict Detection)
  const drugConflictWorking: MemoryRecord = {
    id: "mem-working-conflict",
    content: "CRITICAL INTERACTION DETECTED: Concomitant Meloxicam 15mg + Lisinopril 20mg in patient with pre-existing CKD 3a. Severe afferent/efferent arteriolar perfusion collapse resulting in eGFR drop from 54 -> 42.",
    type: "preference",
    layer: "working",
    timestamp: now,
    lastAccessed: now,
    accessCount: 1,
    tags: ["CRITICAL_ALERT", "Contraindication", "Triple_Whammy_Risk", "Discontinue_Meloxicam"],
    confidence: 0.99,
    source: "Nemotron Clinical Reasoning Engine",
    provenance: {
      origin: "model_response",
      learnedAt: now,
      label: "Autonomous Clinical Synthesis",
      refs: ["mem-ckd-baseline", "mem-lisinopril-chronic", "mem-urgentcare-nsaid", "mem-acute-lab-shift"],
    },
    domain: "clinical_safety",
    namespace: "patient_records",
    entities: ["Meloxicam", "Lisinopril", "CKD Stage 3a", "Renal Perfusion"],
    relatedTo: ["mem-urgentcare-nsaid", "mem-acute-lab-shift"],
    embedding: [],
  };

  patientMemories = [ckdBaseline, lisinoprilChronic, urgentCareNSAID, acuteLabShift, drugConflictWorking];

  // Initialize Trust Ledger entries
  recordAuditAction("create", "mem-ckd-baseline", "System Initializer", { reason: "Hydrate baseline longitudinal CKD record" });
  recordAuditAction("create", "mem-lisinopril-chronic", "System Initializer", { reason: "Hydrate chronic medication profile" });
  recordAuditAction("create", "mem-urgentcare-nsaid", "Zetaris Data Fabric Ingest", { reason: "Federated external urgent care consult import" });
  recordAuditAction("create", "mem-acute-lab-shift", "Zetaris Data Fabric Ingest", { reason: "Federated lab telemetry import" });
  recordAuditAction("conflict_detected", "mem-working-conflict", "Nemotron 3.5 Lightning", {
    reason: "Severe drug-drug-disease interaction detected between Meloxicam, Lisinopril, and CKD 3a",
    severity: "CRITICAL",
  });

  return getPatientWorldModel();
}

export function recordAuditAction(
  action: LedgerEntry["action"],
  memoryId: string,
  actor: string,
  details?: Record<string, unknown>
): LedgerEntry {
  const entry: LedgerEntry = {
    memoryId,
    action,
    actor,
    timestamp: Date.now(),
    details,
  };
  trustLedgerLogs.unshift(entry);
  return entry;
}

export function getPatientWorldModel(): CareSyncPatientWorldModel {
  return {
    patientId: patientEleanorVance.id,
    totalMemories: patientMemories.length,
    layers: {
      longTerm: patientMemories.filter((m) => m.layer === "long_term"),
      shortTerm: patientMemories.filter((m) => m.layer === "short_term"),
      working: patientMemories.filter((m) => m.layer === "working"),
    },
    auditTrail: trustLedgerLogs,
    activeClinicalFlags: [
      "CRITICAL: Meloxicam + Lisinopril Dual Nephrotoxicity",
      "eGFR shift from 54 to 42 mL/min/1.73m² (-22.2%)",
      "Hyperkalemia monitoring required (K+ 5.2 mEq/L)",
      "Metformin dose ceiling review indicated at eGFR < 45",
    ],
  };
}
