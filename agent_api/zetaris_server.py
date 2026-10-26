"""Zetaris Lightning Engine REST Service
Emulates the live Zetaris Spark SQL Virtualization REST API:
- POST /zetaris/api/v1.0/query
- POST /api/v1.0/query
- GET /api/config
Provides in-situ querying across disparate EHR, Quest lab, and urgent care silos.
"""
import time
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Request, Header, HTTPException
from pydantic import BaseModel
from agent_api.adapters.sample_data import get_sample_patient

router = APIRouter(tags=["Zetaris Data Fabric"])

class ZetarisQueryPayload(BaseModel):
    sql: str
    format: Optional[str] = "json"
    max_rows: Optional[int] = 100
    patient_id: Optional[str] = "patient-ev-49201"

@router.get("/api/config")
@router.get("/zetaris/api/config")
def zetaris_config():
    """Zetaris UI & Engine Health/Config Check Endpoint."""
    return {
        "status": "ONLINE",
        "service": "Zetaris Lightning Spark SQL Engine",
        "version": "3.5.2-vFabric",
        "org_id": "1",
        "cluster_health": "OPTIMAL",
        "virtualized_catalogs": [
            "zetaris.ehr",
            "zetaris.labs",
            "zetaris.pharmacy",
            "zetaris.urgent_care"
        ],
        "active_connectors": [
            "jdbc:postgresql://ehr-metastore:5432/hospital_records",
            "s3://quest-diagnostic-vault/metabolic_panels/",
            "rest://valley-urgent-care.local/api/v1/encounters"
        ]
    }

@router.post("/zetaris/api/v1.0/query")
@router.post("/api/v1.0/query")
@router.post("/zetaris/query")
def execute_zetaris_query(
    payload: ZetarisQueryPayload,
    authorization: Optional[str] = Header(None),
    x_zetaris_org_id: Optional[str] = Header(None)
):
    """Execute live Spark SQL query over federated health tables."""
    start_time = time.time()
    sql = payload.sql.strip()
    norm_sql = sql.lower()
    patient_id = payload.patient_id or "patient-ev-49201"

    # Load patient partition data
    patient_data = get_sample_patient(patient_id)

    columns: List[str] = []
    rows: List[Dict[str, Any]] = []
    tables_queried: List[str] = []
    connectors: List[str] = []

    if "labs" in norm_sql or "longitudinal" in norm_sql or "egfr" in norm_sql or "creatinine" in norm_sql:
        tables_queried = ["zetaris.labs.longitudinal_results"]
        connectors = [
            "s3://quest-diagnostic-vault/metabolic_panels/",
            "jdbc:postgresql://ehr-metastore:5432/hospital_records"
        ]
        columns = ["date", "test_name", "value", "unit", "reference_range", "flag", "source_facility"]
        rows = [
            {
                "date": l["date"],
                "test_name": l["test_name"],
                "value": l["value"],
                "unit": l["unit"],
                "reference_range": l.get("reference_range", ""),
                "flag": l.get("flag", "NORMAL"),
                "source_facility": l.get("source_facility", "Quest Diagnostics")
            }
            for l in patient_data["longitudinal_labs"]
        ]
    elif "medication" in norm_sql or "pharmacy" in norm_sql or "meloxicam" in norm_sql or "lisinopril" in norm_sql:
        tables_queried = ["zetaris.pharmacy.active_medications"]
        connectors = [
            "jdbc:postgresql://ehr-metastore:5432/hospital_records",
            "rest://valley-urgent-care.local/api/v1/prescriptions"
        ]
        columns = ["name", "dose", "frequency", "route", "prescriber", "start_date", "indication"]
        rows = [
            {
                "name": m["name"],
                "dose": m["dose"],
                "frequency": m["frequency"],
                "route": m.get("route", "Oral"),
                "prescriber": m.get("prescriber", "Unknown"),
                "start_date": m.get("start_date", ""),
                "indication": m.get("indication", "")
            }
            for m in patient_data["active_medications"]
        ]
    elif "urgent_care" in norm_sql or "encounter" in norm_sql or "clinic" in norm_sql:
        tables_queried = ["zetaris.urgent_care.encounters"]
        connectors = ["rest://valley-urgent-care.local/api/v1/encounters"]
        columns = ["date", "facility", "provider", "chief_complaint", "clinical_findings", "discharge_medications"]
        rows = [
            {
                "date": e["date"],
                "facility": e["facility"],
                "provider": e["provider"],
                "chief_complaint": e.get("chief_complaint", ""),
                "clinical_findings": e.get("clinical_findings", ""),
                "discharge_medications": e.get("discharge_medications", [])
            }
            for e in patient_data["clinical_encounters"]
        ]
    else:
        # Default: Patient demographics
        tables_queried = ["zetaris.ehr.patient_demographics"]
        connectors = ["jdbc:postgresql://ehr-metastore:5432/hospital_records"]
        columns = ["id", "mrn", "name", "age", "gender", "chronic_conditions"]
        rows = [
            {
                "id": patient_data["id"],
                "mrn": patient_data["mrn"],
                "name": patient_data["name"],
                "age": patient_data["age"],
                "gender": patient_data["gender"],
                "chronic_conditions": [c["name"] for c in patient_data.get("chronic_conditions", [])]
            }
        ]

    execution_time_ms = int((time.time() - start_time) * 1000) + 12

    return {
        "status": "SUCCESS",
        "engine": "Zetaris Lightning Spark SQL 3.5.2",
        "query_id": f"zetaris-run-{int(time.time() * 1000)}",
        "sql": sql,
        "row_count": len(rows),
        "execution_time_ms": execution_time_ms,
        "columns": columns,
        "rows": rows[:payload.max_rows or 100],
        "source_federation": {
            "tables_virtualized": tables_queried,
            "connectors": connectors
        },
        # Structured patient object for agent consumption
        "patient": {
            "id": patient_data["id"],
            "mrn": patient_data["mrn"],
            "name": patient_data["name"],
            "age": patient_data["age"],
            "gender": patient_data["gender"],
            "conditions": patient_data["chronic_conditions"]
        },
        "medications": patient_data["active_medications"],
        "labs": patient_data["longitudinal_labs"],
        "encounters": patient_data["clinical_encounters"]
    }
