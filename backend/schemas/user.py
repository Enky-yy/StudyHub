from pydantic import BaseModel, EmailStr 
from typing import Literal

class UserCreate(BaseModel):
    name:str
    email : EmailStr
    password: str
    bio:str
    branch : Literal['CSE','MIN', 'META', 'CIVIL']
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