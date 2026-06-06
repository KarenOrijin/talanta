from fastapi import APIRouter
from data.seed_data import OVERVIEW_KPIS, FEED, SECTORS, COUNTRIES

router = APIRouter()

@router.get("/api/overview/kpis")
def get_kpis():
    return OVERVIEW_KPIS

@router.get("/api/overview/feed")
def get_feed():
    return FEED

@router.get("/api/overview/sectors")
def get_sectors():
    return SECTORS

@router.get("/api/overview/countries")
def get_countries():
    return COUNTRIES
