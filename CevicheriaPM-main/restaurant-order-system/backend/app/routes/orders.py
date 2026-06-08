from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..schemas.order_schema import OrderItemResponse, OrderItemCreate
from ..services import order_service
from ..dependencies.auth import get_current_active_user
from ..models.user import User
from ..models.order import OrderStatus

router = APIRouter()

@router.get("/table/{table_id}", response_model=List[OrderItemResponse])
def get_table_order_items(table_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Obtiene los productos en la comanda activa de una mesa determinada.
    """
    return order_service.get_active_order_items(db, table_id)

@router.post("/{table_id}/items", response_model=List[OrderItemResponse])
def add_item_to_order(
    table_id: int, 
    item: OrderItemCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    """
    Agrega un plato o bebida al pedido activo de la mesa.
    Si la mesa no tiene orden activa, crea una automáticamente vinculada al mesero logueado.
    """
    try:
        return order_service.add_item_to_active_order(
            db=db,
            table_id=table_id,
            waiter_id=current_user.id,
            menu_item_id=item.menu_item_id,
            quantity=item.quantity
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/kitchen/active", response_model=List[dict])
def read_kitchen_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Retorna la lista de comandas pendientes, en preparación o listas para servir para la Cocina.
    """
    return order_service.get_kitchen_orders(db)

@router.put("/{order_id}/status", status_code=status.HTTP_200_OK)
def change_order_status(
    order_id: int, 
    new_status: OrderStatus, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    """
    Cambia el estado de una comanda (ej: 'pendiente' -> 'preparando' -> 'listo' -> 'entregado').
    """
    updated_order = order_service.update_order_status(db, order_id, new_status)
    if not updated_order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comanda no encontrada")
    return {
        "message": "Estado de la orden actualizado exitosamente",
        "order_id": order_id,
        "status": updated_order.status.value
    }
