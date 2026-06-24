from fastapi import APIRouter , FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.groups import router as study_routes

from database import base  ,  engine

base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router)
app.include_router(study_routes)

@app.get('/')
def root():
    return{
        'message':'App running'
    }