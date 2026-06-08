// api.js - Configuración centralizada de la API WILLIAM TU CHAMBA

const API_CONFIG = {
    // dirección api
    BASE_URL: 'http://127.0.0.1:8000', 
    
    ENDPOINTS: {
        LOGIN: '/api/v1/auth/login',      
        VERIFY_TOKEN: '/api/v1/users/me', 
        LOGOUT: '/api/v1/auth/logout'     
    }
};

// Función para manejar errores de red
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            detail: 'Error de conexión con el servidor'
        }));
        throw new Error(error.detail || 'Error en la petición');
    }
    return response.json();
};

// Función genérica para hacer peticiones
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    };

    // Agregar token si existe (para peticiones autenticadas)
    const token = localStorage.getItem('access_token');
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, defaultOptions);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
};

// APIs específicas para integración con el backend
const tablesAPI = {
    getAll: () => apiRequest('/api/v1/tables'),
    getById: (id) => apiRequest(`/api/v1/tables/${id}`)
};

const menuAPI = {
    getAll: () => apiRequest('/api/v1/menu')
};

const ordersAPI = {
    getByTable: (tableId) => apiRequest(`/api/v1/orders/table/${tableId}`),
    addItem: (orderId, item) => apiRequest(`/api/v1/orders/${orderId}/items`, {
        method: 'POST',
        body: JSON.stringify(item)
    })
};

// Exportar para uso en otros archivos
window.API = {
    CONFIG: API_CONFIG,
    request: apiRequest
};
window.tablesAPI = tablesAPI;
window.menuAPI = menuAPI;
window.ordersAPI = ordersAPI;