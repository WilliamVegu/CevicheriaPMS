from datetime import datetime, timedelta
from typing import Optional
from jose import jwt 
from passlib.context import CryptContext


#luego borrar xq es secreto
SECRET_KEY = "tu_clave_secreta_super_dificil_f38d8s..." 
ALGORITHM = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES = 60 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#verificar contra
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

#TOKENS
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Recibe los datos del usuario (ej: {"sub": "juan_mesero", "role": "mesero"})
    y devuelve un string largo encriptado.
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt