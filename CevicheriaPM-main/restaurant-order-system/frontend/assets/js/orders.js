// ===== DATOS DE PRUEBA (MOCKUP) =====
const MOCK_ORDERS = {
    1: { table_number: 1, items: [] },
    2: { table_number: 2, items: [] },
    3: {
        table_number: 3,
        items: [
            { id: 1, menu_item_name: 'Lomo Saltado', quantity: 2, price: 45.00 },
            { id: 2, menu_item_name: 'Inca Kola 1.5L', quantity: 2, price: 8.00 },
            { id: 3, menu_item_name: 'Arroz Chaufa', quantity: 1, price: 35.00 }
        ]
    },
    4: { table_number: 4, items: [] },
    5: {
        table_number: 5,
        items: [
            { id: 4, menu_item_name: 'Ceviche de Pescado', quantity: 1, price: 38.00 },
            { id: 5, menu_item_name: 'Chicha Morada', quantity: 1, price: 6.00 }
        ]
    },
    6: { table_number: 6, items: [] },
    7: { table_number: 7, items: [] },
    8: { table_number: 8, items: [] },
    9: {
        table_number: 9,
        items: [
            { id: 6, menu_item_name: 'Ají de Gallina', quantity: 3, price: 32.00 },
            { id: 7, menu_item_name: 'Papa a la Huancaína', quantity: 1, price: 15.00 },
            { id: 8, menu_item_name: 'Coca Cola', quantity: 3, price: 5.00 }
        ]
    },
    10: { table_number: 10, items: [] },
    11: { table_number: 11, items: [] },
    12: { table_number: 12, items: [] },
    13: { table_number: 13, items: [] },
    14: {
        table_number: 14,
        items: [
            { id: 9, menu_item_name: 'Anticuchos', quantity: 2, price: 28.00 }
        ]
    },
    15: { table_number: 15, items: [] }
};

// ===== MENÚ DE CEVICHERÍA (DATOS DE PRUEBA) =====
const MOCK_MENU = {
    'Ceviches': [
        { id: 101, name: 'Ceviche de Pescado', price: 38.00, description: 'Pescado fresco, limón, cebolla, ají limo' },
        { id: 102, name: 'Ceviche Mixto', price: 45.00, description: 'Pescado, pulpo, calamar, camarón' },
        { id: 103, name: 'Ceviche de Conchas Negras', price: 55.00, description: 'Conchas negras, limón, cebolla' },
        { id: 104, name: 'Ceviche de Pulpo', price: 48.00, description: 'Pulpo tierno, limón, rocoto' },
        { id: 105, name: 'Leche de Tigre', price: 18.00, description: 'Jugo de ceviche con trozos de pescado' }
    ],
    'Tiraditos': [
        { id: 201, name: 'Tiradito Clásico', price: 35.00, description: 'Pescado en láminas, ají amarillo' },
        { id: 202, name: 'Tiradito de Pulpo', price: 42.00, description: 'Pulpo en láminas, salsa de olivo' },
        { id: 203, name: 'Tiradito Nikkei', price: 40.00, description: 'Pescado, salsa de soya, ajonjolí' }
    ],
    'Chicharrones': [
        { id: 301, name: 'Chicharrón de Pescado', price: 32.00, description: 'Pescado frito, yuca, salsa criolla' },
        { id: 302, name: 'Chicharrón de Calamar', price: 35.00, description: 'Calamar frito, yuca, salsa tártara' },
        { id: 303, name: 'Chicharrón Mixto', price: 40.00, description: 'Pescado, calamar y langostinos fritos' },
        { id: 304, name: 'Jalea Mixta', price: 48.00, description: 'Pescado, calamar, pulpo, yuca frita' }
    ],
    'Arroces': [
        { id: 401, name: 'Arroz con Mariscos', price: 38.00, description: 'Arroz, pescado, mariscos, ají panca' },
        { id: 402, name: 'Arroz Chaufa de Mariscos', price: 35.00, description: 'Arroz chaufa, mariscos, sillao' },
        { id: 403, name: 'Arroz con Camarones', price: 42.00, description: 'Arroz, camarones, salsa especial' }
    ],
    'Bebidas': [
        { id: 501, name: 'Inca Kola 1.5L', price: 8.00, description: 'Gaseosa nacional' },
        { id: 502, name: 'Coca Cola 1.5L', price: 8.00, description: 'Gaseosa' },
        { id: 503, name: 'Chicha Morada', price: 6.00, description: 'Chicha morada natural' },
        { id: 504, name: 'Limonada', price: 5.00, description: 'Limonada natural' },
        { id: 505, name: 'Agua Mineral', price: 4.00, description: 'Agua sin gas' },
        { id: 506, name: 'Cerveza Cristal', price: 10.00, description: 'Cerveza nacional 650ml' },
        { id: 507, name: 'Pisco Sour', price: 18.00, description: 'Pisco, limón, clara de huevo' }
    ],
    'Entradas': [
        { id: 601, name: 'Causa Limeña', price: 22.00, description: 'Papa amarilla, pollo, palta' },
        { id: 602, name: 'Papa a la Huancaína', price: 15.00, description: 'Papa, ají amarillo, aceituna' },
        { id: 603, name: 'Tamal', price: 12.00, description: 'Tamal criollo con salsa criolla' },
        { id: 604, name: 'Choritos a la Chalaca', price: 25.00, description: 'Choritos, cebolla, limón, choclo' }
    ]
};

