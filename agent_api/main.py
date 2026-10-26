"""CareSync FastAPI Server
Exposes programmatic entry point POST /run conforming to Section 2 of the Hackathon Technical Execution Guide.
Binds to 0.0.0.0:8000.
"""
import os
import time
from typing import Dict, Any, Optional
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent_api.config import cfg
from agent_api.agents.orchestrator import run_agent_workflow
from agent_api.zetaris_server import router as zetaris_router

app = FastAPI(
    title="CareSync - Clinical Coordination Agent",
    version="1.0.0",
    description="Open Agent Hackathon 2026 - Track 02: The Agent That Can Explain Why"
)

# Enable CORS for external judge calls and local UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Live Zetaris Spark SQL REST Service
app.include_router(zetaris_router)

class RunOptions(BaseModel):
    sample_mode: Optional[bool] = None

class RunInput(BaseModel):
    query: Optional[str] = "Reconcile recent medication changes and explain Eleanor's October kidney lab shift."
    patient_id: Optional[str] = "patient-ev-49201"

class RunRequest(BaseModel):
    run_id: Optional[str] = None
    input: Optional[RunInput] = None
    options: Optional[RunOptions] = None

@app.get("/")
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "CareSync Agent API",
        "track": "The Agent That Can Explain Why",
        "sponsor_tech": {
            "data_layer": "Zetaris REST API",
            "primary_ai_provider": "Meterless Nightshift",
            "memory_engine": "Meterless H-MEM",
            "clinical_reasoning": "NVIDIA Nemotron 3.5 Lightning"
        },
        "sample_mode": cfg.SAMPLE_MODE,
        "port": cfg.PORT
    }

@app.post("/run")
async def run_agent(req: RunRequest):
    run_id = req.run_id or f"run-{int(time.time())}"
    query = req.input.query if req.input and req.input.query else "Explain the recent eGFR drop and urgent care prescription."
    patient_id = req.input.patient_id if req.input and req.input.patient_id else "patient-ev-49201"
    sample_mode = req.options.sample_mode if req.options and req.options.sample_mode is not None else cfg.SAMPLE_MODE

    try:
        result = run_agent_workflow(
            run_id=run_id,
            query=query,
            patient_id=patient_id,
            sample_mode=sample_mode
        )
        return JSONResponse(status_code=200, content=result)
    except Exception as e:
        # Controlled structured error response per Section 2
        return JSONResponse(
            status_code=500,
            content={
                "run_id": run_id,
                "status": "error",
                "error": {
                    "type": type(e).__name__,
                    "message": str(e),
                    "recoverable": True
                },
                "trace_id": run_id,
                "execution_time_seconds": 0.0
            }
        )
