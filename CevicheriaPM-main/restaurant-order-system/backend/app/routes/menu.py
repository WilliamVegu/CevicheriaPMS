from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..schemas.menu_schema import MenuItemResponse, MenuItemCreate
from ..services import menu_service
from ..dependencies.auth import get_current_active_user
from ..models.user import User

router = APIRouter()

@router.get("/", response_model=List[MenuItemResponse])
def read_menu(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Retorna la lista completa de platos y bebidas disponibles en la cevicheria.
    """
    return menu_service.get_all_menu_items(db)

@router.post("/", response_model=MenuItemResponse, status_code=status.HTTP_201_CREATED)
def add_menu_item(item: MenuItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """
    Agrega un nuevo producto a la carta (para administración).
    """
    return menu_service.create_menu_item(db, item)
