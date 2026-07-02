# Notes Management System

A full-stack Notes Management System built using FastAPI, PostgreSQL, JWT Authentication, and React.

---

## Features

### Authentication

- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Authentication
- Protected APIs

### Notes

- Create Note
- View Notes
- Update Note
- Delete Note

### Frontend

- React.js
- User Registration
- User Login
- Welcome User
- Logout
- Create/Edit/Delete Notes
- Success & Error Messages

---

## Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT
- Passlib (bcrypt)

### Frontend

- React.js
- Fetch API

---

## Project Structure

```
app/
│
├── auth.py
├── core/
├── models/
├── routers/
├── schemas/
├── main.py

frontend/
│
├── src/
│
└── App.jsx
```

---

## API Endpoints

### Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

### Notes

GET /api/v1/notes/

POST /api/v1/notes/

GET /api/v1/notes/{id}

PUT /api/v1/notes/{id}

DELETE /api/v1/notes/{id}

---

## Installation

### Backend

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Documentation

Swagger

```
http://127.0.0.1:8000/docs
```

---

## Database

PostgreSQL

---

## Author

Soundarya M