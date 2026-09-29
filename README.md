# Piki Ora Medical Centre - Appointment System

ISCG7420 Web Application Development - Assignment 1, Task 2

Student: Adithyan Suji (Student ID: 1589957)

## Apps

- `clinic` - models (Doctor, Slot, Appointment) and the patient pages
- `members` - register, login and logout
- `dashboard` - custom admin dashboard (the built-in Django admin is not used)

## Run on your computer

```
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Log in with the superuser to open the Admin Dashboard.

## Deploy to Render

New > Blueprint > choose this repository. Enter a password for `DJANGO_SUPERUSER_PASSWORD`.
The admin username is `admin`.

## References

- Bootstrap. (n.d.). *Bootstrap 5.3 documentation*. https://getbootstrap.com/docs/5.3/
- Django Software Foundation. (n.d.). *Using the Django authentication system: LoginRequiredMixin and UserPassesTestMixin* (Version 5.2). https://docs.djangoproject.com/en/5.2/topics/auth/default/
- Django Software Foundation. (n.d.). *django-admin createsuperuser* (Version 5.2). https://docs.djangoproject.com/en/5.2/ref/django-admin/#createsuperuser
- Jazzband. (n.d.). *dj-database-url* [Computer software]. https://github.com/jazzband/dj-database-url
- Render. (n.d.). *Deploy a Django app on Render*. https://render.com/docs/deploy-django
- WhiteNoise. (n.d.). *Using WhiteNoise with Django*. https://whitenoise.readthedocs.io/en/stable/django.html
