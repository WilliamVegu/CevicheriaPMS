import enum
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum as SqEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base

class OrderStatus(str, enum.Enum):
    PENDIENTE = "pendiente"       # Comanda recién tomada
    PREPARANDO = "preparando"     # Cocina cocinando
    LISTO = "listo"               # Platos listos para recoger
    ENTREGADO = "entregado"       # Servido al cliente en la mesa
    PAGADO = "pagado"             # Pedido cerrado/cobrado
    CANCELADO = "cancelado"       # Cancelado

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    table_id = Column(Integer, ForeignKey("tables.id"), nullable=False)
    waiter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    status = Column(SqEnum(OrderStatus), default=OrderStatus.PENDIENTE, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relaciones
    table = relationship("Table", back_populates="orders")
    waiter = relationship("User")
    details = relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan")
