from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import overview, projects, flows, verification, risk, impact, compliance, access

app = FastAPI(title="Talanta API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(overview.router)
app.include_router(projects.router)
app.include_router(flows.router)
app.include_router(verification.router)
app.include_router(risk.router)
app.include_router(impact.router)
app.include_router(compliance.router)
app.include_router(access.router)

@app.get("/")
def root():
    return {"status": "ok", "product": "Talanta API"}

@app.get("/health")
def health():
    return {"status": "healthy"}
