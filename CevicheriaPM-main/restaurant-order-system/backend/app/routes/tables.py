from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..schemas.table_schema import TableResponse, TableCreate
from ..services import table_service
from ..dependencies.auth import get_current_active_user
from ..models.user import User

router = APIRouter()

@router.get("/", response_model=List[TableResponse])
def read_tables(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Retorna la lista de todas las mesas con el indicador dinámico has_active_order.
    """
    return table_service.get_all_tables(db)

@router.get("/{table_id}", response_model=TableResponse)
def read_table(table_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Retorna los detalles de una mesa específica.
    """
    db_table = table_service.get_table_by_id(db, table_id)
    if not db_table:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mesa no encontrada")
    return db_table

@router.post("/", response_model=TableResponse, status_code=status.HTTP_201_CREATED)
def register_table(table: TableCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Registra una nueva mesa (para administración).
    """
    return table_service.create_table(db, table.table_number)
