from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from models.groups import StudyGroup , Membership

from utils.auth import get_current_user
from utils.geocode import geocode_address

from schemas.groups import groups , groupDetails

router = APIRouter(
    prefix="/groups",
    tags=["Groups"]
)

@router.post('/', response_model=groupDetails)
def create_groups(
    group_data : groups,
    db : Session=Depends(get_db),
    current_user :User = Depends(get_current_user)
):
    lat , long = geocode_address(group_data.meeting_location)
    print(group_data.meeting_location)
    print(lat)
    print(long)
    group_obj = StudyGroup(**group_data.model_dump() , lat= lat, long= long , creator_id = current_user.id)

    db.add(group_obj)
    db.commit()
    db.refresh(group_obj)

    membership = Membership(
    group_id=group_obj.id,
    user_id=current_user.id
    )

    db.add(membership)

    group_obj.total_member = 1

    db.commit()

    return group_obj


@router.get('/', response_model=list[groupDetails])
def view_groups(db:Session=Depends(get_db)):

    data = db.query(StudyGroup)
    return data.all()

@router.get("/my", response_model=list[groupDetails])
def my_groups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(StudyGroup)
        .filter(StudyGroup.creator_id == current_user.id)
        .all()
    )

@router.get('/{group_id}', response_model=groupDetails)
def get_groups(group_id:int,db:Session= Depends(get_db)):

    data = db.query(StudyGroup).filter(StudyGroup.id == group_id).first()

    if not data:
        raise HTTPException(
            status_code=404,
            detail='group not exists'
        )
    
    return data

@router.post('/{group_idd}/join')
def join_group(group_idd:int, db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):

    data = db.query(StudyGroup).filter(StudyGroup.id == group_idd).first()

    if not data:
        raise HTTPException(
            status_code=404,
            detail='group not exists'
        )
    
    if data.creator_id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="You cannot join your own group"
        )
    
    existing = db.query(Membership).filter(Membership.group_id == group_idd,Membership.user_id == current_user.id).first()
    
    if existing:
        raise HTTPException(
            status_code=400,
            detail='you cannot join your own group'
        )

    membership_obj = Membership(group_id = group_idd, user_id = current_user.id)
    db.add(membership_obj)
    data.total_member +=1
    db.commit()
    return{
        'message':'successfully joined'
    }

@router.post('/{group_idd}/leave')
def leave_group(group_idd:int, db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    data = db.query(StudyGroup).filter(StudyGroup.id == group_idd).first()

    if not data:
        raise HTTPException(
            status_code=404,
            detail='group not exists'
        )
    
    if data.creator_id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="You cannot leave your own group"
        )
    
    membership_obj = db.query(Membership).filter(Membership.user_id == current_user.id, Membership.group_id == group_idd).first()

    if not membership_obj:
        raise HTTPException(
            status_code=404,
            detail='membership not found'
        )
    
    db.delete(membership_obj)
    data.total_member -=1
    db.commit()
    return{
        'message':'successfully leaved'
    }

@router.put('/{group_idd}', response_model=groupDetails)
def  update_details(group_idd:int ,group_data:groups, db:Session= Depends(get_db), current_user :User= Depends(get_current_user)):
    data = db.query(StudyGroup).filter(StudyGroup.id == group_idd).first()

    if not data:
        raise HTTPException(
            status_code=404,
            detail='group not exists'
        )
    
    if(data.creator_id!=current_user.id):
        raise HTTPException(
            status_code=403,
            detail='you are not owner'
        )
    
    for key , value in group_data.model_dump().items():
        setattr(data,key, value)
    lat , long =geocode_address(group_data.meeting_location)
    data.lat = lat
    data.long = long
    db.commit()
    db.refresh(data)

    return data


@router.delete('/{group_idd}')
def delete_group(group_idd:int, db : Session=Depends(get_db), current_user : User=Depends(get_current_user)):

    data = db.query(StudyGroup).filter(StudyGroup.id== group_idd).first()

    if not data:
        raise HTTPException(
            status_code=404,
            detail='group not exists'
        )
    
    if(data.creator_id!=current_user.id):
        raise HTTPException(
            status_code=403,
            detail='you are not owner'
        )
    
    membership_data = db.query(Membership).filter(Membership.group_id==group_idd).delete()
    db.delete(data)
    db.commit()

    return{
        'message': 'group deleted Successfully'
    }



