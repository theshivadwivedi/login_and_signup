from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql://postgres:Shiva333666@localhost:5432/Login-db"


engine = create_engine(DATABASE_URL)

Session_local = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind= engine
)

Base = declarative_base()

