# Eunice De Campi — Backend (Django + DRF)

The Django REST API and CMS data layer for the Eunice De Campi site. The React
frontend in the repo root consumes this API.

## Stack
- Django 5.2 + Django REST Framework
- SQLite (single-file database — back up by copying `db.sqlite3`)
- Session auth · local media uploads

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows  (use: source .venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
copy .env.example .env          # then set a real SECRET_KEY
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The API runs at `http://localhost:8000/`.

- Health check: `http://localhost:8000/api/health/`
- Django admin: `http://localhost:8000/admin/`

## Layout
- `config/` — project settings, root URLs
- `api/` — the content app: models, serializers, views, API routes
