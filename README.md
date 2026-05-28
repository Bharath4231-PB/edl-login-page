# Exposys Data Labs – Internship Registration & Management Portal

A premium, modern Django-based internship registration system and administrative management portal.

## 🚀 Single Unified Server URLs

*   **User Registration Portal:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
    *Serves the user-facing internship application portal.*
*   **Administration Portal:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
    *Serves both administrator dashboards for database and model management.*

---

## 🔑 Two Administrator Credentials

Both admin accounts are fully registered and can access the management panel concurrently:

1.  **First Admin:**
    *   **Username:** `admin`
    *   **Password:** `admin123`
2.  **Second Admin:**
    *   **Username:** `admin2`
    *   **Password:** `admin123`

---

## ✨ Features

### Client-Side User Portal
*   **Thematic Style Selector:** Dynamic, smooth-switching theme dropdown supporting **Default (Original Exposys Brand)**, **Light Mode (White)**, and a neon-indigo glassmorphic **Dark Mode**. Choice persists across page loads via `localStorage`.
*   **Clickable Apply Actions:** Prominent hero action CTA buttons that smoothly scroll the user directly to the registration form.
*   **Strict Real-Time Validations:**
    *   **Full Name Field:** Exclusively accepts alphabetical characters and spaces. Special characters and numbers are blocked at the keypress level and scrubbed on copy/paste.
    *   **Mobile Number Field:** Exclusively accepts digits and strictly caps input length to exactly 10 digits.

### Administration Portal
*   **Django 6 Ready custom dashboard:** Fully responsive dark-themed admin dashboard that displays registered database tables and model operations cleanly, bypassing standard Django 6 lazy translation recursion bugs.
*   **Contact Social Links:** Footer links mapped to correct external profiles with security tags (`target="_blank" rel="noopener noreferrer"`):
    *   **Facebook:** Exposys Data Labs Profile
    *   **Instagram:** Exposys Data Labs Profile
    *   **YouTube:** Exposys Data Labs Channel

---

## 🛠️ Setup & Running

1.  Activate the virtual environment:
    ```powershell
    .\venv\Scripts\activate
    ```
2.  Run the server:
    ```powershell
    python manage.py runserver
    ```
