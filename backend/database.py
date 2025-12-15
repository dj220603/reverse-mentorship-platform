from sqlmodel import SQLModel, create_engine

# Note: Hum 'localhost' use kar rahe hain kyunki Python Docker ke bahar run ho raha hai
DATABASE_URL = "postgresql://myuser:mypassword@localhost:5432/mentorship_platform"

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    # Ye function database me tables automatically bana dega
    SQLModel.metadata.create_all(engine)