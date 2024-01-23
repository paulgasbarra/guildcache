from rest_framework import viewsets, generics
from .serializers import StudentSerializer, InstructorSerializer, EmployerSerializer, ApplicationSerializer, DonorSerializer
from .models import Student, Instructor, Employer, Application, Donor
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

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