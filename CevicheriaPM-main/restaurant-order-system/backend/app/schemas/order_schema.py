from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.models.order import OrderStatus

# Esquema para agregar/actualizar un producto en un pedido
class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int

# Esquema de respuesta para los productos contenidos en un pedido
class OrderItemResponse(BaseModel):
    id: int
    menu_item_id: int
    menu_item_name: str
    quantity: int
    price: float

    class Config:
        from_attributes = True

# Esquema de creación de un pedido
class OrderCreate(BaseModel):
    table_id: int

# Esquema de respuesta completo de un pedido/orden
class OrderResponse(BaseModel):
    id: int
    table_id: int
    waiter_id: int
    status: OrderStatus
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True
