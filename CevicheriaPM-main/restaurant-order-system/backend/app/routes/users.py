from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.user import User
from ..schemas.user_schema import UserCreate, UserResponse
from ..core.security import get_password_hash
from ..dependencies.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    hashed_password = get_password_hash(user.password)
    
    new_user = User(
        username=user.username,
        password_hash=hashed_password,
        role=user.role,
        is_active=True
    )
    
    db.add(new_user)
    db.commit()  
    db.refresh(new_user) 
    
    return new_user

@router.get("/me")
def read_user_me(current_user: User = Depends(get_current_active_user)):
    """
    Retorna la información del usuario autenticado por token JWT.
    """
    return {
        "valid": True,
        "id": current_user.id,
        "username": current_user.username,
        "role": current_user.role.value,
        "is_active": current_user.is_active
    }