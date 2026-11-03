import datetime

from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from clinic.models import Appointment, Doctor, Slot

from .permissions import IsAdminOrReadOnly, IsOwnerOrAdmin
from .serializers import (AppointmentSerializer, DoctorSerializer, PatientSerializer,
                          SlotSerializer, UserSerializer)


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAdminOrReadOnly]


class SlotViewSet(viewsets.ModelViewSet):
    serializer_class = SlotSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        slots = Slot.objects.all()
        # /api/slots/?doctor=1
        doctor = self.request.query_params.get('doctor')
        if doctor:
            slots = slots.filter(doctor=doctor)
        # /api/slots/?available=true  -> only free slots from today onwards
        if self.request.query_params.get('available') == 'true':
            slots = slots.filter(appointment__isnull=True, date__gte=datetime.date.today())
        return slots


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Appointment.objects.all()
        return Appointment.objects.filter(patient=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(patient=self.request.user)
        except IntegrityError:
            # Two patients clicked Book at the same moment - the database only lets one win
            raise ValidationError({'slot': ['This time slot is already booked.']})

    def perform_update(self, serializer):
        try:
            serializer.save()
        except IntegrityError:
            raise ValidationError({'slot': ['This time slot is already booked.']})


class PatientViewSet(viewsets.ModelViewSet):
    # Staff only: view, edit, deactivate or delete patient accounts
    queryset = User.objects.filter(is_staff=False)
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAdminUser]
    http_method_names = ['get', 'put', 'patch', 'delete']


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        # Send the token back so the user is logged in straight away
        response.data['token'] = Token.objects.get(user_id=response.data['id']).key
        return response


@api_view(['GET'])
def current_user(request):
    return Response(UserSerializer(request.user).data)
