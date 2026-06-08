// cocina.js - Lógica del Dashboard de Cocina con actualización en tiempo real

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Proteger página para que solo accedan cocineros
    const authorized = await protectPage(['cocinero']);
    if (!authorized) return;
    
    // 2. Cargar info del cocinero logueado
    loadCocineroInfo();
    
    // 3. Cargar comandas activas al iniciar
    await loadActiveOrders();
    
    // 4. Configurar autorefresco cada 10 segundos
    setInterval(loadActiveOrders, 10000);
});

// Cargar información del cocinero
function loadCocineroInfo() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('cocinaUser').textContent = user.full_name || user.username;
    }
}

// Cargar comandas activas desde la API del backend
async function loadActiveOrders() {
    const grid = document.getElementById('kitchenGrid');
    
    try {
        // Consultar el endpoint de comandas activas para cocina
        const orders = await API.request('/api/v1/orders/kitchen/active');
        
        if (!orders || orders.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #718096;">
                    <div style="font-size: 56px; margin-bottom: 16px;">🌊</div>
                    <h3>No hay comandas activas</h3>
                    <p style="margin-top: 8px; font-size: 14px; color: #a0aec0;">Los pedidos que tomen los meseros aparecerán aquí de forma automática.</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = '';
        orders.forEach(order => {
            const card = createOrderCard(order);
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error("❌ Error al cargar comandas de cocina:", error);
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 45px; color: #e53e3e;">
                <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
                <h3>Error de conexión con el servidor</h3>
                <p style="margin-top: 8px; font-size: 14px;">Por favor, verifique que la API del backend esté encendida.</p>
            </div>
        `;
    }
}

// Crear la tarjeta de visualización de cada comanda
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = `kitchen-order-card ${order.status.toLowerCase()}`;
    
    // Formatear el tiempo transcurrido desde el pedido
    const timeElapsed = formatTime(order.created_at);
    
    // Generar la lista de platos/bebidas de la comanda
    const itemsHTML = order.items.map(item => `
        <li class="kitchen-item-row">
            <span class="kitchen-item-qty">x${item.quantity}</span>
            <span class="kitchen-item-name">${item.menu_item_name}</span>
        </li>
    `).join('');
    
    // Determinar el botón de acción según el estado
    let actionHTML = '';
    if (order.status === 'pendiente') {
        actionHTML = `<button class="btn-kitchen-action prepare" onclick="updateStatus(${order.id}, 'preparando')">👨‍🍳 Preparar</button>`;
    } else if (order.status === 'preparando') {
        actionHTML = `<button class="btn-kitchen-action complete" onclick="updateStatus(${order.id}, 'listo')">✅ Terminar</button>`;
    } else if (order.status === 'listo') {
        actionHTML = `<span class="badge-kitchen-ready">🔔 ¡Listo para servir!</span>`;
    }
    
    card.innerHTML = `
        <div class="kitchen-card-header">
            <h3 class="kitchen-card-title">Mesa ${order.table_number}</h3>
            <span class="kitchen-card-time">${timeElapsed}</span>
        </div>
        <div class="kitchen-card-body">
            <ul class="kitchen-item-list">
                ${itemsHTML}
            </ul>
        </div>
        <div class="kitchen-card-footer">
            ${actionHTML}
        </div>
    `;
    
    return card;
}

// Calcular tiempo relativo transcurrido
function formatTime(dateString) {
    const orderDate = new Date(dateString);
    const now = new Date();
    
    const diffMs = now - orderDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Hace un momento';
    if (diffMins === 1) return 'Hace 1 min';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    
    return orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Actualizar el estado de la comanda en la base de datos
async function updateStatus(orderId, newStatus) {
    try {
        await API.request(`/api/v1/orders/${orderId}/status?new_status=${newStatus}`, {
            method: 'PUT'
        });
        
        // Mostrar feedback visual
        showToast(`Pedido #${orderId} actualizado a ${newStatus}`);
        
        // Recargar las comandas de inmediato
        await loadActiveOrders();
        
    } catch (error) {
        console.error("❌ Error al actualizar el estado de la orden:", error);
        alert("Ocurrió un error al actualizar el estado del pedido.");
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

// Exportar globalmente la función de actualización
window.loadActiveOrders = loadActiveOrders;
window.updateStatus = updateStatus;
