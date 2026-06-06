from fastapi import APIRouter
from data.seed_data import COMPLIANCE_DONORS

router = APIRouter()

@router.get("/api/compliance/donors")
def get_compliance_donors():
    return COMPLIANCE_DONORS
