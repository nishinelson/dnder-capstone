from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, DM

dm_routes = Blueprint('dm', __name__)


@dm_routes.route('')
@login_required
def getDM():
  id = current_user.id
  dm = DM.query.filter(DM.userId == id).first()
  if dm:
    return dm.to_dict()
  else:
    return {}


@dm_routes.route('/new', methods=['POST'])
@login_required
def addDM():
  id = current_user.id
  new_dm = DM()
  new_dm.campaign = request.get_json()['campaign']
  new_dm.resources = request.get_json()['resources']
  new_dm.experience = request.get_json()['experience']
  new_dm.partySize = request.get_json()['partySize']
  new_dm.groupType = request.get_json()['groupType']
  new_dm.description = request.get_json()['description']
  new_dm.userId = id
  db.session.add(new_dm)
  db.session.commit()
  return new_dm.to_dict()

@dm_routes.route('/edit', methods=['POST'])
@login_required
def editDM():
  id = current_user.id
  dm = DM.query.filter(DM.userId == id).first()
  dm.campaign = request.get_json()['campaign']
  dm.resources = request.get_json()['resources']
  dm.experience = request.get_json()['experience']
  dm.partySize = request.get_json()['partySize']
  dm.groupType = request.get_json()['groupType']
  dm.description = request.get_json()['description']
  dm.userId = id
  db.session.commit()
  return dm.to_dict()

@dm_routes.route('/delete')
@login_required
def deleteDM():
  id = current_user.id
  dm = DM.query.filter(DM.userId == id).first()
  db.session.delete(dm)
  db.session.commit()
  return {}
