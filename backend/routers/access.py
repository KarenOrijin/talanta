from fastapi import APIRouter
from data.seed_data import FUND_OPPS

router = APIRouter()

@router.get("/api/access/opportunities")
def get_opportunities():
    return FUND_OPPS
