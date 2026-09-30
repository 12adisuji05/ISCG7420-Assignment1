# Piki Ora Medical Centre - Appointment System

ISCG7420 Web Application Development - Assignment 1, Task 2

Student: Adithyan Suji (Student ID: 1589957)

Live website: https://pikiora-clinic.onrender.com

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

The database is PostgreSQL hosted on Neon (free plan).

1. Create a Neon project and copy its connection string.
2. On Render: New > Blueprint > choose this repository.
3. Enter the Neon connection string for `DATABASE_URL` and a password for `DJANGO_SUPERUSER_PASSWORD`.

`build.sh` runs the migrations and creates the admin user on each deploy.
The admin username is `admin`.

## References

- Bootstrap. (n.d.). *Bootstrap 5.3 documentation*. https://getbootstrap.com/docs/5.3/
- Bootstrap. (n.d.). *Bootstrap Icons* (Version 1.11). https://icons.getbootstrap.com/
- Django Software Foundation. (n.d.). *Using the Django authentication system: LoginRequiredMixin and UserPassesTestMixin* (Version 5.2). https://docs.djangoproject.com/en/5.2/topics/auth/default/
- Django Software Foundation. (n.d.). *django-admin createsuperuser* (Version 5.2). https://docs.djangoproject.com/en/5.2/ref/django-admin/#createsuperuser
- Google Fonts. (n.d.). *Nunito*. https://fonts.google.com/specimen/Nunito
- Jazzband. (n.d.). *dj-database-url* [Computer software]. https://github.com/jazzband/dj-database-url
- Neon. (n.d.). *Connect from Django to Neon*. https://neon.com/docs/guides/django
- Render. (n.d.). *Deploy a Django app on Render*. https://render.com/docs/deploy-django
- WhiteNoise. (n.d.). *Using WhiteNoise with Django*. https://whitenoise.readthedocs.io/en/stable/django.html
