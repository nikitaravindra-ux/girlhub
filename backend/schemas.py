from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class JournalCreate(BaseModel):
    title: str = "Untitled"
    content: str
    mood: Optional[str] = None


class JournalOut(JournalCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    text: str


class TaskUpdate(BaseModel):
    done: bool


class TaskOut(BaseModel):
    id: int
    text: str
    done: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str


class AnalyzeRequest(BaseModel):
    text: str


class AffirmationRequest(BaseModel):
    transcript: str


class TarotRequest(BaseModel):
    cards: List[str]
    question: Optional[str] = None