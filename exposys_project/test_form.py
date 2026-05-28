import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exposys_project.settings')
django.setup()

from registration.forms import RegistrationForm

# Simulate exactly what the form receives
test_data = {
    'name': 'John Doe',
    'branch': 'CSE',
    'email': 'john.doe.restored@example.com',
    'college': 'ABC College',
    'phone': '9876543210',
    'tenth_percentage': '85.5',
    'twelfth_percentage': '78.0',
    'ug': 'B.Tech',
    'pg': '',
    'location': 'Bangalore',
    'internship': 'Data Science',
    'duration': '1 Month',
    'payment_id': 'TXN123456',
}

form = RegistrationForm(data=test_data)
print("Form valid:", form.is_valid())
if not form.is_valid():
    print("ERRORS:", form.errors)
else:
    student = form.save()
    print(f"Saved! ID={student.id}, Name={student.name}, Email={student.email}")
