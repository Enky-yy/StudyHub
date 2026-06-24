from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from database import get_db
from models.user import User

from schemas.user import (
    UserCreate,
    UserLogin
)

from utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=['authentication']
)

@router.post('/register')
def register( user: UserCreate, db : Session=Depends(get_db)):

    existing_user = db.query(User).filter(user.email == User.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail='email already exists'
        )
    
    new_user = User(name=user.name, email=user.email, password = hash_password(user.password),bio = user.bio , branch = user.branch, year = user.year, skills = user.skills  )

    db.add(new_user)
    db.commit()
    
    return {
        'message': 'user registered'
    }


@router.post('/login')
def login(user:OAuth2PasswordRequestForm=Depends(), db:Session = Depends(get_db)):

    data = db.query(User).filter(user.username==User.email).first()

    if not data:
        raise HTTPException(
            status_code=401,
            detail='user not found'
        )
    
    unhashed_pass = verify_password(user.password, data.password)

    if not unhashed_pass:
        raise HTTPException(status_code=401, detail='invaild credentials')
    
    token = create_access_token({'sub': str(data.id)})

    return{
        'access_token': token,
        'token_type': 'bearer'
    }
    

