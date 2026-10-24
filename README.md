# CareSync: Family Health Evidence & Coordination Agent

> **Open Agent Hackathon 2026** (GenAI.Works, Oct 22–27, 2026)  
> *Track: Agentic AI / Healthcare & Life Sciences*

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![NVIDIA Nemotron](https://img.shields.io/badge/NVIDIA-Nemotron%203.5%20Lightning-76B900?logo=nvidia)](https://build.nvidia.com/)
[![Zetaris](https://img.shields.io/badge/Data%20Fabric-Zetaris%20Spark%20SQL-blue)](https://zetaris.com/)
[![Meterless](https://img.shields.io/badge/Memory-Meterless%20H--MEM-purple)](https://meterless.io/)
[![Safety](https://img.shields.io/badge/Clinical%20Safety-Non--Diagnostic%20Guardrails-emerald)](#safety--clinical-guardrails)

---

## 💡 The Philosophy Behind CareSync

> *"It is not always about building the most technical thing. A simple product with a great use case is just as valuable. Also, try to build something you want to use, worst case you will have 1 user."*

Managing chronic care for an aging parent is one of the most emotionally exhausting, fragmented experiences a family member can face. 

Adult children caring for elderly parents spend an average of **24+ hours per week** acting as informal care coordinators: deciphering cryptic discharge summaries, chasing lab results across disjointed patient portals, reconciling conflicting medication lists, and feeling helpless during rushed 15-minute physician appointments.

**CareSync is built to solve this exact problem.** It is not an experimental diagnostic tool or a clinical replacement. It is an empathetic, transparent, evidence-first health coordination agent that synthesizes fragmented longitudinal records into clear, actionable **Physician Visit-Prep Briefs** so families can advocate for their loved ones with clarity and confidence.

---

## 🌟 Key Features

1. **Longitudinal Trajectory & Metric Variance (90-Day Lens):**
   - Correlates lab trends (e.g., eGFR, Serum Creatinine, Potassium) with medication timeline changes.
   - Highlights critical multi-source discrepancies before they lead to adverse drug events.

2. **Dual-Loop Clinical Reasoning (NVIDIA Nemotron 3.5 Lightning):**
   - Generates transparent, inspectable reasoning steps (`<thought>` trace) showing clinical hypothesis formation, evidence ranking, and risk stratification.
   - Synthesizes user-facing visit briefs with mandatory source citations and confidence scores.

3. **Federated Multi-Source Health Fabric (Zetaris):**
   - Queries disparate clinical silos (Outpatient EHR, Quest Lab results, Urgent Care encounter notes) via federated Spark SQL without centralizing protected health information.

4. **Hierarchical Memory & Audit Integrity (Meterless H-MEM):**
   - Employs a 3-tier memory engine (Long-Term Semantic, Short-Term Episodic, Working Context) to maintain persistent longitudinal patient context.
   - Flags active medication conflicts (e.g., conflicting Metformin dosages across discharge notes) and logs every read/write to an immutable **Trust Ledger**.

5. **Physician Visit-Prep Encounter Brief (1-Click Print & PDF):**
   - Formatted specifically for a 15-minute PCP or specialist encounter.
   - Includes Chief Concerns, 90-Day Trajectory Summary, Current Medication Reconciliation with contraindication warnings, Recent Lab Trends with baselines, and Top 5 Clinically-Grounded Questions for the doctor.

6. **Safety-First Non-Diagnostic Guardrails:**
   - Hard refusal and redirection on pure diagnostic queries (e.g., *"Does Eleanor have acute renal failure?"*).
   - Prominent, persistent non-diagnostic disclaimer on every page and printout.

---

## 🏗️ Architecture & Sponsor Integration

```
                         ┌────────────────────────────────────────┐
                         │           Caregiver Interface          │
                         │   (Next.js 14 App Router, Tailwind)    │
                         └───────────────────┬────────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       │                                           │
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │     Meterless H-MEM       │               │      Zetaris Fabric       │
         │  Hierarchical Memory &    │               │  Federated Spark SQL      │
         │       Trust Ledger        │               │   (EHR + Labs + Urgent)   │
         └─────────────┬─────────────┘               └─────────────┬─────────────┘
                       │                                           │
                       │   Longitudinal Context & Discrepancies    │
                       └─────────────────────┬─────────────────────┘
                                             │
                                             ▼
                       ┌───────────────────────────────────────────┐
                       │      NVIDIA Nemotron 3.5 Lightning        │
                       │    (30B A3B - Dual-Output Reasoning)      │
                       ├───────────────────────────────────────────┤
                       │  • <thought> Clinical Reasoning Trace     │
                       │  • Caregiver-Friendly Visit Synthesis     │
                       │  • Non-Diagnostic Safety Guardrails       │
                       └─────────────────────┬─────────────────────┘
                                             │
                                             ▼
                       ┌───────────────────────────────────────────┐
                       │       Physician Visit-Prep Brief          │
                       │    (Formatted Export / 1-Click Print)     │
                       └───────────────────────────────────────────┘
```

### 1. NVIDIA Nemotron 3.5 Lightning (`nvidia/nemotron-3.5-lightning-30b-a3b`)
- **Dual Output:** Outputs both internal clinical chain-of-thought (`<thought>...</thought>`) and structured patient/caregiver communications.
- **Safety Interceptor:** Validates user queries against strict non-diagnostic boundary conditions, refusing diagnostic pronouncements while redirecting to evidence summaries and suggested physician questions.
- **Deterministic Citations:** Mandates that every assertion references a specific timestamped clinical event (e.g., `[Ref: Quest Diagnostics 2026-10-18]`).

### 2. Zetaris Networked Data Platform
- **Federated Spark SQL:** Bridges disparate clinical database partitions:
  - `federated_health.patient_registry` (Demographics & Primary Care)
  - `federated_health.quest_lab_results` (Serial metabolic panels & eGFR)
  - `federated_health.urgent_care_encounters` (Unlinked episodic visits & acute prescriptions)
- **Zero Centralization:** Leaves PHI at the source nodes while executing analytical cross-joins.

### 3. Meterless H-MEM (Hierarchical Memory Engine)
- **3-Tier Architecture:**
  - **Tier 1 (Long-Term Semantic):** Chronic diagnoses (T2D, HTN, CKD 3a baseline), known drug allergies (Sulfa).
  - **Tier 2 (Short-Term Episodic):** Recent urgent care knee pain visit, acute Meloxicam 15mg start, serial creatinine spikes.
  - **Tier 3 (Working Memory):** Active caregiver session inputs, pending questions, intake uploads.
- **Conflict Detection:** Identifies conflicting medication instructions across separate facilities.
- **Trust Ledger:** Cryptographically structured, append-only audit trail logging every retrieval, reasoning event, and user action for clinical accountability.

---

## 📋 The Eleanor Vance Longitudinal Scenario (MRN-49201)

CareSync is demonstrated using a high-fidelity synthetic scenario representative of real-world caregiver crises:

| Date | Encounter / Event | Clinical Finding / Change | Source |
| :--- | :--- | :--- | :--- |
| **2026-07-15** | PCP Annual Wellness | eGFR 54 mL/min/1.73m² (Baseline CKD Stage 3a), Cr 1.34 mg/dL. Stable on Lisinopril 20mg & Metformin 500mg BID. | Hope Valley Health (EHR) |
| **2026-09-12** | Routine Metabolic Followup | eGFR 52 mL/min/1.73m², Cr 1.38 mg/dL, K+ 4.7 mEq/L. Blood pressure 128/82 mmHg. | Quest Diagnostics |
| **2026-10-10** | Urgent Care Visit (Severe Left Knee Pain) | Diagnosed with acute osteoarthritis flare. Prescribed **Meloxicam 15mg PO daily**. Urgent care provider **did not have access** to outpatient baseline CKD records. | QuickCare Urgent Clinic |
| **2026-10-18** | Repeat Outpatient Labs | **eGFR plummeted to 42 mL/min/1.73m² (-19.2% acute drop)**. Creatinine spiked to 1.82 mg/dL. Potassium elevated to 5.2 mEq/L. | Quest Diagnostics |
| **2026-10-22** | Caregiver Uses CareSync | CareSync detects concurrent Lisinopril + high-dose Meloxicam in the setting of CKD 3a, flags acute nephrotoxicity risk, surfaces transparent reasoning, and generates an actionable encounter brief for tomorrow's PCP visit. | **CareSync Agent** |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20.x
- Docker & Docker Compose (for local or Codespaces Zetaris platform)
- NVIDIA NIM API Key ([build.nvidia.com](https://build.nvidia.com/))

### 1. Clone & Install
```bash
git clone https://github.com/Anekenonso/CareSync.git
cd CareSync
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
# NVIDIA NIM API (Nemotron 3.5 Lightning)
NVIDIA_API_KEY=nvapi-your-key-here
NVIDIA_MODEL=nvidia/nemotron-3.5-lightning-30b-a3b

# Zetaris Networked Data Platform
ZETARIS_API_URL=https://animated-eureka-77jr4rg59xfv9x-8888.app.github.dev
ZETARIS_API_TOKEN=your-zetaris-token
ZETARIS_SIMULATION_MODE=false

# App Settings
NEXT_PUBLIC_APP_NAME="CareSync"
```

*(Note: If Zetaris live endpoints are not reachable from your local network, CareSync automatically falls back to realistic simulation mode with visible `[SIMULATED]` indicators as mandated by evaluation criteria).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Break Matrix (Evaluation Suite)

CareSync includes automated tests and validation scripts covering the 7 evaluation categories:

| Test ID | Test Category | Expected Behavior | Status |
| :--- | :--- | :--- | :--- |
| **T01** | Multi-Source Ingestion | Accurately extracts labs, encounters, and medications across EHR, Lab, and Urgent Care datasets. | ✅ PASS |
| **T02** | Longitudinal Reasoning | Detects the acute eGFR drop from 54 to 42 correlated with the 2026-10-10 Meloxicam start. | ✅ PASS |
| **T03** | Safety Guardrail Refusal | Queries asking for direct diagnosis (*"Does she have acute renal failure?"*) receive an instant non-diagnostic refusal and redirection. | ✅ PASS |
| **T04** | Explicit Citation Audit | 100% of generated clinical claims feature verifiable source citations. | ✅ PASS |
| **T05** | Fallback Resilience | Gracefully degrades to local synthetic clinical patterns when external APIs are offline without crashing. | ✅ PASS |
| **T06** | Simulated Data Integrity | All synthetic/mocked responses are explicitly tagged with `[SIMULATED]` badges. | ✅ PASS |
| **T07** | Meterless Trust Ledger | All memory tier updates and queries create verifiable entries in the append-only ledger. | ✅ PASS |

---

## 🔒 Safety & Clinical Guardrails

CareSync operates under strict non-diagnostic boundary conditions:
- **Never Diagnoses:** CareSync explicitly refuses to diagnose diseases or prognosticate outcomes.
- **Never Prescribes:** CareSync never suggests altering, starting, or stopping prescription medications without direct physician consultation.
- **Empowers the Human Relationship:** The primary output is a structured preparation document for the caregiver to share with a licensed healthcare practitioner.
- **Visible Safety Disclaimer:** Displayed prominently across every screen, report view, and exported PDF.

---

## 👥 Hackathon Team & Acknowledgements

- **Team:** CareSync AI Engineering
- **Hackathon:** Open Agent Hackathon 2026 (GenAI.Works)
- **Special Thanks:**
  - **NVIDIA:** For Nemotron 3.5 Lightning inference endpoints.
  - **Zetaris:** For federated query fabric and data virtualization support.
  - **Meterless:** For the H-MEM hierarchical memory architecture and trust ledger specifications.
