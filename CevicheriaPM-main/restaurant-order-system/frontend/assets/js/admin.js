// admin.js - Lógica del Panel de Administración del Sistema

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Proteger página para que solo accedan administradores
    const authorized = await protectPage(['admin']);
    if (!authorized) return;
    
    // 2. Cargar información del administrador en la cabecera
    loadAdminInfo();
    
    // 3. Registrar controladores de formularios
    document.getElementById('employeeForm').addEventListener('submit', handleRegisterEmployee);
    document.getElementById('menuItemForm').addEventListener('submit', handleAddMenuItem);
});

// Cargar información del administrador
function loadAdminInfo() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('adminUser').textContent = user.full_name || user.username;
    }
}

// Registrar un nuevo empleado
async function handleRegisterEmployee(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('employeeUsername');
    const passwordInput = document.getElementById('employeePassword');
    const roleSelect = document.getElementById('employeeRole');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const role = roleSelect.value;
    
    // Validar contraseña
    if (password.length < 6) {
        showToast("⚠️ La contraseña debe tener al menos 6 caracteres");
        return;
    }
    
    // Deshabilitar botón
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando...";
    
    try {
        // Petición POST al backend a /api/v1/users/
        await API.request('/api/v1/users/', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                role: role
            })
        });
        
        showToast(`✅ Empleado '${username}' registrado con éxito`);
        
        // Resetear campos
        usernameInput.value = '';
        passwordInput.value = '';
        roleSelect.selectedIndex = 0;
        
    } catch (error) {
        console.error("❌ Error al registrar empleado:", error);
        showToast(`❌ Error: ${error.message || "No se pudo registrar"}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Registrar Empleado";
    }
}

// Agregar un nuevo plato/bebida a la carta
async function handleAddMenuItem(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('itemPrice');
    const categorySelect = document.getElementById('itemCategory');
    const descInput = document.getElementById('itemDescription');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const category = categorySelect.value;
    const description = descInput.value.trim() || null;
    
    if (isNaN(price) || price <= 0) {
        showToast("⚠️ Ingrese un precio válido mayor a 0");
        return;
    }
    
    // Deshabilitar botón
    submitBtn.disabled = true;
    submitBtn.textContent = "Agregando...";
    
    try {
        // Petición POST al backend a /api/v1/menu/
        await API.request('/api/v1/menu/', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                price: price,
                category: category,
                description: description,
                is_available: true
            })
        });
        
        showToast(`✅ Producto '${name}' agregado a la carta`);
        
        // Resetear campos
        nameInput.value = '';
        priceInput.value = '';
        categorySelect.selectedIndex = 0;
        descInput.value = '';
        
    } catch (error) {
        console.error("❌ Error al agregar plato al menú:", error);
        showToast(`❌ Error: ${error.message || "No se pudo agregar"}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Agregar Producto";
    }
}

// Helper para notificaciones tipo Toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}
