# CareSync Clinical Data Documentation & Provenance

## Data Overview & HIPAA / Privacy Compliance
All datasets included in this repository are **100% synthetic, de-identified patient profiles** designed to replicate clinical care transitions, longitudinal lab trajectories, and cross-encounter prescription additions in geriatric patients.

- **No Real PHI:** Zero real Protected Health Information (PHI) or Personally Identifiable Information (PII) is included in this repository or transmitted in agent traces.
- **Licensing:** Open access under the MIT License for academic and competition evaluation purposes.

## Simulated Patient Personas
1. **Eleanor Vance (68F, MRN-49201) [Primary Benchmark Case]**
   - **Conditions:** Chronic Kidney Disease Stage 3a (baseline eGFR 54 mL/min/1.73m², Serum Creatinine 1.28 mg/dL), Type 2 Diabetes Mellitus, Essential Hypertension.
   - **Chronology:**
     - `2024-04-01`: Lisinopril 20mg PO daily initiated by Primary Care.
     - `2026-10-10`: Outside Urgent Care visit for acute knee osteoarthritis pain; prescribed Meloxicam 15mg PO daily without outpatient EHR visibility.
     - `2026-10-21`: Follow-up panel reveals acute eGFR drop to 42 mL/min (-22.2%), Serum Creatinine rise to 1.82 mg/dL (+42.2%), and Potassium elevation to 5.2 mEq/L.
2. **Marcus Thorne (72M, MRN-38102) [Polypharmacy Bleeding Risk]**
   - **Conditions:** Atrial Fibrillation, Congestive Heart Failure, CKD Stage 3b.
   - **Chronology:** Chronic Warfarin 5mg therapy + outside addition of Amiodarone 200mg resulting in critical INR elevation (4.8).
3. **Clara Higgins (64F, MRN-55912) [Rheumatoid Arthritis / Nephrotoxicity]**
   - **Conditions:** Rheumatoid Arthritis on Methotrexate 15mg + acute addition of high-dose Naproxen 500mg BID with baseline CKD Stage 3a.
