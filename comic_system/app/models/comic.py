# app/models/models.py
from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Comic(Base):
    __tablename__ = 'comics'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    summary = Column(Text)
    resource_path = Column(String(255))
    view_count = Column(Integer, default=0)
