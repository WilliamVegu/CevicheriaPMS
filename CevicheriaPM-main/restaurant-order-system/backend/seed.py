import sys
import os

# Agregar la carpeta backend al path de python para poder importar el módulo app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.models.table import Table
from app.models.menu import MenuItem
from app.models.order import Order
from app.models.order_detail import OrderDetail
from app.core.security import get_password_hash

def seed_db():
    print("🚀 Iniciando el proceso de sembrado (seeding) de la base de datos...")
    
    # Crear las tablas en caso de que no existan
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # 1. Sembrar Usuarios
        print("👥 Sembrando usuarios...")
        users_data = [
            ("admin", "admin123", UserRole.ADMIN),
            ("jperez", "mesero123", UserRole.MESERO),
            ("cocinero1", "cocinero123", UserRole.COCINERO)
        ]
        
        for username, password, role in users_data:
            existing_user = db.query(User).filter(User.username == username).first()
            if not existing_user:
                new_user = User(
                    username=username,
                    password_hash=get_password_hash(password),
                    role=role,
                    is_active=True
                )
                db.add(new_user)
                print(f"   ✓ Creado usuario: '{username}' (Rol: {role.value})")
            else:
                print(f"   - El usuario '{username}' ya existe, omitiendo.")
                
        # 2. Sembrar Mesas
        print("🍽️ Sembrando mesas...")
        for i in range(1, 16):
            existing_table = db.query(Table).filter(Table.table_number == i).first()
            if not existing_table:
                new_table = Table(table_number=i, is_active=True)
                db.add(new_table)
                print(f"   ✓ Creada Mesa {i}")
            else:
                print(f"   - Mesa {i} ya existe, omitiendo.")

        # 3. Sembrar Carta de Platos/Menú
        print("🐟 Sembrando platos y bebidas de la carta...")
        menu_data = [
            # Ceviches
            ("Ceviche de Pescado", 38.00, "Pescado fresco, limón, cebolla, ají limo", "Ceviches"),
            ("Ceviche Mixto", 45.00, "Pescado, pulpo, calamar, camarón", "Ceviches"),
            ("Ceviche de Conchas Negras", 55.00, "Conchas negras, limón, cebolla", "Ceviches"),
            ("Ceviche de Pulpo", 48.00, "Pulpo tierno, limón, rocoto", "Ceviches"),
            ("Leche de Tigre", 18.00, "Jugo de ceviche con trozos de pescado", "Ceviches"),
            
            # Tiraditos
            ("Tiradito Clásico", 35.00, "Pescado en láminas, ají amarillo", "Tiraditos"),
            ("Tiradito de Pulpo", 42.00, "Pulpo en láminas, salsa de olivo", "Tiraditos"),
            ("Tiradito Nikkei", 40.00, "Pescado, salsa de soya, ajonjolí", "Tiraditos"),
            
            # Chicharrones
            ("Chicharrón de Pescado", 32.00, "Pescado frito, yuca, salsa criolla", "Chicharrones"),
            ("Chicharrón de Calamar", 35.00, "Calamar frito, yuca, salsa tártara", "Chicharrones"),
            ("Chicharrón Mixto", 40.00, "Pescado, calamar y langostinos fritos", "Chicharrones"),
            ("Jalea Mixta", 48.00, "Pescado, calamar, pulpo, yuca frita", "Chicharrones"),
            
            # Arroces
            ("Arroz con Mariscos", 38.00, "Arroz, pescado, mariscos, ají panca", "Arroces"),
            ("Arroz Chaufa de Mariscos", 35.00, "Arroz chaufa, mariscos, sillao", "Arroces"),
            ("Arroz con Camarones", 42.00, "Arroz, camarones, salsa especial", "Arroces"),
            
            # Bebidas
            ("Inca Kola 1.5L", 8.00, "Gaseosa nacional", "Bebidas"),
            ("Coca Cola 1.5L", 8.00, "Gaseosa", "Bebidas"),
            ("Chicha Morada", 6.00, "Chicha morada natural", "Bebidas"),
            ("Limonada", 5.00, "Limonada natural", "Bebidas"),
            ("Agua Mineral", 4.00, "Agua sin gas", "Bebidas"),
            ("Cerveza Cristal", 10.00, "Cerveza nacional 650ml", "Bebidas"),
            ("Pisco Sour", 18.00, "Pisco, limón, clara de huevo", "Bebidas"),
            
            # Entradas
            ("Causa Limeña", 22.00, "Papa amarilla, pollo, palta", "Entradas"),
            ("Papa a la Huancaína", 15.00, "Papa, ají amarillo, aceituna", "Entradas"),
            ("Tamal", 12.00, "Tamal criollo con salsa criolla", "Entradas"),
            ("Choritos a la Chalaca", 25.00, "Choritos, cebolla, limón, choclo", "Entradas")
        ]
        
        for name, price, description, category in menu_data:
            existing_item = db.query(MenuItem).filter(MenuItem.name == name).first()
            if not existing_item:
                new_item = MenuItem(
                    name=name,
                    price=price,
                    description=description,
                    category=category,
                    is_available=True
                )
                db.add(new_item)
                print(f"   ✓ Creado producto: '{name}' (S/ {price:.2f})")
            else:
                print(f"   - El producto '{name}' ya existe, omitiendo.")
                
        db.commit()
        print("\n🎉 Base de datos sembrada exitosamente con todos los datos iniciales.")
        print("\n🔑 Credenciales de acceso creadas para probar:")
        print("   👉 Mesero      -> Usuario: 'jperez'   | Contraseña: 'mesero123'")
        print("   👉 Cocinero    -> Usuario: 'cocinero1' | Contraseña: 'cocinero123'")
        print("   👉 Administrador-> Usuario: 'admin'    | Contraseña: 'admin123'")
        
    except Exception as e:
        db.rollback()
        print(f"\n❌ Error al sembrar la base de datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
