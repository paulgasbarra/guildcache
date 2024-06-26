from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (StudentViewSet, 
                    ContactViewSet,
                    InstructorViewSet, 
                    EmployerViewSet, 
                    ApplicationViewSet, 
                    DonorViewSet, 
                    CohortViewSet,
                    login_view, 
                    upload_students,
                    upload_instructors,
                    upload_donors,
                    upload_employers,
                    upload_cohorts
                )

router = DefaultRouter()
router.register('students', StudentViewSet, basename='students')
router.register('employers', EmployerViewSet, basename='employers')
router.register('applications', ApplicationViewSet)
router.register('donors', DonorViewSet, basename='donors')
router.register('instructors', InstructorViewSet, basename='instructors')
router.register('cohorts', CohortViewSet, basename='cohorts')
router.register('contacts', ContactViewSet, basename='contacts')

urlpatterns = [
    path('', include(router.urls)),
    path('upload/students/', upload_students, name='upload-csv'),
    path('upload/instructors/', upload_instructors, name='upload-csv'),
    path('upload/donors/', upload_donors, name='upload-csv'),
    path('upload/employers/', upload_employers, name='upload-csv'),
    path('upload/cohorts/', upload_cohorts, name='upload-csv'),
    path('login/', login_view, name='login'),   
]