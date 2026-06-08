from pydantic import BaseModel
from typing import Optional
from app.models.user import UserRole

class UserCreate(BaseModel):
    username: str
    password: str
    role: UserRole 

class UserResponse(BaseModel):
    id: int
    username: str
    role: UserRole
    is_active: bool
    

    class Config:
        from_attributes = True