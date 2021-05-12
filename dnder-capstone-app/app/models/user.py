from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  firstName = db.Column(db.String(40), nullable=False, unique=True)
  lastName = db.Column(db.String(40), nullable=False)
  email = db.Column(db.String(255), nullable=False, unique=True)
  city = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(2), nullable=False)
  bio = db.Column(db.String(2000))
  hashed_password = db.Column(db.String(255), nullable=False)
  pc = db.relationship("PC", uselist=False, back_populates="user")
  dm = db.relationship("DM", uselist=False, back_populates="user")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "email": self.email,
      "city": self.city,
      "state": self.state,
      "bio": self.bio,
    }


party = db.Table(
  "party",
  db.Column(
    "dmId",
    db.Integer,
    db.ForeignKey("DMs.id"),
    primary_key=True
  ),
  db.Column(
    "pcId",
    db.Integer,
    db.ForeignKey("PCs.id"),
    primary_key=True
  )
)


class PC(db.Model):
  __tablename__ = 'PCs'

  id = db.Column(db.Integer, primary_key=True)
  pcClass = db.Column(db.String(40), nullable=False)
  experience = db.Column(db.String(25), nullable=False)
  description = db.Column(db.String(2000))
  groupType = db.Column(db.String(25), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', back_populates='pc')
  dms = db.relationship("DM", secondary=party, back_populates="pcs")
  pcSwipe = db.relationship("Match", cascade="all,delete", back_populates='pcMatch')

  def to_dict(self):
    return {
      "id": self.id,
      "pcClass": self.pcClass,
      "experience": self.experience,
      "description": self.description,
      "groupType": self.groupType,
      "userId": self.userId,
      "user": self.user.to_dict(),
      "pcSwipe": [swipe.to_dict() for swipe in self.pcSwipe]
    }


class DM(db.Model):
  __tablename__ = 'DMs'

  id = db.Column(db.Integer, primary_key=True)
  campaign = db.Column(db.String(255), nullable=False)
  resources = db.Column(db.String(3000), nullable=False)
  experience = db.Column(db.String(25), nullable=False)
  partySize = db.Column(db.String(25), nullable=False)
  groupType = db.Column(db.String(25), nullable=False)
  description = db.Column(db.String(2000))
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', back_populates='dm')
  pcs = db.relationship("PC", secondary=party, back_populates="dms")
  dmSwipe = db.relationship("Match", cascade="all,delete", back_populates="dmMatch")

  def to_dict(self):
    return {
      "id": self.id,
      "campaign": self.campaign,
      "resources": self.resources,
      "experience": self.experience,
      "partySize": self.partySize,
      "groupType": self.groupType,
      "description": self.description,
      "userId": self.userId,
      "user": self.user.to_dict(),
      "dmSwipe": [swipe.to_dict() for swipe in self.dmSwipe]
     }


class Match(db.Model):
  __tablename__ = 'matches'
  __table_args__ = (
    db.UniqueConstraint('pcId', 'dmId', name='swipe_match'),
  )

  id = db.Column(db.Integer, primary_key=True)
  pcId = db.Column(db.Integer, db.ForeignKey('PCs.id'), nullable=False)
  dmId = db.Column(db.Integer, db.ForeignKey('DMs.id'), nullable=False)
  dmSwipeBool = db.Column(db.Boolean)
  pcSwipeBool = db.Column(db.Boolean)

  pcMatch = db.relationship('PC', back_populates='pcSwipe')
  dmMatch = db.relationship('DM', back_populates='dmSwipe')

  def to_dict(self):
    return {
      "id": self.id,
      "pcId": self.pcId,
      "dmId": self.dmId,
      "dmSwipeBool": self.dmSwipeBool,
      "pcSwipeBool": self.pcSwipeBool
    }
