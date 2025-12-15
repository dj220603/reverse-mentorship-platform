import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from models import User

# 1. DATABASE_URL Render ke Environment Variable se lo
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Agar Render par URL nahi mila (matlab aap shayad local chala rahe ho)
if not SQLALCHEMY_DATABASE_URL:
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost/reverse_mentorship"

# 3. Render Fix: Render URL 'postgres://' deta hai, lekin SQLAlchemy ko 'postgresql://' chahiye
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 4. Engine Create karo
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 5. Session banao
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 6. Base Model
Base = declarative_base()

# 7. DB Dependency (Har API request ke liye connection dena)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------------------------------------

# ---------------------------------------------------------
def create_db_and_tables():
    Base.metadata.create_all(bind=engine)