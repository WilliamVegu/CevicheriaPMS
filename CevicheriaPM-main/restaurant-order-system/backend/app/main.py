from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine, Base
from .routes import users, auth, tables, menu, orders
from .models.table import Table
from .models.menu import MenuItem
from .models.order import Order
from .models.order_detail import OrderDetail

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema Cevicheria")

#CORS
origins = [
    "*", 
    # luego se pone: "http://tu-cevicheria.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=False,    
    allow_methods=["*"],        
    allow_headers=["*"],       
)

#registra rutas
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(tables.router, prefix="/api/v1/tables", tags=["Tables"])
app.include_router(menu.router, prefix="/api/v1/menu", tags=["Menu"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["Orders"])

@app.get("/")
def read_root():
    return {"message": "Sistema de Cevicheria Operativo 🚀"}