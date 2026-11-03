from django.contrib.auth.models import User
from django.db import models


class Doctor(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialisation = models.CharField(max_length=100)

    def __str__(self):
        return 'Dr ' + self.first_name + ' ' + self.last_name


class Slot(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        ordering = ['date', 'start_time']

    def __str__(self):
        return str(self.doctor) + ' - ' + self.date.strftime('%d %b %Y') + ' ' + self.start_time.strftime('%I:%M %p')


class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    # OneToOneField: each slot can only have one appointment (no double booking)
    slot = models.OneToOneField(Slot, on_delete=models.CASCADE)
    reason = models.CharField(max_length=255)

    def __str__(self):
        return self.patient.username + ' - ' + str(self.slot)
