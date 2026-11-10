#!/usr/bin/env python3
"""Merge 1000 org leads + 400 HNW Christian leads into one master Excel/CSV."""
from __future__ import annotations

import csv
import subprocess
import sys
from pathlib import Path

OUTREACH = Path(__file__).resolve().parent

MASTER_FIELDS = [
    "id",
    "name",
    "organization",
    "email",
    "phone",
    "category",
    "region",
    "contact_type",
    "priority",
    "outreach_wave",
    "notes",
    "source_url",
    "funding_fit",
    "verify_email",
]


def run_generators() -> None:
    subprocess.run([sys.executable, str(OUTREACH / "build_global_leads_1000.py")], check=True)
    subprocess.run([sys.executable, str(OUTREACH / "generate_hnw_400.py")], check=True)


def load_csv(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def normalize(row: dict, default_category: str) -> dict:
    return {
        "name": row.get("name", ""),
        "organization": row.get("organization", ""),
        "email": row.get("email", ""),
        "phone": row.get("phone", ""),
        "category": row.get("category", default_category),
        "region": row.get("region", ""),
        "contact_type": row.get("contact_type", "organization"),
        "priority": row.get("priority", "Medium"),
        "outreach_wave": row.get("outreach_wave", "6"),
        "notes": row.get("notes", ""),
        "source_url": row.get("source_url", ""),
        "funding_fit": row.get("funding_fit", "Medium"),
        "verify_email": row.get("verify_email", "yes"),
    }


def main() -> None:
    run_generators()
    org_rows = load_csv(OUTREACH / "GLOBAL_PHILANTHROPY_LEADS_1000.csv")
    hnw_rows = load_csv(OUTREACH / "HNW_CHRISTIAN_PHILANTHROPISTS_400.csv")

    merged = []
    for r in org_rows:
        n = normalize(r, "Organization / institution")
        n["contact_type"] = "organization"
        merged.append(n)
    for r in hnw_rows:
        merged.append(normalize(r, "HNW Christian individual"))

    for i, r in enumerate(merged, 1):
        r["id"] = str(i)

    master_csv = OUTREACH / "PEFA_Coach_MASTER_LEADS_1400.csv"
    with master_csv.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=MASTER_FIELDS)
        w.writeheader()
        w.writerows(merged)

    try:
        import openpyxl

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Master leads"
        ws.append(MASTER_FIELDS)
        for r in merged:
            ws.append([r.get(c, "") for c in MASTER_FIELDS])
        # HNW-only sheet
        ws2 = wb.create_sheet("HNW individuals")
        hnw_fields = list(hnw_rows[0].keys()) if hnw_rows else MASTER_FIELDS
        ws2.append(hnw_fields)
        for r in hnw_rows:
            ws2.append([r.get(c, "") for c in hnw_fields])
        wb.save(OUTREACH / "PEFA_Coach_MASTER_LEADS_1400.xlsx")
    except ImportError:
        pass

    print(f"Master file: {len(merged)} leads ({len(org_rows)} org + {len(hnw_rows)} HNW)")


if __name__ == "__main__":
    main()
