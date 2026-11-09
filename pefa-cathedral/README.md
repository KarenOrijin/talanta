# PEFA Cathedral Webuye — Coach project website

Premium public site with **live fundraising tracker** (auto-refresh from `public/data/tracker.json`).

## Update numbers after Excel changes

```bash
python3 scripts/export_tracker.py
# or: npm run export-tracker
```

Point the script at your ledger:

```bash
python3 scripts/export_tracker.py /path/to/Payment_Tracker.xlsx
```

Then rebuild or redeploy.

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
