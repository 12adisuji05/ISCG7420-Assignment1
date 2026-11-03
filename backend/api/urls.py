from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import (AppointmentViewSet, DoctorViewSet, PatientViewSet, RegisterView, SlotViewSet,
                    current_user)

router = DefaultRouter()
router.register('doctors', DoctorViewSet, basename='doctors')
router.register('slots', SlotViewSet, basename='slots')
router.register('appointments', AppointmentViewSet, basename='appointments')
router.register('patients', PatientViewSet, basename='patients')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', obtain_auth_token),
    path('register/', RegisterView.as_view()),
    path('me/', current_user),
]
