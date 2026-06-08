# 🌊 Sistema de Gestión de Pedidos - Cevichería 🐟

Este proyecto es un sistema de comandas y gestión para una cevichería. Está diseñado con una arquitectura moderna de tres capas: una base de datos PostgreSQL, un backend ágil construido con FastAPI y una interfaz de usuario limpia e intuitiva en el frontend.

---

## 🚀 Arquitectura del Proyecto

El sistema está dividido en tres componentes principales:

1. **`database/`**: Scripts SQL (`init.sql` y `seed.sql`) para inicializar y poblar la base de datos de PostgreSQL con mesas, menús y usuarios.
2. **`backend/`**: Servidor de API REST desarrollado con **FastAPI** (Python 3).
   - Base de datos conectada vía SQLAlchemy.
   - Seguridad con Hashing de contraseñas (bcrypt) y Autenticación con JWT (JSON Web Tokens).
   - Validación de datos robusta con Pydantic.
3. **`frontend/`**: Interfaz de usuario interactiva basada en HTML5, CSS3 moderno (`styles.css`) y JavaScript vainilla.
   - Panel de control de mesas y comandas en tiempo real para meseros.
   - Panel de preparación de platos en tiempo real para cocineros.
   - Módulo de recuperación y cambio de contraseña con códigos de empleado.

---

## 📦 Inicialización y Sembrado de la Base de Datos

Si necesitas volver a sembrar o inicializar los datos de prueba, puedes ejecutar el script de seeding desde la raíz del backend:

```bash
cd backend
.venv/bin/python seed.py
```

Esto restablecerá y verificará que las **15 mesas**, los usuarios de prueba y los **platos y bebidas del menú** estén correctamente creados.

---

## 🔑 Credenciales de Acceso para Pruebas

Para probar las distintas vistas de usuario del sistema, utiliza los siguientes perfiles:

| Perfil | Usuario | Contraseña | Rol |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` | Administrador general de la plataforma |
| **Mesero** | `jperez` | `mesero123` | Creación de comandas y control de mesas |
| **Cocinero** | `cocinero1` | `cocinero123` | Dashboard de cocina para la preparación de comandas |

---

## 🌐 Enlaces Locales del Entorno

Cuando los servidores estén ejecutándose en segundo plano, puedes acceder a ellos a través de los siguientes puertos locales:

* 💻 **Aplicación Web (Frontend):** [http://localhost:3000](http://localhost:3000)
* ⚙️ **Documentación Interactiva (Swagger/OpenAPI):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* 🔗 **API Base URL (Backend):** [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

🌊 *Desarrollado para la optimización de procesos y la excelencia en el servicio.*