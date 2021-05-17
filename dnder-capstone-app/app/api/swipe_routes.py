from flask import Blueprint, request
from flask.globals import session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, PC, DM, User, Match
from sqlalchemy import and_

swipe_routes = Blueprint('swipe', __name__)

@swipe_routes.route('/pc/local')
@login_required
def getLocalPCs():
  id = current_user.id
  swipeExist = PC.query.join(User).join(Match).filter(and_(PC.userId != id, PC.groupType == 'in-person')).filter(User.city == current_user.city, User.state == current_user.state).filter(Match.dmId == current_user.dm.id, Match.dmSwipeBool == True).all()
  pcList = PC.query.join(User).filter(and_(PC.userId != id, PC.groupType == 'in-person')).filter(User.city == current_user.city, User.state == current_user.state).all()
  pcIdDict = {card.id: card for card in pcList}
  swipeIdDict = {card.id: card for card in swipeExist}
  filtCards = [val.to_dict() for val in pcIdDict.values() if val.id not in swipeIdDict.keys()]
  # lst = [pc.to_dict() for pc in pcList]
  return {"swipes": filtCards}


@swipe_routes.route('/pc/remote')
@login_required
def getRemotePCs():
  id = current_user.id
  swipeExist = PC.query.join(Match).filter(and_(PC.userId != id, PC.groupType == 'remote')).filter(Match.dmId == current_user.dm.id, Match.dmSwipeBool == True).all()
  pcList = PC.query.filter(and_(PC.userId != id, PC.groupType == 'remote')).all()
  pcIdDict = {card.id: card for card in pcList}
  swipeIdDict = {card.id: card for card in swipeExist}
  filtCards = [val.to_dict() for val in pcIdDict.values() if val.id not in swipeIdDict.keys()]
  return {"swipes": filtCards}


@swipe_routes.route('/dm/local')
@login_required
def getLocalDMs():
  id = current_user.id
  swipeExist = DM.query.join(User).join(Match).filter(and_(DM.userId != id, DM.groupType == 'in-person')).filter(User.city == current_user.city, User.state == current_user.state).filter(Match.pcId == current_user.pc.id, Match.pcSwipeBool == True).all()
  dmList = DM.query.join(User).filter(and_(DM.userId != id, DM.groupType == 'in-person')).filter(User.city == current_user.city, User.state == current_user.state).all()
  dmIdDict = {card.id: card for card in dmList}
  swipeIdDict = {card.id: card for card in swipeExist}
  filtCards = [val.to_dict() for val in dmIdDict.values() if val.id not in swipeIdDict.keys()]
  return {"swipes": filtCards}


@swipe_routes.route('/dm/remote')
@login_required
def getRemoteDMs():
  id = current_user.id
  swipeExist = DM.query.join(Match).filter(and_(DM.userId != id, DM.groupType == 'remote')).filter(Match.pcId == current_user.pc.id, Match.pcSwipeBool == True).all()
  dmList = DM.query.filter(and_(DM.userId != id, DM.groupType == 'remote')).all()
  dmIdDict = {card.id: card for card in dmList}
  swipeIdDict = {card.id: card for card in swipeExist}
  filtCards = [val.to_dict() for val in dmIdDict.values() if val.id not in swipeIdDict.keys()]
  return {"swipes": filtCards}
