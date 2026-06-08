import enum
from sqlalchemy import Column, Integer, String, Boolean, Enum as SqEnum
from ..core.database import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    COCINERO = "cocinero"
    MESERO = "mesero"

class User(Base):
    __tablename__ = "users" 

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    
    role = Column(SqEnum(UserRole), default=UserRole.MESERO, nullable=False)
    
    is_active = Column(Boolean, default=True)