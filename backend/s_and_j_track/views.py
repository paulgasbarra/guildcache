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

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can upload
def upload_csv(request):
    if request.method == 'POST':
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response({"error": "Please upload a CSV file."}, status=400)

        #create a student model from the csv file
     
        students = []
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        for row in reader:

            student = Student(
                name=row['name'], 
                address=row['address'], 
                phone=row['phone'],
                email=row['email'],
                linkedin=row['linkedin'],
                resume_link=row['resume_link'],
                lca_cert=row['lca_cert'].upper() == 'TRUE',  # Convert to boolean
                epa_608_cert=row['epa_608_cert'].upper() == 'TRUE',  # Convert to boolean
                s_j_cert=row['s_j_cert'].upper() == 'TRUE',
                class_site=row['class_site'],
                class_number=row['class_number'],
                class_date=row['class_date']
                )

            students.append(student)

        Student.objects.bulk_create(students)
    
        return Response({"message": "File uploaded successfully"}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generic_csv_upload_wrapper(request, model_name):
    return generic_csv_upload(request._request, model_name)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generic_csv_upload(request, model_name):
    try:
        model = apps.get_model('your_app_name', model_name)
    except LookupError:
        return Response({"error": f"Model {model_name} not found."}, status=400)

    csv_file = request.FILES.get('file')
    if not csv_file:
        return Response({"error": "Please upload a CSV file."}, status=400)

    decoded_file = csv_file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)

    model_instances = []
    for row in reader:
        model_instance = model()
        for field in model._meta.fields:
            csv_value = row.get(field.name)
            if csv_value:
                if isinstance(field, models.BooleanField):
                    csv_value = csv_value.upper() == 'TRUE'

                setattr(model_instance, field.name, csv_value)

        model_instances.append(model_instance)

    with transaction.atomic():
        model.objects.bulk_create(model_instances)

    return Response({"message": f"{model_name} data uploaded successfully"}, status=200)
