from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, EmployerViewSet, ApplicationViewSet, DonorViewSet

router = DefaultRouter()
router.register('students', StudentViewSet)
router.register('employers', EmployerViewSet)
router.register('applications', ApplicationViewSet)
router.register('donors', DonorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]