from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import journal, tasks, ai

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GirlHub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(journal.router)
app.include_router(tasks.router)
app.include_router(ai.router)


@app.get("/")
def root():
    return {"status": "GirlHub API running 💫"}