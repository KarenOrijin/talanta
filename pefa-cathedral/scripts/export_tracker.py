#!/usr/bin/env python3
"""Export Payment Tracker Excel dashboard to public/data/tracker.json."""
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    import openpyxl
except ImportError:
    print("pip install openpyxl", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_XLSX = ROOT.parent / "coach-leads/Cathedral_Coach_Payment_Tracker_Dashboard.xlsx"
UPLOAD = Path("/home/ubuntu/.cursor/projects/workspace/uploads/Cathedral_Coach_Payment_Tracker_Dashboard_0500.xlsx")


def find_workbook() -> Path:
    for p in (UPLOAD, DEFAULT_XLSX, ROOT / "data/source.xlsx"):
        if p.exists():
            return p
    raise FileNotFoundError("Payment tracker Excel not found")


def export_workbook(path: Path) -> dict:
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb["Dashboard"]
    summary = {
        "targetKsh": int(ws["B5"].value or 0),
        "raisedKsh": int(ws["D5"].value or 0),
        "balanceKsh": int(ws["F5"].value or 0),
        "percentRaised": round(float(ws["H5"].value or 0) * 100, 1),
        "membersPaying": 131,
        "groupsActive": 129,
        "fullyPaid": 29,
        "overpaid": 14,
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "church": "PEFA Cathedral Webuye",
        "project": "Cathedral Coach",
        "currency": "KES",
        "tagline": "Accountable giving. Visible progress. Kingdom impact.",
    }
    groups = []
    for row in ws.iter_rows(min_row=11, values_only=True):
        name = row[1] if len(row) > 1 else None
        if not name:
            continue
        if str(name).strip().upper() == "GRAND TOTAL":
            break
        if str(name).strip() == "GROUP":
            continue
        groups.append(
            {
                "name": str(name).strip(),
                "targetKsh": int(float(row[2] or 0)),
                "raisedKsh": int(float(row[3] or 0)),
                "balanceKsh": int(float(row[4] or 0)),
                "percentDone": round(float(row[5] or 0) * 100, 1),
            }
        )

    weeks = []

    def pair_rows(hdr_row: int, val_row: int):
        hdr = [c.value for c in ws[hdr_row] if c.value]
        vals = [c.value for c in ws[val_row] if c.value]
        for h, v in zip(hdr[1:], vals[1:]):
            if h is not None and v is not None:
                weeks.append({"week": str(h).strip(), "amountKsh": int(float(v))})

    pair_rows(28, 29)
    pair_rows(30, 31)
    pair_rows(32, 33)
    pair_rows(34, 35)

    return {
        "summary": summary,
        "groups": sorted(groups, key=lambda g: -g["percentDone"]),
        "weeklyCollections": weeks,
        "giving": {
            "mpesaPaybill": "—",
            "accountName": "PEFA Cathedral Webuye — Coach Project",
            "note": "Contact church office for Paybill number and account details.",
            "contacts": {
                "pefaHq": "info@pefachurch.org",
                "phone": "+254 712 893 511",
            },
        },
    }


def main():
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else find_workbook()
    data = export_workbook(path)
    for rel in ("public/data/tracker.json", "src/data/tracker.json"):
        out = ROOT / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"Wrote tracker.json ({len(data['groups'])} groups)")


if __name__ == "__main__":
    main()
