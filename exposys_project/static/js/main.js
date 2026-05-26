document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    // ===== FORM SUBMIT =====
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            body: formData,
            headers: { 'X-CSRFToken': getCookie('csrftoken') }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showSuccessModal(formData.get('name'), formData.get('payment_id'));
                form.reset();
            } else {
                showErrors(data.errors);
            }
        })
        .catch(() => alert('Something went wrong. Please try again.'))
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Submit Registration';
        });
    });

    // ===== RESET BUTTON =====
    resetBtn.addEventListener('click', function () {
        form.reset();
        clearErrors();
    });

    // ===== SHOW ERRORS =====
    function showErrors(errors) {
        Object.keys(errors).forEach(field => {
            const input = document.getElementById('id_' + field);
            if (input) {
                input.classList.add('is-invalid');
                let feedback = input.nextElementSibling;
                if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                    feedback = document.createElement('div');
                    feedback.className = 'invalid-feedback';
                    input.parentNode.insertBefore(feedback, input.nextSibling);
                }
                feedback.textContent = errors[field];
            }
        });
        // Scroll to first error
        const firstError = document.querySelector('.is-invalid');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ===== CLEAR ERRORS =====
    function clearErrors() {
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    }

    // ===== SUCCESS MODAL =====
    function showSuccessModal(name, paymentId) {
        document.getElementById('successName').textContent = name;
        document.getElementById('successPaymentId').textContent = paymentId;
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    }

    // ===== CSRF COOKIE =====
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach(cookie => {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                }
            });
        }
        return cookieValue;
    }

    // ===== REAL-TIME VALIDATION =====
    form.querySelectorAll('.form-control, .form-select').forEach(input => {
        input.addEventListener('input', function () {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const feedback = this.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = '';
                }
            }
        });
    });

    // ===== NAVBAR SCROLL: light blue → white =====
    const navbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
