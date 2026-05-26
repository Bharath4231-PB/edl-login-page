from django.contrib import admin
from .models import StudentRegistration

@admin.register(StudentRegistration)
class StudentRegistrationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'college', 'internship', 'duration', 'payment_id', 'created_at')
    search_fields = ('name', 'email', 'college', 'payment_id')
    list_filter = ('internship', 'duration', 'created_at')
    readonly_fields = ('created_at',)
