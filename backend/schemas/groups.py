from pydantic import BaseModel
from datetime import datetime

class groups(BaseModel):

    title :str
    description : str
    topic : str
    meeting_location : str


class groupDetails(groups):

    id:int
    total_member : int
    lat: float | None= None
    long:float | None=None
    creator_id : int
    created_at: datetime

    class config:
        from_attributes:True