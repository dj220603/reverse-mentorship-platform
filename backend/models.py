from typing import Optional
from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str
    password: str
    role: str
    
    # Ye lines bohot zaroori hain, inke bina data NULL rahega
    language: Optional[str] = None
    interests: Optional[str] = None