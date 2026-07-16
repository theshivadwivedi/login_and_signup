from sqlalchemy.orm import Session
import models 
import schemas
from utils import hash_password , verify_password


def create_user(db: Session, user: schemas.User_create):
    hashed_password = hash_password(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def login_user(db: Session, user: schemas.UserLogin):

    db_user = get_user_by_email(db, user.email)

    if not db_user:
        return None

    if not verify_password(user.password, db_user.password):
        return False

    return db_user