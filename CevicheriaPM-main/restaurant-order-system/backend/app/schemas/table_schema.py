from pydantic import BaseModel
from typing import Optional

class TableBase(BaseModel):
    table_number: int
    is_active: bool = True

class TableCreate(TableBase):
    pass

class TableResponse(TableBase):
    id: int
    has_active_order: bool = False
    active_order_id: Optional[int] = None
    active_order_status: Optional[str] = None

    class Config:
        from_attributes = True
