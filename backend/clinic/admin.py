from django.contrib import admin

from .models import Appointment, Doctor, Slot

admin.site.register(Doctor)
admin.site.register(Slot)
admin.site.register(Appointment)
