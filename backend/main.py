from fastapi import FastAPI, Depends
from fastapi import FastAPI, Depends, HTTPException
from database import Base, engine, Session_local
import models
import crud
import schemas
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request

templates = Jinja2Templates(directory="frontend")


app = FastAPI()
from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="frontend"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = Session_local()
    try:
        yield db
    finally:
        db.close()

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )

#post------------
@app.post("/signup")
def signup(user: schemas.User_create, db: Session = Depends(get_db)):

    existing_user = crud.get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = crud.create_user(db, user)

    return {
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email
    }
## login --------
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    result = crud.login_user(db, user)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if result is False:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    return {
        "message": "Login Successful",
        "username": result.username,
        "email": result.email
    }