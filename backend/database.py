from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

DATABASE_URL ='sqlite:///./studyhub.db'

engine = create_engine(DATABASE_URL,
                       connect_args={'check_same_thread':False}
                       )

sessionLocal = sessionmaker(bind=engine,
                       autoflush=False,
                       autocommit=False)

base = declarative_base()

def get_db():
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()
