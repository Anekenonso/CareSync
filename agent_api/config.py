"""CareSync Configuration Loader
Reads settings strictly from environment variables.
Supports offline SAMPLE_MODE fallback.
"""
import os

class Config:
    # Zetaris (Data Layer)
    PORT: int = int(os.getenv("PORT", "8000"))
    ZETARIS_REST_URL: str = os.getenv("ZETARIS_REST_URL", f"http://127.0.0.1:{os.getenv('PORT', '8000')}/zetaris/api/v1.0")
    ZETARIS_ORG_ID: str = os.getenv("ZETARIS_ORG_ID", "1")
    ZETARIS_API_KEY: str = os.getenv("ZETARIS_API_KEY", "zetaris-live-token-ak49")
    ZETARIS_TIMEOUT_SECONDS: int = int(os.getenv("ZETARIS_TIMEOUT_SECONDS", "5"))

    # Meterless Nightshift (Primary AI Provider)
    METERLESS_BASE_URL: str = os.getenv("METERLESS_BASE_URL", "http://127.0.0.1:8088/v1")
    METERLESS_RUNTIME_TOKEN: str = os.getenv("METERLESS_RUNTIME_TOKEN", "")
    METERLESS_MODEL: str = os.getenv("METERLESS_MODEL", "nvidia/nemotron-3.5-lightning-30b-a3b")
    METERLESS_TIMEOUT_SECONDS: int = int(os.getenv("METERLESS_TIMEOUT_SECONDS", "6"))

    # Runtime Behavior
    # If no token is provided or SAMPLE_MODE is true, run in deterministic sample mode
    SAMPLE_MODE: bool = os.getenv("SAMPLE_MODE", "true").lower() in ("true", "1", "yes")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_DIR: str = os.getenv("LOG_DIR", "logs")

cfg = Config()
