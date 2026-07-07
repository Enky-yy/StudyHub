from pydantic import BaseModel, EmailStr 
from enum import Enum

class Branch(str,Enum):
    MIN = 'MIN'
    CSE='CSE'
    CIVIL="CIVIL"
    META="META"  


class UserCreate(BaseModel):
    name:str
    email : EmailStr
    password: str
    bio:str
    branch : Branch
    year:int
    skills:str
    class config:
        from_attributes=True

class UserLogin(BaseModel):
    email:EmailStr
    password: str

class UserDetails(UserCreate):

    id:int
    class config:
        from_attributes=True