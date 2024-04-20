# app/models/models.py
from sqlalchemy import Column, Integer, String, Text, ARRAY
from app.database import Base

class Comic(Base):
    __tablename__ = 'comics'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    reference_link = Column(Text)
    categories = Column(ARRAY(String))
    story_content = Column(Text)
    image_link = Column(Text)

    __table_args__ = {'schema': 'comics_system'}