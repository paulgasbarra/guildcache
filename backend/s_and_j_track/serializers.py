from rest_framework import serializers
from .models import Student, Employer, Application, Donor

class StudentSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Student
        fields = ['id', 'name', 'address', 'phone', 'email', 'linkedin', 'resume_link', 'lca_cert', 'epa_608_cert', 's_j_cert', 'class_site', 'class_number', 'class_date']

class EmployerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Employer
        fields = ['id', 'name', 'address', 'website', 'primary_contact', 'phone', 'email', 'linkedin', 'job_listings', 'company_size', 'speciality']

class ApplicationSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Application
        fields = ['id', 'student', 'employer', 'applied_date', 'passed_date', 'hired_date', 'salary_or_hourly_rate']

class DonorSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Donor
        fields = ['id', 'name', 'address', 'phone', 'email', 'linkedin', 'website', 'instagram', 'tiktok']