from sqlalchemy.orm import Mapped , mapped_column
from database import base

class User(base):
    __tablename__= "users"

    id : Mapped[int] = mapped_column(primary_key=True, index=True)

    name : Mapped[str] = mapped_column(nullable=False)

    email : Mapped[str] = mapped_column(nullable=False, unique=True, index=True)

    password :Mapped[str] = mapped_column(nullable=False)

    bio : Mapped[str] = mapped_column(nullable=True)

    branch : Mapped[str] = mapped_column(nullable=False)

    year : Mapped[int] = mapped_column(nullable=False)

    skills : Mapped[str] = mapped_column(nullable=False)

    

    