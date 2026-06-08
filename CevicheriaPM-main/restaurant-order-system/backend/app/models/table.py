from sqlalchemy import Column, Integer, Boolean
from sqlalchemy.orm import relationship
from ..core.database import Base

class Table(Base):
    __tablename__ = "tables"

    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(Integer, unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)

    # Relación con las órdenes
    orders = relationship("Order", back_populates="table")
