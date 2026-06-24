from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from models.user import User

SECRET_KEY = 'your_key'
ALGORITHM = 'HS256'

oAuthScheme = OAuth2PasswordBearer(
    tokenUrl='/auth/login'
)

def get_current_user(
        token: str= Depends(oAuthScheme),
        db : Session = Depends(get_db)):

    try: 
        load = jwt.decode(token, SECRET_KEY,algorithms=ALGORITHM)

        user_id = load.get('sub')

        user = db.query(User).filter(User.id==int(user_id)).first()

        if not user:
            raise HTTPException(
                status_code=401,
                detail='user not found'
            )
        
        return user


    except JWTError:
        raise HTTPException(
            status_code=401,
            detail='invalid token'
        )
