from sqlalchemy.orm import Mapped , mapped_column
from database import base
from sqlalchemy import ForeignKey
from datetime import datetime

class StudyGroup(base):
    __tablename__ = 'study_groups'


    id : Mapped[int] = mapped_column(primary_key=True, index=True)
    title : Mapped[str] = mapped_column(nullable=False)
    description : Mapped[str] = mapped_column(nullable=False)
    topic : Mapped[str] = mapped_column(nullable=False)
    meeting_location : Mapped[str] = mapped_column(nullable=False)
    creator_id : Mapped[int] = mapped_column(ForeignKey("users.id"),nullable=False )
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    total_member: Mapped[int]= mapped_column(default=1)
    latitude: Mapped[float]= mapped_column(nullable=True)
    longitude: Mapped[float]= mapped_column(nullable=True)



class Membership(base):
    __tablename__ = 'Memberships'


    id : Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"),nullable=False)
    group_id: Mapped[int] = mapped_column(ForeignKey("study_groups.id"),nullable=False)
    joined_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

