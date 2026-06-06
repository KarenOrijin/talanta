from fastapi import APIRouter, Query
from data.seed_data import PROJECTS

router = APIRouter()

@router.get("/api/projects")
def get_projects(filter: str = Query(default="all")):
    if filter == "all":
        return PROJECTS
    return [
        p for p in PROJECTS
        if filter.lower() in p["sector"].lower() or filter.lower() in p["title"].lower()
    ]
