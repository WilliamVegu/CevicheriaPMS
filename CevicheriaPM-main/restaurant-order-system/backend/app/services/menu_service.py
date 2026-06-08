from sqlalchemy.orm import Session
from ..models.menu import MenuItem
from ..schemas.menu_schema import MenuItemCreate

def get_all_menu_items(db: Session):
    return db.query(MenuItem).filter(MenuItem.is_available == True).all()

def get_menu_item_by_id(db: Session, item_id: int):
    return db.query(MenuItem).filter(MenuItem.id == item_id).first()

def create_menu_item(db: Session, item: MenuItemCreate):
    db_item = MenuItem(
        name=item.name,
        price=item.price,
        description=item.description,
        category=item.category,
        is_available=item.is_available
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
