from pydantic import BaseModel , EmailStr


class User_create(BaseModel):
    username: str
    email: EmailStr
    password:str
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

