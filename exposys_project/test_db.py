import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exposys_project.settings')
django.setup()

from registration.models import StudentRegistration

count = StudentRegistration.objects.count()
print(f"Total records in student_registration: {count}")

if count > 0:
    for s in StudentRegistration.objects.all():
        print(f"  -> {s.id} | {s.name} | {s.email} | {s.internship}")
else:
    print("Table is empty. Testing direct insert...")
    try:
        test = StudentRegistration.objects.create(
            name="Test Student",
            branch="CSE",
            email="test@exposys.com",
            college="Test College",
            phone="9876543210",
            tenth_percentage=85.5,
            twelfth_percentage=78.0,
            ug="B.Tech",
            pg="",
            location="Bangalore",
            internship="Data Science",
            duration="1 Month",
            payment_id="TXN_TEST_001"
        )
        print(f"Direct insert SUCCESS! ID={test.id}, Name={test.name}")
    except Exception as e:
        print(f"Direct insert FAILED: {e}")
