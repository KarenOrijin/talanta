from fastapi import APIRouter
from data.seed_data import NDC_TARGETS, IMPACT_SECTORS

router = APIRouter()

@router.get("/api/impact/ndc")
def get_ndc():
    return NDC_TARGETS

@router.get("/api/impact/sectors")
def get_impact_sectors():
    return IMPACT_SECTORS
