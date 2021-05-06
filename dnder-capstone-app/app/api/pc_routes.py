from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, PC

pc_routes = Blueprint('pc', __name__)


@pc_routes.route('')
@login_required
def getPC():
  return 'PC'


@pc_routes.route('/new', methods=['POST'])
@login_required
def addPC():
  id = current_user.id
  new_pc = PC()
  new_pc.pcClass = request.get_json()['pcClass']
  new_pc.experience = request.get_json()['experience']
  new_pc.description = request.get_json()['description']
  new_pc.userId = id
  db.session.add(new_pc)
  db.session.commit()
  print(new_pc.to_dict(), "=====================================")
  return new_pc.to_dict()
