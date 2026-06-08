// ===== DATOS DE PRUEBA (MOCKUP) =====
// NOTA PARA EL DESARROLLADOR BACKEND:
// Estos datos de prueba deben ser reemplazados con llamadas reales a la API
// Ver sección "INTEGRACIÓN CON BACKEND" al final del archivo

const MOCK_TABLES = [
    { id: 1, table_number: 1, has_active_order: false },
    { id: 2, table_number: 2, has_active_order: false },
    { id: 3, table_number: 3, has_active_order: false },
    { id: 4, table_number: 4, has_active_order: false },
    { id: 5, table_number: 5, has_active_order: false },
    { id: 6, table_number: 6, has_active_order: false },
    { id: 7, table_number: 7, has_active_order: false },
    { id: 8, table_number: 8, has_active_order: false },
    { id: 9, table_number: 9, has_active_order: false },
    { id: 10, table_number: 10, has_active_order: false },
    { id: 11, table_number: 11, has_active_order: false },
    { id: 12, table_number: 12, has_active_order: false },
    { id: 13, table_number: 13, has_active_order: false },
    { id: 14, table_number: 14, has_active_order: false },
    { id: 15, table_number: 15, has_active_order: false }
];

const MOCK_USER = {
    id: 1,
    username: 'jperez',
    full_name: 'Juan Pérez',
    role: 'Mesero'
};

// ===== MODO DE DESARROLLO =====
// Cambiar a false cuando el backend esté listo
const USE_MOCK_DATA = false;

// Registro de IDs de comandas ya notificadas para evitar repetir alertas
const notifiedOrders = new Set();

// ===== MANEJO DE LA VISTA DE MESAS =====

document.addEventListener('DOMContentLoaded', async () => {
    // En modo mockup, no verificar autenticación
    if (!USE_MOCK_DATA) {
        const authorized = await protectPage(['mesero']);
        if (!authorized) return;
    }

    // Cargar información del mesero
    loadWaiterInfo();

    // Cargar mesas
    await loadTables();
});

// Cargar información del mesero
function loadWaiterInfo() {
    if (USE_MOCK_DATA) {
        // Usar datos de prueba
        document.getElementById('waiterName').textContent = MOCK_USER.full_name;
        document.getElementById('waiterRole').textContent = MOCK_USER.role;

        const initials = getInitials(MOCK_USER.full_name);
        document.getElementById('profileAvatar').textContent = initials;
    } else {
        // Usar datos del localStorage (cuando el backend esté integrado)
        const user = JSON.parse(localStorage.getItem('user_data'));

        if (user) {
            document.getElementById('waiterName').textContent = user.full_name || user.username;
            document.getElementById('waiterRole').textContent = user.role || 'Mesero';

            const initials = getInitials(user.full_name || user.username);
            document.getElementById('profileAvatar').textContent = initials;
        }
    }
}

// Obtener iniciales del nombre
function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Cargar mesas
async function loadTables() {
    const tablesGrid = document.getElementById('tablesGrid');

    try {
        let tables;

        if (USE_MOCK_DATA) {
            // Usar datos de prueba
            tables = MOCK_TABLES;
            console.log('📊 Usando datos de prueba (MOCK)');
        } else {
            // Obtener mesas desde el backend
            tables = await tablesAPI.getAll();
            console.log('🔌 Datos obtenidos del backend');
            
            // Verificar si hay comandas listas para notificar al mesero
            tables.forEach(table => {
                if (table.active_order_status === 'listo' && table.active_order_id) {
                    if (!notifiedOrders.has(table.active_order_id)) {
                        notifiedOrders.add(table.active_order_id);
                        showNotificationToast(`🔔 ¡El pedido de la Mesa ${table.table_number} está listo para servir! 🍽️`);
                    }
                }
            });
        }

        // Limpiar grid
        tablesGrid.innerHTML = '';

        // Generar tarjetas de mesas
        tables.forEach(table => {
            const tableCard = createTableCard(table);
            tablesGrid.appendChild(tableCard);
        });

    } catch (error) {
        console.error('❌ Error loading tables:', error);
        tablesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #e74c3c;">Error al cargar las mesas</p>';
    }
}

// Crear tarjeta de mesa
function createTableCard(table) {
    const div = document.createElement('div');
    const hasOrder = table.has_active_order;
    const isReady = table.active_order_status === 'listo';

    // Si está lista para servir, añade la clase .ready que la hace brillar en verde
    div.className = `table-card ${isReady ? 'ready' : (hasOrder ? 'active' : 'available')}`;
    
    div.innerHTML = `
        <div class="table-number">Mesa</div>
        <div class="table-id">
            ${table.table_number}
            ${isReady ? '<span class="ready-bell">🔔</span>' : ''}
        </div>
        <div class="table-status">
            ${isReady ? '¡Listo!' : (hasOrder ? 'Ocupada' : 'Disponible')}
        </div>
    `;

    div.onclick = () => goToTableDetail(table.id);

    return div;
}

