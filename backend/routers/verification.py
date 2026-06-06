from fastapi import APIRouter
from data.seed_data import VERIFS

router = APIRouter()

@router.get("/api/verification/list")
def get_verifs():
    return VERIFS
