from fastapi import FastAPI
from pydantic import BaseModel
from src.router.session_auth import app as session_auth

# ! NOTA: Recuerda cambiar el interprete de python por el del entorno virtual

app = FastAPI()

app.include_router(session_auth, prefix="/auth", tags=["auth"])

@app.get('/')
async def read_root():
    return {"Message":"Corriendo la Api"}
