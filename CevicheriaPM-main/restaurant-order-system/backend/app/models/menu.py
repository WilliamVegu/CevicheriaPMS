from sqlalchemy import Column, Integer, String, Float, Boolean
from ..core.database import Base

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, nullable=False) # ej: "Ceviches", "Bebidas", "Tiraditos", etc.
    is_available = Column(Boolean, default=True)
