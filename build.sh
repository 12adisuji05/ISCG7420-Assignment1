#!/usr/bin/env bash
# Render runs this on every deploy - based on https://render.com/docs/deploy-django
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Creates the admin login from DJANGO_SUPERUSER_USERNAME / _PASSWORD / _EMAIL
# (skipped if it already exists)
python manage.py createsuperuser --noinput || true
