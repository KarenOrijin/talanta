from fastapi import APIRouter
from data.seed_data import RISK_FLAGS

router = APIRouter()

@router.get("/api/risk/flags")
def get_risk_flags():
    return RISK_FLAGS
