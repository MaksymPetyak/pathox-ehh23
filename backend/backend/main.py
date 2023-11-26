from fastapi import FastAPI
from typing import Union
from backend.routes.fetch import router as fetch_router
from backend.routes.upload import router as upload_router
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "*",
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(fetch_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
