"""Curated Clinical Sample Data
High-fidelity, de-identified synthetic test cases for offline reproducibility (SAMPLE_MODE=true).
No real patient health information (PHI) is included.
"""
from typing import Dict, Any, List

SAMPLE_PATIENTS: Dict[str, Dict[str, Any]] = {
    "patient-ev-49201": {
        "id": "patient-ev-49201",
        "mrn": "MRN-49201",
        "name": "Eleanor Vance",
        "age": 68,
        "gender": "Female",
        "chronic_conditions": [
            {"name": "Chronic Kidney Disease Stage 3a", "diagnosed": "2024-03-12", "baseline_egfr": 54},
            {"name": "Type 2 Diabetes Mellitus", "diagnosed": "2014-08-20", "control": "Stable on Metformin"},
            {"name": "Essential Hypertension", "diagnosed": "2018-05-10", "control": "Treated with Lisinopril"},
            {"name": "Osteoarthritis (Bilateral Knees)", "diagnosed": "2021-11-04"}
        ],
        "allergies": ["Sulfa drugs (rash)", "Penicillin (mild hives)"],
        "active_medications": [
            {
                "id": "med-1",
                "name": "Lisinopril",
                "dosage": "20mg",
                "frequency": "Once daily",
                "prescribed_by": "Dr. Marcus Chen (PCP)",
                "category": "ACE Inhibitor",
                "indication": "Hypertension / Renal Protection",
                "source": "Outpatient EHR / Hope Valley Medical Group",
                "start_date": "2024-04-01"
            },
            {
                "id": "med-2",
                "name": "Metformin ER",
                "dosage": "1000mg",
                "frequency": "Once daily with dinner",
                "prescribed_by": "Dr. Marcus Chen (PCP)",
                "category": "Biguanide",
                "indication": "Type 2 Diabetes",
                "source": "Outpatient EHR / Hope Valley Medical Group",
                "start_date": "2014-09-01"
            },
            {
                "id": "med-3",
                "name": "Empagliflozin",
                "dosage": "10mg",
                "frequency": "Once daily in morning",
                "prescribed_by": "Dr. Marcus Chen (PCP)",
                "category": "SGLT2 Inhibitor",
                "indication": "Cardiorenal protection",
                "source": "Outpatient EHR / Hope Valley Medical Group",
                "start_date": "2025-01-15"
            },
            {
                "id": "med-4",
                "name": "Meloxicam",
                "dosage": "15mg",
                "frequency": "Once daily PRN for knee flare",
                "prescribed_by": "Dr. Robert Alvarez (Urgent Care)",
                "category": "NSAID",
                "indication": "Acute Knee Osteoarthritis Pain",
                "source": "Valley Urgent Care Encounter Note",
                "start_date": "2026-10-10"
            }
        ],
        "longitudinal_labs": [
            {"id": "lab-101", "date": "2026-04-15", "test_name": "eGFR (CKD-EPI)", "value": 54, "unit": "mL/min/1.73m2", "ref_range": "> 60", "flag": "LOW", "facility": "St. Jude Outpatient Lab"},
            {"id": "lab-102", "date": "2026-04-15", "test_name": "Serum Creatinine", "value": 1.28, "unit": "mg/dL", "ref_range": "0.50 - 1.10", "flag": "HIGH", "facility": "St. Jude Outpatient Lab"},
            {"id": "lab-103", "date": "2026-04-15", "test_name": "Potassium", "value": 4.4, "unit": "mEq/L", "ref_range": "3.5 - 5.0", "flag": "NORMAL", "facility": "St. Jude Outpatient Lab"},
            {"id": "lab-104", "date": "2026-04-15", "test_name": "Hemoglobin A1c", "value": 7.1, "unit": "%", "ref_range": "< 5.7", "flag": "HIGH", "facility": "St. Jude Outpatient Lab"},
            {"id": "lab-201", "date": "2026-10-21", "test_name": "eGFR (CKD-EPI)", "value": 42, "unit": "mL/min/1.73m2", "ref_range": "> 60", "flag": "CRITICAL_LOW", "facility": "Valley Health Diagnostic Center"},
            {"id": "lab-202", "date": "2026-10-21", "test_name": "Serum Creatinine", "value": 1.82, "unit": "mg/dL", "ref_range": "0.50 - 1.10", "flag": "CRITICAL_HIGH", "facility": "Valley Health Diagnostic Center"},
            {"id": "lab-203", "date": "2026-10-21", "test_name": "Potassium", "value": 5.2, "unit": "mEq/L", "ref_range": "3.5 - 5.0", "flag": "HIGH", "facility": "Valley Health Diagnostic Center"},
            {"id": "lab-204", "date": "2026-10-21", "test_name": "Blood Urea Nitrogen", "value": 34, "unit": "mg/dL", "ref_range": "7 - 20", "flag": "HIGH", "facility": "Valley Health Diagnostic Center"},
            {"id": "lab-205", "date": "2026-10-21", "test_name": "Hemoglobin A1c", "value": 6.9, "unit": "%", "ref_range": "< 5.7", "flag": "HIGH", "facility": "Valley Health Diagnostic Center"}
        ],
        "clinical_encounters": [
            {
                "id": "enc-1",
                "date": "2026-04-15",
                "facility": "Hope Valley Medical Group",
                "author": "Dr. Marcus Chen (PCP)",
                "specialty": "Internal Medicine",
                "summary": "Routine semi-annual CKD Stage 3a and T2D check. Baseline eGFR 54. Patient doing well, encouraged hydration and low-sodium diet. Continue Lisinopril 20mg."
            },
            {
                "id": "enc-2",
                "date": "2026-10-10",
                "facility": "Valley Urgent Care Clinic",
                "author": "Dr. Robert Alvarez",
                "specialty": "Urgent Care",
                "summary": "Walk-in encounter for acute right knee pain and swelling after gardening. Diagnosed acute osteoarthritis flare. Prescribed Meloxicam 15mg once daily PRN. No outpatient records available at intake."
            }
        ]
    },
    "patient-mt-38102": {
        "id": "patient-mt-38102",
        "mrn": "MRN-38102",
        "name": "Marcus Thorne",
        "age": 72,
        "gender": "Male",
        "chronic_conditions": [
            {"name": "Atrial Fibrillation", "diagnosed": "2020-02-11"},
            {"name": "Congestive Heart Failure (NYHA Class II)", "diagnosed": "2022-06-18"},
            {"name": "Chronic Kidney Disease Stage 3b", "diagnosed": "2023-09-05"}
        ],
        "allergies": ["Aspirin (GI bleeding)"],
        "active_medications": [
            {"id": "mt-med-1", "name": "Warfarin", "dosage": "5mg", "frequency": "Daily", "category": "Anticoagulant", "indication": "Stroke Prevention in AFib", "source": "Cardiology Clinic", "start_date": "2020-03-01"},
            {"id": "mt-med-2", "name": "Digoxin", "dosage": "0.125mg", "frequency": "Daily", "category": "Cardiac Glycoside", "indication": "Heart Failure Rate Control", "source": "Cardiology Clinic", "start_date": "2022-07-01"},
            {"id": "mt-med-3", "name": "Amiodarone", "dosage": "200mg", "frequency": "Daily", "category": "Antiarrhythmic", "indication": "Refractory AFib", "source": "Outside Electrophysiology Consult", "start_date": "2026-10-05"}
        ],
        "longitudinal_labs": [
            {"id": "mt-lab-1", "date": "2026-09-10", "test_name": "INR", "value": 2.3, "unit": "ratio", "ref_range": "2.0 - 3.0", "flag": "NORMAL", "facility": "Heart Institute Lab"},
            {"id": "mt-lab-2", "date": "2026-10-22", "test_name": "INR", "value": 4.8, "unit": "ratio", "ref_range": "2.0 - 3.0", "flag": "CRITICAL_HIGH", "facility": "Community Health Lab"},
            {"id": "mt-lab-3", "date": "2026-10-22", "test_name": "Serum Digoxin", "value": 2.4, "unit": "ng/mL", "ref_range": "0.5 - 2.0", "flag": "CRITICAL_HIGH", "facility": "Community Health Lab"}
        ],
        "clinical_encounters": [
            {
                "id": "mt-enc-1",
                "date": "2026-10-05",
                "facility": "Northwest Cardiac Specialists",
                "author": "Dr. Sarah Jenkins",
                "specialty": "Electrophysiology",
                "summary": "Initiated Amiodarone 200mg daily for breakthrough AFib. Patient advised to follow up with primary cardiologist for drug monitoring."
            }
        ]
    },
    "patient-ch-55912": {
        "id": "patient-ch-55912",
        "mrn": "MRN-55912",
        "name": "Clara Higgins",
        "age": 64,
        "gender": "Female",
        "chronic_conditions": [
            {"name": "Rheumatoid Arthritis", "diagnosed": "2017-04-12"},
            {"name": "Chronic Kidney Disease Stage 3a", "diagnosed": "2023-10-02"}
        ],
        "allergies": ["Codeine (nausea)"],
        "active_medications": [
            {"id": "ch-med-1", "name": "Methotrexate", "dosage": "15mg", "frequency": "Weekly", "category": "DMARD", "indication": "Rheumatoid Arthritis", "source": "Rheumatology Group", "start_date": "2019-01-10"},
            {"id": "ch-med-2", "name": "Naproxen", "dosage": "500mg", "frequency": "Twice daily", "category": "NSAID", "indication": "Joint Pain", "source": "Self-reported OTC / Walk-in clinic", "start_date": "2026-09-28"}
        ],
        "longitudinal_labs": [
            {"id": "ch-lab-1", "date": "2026-05-10", "test_name": "eGFR (CKD-EPI)", "value": 52, "unit": "mL/min/1.73m2", "ref_range": "> 60", "flag": "LOW", "facility": "Valley Diagnostic Lab"},
            {"id": "ch-lab-2", "date": "2026-10-19", "test_name": "eGFR (CKD-EPI)", "value": 37, "unit": "mL/min/1.73m2", "ref_range": "> 60", "flag": "CRITICAL_LOW", "facility": "Valley Diagnostic Lab"},
            {"id": "ch-lab-3", "date": "2026-10-19", "test_name": "Serum Creatinine", "value": 1.95, "unit": "mg/dL", "ref_range": "0.50 - 1.10", "flag": "CRITICAL_HIGH", "facility": "Valley Diagnostic Lab"}
        ],
        "clinical_encounters": [
            {
                "id": "ch-enc-1",
                "date": "2026-09-28",
                "facility": "Convenient Care Clinic",
                "author": "PA David Ross",
                "specialty": "Family Practice",
                "summary": "Patient presented with severe finger joint stiffness. Advised high-dose Naproxen 500mg twice daily."
            }
        ]
    }
}

def get_sample_patient(patient_id_or_query: str) -> Dict[str, Any]:
    """Find sample patient by ID, name, or MRN."""
    query = (patient_id_or_query or "").lower()
    for pid, pdata in SAMPLE_PATIENTS.items():
        if (
            pid.lower() in query
            or pdata["mrn"].lower() in query
            or pdata["name"].lower() in query
            or (query in ("demo", "demo-001", "default", "eleanor"))
        ):
            return pdata
    # Default to Eleanor Vance
    return SAMPLE_PATIENTS["patient-ev-49201"]
