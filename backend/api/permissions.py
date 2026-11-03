from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    # Everyone can view (GET), only staff can add, edit or delete
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_staff


class IsOwnerOrAdmin(permissions.BasePermission):
    # A patient can only see and change their own appointments, staff can change all
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.patient == request.user
