# Piki Ora Medical Centre - Appointment System

ISCG7420 Web Application Development - Assignment 2, Task 2

Student: Adithyan Suji (Student ID: 1589957)

Full-stack version of the Assignment 1 clinic system: a Django REST Framework API (backend) and a React app (frontend).

- Frontend: https://pikiora-frontend.onrender.com
- Backend API: https://pikiora-clinic.onrender.com/api/

## Project structure

- `backend/` - Django project
  - `clinic` - models (Doctor, Slot, Appointment)
  - `api` - serializers, viewsets, permissions and URLs (Django REST Framework)
- `frontend/` - React app (Vite)
  - `src/components` - patient pages
  - `src/components/admin` - administrator dashboard (the built-in Django admin is not used)

## API endpoints

| Endpoint | Who can use it |
| --- | --- |
| `POST /api/register/` | Anyone - creates a patient and returns a token |
| `POST /api/auth/` | Anyone - username and password, returns a token |
| `GET /api/me/` | Logged-in user |
| `/api/doctors/` | Anyone can view, staff can add, edit and delete |
| `/api/slots/` (`?doctor=1`, `?available=true`) | Anyone can view, staff can add, edit and delete |
| `/api/appointments/` | Patients manage their own, staff manage all |
| `/api/patients/` | Staff only - view, edit and delete patient accounts |

Send the token in the header: `Authorization: Token <token>`

## Run on your computer

Backend:

```
py -m venv venv
venv\Scripts\activate
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Frontend (in a second terminal):

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and log in with the superuser to open the Admin Dashboard.

## Deploy to Render

The database is PostgreSQL hosted on Neon (free plan).

1. Create a Neon project and copy its connection string.
2. On Render: New > Blueprint > choose this repository. `render.yaml` creates the backend web service and the frontend static site.
3. Enter the Neon connection string for `DATABASE_URL` and a password for `DJANGO_SUPERUSER_PASSWORD`.

`build.sh` runs the migrations and creates the admin user on each deploy. The admin username is `admin`.

## References

- axios. (n.d.). *Getting started*. https://axios-http.com/docs/intro
- Bootstrap. (n.d.). *Bootstrap 5.3 documentation*. https://getbootstrap.com/docs/5.3/
- Bootstrap. (n.d.). *Bootstrap Icons* (Version 1.11). https://icons.getbootstrap.com/
- Django REST framework. (n.d.). *Authentication*. https://www.django-rest-framework.org/api-guide/authentication/
- Django REST framework. (n.d.). *Viewsets*. https://www.django-rest-framework.org/api-guide/viewsets/
- Django Software Foundation. (n.d.). *django-admin createsuperuser* (Version 5.2). https://docs.djangoproject.com/en/5.2/ref/django-admin/#createsuperuser
- Google Fonts. (n.d.). *Nunito*. https://fonts.google.com/specimen/Nunito
- Jazzband. (n.d.). *dj-database-url* [Computer software]. https://github.com/jazzband/dj-database-url
- Johnson, A. (n.d.). *django-cors-headers* [Computer software]. https://github.com/adamchainz/django-cors-headers
- Meta Open Source. (n.d.). *React documentation*. https://react.dev/
- Neon. (n.d.). *Connect from Django to Neon*. https://neon.com/docs/guides/django
- Remix Software. (n.d.). *React Router* (Version 6). https://reactrouter.com/6.28.0
- Render. (n.d.). *Deploy a Django app on Render*. https://render.com/docs/deploy-django
- Render. (n.d.). *Deploy a Vite app on Render*. https://render.com/docs/deploy-vite
- Vite. (n.d.). *Getting started*. https://vite.dev/guide/
- WhiteNoise. (n.d.). *Using WhiteNoise with Django*. https://whitenoise.readthedocs.io/en/stable/django.html
