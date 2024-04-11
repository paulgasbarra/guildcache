from rest_framework import serializers
from .models import Student, Instructor, Employer, Application, Donor, Cohort, UserProfile, Contact

class StudentSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Student
        fields = ['id', 'name', 'address', 'phone', 'email', 'linkedin', 'resume_link', 'lca_cert', 'epa_608_cert', 's_j_cert', 'notes', 'hired', 'cohort', 'employer']

class ContactSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Contact
        fields = ['id', 'name', 'address', 'phone', 'email', 'donor', 'employer', 'is_primary']

class InstructorSerializer(serializers.ModelSerializer):
    cohorts = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Cohort.objects.all()
    )
      
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'address', 'phone', 'email', 'linkedin', 'website', 'instagram', 'tiktok', 'salary', "cohorts"]

class EmployerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Employer
        fields = ['id', 'name', 'address', 'website', 'primary_contact', 'phone', 'email', 'linkedin', 'job_listings', 'company_size', 'speciality', 'contacts']

class ApplicationSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Application
        fields = ['id', 'student', 'employer', 'applied_date', 'passed_date', 'hired_date', 'salary_or_hourly_rate']

class DonorSerializer(serializers.ModelSerializer): 
    contacts = ContactSerializer(many=True, read_only=True)
    
    class Meta: 
        model = Donor
        fields = ['id', 'name', 'address', 'phone', 'email', 'linkedin', 'website', 'instagram', 'tiktok', 'contacts']

class CohortSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)
    instructors = InstructorSerializer(many=True, read_only=True)

    class Meta:
        model = Cohort
        fields = ['id', 'name', 'start_date', 'end_date', 'location', 'students', 'instructors']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['organization', 'user']