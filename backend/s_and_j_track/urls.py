from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, StudentListCreateView, InstructorViewSet, EmployerViewSet, ApplicationViewSet, DonorViewSet, login_view, upload_csv

router = DefaultRouter()
router.register('students', StudentViewSet)
router.register('employers', EmployerViewSet)
router.register('applications', ApplicationViewSet)
router.register('donors', DonorViewSet)
router.register('instructors', InstructorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('students', StudentListCreateView.as_view(), name='student-list-create'),
    path('login/', login_view, name='login'),
    path('students/upload/', upload_csv, name="upload_csv")
]