from django.urls import path

from .views import (BookAppointmentView, BookingConfirmedView, CancelAppointmentView, DoctorDetailView,
                    EditAppointmentView, HomeView, MyAppointmentsView)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('doctor/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('book/', BookAppointmentView.as_view(), name='book-appointment'),
    path('booked/<int:pk>/', BookingConfirmedView.as_view(), name='booking-confirmed'),
    path('my-appointments/', MyAppointmentsView.as_view(), name='my-appointments'),
    path('appointment/<int:pk>/edit/', EditAppointmentView.as_view(), name='edit-appointment'),
    path('appointment/<int:pk>/cancel/', CancelAppointmentView.as_view(), name='cancel-appointment'),
]
