# app/models/models.py
from sqlalchemy import Column, Integer, String, Text, ARRAY
from app.database import Base

class Chapter(Base):
    __tablename__ = 'chapters'

    chapter_id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=False)
    comic_name = Column(Text)
    chapter_link = Column(Text)
    image_urls = Column(ARRAY(String))

    __table_args__ = {'schema': 'comics_system'}