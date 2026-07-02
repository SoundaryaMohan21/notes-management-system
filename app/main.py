from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine

# Import models so SQLAlchemy creates the tables
from app.models.user import User
from app.models.note import Note

# Import routers
from app.routers import auth, notes

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Backend Developer Assignment",
    description="REST API with JWT Authentication and CRUD",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register routers
app.include_router(auth.router)
app.include_router(notes.router)


@app.get("/")
def home():
    return {
        "message": "Backend Developer Assignment API is running!"
    }