// auth.js - Lógica de autenticación con control de roles WILLIAM CHAMBA

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const passwordInput = document.getElementById('password');

    // Solo inicializar la lógica de login/redirección automática si estamos en la página de login
    if (loginForm) {
        // Verificar si ya hay sesión activa
        checkExistingSession();

        // Manejar envío del formulario
        loginForm.addEventListener('submit', handleLogin);

        // Limpiar campos al cargar la página
        loginForm.reset();

        // Forzar limpieza del campo de contraseña después de un delay
        setTimeout(() => {
            if (passwordInput) passwordInput.value = '';
        }, 100);

        // Prevenir autocompletado en focus
        if (passwordInput) {
            passwordInput.addEventListener('focus', function() {
                this.setAttribute('readonly', 'readonly');
                setTimeout(() => {
                    this.removeAttribute('readonly');
                }, 100);
            });
        }
    }
});

// Verificar si existe una sesión activa
async function checkExistingSession() {
    const token = localStorage.getItem('access_token');

    if (token) {
        try {
            // Verificar si el token es válido
            const response = await API.request(API.CONFIG.ENDPOINTS.VERIFY_TOKEN, {
                method: 'GET'
            });

            if (response.valid) {
                // Redirigir según el rol del usuario
                redirectByRole();
            }
        } catch (error) {
            // Token inválido, limpiar storage
            clearSession();
        }
    }
}

// Manejar el proceso de login
async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const submitButton = e.target.querySelector('.btn-primary');

    // Validaciones básicas
    if (!username || !password) {
        showError('Por favor, complete todos los campos');
        return;
    }

    // Deshabilitar botón y mostrar cargando
    submitButton.disabled = true;
    submitButton.textContent = 'Iniciando sesión...';
    hideError();

    try {
        // Hacer petición al backend
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API.CONFIG.BASE_URL}${API.CONFIG.ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Credenciales incorrectas');
        }

        const data = await response.json();

        // Guardar tokens y datos del usuario
        saveSession(data);

        // Mostrar éxito y redirigir según rol
        showSuccess(`¡Bienvenido ${data.user.full_name}!`);
        setTimeout(() => {
            redirectByRole();
        }, 800);

    } catch (error) {
        showError(error.message || 'Error al iniciar sesión. Intente nuevamente.');
        submitButton.disabled = false;
        submitButton.textContent = 'Iniciar Sesión';
    }
}

// Guardar datos de sesión
function saveSession(data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type || 'bearer');

    // Guardar información del usuario
    if (data.user) {
        localStorage.setItem('user_data', JSON.stringify(data.user));
        localStorage.setItem('user_role', data.user.role); // Guardar rol por separado para acceso rápido
    }

    // Guardar refresh token si existe
    if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
    }
}

// Limpiar sesión
function clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_role');
}

// Cerrar sesión
async function logout() {
    try {
        // Notificar al backend
        await API.request(API.CONFIG.ENDPOINTS.LOGOUT, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    } finally {
        clearSession();
        window.location.href = 'login.html';
    }
}

// Redirigir según el rol del usuario
function redirectByRole() {
    // Recuperamos los datos guardados en el Login
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const role = userData.role || localStorage.getItem('user_role');

    if (!role) {
        showError('Error: No se pudo determinar el rol del usuario');
        clearSession();
        return;
    }

    console.log("Rol detectado:", role); 


    switch (role.toLowerCase()) {
        case 'admin':  
  
            window.location.href = '../pages/admin-dashboard.html'; 
            break;

        case 'mesero':
            window.location.href = '../pages/tables.html';
            break;

        case 'cocinero':
            window.location.href = '../pages/cocina.html'; 
            break;

        default:
            showError('Rol no autorizado: ' + role);
            setTimeout(clearSession, 2000);
    }
}

// Obtener datos del usuario actual
function getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
}

// Verificar si el usuario tiene un rol específico
function hasRole(requiredRole) {
    const user = getCurrentUser();
    if (!user) return false;

    return user.role.toLowerCase() === requiredRole.toLowerCase();
}

// Verificar si el usuario tiene alguno de los roles permitidos
function hasAnyRole(allowedRoles) {
    const user = getCurrentUser();
    if (!user) return false;

    return allowedRoles.some(role =>
        user.role.toLowerCase() === role.toLowerCase()
    );
}

// Proteger página - llamar al inicio de cada página protegida
async function protectPage(allowedRoles = []) {
    const token = localStorage.getItem('access_token');

    // Si no hay token, redirigir al login
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }

    try {
        // Verificar token con el backend
        const response = await API.request(API.CONFIG.ENDPOINTS.VERIFY_TOKEN, {
            method: 'GET'
        });

        if (!response.valid) {
            throw new Error('Token inválido');
        }

        // Si se especificaron roles, verificar que el usuario tenga permiso
        if (allowedRoles.length > 0) {
            const user = getCurrentUser();
            const hasPermission = allowedRoles.some(role =>
                user.role.toLowerCase() === role.toLowerCase()
            );

            if (!hasPermission) {
                // Redirigir a página de acceso denegado o al dashboard correspondiente
                alert('No tienes permisos para acceder a esta página');
                redirectByRole();
                return false;
            }
        }

        return true;

    } catch (error) {
        console.error('Error al verificar sesión:', error);
        clearSession();
        window.location.href = 'login.html';
        return false;
    }
}

// Mostrar mensaje de error
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.className = 'error-message';
    }
}

// Ocultar mensaje de error
function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Mostrar mensaje de éxito
function showSuccess(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.className = 'success-message';
    }
}

// Función para recuperar contraseña
function handlePasswordRecovery() {
    alert('Funcionalidad de recuperación de contraseña en desarrollo.\nContacte al administrador del sistema.');
}

// Exportar funciones para uso global
window.logout = logout;
window.handlePasswordRecovery = handlePasswordRecovery;
window.protectPage = protectPage;
window.getCurrentUser = getCurrentUser;
window.hasRole = hasRole;
window.hasAnyRole = hasAnyRole;