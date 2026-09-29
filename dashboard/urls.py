from django.urls import path

from . import views

urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),

    path('doctors/', views.DoctorListView.as_view(), name='dashboard-doctors'),
    path('doctors/add/', views.AddDoctorView.as_view(), name='add-doctor'),
    path('doctors/<int:pk>/edit/', views.UpdateDoctorView.as_view(), name='update-doctor'),
    path('doctors/<int:pk>/delete/', views.DeleteDoctorView.as_view(), name='delete-doctor'),

    path('slots/', views.SlotListView.as_view(), name='dashboard-slots'),
    path('slots/add/', views.AddSlotView.as_view(), name='add-slot'),
    path('slots/<int:pk>/edit/', views.UpdateSlotView.as_view(), name='update-slot'),
    path('slots/<int:pk>/delete/', views.DeleteSlotView.as_view(), name='delete-slot'),

    path('appointments/', views.AppointmentListView.as_view(), name='dashboard-appointments'),
    path('appointments/<int:pk>/edit/', views.UpdateAppointmentView.as_view(), name='update-appointment'),
    path('appointments/<int:pk>/cancel/', views.CancelAppointmentView.as_view(), name='dashboard-cancel-appointment'),

    path('patients/', views.PatientListView.as_view(), name='dashboard-patients'),
    path('patients/<int:pk>/edit/', views.UpdatePatientView.as_view(), name='update-patient'),
    path('patients/<int:pk>/delete/', views.DeletePatientView.as_view(), name='delete-patient'),
]
