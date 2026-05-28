document.addEventListener('DOMContentLoaded', function () {

    // ===== PASSWORD TOGGLE =====
    const toggleBtn = document.getElementById('togglePw');
    const pwInput   = document.getElementById('id_password');
    if (toggleBtn && pwInput) {
        toggleBtn.addEventListener('click', function () {
            const show = pwInput.type === 'password';
            pwInput.type = show ? 'text' : 'password';
            this.innerHTML = show
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';
        });
    }

    // ===== LOGIN BUTTON LOADING =====
    const form    = document.getElementById('login-form');
    const loginBtn = document.getElementById('loginBtn');
    if (form && loginBtn) {
        form.addEventListener('submit', function () {
            loginBtn.innerHTML = '<i class="bi bi-arrow-repeat spin me-2"></i><span>Signing in...</span>';
            loginBtn.disabled = true;
            loginBtn.style.opacity = '0.85';
        });
    }

    // ===== WAVE ANIMATION =====
    const paths = document.querySelectorAll('.wave-path');
    paths.forEach((path, i) => {
        path.style.animationDelay = (i * 0.4) + 's';
    });

    // ===== INPUT FOCUS LABEL EFFECT =====
    document.querySelectorAll('.input-wrap input').forEach(input => {
        input.addEventListener('focus', function () {
            this.closest('.field-group')?.querySelector('label')
                ?.style.setProperty('color', '#7c3aed');
        });
        input.addEventListener('blur', function () {
            this.closest('.field-group')?.querySelector('label')
                ?.style.setProperty('color', '#374151');
        });
    });
});
