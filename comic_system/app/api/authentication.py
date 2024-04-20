# app/api/authentication.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserInDB

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users/")
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.post("/login/")
def login(user: UserInDB, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="Username not found")
    print(len(user.password), len(db_user.password), user.password == db_user.password)
    if user.password != db_user.password:
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    return {"message": "User authenticated successfully"}

@router.put("/signup/")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    print(db_user)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = User(
        username=user.username, 
        password=user.password, 
        email=user.email, 
        phone=user.phone, 
        address=user.address
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User created successfully", "id": new_user.username}