const MOCK_USER = {
    id: 1,
    username: 'jperez',
    full_name: 'Juan Pérez',
    role: 'Mesero'
};

// ===== MODO DE DESARROLLO =====
const USE_MOCK_DATA = false;

// ===== VARIABLES GLOBALES =====
let currentTableId = null;
let currentTableOrders = [];
let activeOrderId = null;
let activeOrderStatus = null;

// ===== MANEJO DE PEDIDOS Y DETALLE DE MESA =====

document.addEventListener('DOMContentLoaded', async () => {
    if (!USE_MOCK_DATA) {
        const authorized = await protectPage(['mesero']);
        if (!authorized) return;
    }

    loadWaiterInfo();

    const urlParams = new URLSearchParams(window.location.search);
    currentTableId = urlParams.get('id');

    console.log(`📍 Cargando detalle de mesa ID: ${currentTableId}`);

    if (currentTableId) {
        await loadTableDetail(currentTableId);
    } else {
        alert('Error: No se especificó una mesa');
        window.location.href = 'tables.html';
    }
});

function loadWaiterInfo() {
    if (USE_MOCK_DATA) {
        document.getElementById('waiterName').textContent = MOCK_USER.full_name;
        document.getElementById('waiterRole').textContent = MOCK_USER.role;

        const initials = getInitials(MOCK_USER.full_name);
        document.getElementById('profileAvatar').textContent = initials;
    } else {
        const user = JSON.parse(localStorage.getItem('user_data'));

        if (user) {
            document.getElementById('waiterName').textContent = user.full_name || user.username;
            document.getElementById('waiterRole').textContent = user.role || 'Mesero';

            const initials = getInitials(user.full_name || user.username);
            document.getElementById('profileAvatar').textContent = initials;
        }
    }
}

function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

async function loadTableDetail(tableId) {
    try {
        let orderData;

        if (USE_MOCK_DATA) {
            orderData = MOCK_ORDERS[tableId];
            console.log('📊 Usando datos de prueba (MOCK)');

            if (!orderData) {
                console.warn('⚠️ Mesa no encontrada en datos de prueba');
                orderData = { table_number: tableId, items: [] };
            }

            await new Promise(resolve => setTimeout(resolve, 300));
        } else {
            const table = await tablesAPI.getById(tableId);
            const orders = await ordersAPI.getByTable(tableId);

            activeOrderId = table.active_order_id;
            activeOrderStatus = table.active_order_status;

            orderData = {
                table_number: table.table_number,
                items: orders
            };

            console.log('🔌 Datos obtenidos del backend');
        }

        currentTableOrders = orderData.items;
        document.getElementById('detailTableName').textContent = `Mesa ${orderData.table_number}`;
        displayOrders(orderData.items);
        
        // Renderizar botones de acción dinámicos
        renderOrderActions();

    } catch (error) {
        console.error('❌ Error loading table detail:', error);
        alert('Error al cargar el detalle de la mesa');
    }
}

