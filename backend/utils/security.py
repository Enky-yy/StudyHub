from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = 'your_key'
ALGORITHM = 'HS256'

pwd_context = CryptContext(
    schemes=['bcrypt'],
    deprecated='auto'
)

def hash_password(plain_password):
    return pwd_context.hash(plain_password)

def verify_password(plain_password, hash_password):
    return pwd_context.verify(plain_password,hash_password)

def create_access_token(data):
    to_encode = data.copy()

    expire = datetime.utcnow()+ timedelta(7)

    to_encode.update({
        'exp':expire
    })

    return jwt.encode(
        to_encode,SECRET_KEY,algorithm=ALGORITHM
    )