// Helper para notificaciones de comanda lista (toasts de alta visibilidad)
function showNotificationToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast active';
    toast.style.backgroundColor = '#2f855a'; // Verde esmeralda
    toast.style.color = '#ffffff';
    toast.style.fontWeight = 'bold';
    toast.style.padding = '16px 24px';
    toast.style.fontSize = '16px';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
    toast.style.maxWidth = '400px';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4500); // 4.5 segundos en pantalla
}

// Navegar a detalle de mesa
function goToTableDetail(tableId) {
    console.log(`🔄 Navegando a detalle de mesa ${tableId}`);
    window.location.href = `table-detail.html?id=${tableId}`;
}

// requireAuth y logout heredados ahora se delegan en auth.js de forma segura.

// ===== CARTA VISUAL DE PLATOS Y BEBIDAS =====
async function showVisualMenu() {
    console.log("📖 Abriendo carta visual...");
    
    // Mostrar feedback de carga
    showToast("Cargando carta...");
    
    let menuData = [];
    try {
        // Obtener el menú del backend mediante la API real
        menuData = await menuAPI.getAll();
    } catch (error) {
        console.error("❌ Error al cargar la carta:", error);
        alert("No se pudo conectar con el servidor para cargar la carta visual.");
        return;
    }
    
    // Agrupar platos por categoría
    const categories = {};
    menuData.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    // Abrir el modal interactivo
    createVisualMenuModal(categories);
}

function createVisualMenuModal(categories) {
    // Evitar modales duplicados en el DOM
    const existing = document.getElementById('visualMenuModal');
    if (existing) existing.remove();

    // Crear el overlay de fondo
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'visualMenuModal';
    
    // Estructura del modal
    const modal = document.createElement('div');
    modal.className = 'visual-menu-modal';
    
    // Cabecera
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.style.borderBottom = 'none';
    header.style.paddingBottom = '8px';
    header.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; color: #2d3748; margin: 0; display: flex; align-items: center; gap: 8px;">📖 Carta de Platos y Bebidas</h2>
        <button class="modal-close" onclick="closeVisualMenuModal()">✕</button>
    `;
    
    // Contenedor de Pestañas (Tabs)
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'visual-menu-tabs';
    
    // Cuerpo de la categoría activa
    const bodyContainer = document.createElement('div');
    bodyContainer.className = 'visual-menu-body';
    
    const categoryNames = Object.keys(categories);
    
    // Generar botones de pestañas por categoría
    categoryNames.forEach((catName, index) => {
        const btn = document.createElement('button');
        btn.className = `visual-menu-tab ${index === 0 ? 'active' : ''}`;
        btn.textContent = catName;
        
        btn.onclick = () => {
            // Desactivar pestañas anteriores
            document.querySelectorAll('.visual-menu-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            
            // Cargar productos en la cuadrícula
            loadCategoryItems(bodyContainer, categories[catName]);
        };
        
        tabsContainer.appendChild(btn);
    });
    
    // Ensamblar modal
    modal.appendChild(header);
    modal.appendChild(tabsContainer);
    modal.appendChild(bodyContainer);
    overlay.appendChild(modal);
    
    document.body.appendChild(overlay);
    
    // Cargar la primera pestaña por defecto
    if (categoryNames.length > 0) {
        loadCategoryItems(bodyContainer, categories[categoryNames[0]]);
    }
    
    // Animación de entrada suave
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

// Genera la cuadrícula de cartas de platos para la categoría seleccionada
function loadCategoryItems(container, items) {
    container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'visual-menu-grid';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'visual-dish-card';
        
        card.innerHTML = `
            <div class="visual-dish-header">
                <h4 class="visual-dish-name">${item.name}</h4>
                <span class="visual-dish-price">S/ ${item.price.toFixed(2)}</span>
            </div>
            <p class="visual-dish-desc">${item.description || 'Sin descripción disponible.'}</p>
        `;
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
}

function closeVisualMenuModal() {
    const modal = document.getElementById('visualMenuModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Cerrar modal al hacer clic en el fondo gris
document.addEventListener('click', (e) => {
    const modal = document.getElementById('visualMenuModal');
    if (modal && e.target === modal) {
        closeVisualMenuModal();
    }
});

// Toast rápido interno para feedback
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
    }, 1500);
}

// Exportar globalmente
window.showVisualMenu = showVisualMenu;
window.closeVisualMenuModal = closeVisualMenuModal;

/*
===========================================
📌 INTEGRACIÓN CON BACKEND
===========================================

INSTRUCCIONES PARA EL DESARROLLADOR BACKEND:

1. Cuando el backend esté listo, cambiar:
   const USE_MOCK_DATA = false;

2. Las funciones ya están preparadas para usar la API:
   - tablesAPI.getAll() está definida en api.js
   - Solo necesitas que tu backend retorne este formato:

   GET /api/tables
   Response:
   [
       {
           "id": 1,
           "table_number": 1,
           "has_active_order": false
       },
       {
           "id": 2,
           "table_number": 2,
           "has_active_order": true
       },
       ...
   ]

3. Asegúrate de que api.js tenga la URL correcta:
   const API_BASE_URL = 'http://localhost:8000/api';

4. El token JWT se enviará automáticamente en el header:
   Authorization: Bearer {token}

===========================================
*/