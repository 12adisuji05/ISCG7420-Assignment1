from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views.generic import CreateView, DeleteView, ListView, TemplateView, UpdateView

from clinic.forms import AppointmentForm
from clinic.models import Appointment, Doctor, Slot

from .forms import DoctorForm, PatientForm, SlotForm


class StaffRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    # Only staff users (e.g. the superuser) can open the dashboard
    def test_func(self):
        return self.request.user.is_staff


class DashboardView(StaffRequiredMixin, TemplateView):
    template_name = 'dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['doctor_count'] = Doctor.objects.count()
        context['slot_count'] = Slot.objects.count()
        context['appointment_count'] = Appointment.objects.count()
        context['patient_count'] = User.objects.filter(is_staff=False).count()
        return context


# Doctors
class DoctorListView(StaffRequiredMixin, ListView):
    model = Doctor
    template_name = 'doctor_list.html'


class AddDoctorView(StaffRequiredMixin, CreateView):
    model = Doctor
    form_class = DoctorForm
    template_name = 'dashboard_form.html'
    success_url = reverse_lazy('dashboard-doctors')


class UpdateDoctorView(StaffRequiredMixin, UpdateView):
    model = Doctor
    form_class = DoctorForm
    template_name = 'dashboard_form.html'
    success_url = reverse_lazy('dashboard-doctors')


class DeleteDoctorView(StaffRequiredMixin, DeleteView):
    model = Doctor
    template_name = 'dashboard_delete.html'
    success_url = reverse_lazy('dashboard-doctors')


# Appointment slots
class SlotListView(StaffRequiredMixin, ListView):
    model = Slot
    template_name = 'slot_list.html'


class AddSlotView(StaffRequiredMixin, CreateView):
    model = Slot
    form_class = SlotForm
    template_name = 'dashboard_form.html'
    success_url = reverse_lazy('dashboard-slots')


class UpdateSlotView(StaffRequiredMixin, UpdateView):
    model = Slot
    form_class = SlotForm
    template_name = 'dashboard_form.html'
    success_url = reverse_lazy('dashboard-slots')


class DeleteSlotView(StaffRequiredMixin, DeleteView):
    model = Slot
    template_name = 'dashboard_delete.html'
    success_url = reverse_lazy('dashboard-slots')


# Appointments
class AppointmentListView(StaffRequiredMixin, ListView):
    model = Appointment
    template_name = 'appointment_list.html'


class UpdateAppointmentView(StaffRequiredMixin, UpdateView):
    model = Appointment
    form_class = AppointmentForm
    template_name = 'dashboard_form.html'
    success_url = reverse_lazy('dashboard-appointments')


class CancelAppointmentView(StaffRequiredMixin, DeleteView):
    model = Appointment
    template_name = 'dashboard_delete.html'
    success_url = reverse_lazy('dashboard-appointments')


# Patient accounts
class PatientListView(StaffRequiredMixin, ListView):
    template_name = 'patient_list.html'

    def get_queryset(self):
        return User.objects.filter(is_staff=False)


class UpdatePatientView(StaffRequiredMixin, UpdateView):
    form_class = PatientForm
    template_name = 'dashboard_form.html'
    success_url = reverse_lazy('dashboard-patients')

    def get_queryset(self):
        return User.objects.filter(is_staff=False)


class DeletePatientView(StaffRequiredMixin, DeleteView):
    template_name = 'dashboard_delete.html'
    success_url = reverse_lazy('dashboard-patients')

    def get_queryset(self):
        return User.objects.filter(is_staff=False)
