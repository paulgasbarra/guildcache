from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (StudentViewSet, 
                    StudentListCreateView, 
                    InstructorViewSet, 
                    EmployerViewSet, 
                    ApplicationViewSet, 
                    DonorViewSet, 
                    login_view, 
                    generic_csv_upload_wrapper)

router = DefaultRouter()
router.register('students', StudentViewSet)
router.register('employers', EmployerViewSet)
router.register('applications', ApplicationViewSet)
router.register('donors', DonorViewSet)
router.register('instructors', InstructorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/<str:model_name>/', generic_csv_upload_wrapper, name='generic_upload'),
    path('students', StudentListCreateView.as_view(), name='student-list-create'),
    path('login/', login_view, name='login'),
    
]