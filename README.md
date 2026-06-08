# 🌿 Talanta — Climate Finance Intelligence Platform

[![Deploy](https://github.com/KarenOrijin/talanta/actions/workflows/deploy.yml/badge.svg)](https://github.com/KarenOrijin/talanta/actions/workflows/deploy.yml)

Talanta is a high-end MVP platform for tracking, verifying, and reporting on climate finance flows across Africa. It provides governments, donors, NGOs, and private investors with a unified intelligence layer over climate finance data — covering $4.82B in commitments across 147 active projects in 34 countries.

---

## ✨ Features

| Module | Description |
|---|---|
| **Overview** | Real-time KPI dashboard — committed capital, disbursements, CO₂ avoided, beneficiaries |
| **Finance Flows** | Donor portfolio breakdowns, instrument mix (grants/loans/guarantees), disbursement timeline |
| **Projects** | 147 projects filterable by sector, status, donor, and country with live progress bars |
| **Verification & MRV** | Satellite + AI greenwashing detection, carbon credit verification, on-chain audit trail |
| **Risk Monitor** | Physical, transition & execution risk flags with portfolio VaR |
| **Impact Tracker** | Verified outcomes vs. NDC targets — CO₂, clean capacity, beneficiaries, forest, gender |
| **Reports & IATI** | One-click publishing to IATI Registry, GCF Performance Framework, OECD-DAC CRS |
| **Compliance** | Donor reporting compliance meters with automated reminder workflow |
| **Funding Access** | Matched funding opportunities + blended finance capital stack builder |

**Role switcher** — view the platform as Government, Donor/DFI, NGO/Implementer, or Private Investor.

---

## 🏗 Architecture

```
talanta/
├── frontend/                  # React 18 + Vite
│   ├── src/
│   │   ├── App.jsx            # Root — state, routing, panel switching
│   │   ├── data.js            # All data constants (shared across components)
│   │   ├── index.css          # Full design system (CSS variables, components)
│   │   ├── components/
│   │   │   ├── Sidebar.jsx    # Dark sidebar with nav + role switcher
│   │   │   ├── Topbar.jsx     # Title, search, IATI status, avatar
│   │   │   ├── BottomBar.jsx  # Live data status bar
│   │   │   └── panels/        # One file per dashboard panel (9 total)
│   │   │       ├── Overview.jsx
│   │   │       ├── FinanceFlows.jsx
│   │   │       ├── Projects.jsx
│   │   │       ├── Verification.jsx
│   │   │       ├── RiskMonitor.jsx
│   │   │       ├── ImpactTracker.jsx
│   │   │       ├── Reporting.jsx
│   │   │       ├── Compliance.jsx
│   │   │       └── FundingAccess.jsx
│   ├── package.json
│   └── vite.config.js         # Proxies /api → localhost:8000 in dev
│
├── backend/                   # FastAPI (Python 3.11)
│   ├── main.py                # App entry — CORS, router registration
│   ├── data/
│   │   └── seed_data.py       # All data (mirrors frontend/src/data.js)
│   ├── routers/               # One router per domain
│   │   ├── overview.py        # GET /api/overview/{kpis,feed,sectors,countries}
│   │   ├── projects.py        # GET /api/projects?filter=
│   │   ├── flows.py           # GET /api/flows/{donors,disbursements}
│   │   ├── verification.py    # GET /api/verification/list
│   │   ├── risk.py            # GET /api/risk/flags
│   │   ├── impact.py          # GET /api/impact/{ndc,sectors}
│   │   ├── compliance.py      # GET /api/compliance/donors
│   │   └── access.py          # GET /api/access/opportunities
│   ├── tests/
│   │   └── test_api.py        # 18 pytest assertions across all endpoints
│   ├── requirements.txt
│   └── Procfile               # Railway/Render deploy command
│
└── .github/
    └── workflows/
        └── deploy.yml         # CI: build frontend + run backend tests on push
```

**Stack:**
- **Frontend:** React 18, Vite 5, plain CSS (no framework)
- **Backend:** FastAPI 0.115, Uvicorn, Python 3.11
- **CI/CD:** GitHub Actions → Vercel (frontend) + Railway (backend)

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
# → http://localhost:8000
# → Swagger docs: http://localhost:8000/docs
```

> The Vite dev server proxies all `/api/*` requests to `localhost:8000` automatically — no CORS issues in development.

### Run Backend Tests

```bash
cd backend
pytest tests/ -v
```

All 18 tests should pass, covering every API endpoint.

---

## ☁️ Deploy to Production

### Frontend → Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `talanta` GitHub repo
3. Set **Root Directory** to `frontend`
4. Vercel auto-detects Vite — click **Deploy**
5. Live URL: `https://talanta.vercel.app`

### Backend → Railway

1. Go to [railway.app/new](https://railway.app/new)
2. Deploy from GitHub repo → select `talanta`
3. Set **Root Directory** to `backend`
4. Railway reads `Procfile` automatically — click **Deploy**
5. Copy the generated URL and set it as `VITE_API_URL` in your Vercel environment variables

### Environment Variables

| Variable | Where | Value |
|---|---|---|
| `VITE_API_URL` | Vercel | Your Railway backend URL, e.g. `https://talanta-api.up.railway.app` |

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check + product name |
| GET | `/health` | `{"status": "healthy"}` |
| GET | `/api/overview/kpis` | Top-level KPIs (committed, disbursed, CO₂, etc.) |
| GET | `/api/overview/feed` | Live activity feed (5 events) |
| GET | `/api/overview/sectors` | Finance by sector (7 sectors) |
| GET | `/api/overview/countries` | Geographic reach (8 countries) |
| GET | `/api/projects` | All 10 projects (seed data) |
| GET | `/api/projects?filter=Renewable Energy` | Filtered projects by sector or title |
| GET | `/api/flows/donors` | Donor portfolio breakdown (7 donors) |
| GET | `/api/flows/disbursements` | Disbursement timeline (6 events) |
| GET | `/api/verification/list` | MRV verification results (4 records) |
| GET | `/api/risk/flags` | Active risk flags (5 flags, 3 HIGH) |
| GET | `/api/impact/ndc` | NDC target progress (5 targets) |
| GET | `/api/impact/sectors` | CO₂ impact by sector (5 sectors) |
| GET | `/api/compliance/donors` | IATI compliance by donor (8 donors) |
| GET | `/api/access/opportunities` | Matched funding opportunities (5 funds) |

Full interactive docs available at `/docs` (Swagger UI) and `/redoc`.

---

## 🧪 CI / CD

Every push to `main` triggers two parallel GitHub Actions jobs:

```
push → main
  ├── build-frontend   (Node 20)
  │     npm install → vite build → upload dist artifact
  └── test-backend     (Python 3.11)
        pip install → pytest tests/ -v (18 tests)
```

Both jobs must pass before a deployment is considered healthy.

---

## 📐 Design System

The entire UI is built on a single CSS file (`frontend/src/index.css`) with CSS custom properties. No Tailwind, no CSS-in-JS — just variables and semantic class names.

| Token | Value | Usage |
|---|---|---|
| `--green` | `#1D9E75` | Primary brand, active states |
| `--amber` | `#EF9F27` | Warnings, pending states |
| `--red` | `#E24B4A` | Danger, high risk |
| `--blue` | `#378ADD` | Information, loans |
| `--ink` | `#0E1B14` | Primary text, sidebar bg |
| `--surface` | `#F7FAF8` | Page background |

---

## 📄 License

MIT © 2025 Orijin. Built with ❤️ for Africa's climate finance ecosystem.
