import datetime

from django import forms

from .models import Appointment, Slot


class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ('slot', 'reason')

        widgets = {
            'slot': forms.Select(attrs={'class': 'form-control'}),
            'reason': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Reason for your visit'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Only show free slots from today onwards
        free_slots = Slot.objects.filter(appointment__isnull=True, date__gte=datetime.date.today())
        if self.instance.pk:
            # When editing, also keep the slot this appointment already has
            free_slots = free_slots | Slot.objects.filter(pk=self.instance.slot.pk)
        self.fields['slot'].queryset = free_slots
