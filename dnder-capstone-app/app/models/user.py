from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  firstName = db.Column(db.String(40), nullable=False, unique=True)
  lastName = db.Column(db.String(40), nullable=False, unique=True)
  email = db.Column(db.String(255), nullable=False, unique=True)
  city = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(50), nullable=False)
  bio = db.Column(db.String(2000))
  hashed_password = db.Column(db.String(255), nullable=False)
  pc = db.relationship("PC", uselist=False, back_populates="user")


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
      "bio": self.satte
    }


class PC(db.Model):
  __tablename__ = 'PCs'

  id = db.Column(db.Integer, primary_key=True)
  pcClass = db.Column(db.String(40), nullable=False)
  experience = db.Column(db.String(25), nullable=False)
  description = db.Column(db.String(2000))
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship("User", back_populates="pc")


class DM(db.Model):
  __tablename__ = 'DMs'

  id = db.Column(db.Integer, primary_key=True)
  pcClass = db.Column(db.String(40), nullable=False)
  experience = db.Column(db.String(25), nullable=False)
  description = db.Column(db.String(2000))
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship("User", back_populates="pc")
