from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(50), nullable=False)
    email = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)
    role = Column(String)  # E.g., 'admin', 'user'