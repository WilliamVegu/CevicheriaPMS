from sqlalchemy.orm import Session
from ..models.table import Table
from ..models.order import Order, OrderStatus
from ..models.user import User

def get_all_tables(db: Session):
    # Obtener todas las mesas activas ordenadas por número
    tables = db.query(Table).filter(Table.is_active == True).order_by(Table.table_number).all()
    
    result = []
    for table in tables:
        # Una mesa tiene orden activa si hay una comanda que no esté PAGADA ni CANCELADA
        active_order = db.query(Order).filter(
            Order.table_id == table.id,
            Order.status.notin_([OrderStatus.PAGADO, OrderStatus.CANCELADO])
        ).first()
        
        result.append({
            "id": table.id,
            "table_number": table.table_number,
            "is_active": table.is_active,
            "has_active_order": active_order is not None,
            "active_order_id": active_order.id if active_order else None,
            "active_order_status": active_order.status.value if active_order else None
        })
    return result

def get_table_by_id(db: Session, table_id: int):
    table = db.query(Table).filter(Table.id == table_id, Table.is_active == True).first()
    if not table:
        return None
    
    active_order = db.query(Order).filter(
        Order.table_id == table.id,
        Order.status.notin_([OrderStatus.PAGADO, OrderStatus.CANCELADO])
    ).first()

    return {
        "id": table.id,
        "table_number": table.table_number,
        "is_active": table.is_active,
        "has_active_order": active_order is not None,
        "active_order_id": active_order.id if active_order else None,
        "active_order_status": active_order.status.value if active_order else None
    }

def create_table(db: Session, table_number: int):
    db_table = Table(table_number=table_number)
    db.add(db_table)
    db.commit()
    db.refresh(db_table)
    return db_table
