from rest_framework import viewsets
from .serializers import StudentSerializer, EmployerSerializer, ApplicationSerializer, DonorSerializer
from .models import Student, Employer, Application, Donor

class StudentViewSet(viewsets.ModelViewSet): 
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class EmployerViewSet(viewsets.ModelViewSet): 
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

class ApplicationViewSet(viewsets.ModelViewSet): 
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer