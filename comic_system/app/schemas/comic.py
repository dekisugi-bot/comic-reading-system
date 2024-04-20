# app/schemas/comic_schema.py
from pydantic import BaseModel
from typing import List

class ComicOut(BaseModel):
    id: int
    title: str
    summary: str
    resource_path: str
    view_count: int

    class Config:
        orm_mode = True

class ComicSchema(BaseModel):
    id: int 
    title: str
    image_link: str 
    
    class Config:
        orm_mode = True
        
class ComicResponse(BaseModel):
    comics: List[ComicSchema]
    num_page: int