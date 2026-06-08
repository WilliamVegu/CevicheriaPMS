from sqlalchemy.orm import Session
from ..models.order import Order, OrderStatus
from ..models.order_detail import OrderDetail
from ..models.menu import MenuItem
from ..models.table import Table
from ..models.user import User

def get_active_order_items(db: Session, table_id: int):
    """
    Obtiene los ítems del pedido activo de una mesa.
    Si la mesa no tiene orden activa, retorna una lista vacía.
    """
    active_order = db.query(Order).filter(
        Order.table_id == table_id,
        Order.status.notin_([OrderStatus.PAGADO, OrderStatus.CANCELADO])
    ).first()
    
    if not active_order:
        return []
    
    result = []
    for detail in active_order.details:
        result.append({
            "id": detail.id,
            "menu_item_id": detail.menu_item_id,
            "menu_item_name": detail.menu_item.name,
            "quantity": detail.quantity,
            "price": detail.price
        })
    return result

def add_item_to_active_order(db: Session, table_id: int, waiter_id: int, menu_item_id: int, quantity: int):
    """
    Agrega un producto al pedido activo de una mesa. Si la mesa no tiene orden activa,
    crea automáticamente una nueva orden en estado 'pendiente'.
    """
    # 1. Buscar si ya existe una orden activa para la mesa
    active_order = db.query(Order).filter(
        Order.table_id == table_id,
        Order.status.notin_([OrderStatus.PAGADO, OrderStatus.CANCELADO])
    ).first()
    
    if not active_order:
        # Validar que la mesa exista y esté activa
        table_exists = db.query(Table).filter(Table.id == table_id, Table.is_active == True).first()
        if not table_exists:
            raise ValueError("La mesa seleccionada no está activa o no existe")

        # Crear una nueva orden
        active_order = Order(
            table_id=table_id,
            waiter_id=waiter_id,
            status=OrderStatus.PENDIENTE
        )
        db.add(active_order)
        db.flush() # Obtener el ID generado antes del commit

    # 2. Buscar el plato/bebida en el menú para obtener el precio actual
    menu_item = db.query(MenuItem).filter(MenuItem.id == menu_item_id, MenuItem.is_available == True).first()
    if not menu_item:
        raise ValueError("El producto del menú no está disponible o no existe")

    # 3. Buscar si el producto ya está registrado en los detalles de esta orden
    detail = db.query(OrderDetail).filter(
        OrderDetail.order_id == active_order.id,
        OrderDetail.menu_item_id == menu_item_id
    ).first()

    if detail:
        # Si ya existe, incrementamos la cantidad
        detail.quantity += quantity
    else:
        # Si es nuevo, lo creamos registrando su precio histórico
        detail = OrderDetail(
            order_id=active_order.id,
            menu_item_id=menu_item_id,
            quantity=quantity,
            price=menu_item.price
        )
        db.add(detail)

    db.commit()
    db.refresh(active_order)

    # Retornamos la lista actualizada de ítems de la mesa
    return get_active_order_items(db, table_id)

def get_kitchen_orders(db: Session):
    """
    Retorna la lista de comandas que la cocina debe ver (pendientes, preparándose o listas).
    """
    orders = db.query(Order).filter(
        Order.status.in_([OrderStatus.PENDIENTE, OrderStatus.PREPARANDO, OrderStatus.LISTO])
    ).order_by(Order.created_at).all()
    
    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "table_number": order.table.table_number,
            "status": order.status.value,
            "created_at": order.created_at,
            "items": [
                {
                    "id": detail.id,
                    "menu_item_name": detail.menu_item.name,
                    "quantity": detail.quantity
                }
                for detail in order.details
            ]
        })
    return result

def update_order_status(db: Session, order_id: int, new_status: OrderStatus):
    """
    Actualiza el estado de una orden.
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        return None
    
    order.status = new_status
    db.commit()
    db.refresh(order)
    return order
