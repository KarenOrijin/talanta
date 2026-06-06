from fastapi import APIRouter
from data.seed_data import DONORS, DISB_EVENTS

router = APIRouter()

@router.get("/api/flows/donors")
def get_donors():
    return DONORS

@router.get("/api/flows/disbursements")
def get_disbursements():
    return DISB_EVENTS
