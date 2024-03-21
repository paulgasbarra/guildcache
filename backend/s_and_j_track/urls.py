from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (StudentViewSet, 
                    StudentListCreateView, 
                    InstructorViewSet, 
                    EmployerViewSet, 
                    ApplicationViewSet, 
                    DonorViewSet, 
                    login_view, 
                    upload_students,
                    upload_instructors,
                    upload_donors,
                    upload_employers,
                )

router = DefaultRouter()
router.register('students', StudentViewSet)
router.register('employers', EmployerViewSet)
router.register('applications', ApplicationViewSet)
router.register('donors', DonorViewSet)
router.register('instructors', InstructorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/students/', upload_students, name='upload-csv'),
    path('upload/instructors/', upload_instructors, name='upload-csv'),
    path('upload/donors/', upload_donors, name='upload-csv'),
    path('upload/employers/', upload_employers, name='upload-csv'),
    path('students', StudentListCreateView.as_view(), name='student-list-create'),
    path('login/', login_view, name='login'),
    
]