from fastapi import APIRouter, Depends
from sqlalchemy import func as sfunc
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import models, schemas

router = APIRouter(prefix="/journal", tags=["journal"])


@router.post("/save", response_model=schemas.JournalOut)
def save_entry(entry: schemas.JournalCreate, db: Session = Depends(get_db)):
    db_entry = models.JournalEntry(**entry.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@router.get("/get", response_model=List[schemas.JournalOut])
def get_entries(db: Session = Depends(get_db)):
    return db.query(models.JournalEntry).order_by(models.JournalEntry.created_at.desc()).all()


@router.get("/by-date/{date}", response_model=List[schemas.JournalOut])
def entries_by_date(date: str, db: Session = Depends(get_db)):
    return db.query(models.JournalEntry).filter(
        sfunc.date(models.JournalEntry.created_at) == date
    ).all()