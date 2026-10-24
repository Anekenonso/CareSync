// CareSync Type Definitions

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  primaryPhysician: string;
  allergies: string[];
  conditions: ChronicCondition[];
  activeMedications: Medication[];
  recentVitals: Vitals;
}

export interface ChronicCondition {
  id: string;
  name: string;
  icd10: string;
  diagnosedDate: string;
  status: "active" | "monitored" | "resolved";
  severity: "mild" | "moderate" | "severe";
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: string;
  indication: string;
  status: "active" | "discontinued" | "held";
  category: string;
}

export interface LabResult {
  id: string;
  date: string;
  testName: string;
  value: number;
  unit: string;
  referenceRange: string;
  flag: "normal" | "low" | "high" | "critical";
  category: "Renal" | "Metabolic" | "Cardiovascular" | "Hematology" | "Lipids";
  facility: string;
}

export interface ClinicalNote {
  id: string;
  date: string;
  author: string;
  specialty: string;
  facility: string;
  summary: string;
  keyFindings: string[];
}

export interface Vitals {
  bloodPressure: string;
  heartRate: number;
  spO2: number;
  temperature: number;
  bmi: number;
  recordedAt: string;
}

// Zetaris Data Fabric Types
export interface ZetarisQueryRequest {
  sql: string;
  limit?: number;
}

export interface ZetarisQueryResponse {
  queryId: string;
  status: "SUCCESS" | "FAILED" | "RUNNING";
  rowCount: number;
  executionTimeMs: number;
  columns: string[];
  rows: Record<string, any>[];
  sourceFederation: {
    sourcesQueried: string[];
    virtualizedTables: string[];
  };
}

// Meterless H-MEM (Hierarchical Memory) Types
export interface HMEMMemoryNode {
  id: string;
  timestamp: string;
  layer: "episodic" | "semantic" | "working";
  concept: string;
  summary: string;
  confidence: number;
  sourceDocId?: string;
  tags: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: "DATA_INGEST" | "ZETARIS_FEDERATED_QUERY" | "NEMOTRON_REASONING" | "SAFETY_VALIDATION" | "BRIEF_GENERATION";
  actor: "System" | "Physician" | "Caregiver" | "NemotronAgent";
  inputSummary: string;
  evidenceRetrieved: string[];
  decisionOrHypothesis: string;
  validationStatus: "VERIFIED" | "FLAGGED" | "BLOCKED";
  citations: string[];
}

// NVIDIA Nemotron Reasoning Types
export interface NemotronReasoningStep {
  step: number;
  phase: "Observation" | "Hypothesis Formulation" | "Evidence Cross-Reference" | "Safety & Interaction Check" | "Clinical Synthesis";
  thought: string;
  evidenceAnchor: string;
}

export interface ClinicalInteractionAlert {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE" | "INFORMATIONAL";
  title: string;
  description: string;
  interactingEntities: string[];
  mechanism: string;
  clinicalEvidence: string;
  actionRecommendation: string;
  contraindicatedInConditions: string[];
}

export interface PhysicianVisitPrep {
  patientId: string;
  generatedAt: string;
  model: string;
  clinicalSummary: string;
  acuteAlerts: ClinicalInteractionAlert[];
  longitudinalTrends: {
    metric: string;
    baseline: string;
    current: string;
    trend: "improving" | "stable" | "deteriorating";
    clinicalSignificance: string;
  }[];
  suggestedActionPlan: string[];
  discussionQuestions: string[];
  auditTraceId: string;
}
