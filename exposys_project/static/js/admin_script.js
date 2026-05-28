document.addEventListener('DOMContentLoaded', function () {

    // ===== PARTICLES =====
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const particles = Array.from({ length: 55 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.4 + 0.1
        }));

        function drawParticles() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(147,197,253,${p.alpha})`;
                ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > W) p.dx *= -1;
                if (p.y < 0 || p.y > H) p.dy *= -1;
            });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();

        window.addEventListener('resize', () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        });
    }

    // ===== PASSWORD TOGGLE =====
    const toggleBtn = document.getElementById('togglePassword');
    const pwInput   = document.getElementById('id_password');
    if (toggleBtn && pwInput) {
        toggleBtn.addEventListener('click', function () {
            const isText = pwInput.type === 'text';
            pwInput.type = isText ? 'password' : 'text';
            this.innerHTML = isText
                ? '<i class="bi bi-eye"></i>'
                : '<i class="bi bi-eye-slash"></i>';
        });
    }

    // ===== LOGIN BUTTON LOADING =====
    const loginForm = document.getElementById('login-form');
    const submitBtn = document.querySelector('.submit-row input[type="submit"]');
    if (loginForm && submitBtn) {
        loginForm.addEventListener('submit', function () {
            submitBtn.value = 'Signing in...';
            submitBtn.style.opacity = '0.8';
        });
    }

    // ===== NAVBAR SCROLL =====
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.scrollY > 10
                ? '0 4px 20px rgba(0,0,0,0.4)'
                : 'none';
        });
    }
});
