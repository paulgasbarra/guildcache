from rest_framework import viewsets, generics
from .serializers import StudentSerializer, InstructorSerializer, EmployerSerializer, ApplicationSerializer, DonorSerializer
from .models import Student, Instructor, Employer, Application, Donor
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
import csv
from django.apps import apps
from django.db import transaction


@permission_classes([IsAuthenticated])
class StudentViewSet(viewsets.ModelViewSet): 
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

@permission_classes([IsAuthenticated])
class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

@permission_classes([IsAuthenticated])
class StudentDeleteView(generics.DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

@permission_classes([IsAuthenticated])
class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class EmployerViewSet(viewsets.ModelViewSet): 
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

class ApplicationViewSet(viewsets.ModelViewSet): 
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=200)
    else:
        return Response({"error": "Invalid credentials"}, status=400)
    

def generic_csv_upload_wrapper(model, serializer, request):
    if request.method == 'POST':
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response({"error": "Please upload a CSV file."}, status=400)

        model_list = []
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        for row in reader:
            # confirm that values are valid for the model especially for boolean fields
            for key, value in row.items():
                if value.upper() == 'TRUE':
                    row[key] = True
                elif value.upper() == 'FALSE':
                    row[key] = False
            model_instance = model(**row)
            model_list.append(model_instance)

        model.objects.bulk_create(model_list)
    
        return Response({"message": "File uploaded successfully"}, status=200)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def upload_students(request):
    return generic_csv_upload_wrapper(Student, StudentSerializer, request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_instructors(request):
    return generic_csv_upload_wrapper(Instructor, InstructorSerializer, request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_employers(request):
    return generic_csv_upload_wrapper(Employer, EmployerSerializer, request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_donors(request):
    return generic_csv_upload_wrapper(Donor, DonorSerializer, request)
