# app/schemas/comic_schema.py
from pydantic import BaseModel

class ComicOut(BaseModel):
    id: int
    title: str
    summary: str
    resource_path: str
    view_count: int

    class Config:
        orm_mode = True
