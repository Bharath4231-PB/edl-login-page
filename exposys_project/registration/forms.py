from django import forms
from .models import StudentRegistration

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = StudentRegistration
        exclude = ['created_at']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your full name'}),
            'branch': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. Computer Science'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter your email'}),
            'college': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your college name'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter 10-digit phone number'}),
            'tenth_percentage': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'e.g. 85.5', 'step': '0.01', 'min': '0', 'max': '100'}),
            'twelfth_percentage': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'e.g. 78.0', 'step': '0.01', 'min': '0', 'max': '100'}),
            'ug': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. B.Tech (optional)'}),
            'pg': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. M.Tech (optional)'}),
            'location': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your city/location'}),
            'internship': forms.Select(attrs={'class': 'form-select'}),
            'duration': forms.Select(attrs={'class': 'form-select'}),
            'payment_id': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Payment Transaction ID'}),
        }

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if not phone.isdigit() or len(phone) != 10:
            raise forms.ValidationError("Enter a valid 10-digit phone number.")
        return phone

    def clean_tenth_percentage(self):
        val = self.cleaned_data.get('tenth_percentage')
        if val is not None and (val < 0 or val > 100):
            raise forms.ValidationError("Percentage must be between 0 and 100.")
        return val

    def clean_twelfth_percentage(self):
        val = self.cleaned_data.get('twelfth_percentage')
        if val is not None and (val < 0 or val > 100):
            raise forms.ValidationError("Percentage must be between 0 and 100.")
        return val
