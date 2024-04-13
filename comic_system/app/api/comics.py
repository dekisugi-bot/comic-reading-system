# app/api/comics.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Comic
from app.schemas import ComicOut
import os

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/comics/{comic_id}", response_model=ComicOut)
def get_comic(comic_id: int, db: Session = Depends(get_db)):
    db_comic = db.query(Comic).filter(Comic.id == comic_id).first()
    if db_comic is None:
        raise HTTPException(status_code=404, detail="Comic not found")
    
    # Path to the comic file
    file_path = db_comic.resource_path
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Comic file not found")
