from django.db import models

INTERNSHIP_CHOICES = [
    ('Data Science', 'Data Science'),
    ('Python Development', 'Python Development'),
    ('Full Stack Development', 'Full Stack Development'),
    ('AI & ML', 'AI & ML'),
    ('Web Development', 'Web Development'),
    ('Cyber Security', 'Cyber Security'),
]

DURATION_CHOICES = [
    ('1 Month', '1 Month'),
    ('2 Months', '2 Months'),
    ('3 Months', '3 Months'),
    ('6 Months', '6 Months'),
]

class StudentRegistration(models.Model):
    name = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    college = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    tenth_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    twelfth_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    ug = models.CharField(max_length=100, blank=True)
    pg = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100)
    internship = models.CharField(max_length=100, choices=INTERNSHIP_CHOICES)
    duration = models.CharField(max_length=20, choices=DURATION_CHOICES)
    payment_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'student_registration'
        verbose_name = 'Student Registration'
        verbose_name_plural = 'Student Registrations'

    def __str__(self):
        return f"{self.name} - {self.internship}"
