// password-recovery.js - Sistema de recuperación de contraseña WILLLIAM CHAMBA

let verifiedUsername = null; // Almacenar usuario verificado

document.addEventListener('DOMContentLoaded', () => {
    // Configurar formulario de verificación
    const verifyForm = document.getElementById('verifyEmployeeForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', handleVerifyEmployee);
    }

    // Configurar formulario de cambio de contraseña
    const changeForm = document.getElementById('changePasswordForm');
    if (changeForm) {
        changeForm.addEventListener('submit', handleChangePassword);
    }

    // Validación en tiempo real de contraseña
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', checkPasswordStrength);
    }
});

// Mostrar modal de recuperación
function showRecoveryModal() {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('recoveryCard').style.display = 'block';
    document.getElementById('verifyEmployeeForm').style.display = 'block';
    document.getElementById('changePasswordForm').style.display = 'none';
    hideRecoveryMessage();

    // Limpiar campos
    document.getElementById('recoveryUsername').value = '';
    document.getElementById('employeeCode').value = '';
}

// Volver al modal de login
function showLoginModal() {
    document.getElementById('recoveryCard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'block';
    hideRecoveryMessage();
    verifiedUsername = null;
}

// Cancelar proceso de recuperación
function cancelRecovery() {
    if (confirm('¿Está seguro de cancelar el proceso de recuperación?')) {
        showLoginModal();
    }
}

// PASO 1: Verificar identidad del empleado
async function handleVerifyEmployee(e) {
    e.preventDefault();

    const username = document.getElementById('recoveryUsername').value.trim();
    const employeeCode = document.getElementById('employeeCode').value.trim();
    const submitButton = e.target.querySelector('button[type="submit"]');

    if (!username || !employeeCode) {
        showRecoveryError('Por favor, complete todos los campos');
        return;
    }

    // Deshabilitar botón
    submitButton.disabled = true;
    submitButton.textContent = 'Verificando...';
    hideRecoveryMessage();

    try {
        // Verificar con el backend
        const response = await fetch(`${API.CONFIG.BASE_URL}/auth/verify-employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                employee_code: employeeCode
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Código de empleado incorrecto');
        }

        const data = await response.json();

        // Guardar usuario verificado
        verifiedUsername = username;

        // Mostrar éxito y pasar al siguiente paso
        showRecoverySuccess('✓ Identidad verificada correctamente');

        setTimeout(() => {
            // Mostrar formulario de cambio de contraseña
            document.getElementById('verifyEmployeeForm').style.display = 'none';
            document.getElementById('changePasswordForm').style.display = 'block';
            hideRecoveryMessage();
        }, 1500);

    } catch (error) {
        showRecoveryError(error.message || 'Error al verificar identidad');
        submitButton.disabled = false;
        submitButton.textContent = 'Verificar Identidad';
    }
}

// PASO 2: Cambiar contraseña
async function handleChangePassword(e) {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitButton = e.target.querySelector('button[type="submit"]');

    // Validaciones
    if (newPassword.length < 6) {
        showRecoveryError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    if (newPassword !== confirmPassword) {
        showRecoveryError('Las contraseñas no coinciden');
        return;
    }

    if (!verifiedUsername) {
        showRecoveryError('Error de sesión. Reinicie el proceso.');
        return;
    }

    // Deshabilitar botón
    submitButton.disabled = true;
    submitButton.textContent = 'Cambiando contraseña...';
    hideRecoveryMessage();

    try {
        // Enviar nueva contraseña al backend
        const response = await fetch(`${API.CONFIG.BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: verifiedUsername,
                new_password: newPassword
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error al cambiar contraseña');
        }

        const data = await response.json();

        // Mostrar éxito
        showRecoverySuccess('✓ Contraseña cambiada exitosamente');

        // Limpiar formularios
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('passwordStrength').textContent = '';
        verifiedUsername = null;

        // Volver al login después de 2 segundos
        setTimeout(() => {
            showLoginModal();
            showSuccess('Contraseña actualizada. Puede iniciar sesión con su nueva contraseña.');
        }, 2000);

    } catch (error) {
        showRecoveryError(error.message || 'Error al cambiar contraseña');
        submitButton.disabled = false;
        submitButton.textContent = 'Cambiar Contraseña';
    }
}

// Verificar fortaleza de contraseña en tiempo real
function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthDiv = document.getElementById('passwordStrength');

    if (!password) {
        strengthDiv.textContent = '';
        strengthDiv.className = 'password-strength';
        return;
    }

    let strength = 0;
    let message = '';
    let className = '';

    // Criterios de fortaleza
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Determinar nivel
    if (strength <= 2) {
        message = '⚠ Contraseña débil';
        className = 'password-strength weak';
    } else if (strength <= 3) {
        message = '✓ Contraseña aceptable';
        className = 'password-strength medium';
    } else {
        message = '✓✓ Contraseña fuerte';
        className = 'password-strength strong';
    }

    strengthDiv.textContent = message;
    strengthDiv.className = className;
}

// Mostrar mensaje de error en recovery
function showRecoveryError(message) {
    const messageDiv = document.getElementById('recoveryMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.className = 'error-message';
    }
}

// Mostrar mensaje de éxito en recovery
function showRecoverySuccess(message) {
    const messageDiv = document.getElementById('recoveryMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.className = 'success-message';
    }
}

// Ocultar mensaje de recovery
function hideRecoveryMessage() {
    const messageDiv = document.getElementById('recoveryMessage');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
}

// Exportar funciones
window.showRecoveryModal = showRecoveryModal;
window.showLoginModal = showLoginModal;
window.cancelRecovery = cancelRecovery;