# app/schemas/comic_schema.py
from pydantic import BaseModel
from typing import List

class ChapterSchema(BaseModel):
    chapter_id: int 
    name: str
    comic_name: str 
    
    class Config:
        orm_mode = True

class ChapterImage(BaseModel):
    chapter_id: int 
    image_urls: List[str]
    comic_name: str 

