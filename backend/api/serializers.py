from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from clinic.models import Appointment, Doctor, Slot


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'first_name', 'last_name', 'specialisation']


class SlotSerializer(serializers.ModelSerializer):
    doctor_name = serializers.StringRelatedField(source='doctor', read_only=True)
    is_booked = serializers.SerializerMethodField()

    class Meta:
        model = Slot
        fields = ['id', 'doctor', 'doctor_name', 'date', 'start_time', 'end_time', 'is_booked']

    def get_is_booked(self, obj):
        return hasattr(obj, 'appointment')

    def validate(self, data):
        start_time = data.get('start_time', getattr(self.instance, 'start_time', None))
        end_time = data.get('end_time', getattr(self.instance, 'end_time', None))
        if start_time and end_time and end_time <= start_time:
            raise serializers.ValidationError('End time must be after start time.')
        return data


class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.StringRelatedField(read_only=True)
    slot_detail = SlotSerializer(source='slot', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'slot', 'slot_detail', 'reason']
        # The OneToOneField on slot stops double booking in the database.
        # validate_slot below checks it first so a clear message is shown.
        extra_kwargs = {'slot': {'validators': []}}

    def validate_slot(self, slot):
        booked = Appointment.objects.filter(slot=slot)
        if self.instance:
            booked = booked.exclude(pk=self.instance.pk)
        if booked.exists():
            raise serializers.ValidationError('This time slot is already booked.')
        return slot


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
        }

    def create(self, validated_data):
        # create_user hashes the password
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_active']
        read_only_fields = ['username']