function displayOrders(items) {
    const orderList = document.getElementById('orderList');

    if (!items || items.length === 0) {
        orderList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🍽️</div>
                <p>No hay productos en esta mesa</p>
            </div>
        `;
        return;
    }

    orderList.innerHTML = '';

    items.forEach(item => {
        const orderItem = createOrderItem(item);
        orderList.appendChild(orderItem);
    });

    console.log(`✅ ${items.length} productos mostrados`);
}

function createOrderItem(item) {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
        <div class="item-info">
            <div class="item-name">${item.menu_item_name}</div>
            <div class="item-quantity">Cantidad: ${item.quantity}</div>
        </div>
        <div class="item-price">S/ ${item.price.toFixed(2)}</div>
    `;
    return div;
}

function goBack() {
    console.log('🔙 Volviendo a vista de mesas');
    window.location.href = 'tables.html';
}

// ===== MODAL DE AGREGAR PRODUCTO =====

async function addProduct() {
    console.log('📝 Abriendo modal de menú para mesa:', currentTableId);
    
    let menuData = MOCK_MENU;
    
    if (!USE_MOCK_DATA) {
        try {
            showToast("Cargando carta...");
            const flatMenu = await menuAPI.getAll();
            
            // Agrupar platos del backend por categoría
            const grouped = {};
            flatMenu.forEach(item => {
                if (!grouped[item.category]) {
                    grouped[item.category] = [];
                }
                grouped[item.category].push(item);
            });
            menuData = grouped;
        } catch (error) {
            console.error("Error al cargar menú desde el servidor, usando MOCK:", error);
            showToast("⚠️ Usando menú fuera de línea");
        }
    }
    
    createMenuModal(menuData);
}

function createMenuModal(menuData) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'menuModal';

    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal-content';

    // Header del modal
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h2>Menú de la Cevichería</h2>
        <button class="modal-close" onclick="closeMenuModal()">✕</button>
    `;

    // Búsqueda
    const searchBar = document.createElement('div');
    searchBar.className = 'modal-search';
    searchBar.innerHTML = `
        <input type="text" id="menuSearch" placeholder="🔍 Buscar producto..." onkeyup="filterMenu()">
    `;

    // Contenido del menú
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.id = 'modalMenuContent';

    // Generar categorías y productos
    let menuHTML = '';
    for (const [category, items] of Object.entries(menuData)) {
        menuHTML += `
            <div class="menu-category" data-category="${category}">
                <h3 class="category-title">${category}</h3>
                <div class="menu-items">
                    ${items.map(item => `
                        <div class="menu-item" data-name="${item.name.toLowerCase()}">
                            <div class="menu-item-info">
                                <div class="menu-item-name">${item.name}</div>
                                <div class="menu-item-description">${item.description || ''}</div>
                                <div class="menu-item-price">S/ ${item.price.toFixed(2)}</div>
                            </div>
                            <button class="btn-add-item" onclick="addItemToOrder(${item.id}, '${item.name}', ${item.price})">
                                + Agregar
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = menuHTML;

    // Ensamblar modal
    modal.appendChild(modalHeader);
    modal.appendChild(searchBar);
    modal.appendChild(modalBody);
    overlay.appendChild(modal);

    // Agregar al DOM
    document.body.appendChild(overlay);

    // Animación de entrada
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeMenuModal() {
    const modal = document.getElementById('menuModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function filterMenu() {
    const searchText = document.getElementById('menuSearch').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');
    const categories = document.querySelectorAll('.menu-category');

    menuItems.forEach(item => {
        const itemName = item.getAttribute('data-name');
        if (itemName.includes(searchText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Ocultar categorías vacías
    categories.forEach(category => {
        const visibleItems = category.querySelectorAll('.menu-item[style="display: flex;"], .menu-item:not([style*="display"])');
        if (searchText && visibleItems.length === 0) {
            category.style.display = 'none';
        } else {
            category.style.display = 'block';
        }
    });
}

async function addItemToOrder(itemId, itemName, itemPrice) {
    console.log(`➕ Agregando: ${itemName} (S/ ${itemPrice})`);

    if (USE_MOCK_DATA) {
        // Buscar si el item ya existe en el pedido actual
        const existingItem = currentTableOrders.find(item => item.menu_item_name === itemName);

        if (existingItem) {
            // Incrementar cantidad
            existingItem.quantity += 1;
        } else {
            // Agregar nuevo item
            const newItem = {
                id: Date.now(), // ID temporal
                menu_item_name: itemName,
                quantity: 1,
                price: itemPrice
            };
            currentTableOrders.push(newItem);
        }

        // Actualizar la vista
        displayOrders(currentTableOrders);
        showToast(`${itemName} agregado al pedido`);
    } else {
        try {
            // En producción, enviamos el producto al backend usando el ID de la mesa
            const response = await ordersAPI.addItem(currentTableId, { menu_item_id: itemId, quantity: 1 });
            currentTableOrders = response;
            
            // Actualizar la vista
            displayOrders(currentTableOrders);
            showToast(`${itemName} agregado al pedido`);
        } catch (error) {
            console.error("❌ Error al agregar producto en backend:", error);
            showToast("❌ Error al registrar en servidor");
        }
    }
}

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

// Cerrar modal al hacer click fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('menuModal');
    if (modal && e.target === modal) {
        closeMenuModal();
    }
});

// requireAuth heredado ahora se delega en auth.js de forma segura.

// ===== ACCIONES DINÁMICAS DE COMANDA (ENTREGAR / COBRAR) =====
function renderOrderActions() {
    const container = document.getElementById('orderActionContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Si estamos en modo mockup o no hay comanda activa, no mostrar nada
    if (USE_MOCK_DATA || !activeOrderStatus) {
        return;
    }
    
    const actionsCard = document.createElement('div');
    actionsCard.style.padding = '18px';
    actionsCard.style.borderRadius = '10px';
    actionsCard.style.border = '1px solid #e2e8f0';
    actionsCard.style.backgroundColor = '#f7fafc';
    actionsCard.style.textAlign = 'center';
    actionsCard.style.boxSizing = 'border-box';
    
    let contentHTML = '';
    
    if (activeOrderStatus === 'pendiente' || activeOrderStatus === 'preparando') {
        // En preparación en cocina
        contentHTML = `
            <div style="font-size: 28px; margin-bottom: 8px;">⏳</div>
            <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #2d3748; font-weight: 700;">Pedido en Cocina</h4>
            <span style="display: inline-block; padding: 4px 12px; background-color: #feebc8; color: #c05621; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
                Estado: ${activeOrderStatus}
            </span>
        `;
    } else if (activeOrderStatus === 'listo') {
        // Platos listos, mesero debe servir
        contentHTML = `
            <div style="font-size: 28px; margin-bottom: 8px; animation: bellRing 1.5s infinite; display: inline-block;">🍽️</div>
            <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #22543d; font-weight: 700;">¡Platos listos en Cocina!</h4>
            <button class="btn-kitchen-action complete" onclick="deliverOrder()" style="background-color: #38a169; width: auto; padding: 10px 24px; color: white; display: inline-block; border-radius: 6px;">
                🚀 Servir / Marcar como Entregado
            </button>
        `;
    } else if (activeOrderStatus === 'entregado') {
        // Comensales comiendo, a la espera de cobrar
        contentHTML = `
            <div style="font-size: 28px; margin-bottom: 8px;">😊</div>
            <h4 style="margin: 0 0 10px 0; font-size: 15px; color: #4a5568; font-weight: 700;">Comensales en Mesa</h4>
            <button class="btn-kitchen-action complete" onclick="payOrder()" style="background-color: #2b6cb0; width: auto; padding: 10px 24px; color: white; display: inline-block; border-radius: 6px;">
                💳 Registrar Pago / Cobrar Mesa
            </button>
        `;
    }
    
    actionsCard.innerHTML = contentHTML;
    container.appendChild(actionsCard);
}

// Cambiar estado a 'entregado'
async function deliverOrder() {
    if (!activeOrderId) return;
    
    try {
        await API.request(`/api/v1/orders/${activeOrderId}/status?new_status=entregado`, {
            method: 'PUT'
        });
        
        showToast("🚀 Pedido marcado como ENTREGADO");
        
        // Recargar el detalle inmediatamente
        await loadTableDetail(currentTableId);
    } catch (error) {
        console.error("❌ Error al entregar orden:", error);
        showToast("❌ Error al registrar entrega");
    }
}

// Cambiar estado a 'pagado' (abre el modal de cobro interactivo)
let partialPaymentsList = [];
let selectedPaymentMethod = 'efectivo'; // efectivo, yape, ambos

function payOrder() {
    if (!activeOrderId) return;
    
    // Bloquear scroll de la página de fondo
    document.body.style.overflow = 'hidden';
    
    // Resetear variables del modal de pago
    partialPaymentsList = [];
    selectedPaymentMethod = 'efectivo';
    
    // Calcular el total de la comanda
    const orderTotal = currentTableOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Crear el overlay de fondo para el cobro
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'paymentModal';
    
    // Crear la tarjeta del modal
    const modal = document.createElement('div');
    modal.className = 'payment-modal-card';
    
    // Cabecera del modal
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.style.borderBottom = 'none';
    header.style.paddingBottom = '0';
    header.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; color: #2d3748; margin: 0;">💳 Cobro de Mesa (Mesa ${currentTableId})</h2>
        <button class="modal-close" onclick="closePaymentModal()">✕</button>
    `;
    
    // Caja de Resumen de Pago
    const summaryBox = document.createElement('div');
    summaryBox.className = 'payment-summary-box';
    summaryBox.innerHTML = `
        <div class="payment-total-lbl">TOTAL A PAGAR</div>
        <div class="payment-total-val" id="paymentTotalVal">S/ ${orderTotal.toFixed(2)}</div>
        <div class="payment-remaining-val" id="paymentRemainingVal">S/ ${orderTotal.toFixed(2)}</div>
    `;
    
    // Pestañas de Métodos de Pago
    const methodsGrid = document.createElement('div');
    methodsGrid.className = 'payment-methods-grid';
    methodsGrid.innerHTML = `
        <button class="payment-method-btn cash active" id="btnMethodCash" onclick="selectPaymentMethod('efectivo')">💵 Efectivo</button>
        <button class="payment-method-btn active" id="btnMethodYape" onclick="selectPaymentMethod('yape')" style="background-color: transparent; color: #4a5568; border-color: #cbd5e0; box-shadow: none;">📱 Yape</button>
        <button class="payment-method-btn both" id="btnMethodBoth" onclick="selectPaymentMethod('ambos')">🔀 Ambos</button>
    `;
    
    // Panel informativo de Yape (QR y Número)
    const yapePanel = document.createElement('div');
    yapePanel.className = 'yape-info-panel';
    yapePanel.id = 'yapeInfoPanel';
    yapePanel.style.display = 'none'; // Oculto por defecto
    yapePanel.innerHTML = `
        <div class="yape-qr-mockup">
            <div class="yape-qr-grid"></div>
        </div>
        <div class="yape-phone-num">YAPE: 987 654 321</div>
    `;
    
    // Panel de Entrada de Pago Parcial
    const inputPanel = document.createElement('div');
    inputPanel.style.display = 'flex';
    inputPanel.style.gap = '10px';
    inputPanel.innerHTML = `
        <div style="flex-grow: 1;">
            <label style="display: block; font-size: 12px; font-weight: 700; color: #718096; margin-bottom: 4px;">Monto a Registrar (S/.)</label>
            <input type="number" step="0.01" id="partialPaymentAmount" style="width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; box-sizing: border-box; font-size: 14px; font-weight: 700;" placeholder="0.00">
        </div>
        <button onclick="addPartialPayment()" style="background-color: #38a169; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-weight: 700; margin-top: 18px; cursor: pointer; height: 38px; font-size: 13px;">
            ➕ Parcial
        </button>
    `;
    
    // Lista de Pagos Parciales
    const listLabel = document.createElement('div');
    listLabel.style.fontSize = '13px';
    listLabel.style.fontWeight = '700';
    listLabel.style.color = '#4a5568';
    listLabel.textContent = "Pagos Registrados:";
    
    const paymentsList = document.createElement('div');
    paymentsList.className = 'partial-payments-list';
    paymentsList.id = 'partialPaymentsList';
    paymentsList.innerHTML = `<div style="text-align: center; color: #a0aec0; padding: 8px 0; font-size: 12px;">Sin abonos parciales registrados.</div>`;
    
    // Botón de Acción Final
    const actionBtn = document.createElement('button');
    actionBtn.className = 'btn-kitchen-action complete';
    actionBtn.id = 'btnFinalPay';
    actionBtn.style.marginTop = '8px';
    actionBtn.disabled = true;
    actionBtn.style.opacity = '0.6';
    actionBtn.style.cursor = 'not-allowed';
    actionBtn.textContent = `Registrar Pago Completo (Falta S/ ${orderTotal.toFixed(2)})`;
    actionBtn.onclick = () => submitFinalPayment();
    
    // Ensamblar modal
    modal.appendChild(header);
    modal.appendChild(summaryBox);
    modal.appendChild(methodsGrid);
    modal.appendChild(yapePanel);
    modal.appendChild(inputPanel);
    modal.appendChild(listLabel);
    modal.appendChild(paymentsList);
    modal.appendChild(actionBtn);
    overlay.appendChild(modal);
    
    document.body.appendChild(overlay);
    
    // Inicializar el monto en el input con el total original
    document.getElementById('partialPaymentAmount').value = orderTotal.toFixed(2);
    
    // Animación de entrada
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

// Seleccionar método de pago y conmutar el panel Yape
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    const btnCash = document.getElementById('btnMethodCash');
    const btnYape = document.getElementById('btnMethodYape');
    const btnBoth = document.getElementById('btnMethodBoth');
    const yapePanel = document.getElementById('yapeInfoPanel');
    
    // Limpiar clases activas
    btnCash.className = 'payment-method-btn cash';
    btnCash.style.backgroundColor = ''; btnCash.style.color = ''; btnCash.style.borderColor = ''; btnCash.style.boxShadow = '';
    btnYape.className = 'payment-method-btn';
    btnYape.style.backgroundColor = ''; btnYape.style.color = ''; btnYape.style.borderColor = ''; btnYape.style.boxShadow = '';
    btnBoth.className = 'payment-method-btn both';
    btnBoth.style.backgroundColor = ''; btnBoth.style.color = ''; btnBoth.style.borderColor = ''; btnBoth.style.boxShadow = '';
    
    if (method === 'efectivo') {
        btnCash.classList.add('active');
        yapePanel.style.display = 'none';
    } else if (method === 'yape') {
        btnYape.classList.add('active');
        yapePanel.style.display = 'flex';
    } else if (method === 'ambos') {
        btnBoth.classList.add('active');
        yapePanel.style.display = 'flex';
    }
}

// Agregar abono/pago parcial
function addPartialPayment() {
    const input = document.getElementById('partialPaymentAmount');
    const amount = parseFloat(input.value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Ingrese un monto de abono válido mayor a S/ 0");
        return;
    }
    
    const orderTotal = currentTableOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const alreadyPaid = partialPaymentsList.reduce((sum, p) => sum + p.amount, 0);
    const remaining = orderTotal - alreadyPaid;
    
    // Evitar pagar de más
    if (amount > parseFloat(remaining.toFixed(2))) {
        alert(`El monto ingresado (S/ ${amount.toFixed(2)}) supera el saldo restante por pagar (S/ ${remaining.toFixed(2)}).`);
        return;
    }
    
    // Determinar la etiqueta del método seleccionado en base al tab activo
    let methodLabel = "Efectivo";
    let methodClass = "efectivo";
    if (selectedPaymentMethod === 'yape') {
        methodLabel = "Yape";
        methodClass = "yape";
    } else if (selectedPaymentMethod === 'ambos') {
        methodLabel = "Mixto";
        methodClass = "ambos";
    }
    
    // Registrar el abono
    partialPaymentsList.push({
        id: Date.now(),
        amount: amount,
        method: methodLabel,
        class: methodClass
    });
    
    // Actualizar UI
    updatePaymentUI();
    
    // Resetear input con el nuevo saldo restante
    const newRemaining = remaining - amount;
    input.value = newRemaining > 0 ? newRemaining.toFixed(2) : "0.00";
}

// Eliminar un abono parcial
function deletePartialPayment(id) {
    partialPaymentsList = partialPaymentsList.filter(p => p.id !== id);
    
    // Actualizar UI
    updatePaymentUI();
    
    // Actualizar input con el nuevo restante
    const orderTotal = currentTableOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const alreadyPaid = partialPaymentsList.reduce((sum, p) => sum + p.amount, 0);
    const remaining = orderTotal - alreadyPaid;
    document.getElementById('partialPaymentAmount').value = remaining.toFixed(2);
}

// Recalcular montos e interactividad de la interfaz de pago
function updatePaymentUI() {
    const orderTotal = currentTableOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const alreadyPaid = partialPaymentsList.reduce((sum, p) => sum + p.amount, 0);
    const remaining = Math.max(0, orderTotal - alreadyPaid);
    
    const remainingLabel = document.getElementById('paymentRemainingVal');
    const listContainer = document.getElementById('partialPaymentsList');
    const finalBtn = document.getElementById('btnFinalPay');
    
    // 1. Mostrar saldo restante
    if (remaining === 0) {
        remainingLabel.textContent = "✓ ¡PAGO COMPLETADO!";
        remainingLabel.className = "payment-remaining-val paid";
    } else {
        remainingLabel.textContent = `Restante: S/ ${remaining.toFixed(2)}`;
        remainingLabel.className = "payment-remaining-val";
    }
    
    // 2. Renderizar lista de abonos
    if (partialPaymentsList.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; color: #a0aec0; padding: 8px 0; font-size: 12px;">Sin abonos parciales registrados.</div>`;
    } else {
        listContainer.innerHTML = partialPaymentsList.map(p => `
            <div class="partial-payment-row ${p.class}">
                <span><b>S/ ${p.amount.toFixed(2)}</b> - Abono en ${p.method}</span>
                <button class="partial-payment-delete" onclick="deletePartialPayment(${p.id})">✕</button>
            </div>
        `).join('');
    }
    
    // 3. Habilitar/Deshabilitar botón de cobro completo
    if (parseFloat(remaining.toFixed(2)) === 0) {
        finalBtn.disabled = false;
        finalBtn.style.opacity = '1';
        finalBtn.style.cursor = 'pointer';
        finalBtn.style.backgroundColor = '#38a169'; // Verde
        finalBtn.textContent = "✅ Finalizar y Registrar Pago";
    } else {
        finalBtn.disabled = true;
        finalBtn.style.opacity = '0.6';
        finalBtn.style.cursor = 'not-allowed';
        finalBtn.style.backgroundColor = '#2b6cb0'; // Azul
        finalBtn.textContent = `Registrar Pago Completo (Falta S/ ${remaining.toFixed(2)})`;
    }
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('active');
        // Desbloquear scroll
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Registrar el cobro final en la base de datos
async function submitFinalPayment() {
    if (!activeOrderId) return;
    
    try {
        await API.request(`/api/v1/orders/${activeOrderId}/status?new_status=pagado`, {
            method: 'PUT'
        });
        
        showToast("💳 Cobro completado con éxito. Mesa liberada.");
        closePaymentModal();
        
        // Volver al listado de mesas después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'tables.html';
        }, 1500);
        
    } catch (error) {
        console.error("❌ Error al registrar pago completo:", error);
        alert("Ocurrió un error al registrar el cobro en el servidor.");
    }
}

// Cerrar modal al hacer clic en el fondo oscuro
document.addEventListener('click', (e) => {
    const modal = document.getElementById('paymentModal');
    if (modal && e.target === modal) {
        closePaymentModal();
    }
});

// Exportar globalmente las nuevas funciones de cobro por partes
window.selectPaymentMethod = selectPaymentMethod;
window.addPartialPayment = addPartialPayment;
window.deletePartialPayment = deletePartialPayment;
window.closePaymentModal = closePaymentModal;
window.submitFinalPayment = submitFinalPayment;

/*
===========================================
📌 INTEGRACIÓN CON BACKEND
===========================================

INSTRUCCIONES:

1. Cambiar USE_MOCK_DATA = false

2. Endpoints necesarios:

   GET /api/menu
   Response: Array de items del menú

   POST /api/orders/{order_id}/items
   Body: { menu_item_id: number, quantity: number }

===========================================
*/