from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, PC, DM, Match

match_routes = Blueprint('match', __name__)

@match_routes.route('', methods=['POST'])
@login_required
def setSwipe():

  if request.get_json()['dmBool']:
    matchExists = Match.query.filter(Match.dmId == request.get_json()['dmId'], Match.pcId == request.get_json()['pcId']).first()
    if matchExists:
      matchExists.dmSwipeBool = request.get_json()['dmBool']
      db.session.commit()
      return matchExists.to_dict()
    else:
      new_match = Match()
      new_match.dmId = request.get_json()['dmId']
      new_match.pcId = request.get_json()['pcId']
      new_match.dmSwipeBool = request.get_json()['dmBool']
      new_match.pcSwipeBool = request.get_json()['pcBool']
      db.session.add(new_match)
      db.session.commit()
      return new_match.to_dict()

  if request.get_json()['pcBool']:
    matchExists = Match.query.filter(Match.dmId == request.get_json()['dmId'], Match.pcId == request.get_json()['pcId']).first()
    if matchExists:
      matchExists.pcSwipeBool = request.get_json()['pcBool']
      db.session.commit()
      return matchExists.to_dict()
    else:
      new_match = Match()
      new_match.dmId = request.get_json()['dmId']
      new_match.pcId = request.get_json()['pcId']
      new_match.dmSwipeBool = request.get_json()['dmBool']
      new_match.pcSwipeBool = request.get_json()['pcBool']
      db.session.add(new_match)
      db.session.commit()
      return new_match.to_dict()


@match_routes.route('/dmMatches')
@login_required
def setMatchesDM():
  matchesDM = PC.query.join(Match).filter(Match.dmId == current_user.dm.id).filter(Match.dmSwipeBool == True, Match.pcSwipeBool == True).all()
  dms = [card.to_dict() for card in matchesDM]
  return {'DMmatches': dms}


@match_routes.route('/pcMatches')
@login_required
def setMatchesPC():
  matchesPC = DM.query.join(Match).filter(Match.pcId == current_user.pc.id).filter(Match.dmSwipeBool == True, Match.pcSwipeBool == True).all()
  pcs = [card.to_dict() for card in matchesPC]
  return {'PCmatches': pcs}

# checkout route and make sure all logic is appropriate
