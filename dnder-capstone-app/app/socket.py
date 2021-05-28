from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import request
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
  emit("chat", data, broadcast=True, to=data['room'])


@socketio.on("connect")
def handle_connect():
    print(request, "User connected ==============================")


@socketio.on('join')
def on_join(data):
    name = data['name']
    room = data['room']
    join_room(room)
    send(name + ' has entered the room.', to=room)
