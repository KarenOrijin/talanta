"""
Talanta API smoke tests — run with: pytest tests/ -v
"""
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["product"] == "Talanta API"


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_overview_kpis():
    r = client.get("/api/overview/kpis")
    assert r.status_code == 200
    data = r.json()
    assert "total_committed" in data
    assert "active_projects" in data
    assert data["active_projects"] == 147


def test_overview_feed():
    r = client.get("/api/overview/feed")
    assert r.status_code == 200
    assert len(r.json()) == 5


def test_overview_sectors():
    r = client.get("/api/overview/sectors")
    assert r.status_code == 200
    assert len(r.json()) == 7


def test_overview_countries():
    r = client.get("/api/overview/countries")
    assert r.status_code == 200
    assert len(r.json()) == 8


def test_projects_all():
    r = client.get("/api/projects")
    assert r.status_code == 200
    assert len(r.json()) == 10


def test_projects_filter_renewable():
    r = client.get("/api/projects?filter=Renewable Energy")
    assert r.status_code == 200
    results = r.json()
    assert len(results) > 0
    for p in results:
        assert "renewable" in p["sector"].lower() or "renewable" in p["title"].lower()


def test_projects_filter_no_match():
    r = client.get("/api/projects?filter=NOMATCH12345")
    assert r.status_code == 200
    assert r.json() == []


def test_flows_donors():
    r = client.get("/api/flows/donors")
    assert r.status_code == 200
    donors = r.json()
    assert len(donors) == 7
    assert donors[0]["abbr"] == "GCF"


def test_flows_disbursements():
    r = client.get("/api/flows/disbursements")
    assert r.status_code == 200
    assert len(r.json()) == 6


def test_verification_list():
    r = client.get("/api/verification/list")
    assert r.status_code == 200
    assert len(r.json()) == 4


def test_risk_flags():
    r = client.get("/api/risk/flags")
    assert r.status_code == 200
    flags = r.json()
    assert len(flags) == 5
    high = [f for f in flags if f["sev"] == "HIGH"]
    assert len(high) == 3


def test_impact_ndc():
    r = client.get("/api/impact/ndc")
    assert r.status_code == 200
    assert len(r.json()) == 5


def test_impact_sectors():
    r = client.get("/api/impact/sectors")
    assert r.status_code == 200
    assert len(r.json()) == 5


def test_compliance_donors():
    r = client.get("/api/compliance/donors")
    assert r.status_code == 200
    donors = r.json()
    assert len(donors) == 8
    gcf = next(d for d in donors if d["name"] == "GCF")
    assert gcf["pct"] == 98


def test_access_opportunities():
    r = client.get("/api/access/opportunities")
    assert r.status_code == 200
    opps = r.json()
    assert len(opps) == 5
    assert opps[0]["match"] == 96
