# app/api/comics.py
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.models import User
from app.database import SessionLocal
from app.models import Comic
from app.schemas import ComicOut
import os
import shutil

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

    return FileResponse(path=file_path, filename=f"{db_comic.title}.pdf")

def get_current_admin_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or user.role != 'admin':
        raise HTTPException(
            status_code=401,
            detail="The user does not have the required permissions"
        )
    return user

@router.post("/upload_comic")
async def upload_comic(username: str, title: str, summary: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    current_user = get_current_admin_user(username, db)
    
    # Save file to disk
    file_location = f"/path/to/your/storage/{file.filename}"
    with open(file_location, "wb") as file_out:
        shutil.copyfileobj(file.file, file_out)

    # Create new comic entry in database
    new_comic = Comic(title=title, resource_path=file_location, summary=summary, view_count=0)
    db.add(new_comic)
    db.commit()
    db.refresh(new_comic)

    return {"id": new_comic.id, "title": new_comic.title, "resource_path": new_comic.resource_path, "summary": new_comic.summary, "view_count": new_comic.view_count}