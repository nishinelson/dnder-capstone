from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, PC

pc_routes = Blueprint('pc', __name__)


@pc_routes.route('')
@login_required
def getPC():
  id = current_user.id
  pc = PC.query.filter(PC.userId == id).first()
  if pc:
    return pc.to_dict()
  else:
    return {}


@pc_routes.route('/new', methods=['POST'])
@login_required
def addPC():
  id = current_user.id
  new_pc = PC()
  new_pc.pcClass = request.get_json()['pcClass']
  new_pc.experience = request.get_json()['experience']
  new_pc.description = request.get_json()['description']
  new_pc.groupType = request.get_json()['groupType']
  new_pc.userId = id
  db.session.add(new_pc)
  db.session.commit()
  return new_pc.to_dict()

@pc_routes.route('/edit', methods=['POST'])
@login_required
def editPC():
  id = current_user.id
  pc = PC.query.filter(PC.userId == id).first()
  pc.pcClass = request.get_json()['pcClass']
  pc.experience = request.get_json()['experience']
  pc.description = request.get_json()['description']
  pc.groupType = request.get_json()['groupType']
  pc.userId = id
  db.session.commit()
  return pc.to_dict()

@pc_routes.route('/delete')
@login_required
def deletePC():
  id = current_user.id
  pc = PC.query.filter(PC.userId == id).first()
  db.session.delete(pc)
  db.session.commit()
  return {}
