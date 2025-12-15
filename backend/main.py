from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlmodel import Session, select
from pydantic import BaseModel  # <-- New Import
from database import create_db_and_tables, engine
from models import User
from ml_engine import find_best_mentors
from ml_engine import find_best_mentors, suggest_interests_from_text  # <--- NEW IMPORT

# --- STARTUP EVENT ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        create_db_and_tables()
        print("✅ Database Tables Created Successfully!")
    except Exception as e:
        print(f"❌ Database Connection Failed: {e}")
    yield

app = FastAPI(lifespan=lifespan)

# --- CORS (Allow React) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS (Inputs) ---
# This defines what data we need for Login
class LoginData(BaseModel):
    email: str
    password: str

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"message": "System is Ready!"}

# 1. Register (Sign Up)
@app.post("/users/")
def create_user(user_data: User):
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        session.add(user_data)
        session.commit()
        session.refresh(user_data)
        return user_data

# 2. Login (New Route)
@app.post("/login/")
def login_user(login_data: LoginData):
    with Session(engine) as session:
        # 1. Find the user with this email
        statement = select(User).where(User.email == login_data.email)
        user = session.exec(statement).first()

        # 2. Check if user exists
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # 3. Check if password matches (Simple check)
        if user.password != login_data.password:
            raise HTTPException(status_code=401, detail="Incorrect Password")

        # 4. Success! Return the Role (Elderly/Youth)
        return {
            "status": "success",
            "user_id": user.id,
            "username": user.username,
            "role": user.role
        }
    # --- ML MATCHING ROUTE ---
@app.post("/find-mentor/")
def match_mentor(user_id: int):
    with Session(engine) as session:
        # 1. Jis Elderly ne request ki hai, use dhoondo
        elderly = session.get(User, user_id)
        if not elderly:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. Saare "Youth" mentors ko Database se nikalo
        mentors = session.exec(select(User).where(User.role == "youth")).all()

        # 3. ML Engine ko bulao aur match karao
        matches = find_best_mentors(elderly, mentors)

        return {"matches": matches}
    # --- UPDATE PROFILE ROUTE ---
@app.put("/update-profile/{user_id}")
def update_user_profile(user_id: int, updated_data: User):
    with Session(engine) as session:
        # 1. User ko dhoondo
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # 2. Sirf wahi update karo jo user ne bheja hai
        user.interests = updated_data.interests
        user.language = updated_data.language
        
        # 3. Save karo
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"status": "success", "message": "Profile Updated!", "data": user}
    # --- NEW ROUTE: SMART SUGGESTION ---
class TextData(BaseModel):
    text: str

@app.post("/suggest-interests/")
def get_suggestions(data: TextData):
    suggestion = suggest_interests_from_text(data.text)
    return {"suggested": suggestion}