from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, PC, DM, User
from sqlalchemy import and_

swipe_routes = Blueprint('swipe', __name__)

@swipe_routes.route('/pc/local')
@login_required
def getLocalPCs():
  id = current_user.id
  pcList = PC.query.join(User).filter(and_(PC.userId != id, PC.groupType == 'in-person')).filter(User.city == current_user.city, User.state == current_user.state).all()
  lst = [pc.to_dict() for pc in pcList]
  print(lst, "==========================================")
  return {"swipes": lst}


@swipe_routes.route('/pc/remote')
@login_required
def getRemotePCs():
  id = current_user.id
  pcList = PC.query.filter(and_(PC.userId != id, PC.groupType == 'remote')).all()
  lst = [pc.to_dict() for pc in pcList]
  return {"swipes": lst}


@swipe_routes.route('/dm/local')
@login_required
def getLocalDMs():
  id = current_user.id
  dmList = DM.query.join(User).filter(and_(DM.userId != id, DM.groupType == 'in-person')).filter(User.city == current_user.city, User.state == current_user.state).all()
  lst = [dm.to_dict() for dm in dmList]
  return {"swipes": lst}


@swipe_routes.route('/dm/remote')
@login_required
def getRemoteDMs():
  id = current_user.id
  dmList = DM.query.filter(and_(DM.userId != id, DM.groupType == 'remote')).all()
  lst = [dm.to_dict() for dm in dmList]
  return {"swipes": lst}
