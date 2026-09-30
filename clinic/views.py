import datetime

from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DeleteView, DetailView, ListView, UpdateView

from .forms import AppointmentForm
from .models import Appointment, Doctor, Slot


class HomeView(ListView):
    model = Doctor
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['free_slots'] = Slot.objects.filter(
            appointment__isnull=True, date__gte=datetime.date.today()
        ).count()
        return context


class DoctorDetailView(DetailView):
    model = Doctor
    template_name = 'doctor_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['slots'] = Slot.objects.filter(
            doctor=self.object, appointment__isnull=True, date__gte=datetime.date.today()
        )
        return context


class BookAppointmentView(LoginRequiredMixin, CreateView):
    model = Appointment
    form_class = AppointmentForm
    template_name = 'book_appointment.html'

    def get_initial(self):
        # The Book button on the doctor page sends ?slot=<id>
        return {'slot': self.request.GET.get('slot')}

    def form_valid(self, form):
        form.instance.patient = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse('booking-confirmed', args=[self.object.pk])


class BookingConfirmedView(LoginRequiredMixin, DetailView):
    template_name = 'booking_confirmed.html'

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)


class MyAppointmentsView(LoginRequiredMixin, ListView):
    template_name = 'my_appointments.html'

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)


class EditAppointmentView(LoginRequiredMixin, UpdateView):
    form_class = AppointmentForm
    template_name = 'edit_appointment.html'
    success_url = reverse_lazy('my-appointments')

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)


class CancelAppointmentView(LoginRequiredMixin, DeleteView):
    template_name = 'cancel_appointment.html'
    success_url = reverse_lazy('my-appointments')

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)
