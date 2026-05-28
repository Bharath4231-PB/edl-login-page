document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    // ===== THEME MANAGER =====
    const htmlEl = document.documentElement;
    const themeDropdownItems = document.querySelectorAll('[data-theme-val]');
    const themeActiveIcon = document.getElementById('themeActiveIcon');
    const themeActiveText = document.getElementById('themeActiveText');

    // Theme icons mapping
    const themeIcons = {
        'default': 'bi-palette-fill',
        'light': 'bi-sun-fill text-warning',
        'dark': 'bi-moon-stars-fill text-info'
    };
    const themeNames = {
        'default': 'Default',
        'light': 'Light',
        'dark': 'Dark'
    };

    function applyTheme(theme) {
        // Set document attribute
        htmlEl.setAttribute('data-theme', theme);
        // Persist to localStorage
        localStorage.setItem('preferred-theme', theme);

        // Update dropdown button visual status
        if (themeActiveIcon && themeActiveText) {
            themeActiveIcon.className = `bi ${themeIcons[theme] || themeIcons['default']}`;
            themeActiveText.textContent = themeNames[theme] || themeNames['default'];
        }

        // Update active class on dropdown options
        themeDropdownItems.forEach(item => {
            if (item.getAttribute('data-theme-val') === theme) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Load initial theme from localStorage or default
    const savedTheme = localStorage.getItem('preferred-theme') || 'default';
    applyTheme(savedTheme);

    // Listen to theme option click events
    themeDropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedTheme = this.getAttribute('data-theme-val');
            applyTheme(selectedTheme);
        });
    });

    // ===== FORM SUBMIT =====
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        const nameInput = document.getElementById('id_name');
        const phoneInput = document.getElementById('id_phone');
        const tenthInput = document.getElementById('id_tenth_percentage');
        const twelfthInput = document.getElementById('id_twelfth_percentage');

        let hasError = false;
        let frontendErrors = {};

        // Validation: Full Name (Letters and spaces only)
        if (nameInput) {
            const nameVal = nameInput.value.trim();
            if (nameVal === '') {
                frontendErrors['name'] = 'Full Name is required.';
                hasError = true;
            } else if (!/^[a-zA-Z\s]+$/.test(nameVal)) {
                frontendErrors['name'] = 'Full Name can only contain letters and spaces.';
                hasError = true;
            }
        }

        // Validation: Phone Number (Exactly 10 digits)
        if (phoneInput) {
            const phoneVal = phoneInput.value.trim();
            if (phoneVal === '') {
                frontendErrors['phone'] = 'Phone number is required.';
                hasError = true;
            } else if (phoneVal.length !== 10 || /\D/.test(phoneVal)) {
                frontendErrors['phone'] = 'Enter a valid 10-digit phone number.';
                hasError = true;
            }
        }

        // Validation: Tenth Percentage
        if (tenthInput) {
            const tenthVal = parseFloat(tenthInput.value);
            if (tenthInput.value.trim() === '') {
                frontendErrors['tenth_percentage'] = '10th Percentage is required.';
                hasError = true;
            } else if (isNaN(tenthVal) || tenthVal < 0 || tenthVal > 100) {
                frontendErrors['tenth_percentage'] = 'Percentage must be between 0 and 100.';
                hasError = true;
            }
        }

        // Validation: Twelfth Percentage
        if (twelfthInput) {
            const twelfthVal = parseFloat(twelfthInput.value);
            if (twelfthInput.value.trim() === '') {
                frontendErrors['twelfth_percentage'] = '12th Percentage is required.';
                hasError = true;
            } else if (isNaN(twelfthVal) || twelfthVal < 0 || twelfthVal > 100) {
                frontendErrors['twelfth_percentage'] = 'Percentage must be between 0 and 100.';
                hasError = true;
            }
        }

        if (hasError) {
            showErrors(frontendErrors);
            return;
        }

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

    // ===== REAL-TIME INPUT RESTRICTIONS =====
    const nameField = document.getElementById('id_name');
    if (nameField) {
        nameField.addEventListener('keypress', function (e) {
            // Block non-letters and non-spaces
            const char = String.fromCharCode(e.which || e.keyCode);
            if (!/^[A-Za-z\s]+$/.test(char) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });
        nameField.addEventListener('input', function () {
            // Scrub any non-letters and non-spaces (e.g. if pasted)
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }

    const phoneField = document.getElementById('id_phone');
    if (phoneField) {
        phoneField.addEventListener('keypress', function (e) {
            // Block non-digits
            if (e.key < '0' || e.key > '9') {
                if (e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete') {
                    e.preventDefault();
                }
            }
        });
        phoneField.addEventListener('input', function () {
            // Scrub any non-digits (e.g. if pasted) and restrict to 10 chars
            let clean = this.value.replace(/\D/g, '');
            if (clean.length > 10) clean = clean.slice(0, 10);
            this.value = clean;
        });
    }

    const percentFields = [document.getElementById('id_tenth_percentage'), document.getElementById('id_twelfth_percentage')];
    percentFields.forEach(field => {
        if (field) {
            field.addEventListener('keypress', function (e) {
                if ((e.key < '0' || e.key > '9') && e.key !== '.') {
                    if (e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete') {
                        e.preventDefault();
                    }
                }
                if (e.key === '.' && this.value.includes('.')) {
                    e.preventDefault();
                }
            });
        }
    });

    // ===== NAVBAR SCROLL: dynamic header transition =====
    const navbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
