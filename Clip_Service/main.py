from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import endpoints as endpoints

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router)

@app.get('/')
def main():
    return {"message": "Image_Visulaizer MicroService"}