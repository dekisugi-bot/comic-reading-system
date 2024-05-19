# app/api/comics.py
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import asc,desc
from models.user import User
from database.database import SessionLocal
from models.comic import Comic
from schemas.comic import ComicOut, ComicSchema
from models.chapter import Chapter
from schemas.chapter import ChapterSchema, ChapterImage
import os
import shutil

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/getall", response_model=list[ComicSchema])
def get_comics(db: Session = Depends(get_db)):
    comics = db.query(Comic).limit(10).all()
    return comics

@router.get("/chapters/{comic_name}", response_model=list[ChapterSchema])
def get_chapter(comic_name: str, db: Session = Depends(get_db)):
    chapters = db.query(Chapter).filter(Chapter.comic_name == comic_name).order_by(asc(Chapter.chapter_id)).all()
    if chapters is None:
        raise HTTPException(status_code=404, detail="Comic not found")
    return chapters

    # Path to the comic file
@router.get("/chapter_img/{chapter_id}", response_model=list[ChapterImage])
def get_chapter_image(chapter_id: int, db: Session = Depends(get_db)):
    chapter_urls = db.query(Chapter).filter(Chapter.chapter_id == int(chapter_id)).all()
    print(chapter_urls)
    if chapter_urls is None:
        raise HTTPException(status_code=404, detail="Comic not found")
    return chapter_urls

# def get_current_admin_user(username: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.username == username).first()
#     if not user or user.role != 'admin':
#         raise HTTPException(
#             status_code=401,
#             detail="The user does not have the required permissions"
#         )
#     return user

# @router.post("/upload_comic")
# async def upload_comic(username: str, title: str, summary: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
#     current_user = get_current_admin_user(username, db)
    
#     # Save file to disk
#     file_location = f"/path/to/your/storage/{file.filename}"
#     with open(file_location, "wb") as file_out:
#         shutil.copyfileobj(file.file, file_out)

#     # Create new comic entry in database
#     new_comic = Comic(title=title, resource_path=file_location, summary=summary, view_count=0)
#     db.add(new_comic)
#     db.commit()
#     db.refresh(new_comic)

#     return {"id": new_comic.id, "title": new_comic.title, "resource_path": new_comic.resource_path, "summary": new_comic.summary, "view_count": new_comic.view_count}
