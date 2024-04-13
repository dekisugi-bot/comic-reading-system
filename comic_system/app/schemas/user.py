# app/schemas/user_schema.py
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    email: EmailStr = None
    phone: str = Field(None, max_length=20)
    address: str = Field(None, max_length=255)

class UserInDB(UserBase):
    id: int
    email: str = None
    phone: str = None
    address: str = None

    class Config:
        orm_mode = True
