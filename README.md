# Notes Management System

A full-stack **Notes Management System** built using **FastAPI**, **React (Vite)**, **PostgreSQL**, and **JWT Authentication**. The application allows users to securely register, log in, and manage their personal notes through protected REST APIs and a simple React frontend.

---

## Features

### Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected API Endpoints

### Notes Management
- Create Notes
- View Notes
- Update Notes
- Delete Notes
- User-specific Notes

### Frontend
- React (Vite)
- Register & Login Interface
- Welcome Dashboard
- Create, Edit & Delete Notes
- Logout
- Success & Error Messages

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Passlib (bcrypt)
- Pydantic

### Frontend
- React.js (Vite)
- JavaScript
- Fetch API
- CSS

### Database
- PostgreSQL

### Documentation
- Swagger UI

---

## Project Structure

```
notes-management-system/
│
├── app/
│   ├── core/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── auth.py
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── Scalability.md
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── architecture.png
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register User |
| POST | `/api/v1/auth/login` | Login User |

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/notes/` | Get All Notes |
| POST | `/api/v1/notes/` | Create Note |
| GET | `/api/v1/notes/{id}` | Get Note by ID |
| PUT | `/api/v1/notes/{id}` | Update Note |
| DELETE | `/api/v1/notes/{id}` | Delete Note |

---

## Installation

### Backend

Clone the repository

```bash
git clone https://github.com/SoundaryaMohan21/notes-management-system.git
```

Navigate to the project

```bash
cd notes-management-system
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

### Frontend

Navigate to the frontend folder

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the React application

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

## Authentication

JWT (JSON Web Token) is used to secure protected APIs.

After login, the access token is stored and sent in the Authorization header to access protected routes.

---

## Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Protected API Endpoints
- Input Validation using Pydantic
- Error Handling
- User-specific Notes Access

---

## Scalability

Future improvements include:

- Redis Caching
- Microservices Architecture
- Load Balancing
- Docker Deployment
- Logging & Monitoring
- Database Replication

See **Scalability.md** for more details.

---

## Author

**Soundarya M**

Backend Developer Assignment