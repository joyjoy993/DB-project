from app import app
from flask import request, redirect, url_for
import flask.ext.login as flask_login
from flask_restful import abort
from models import User

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(uname):
    return User.query.filter_by(uname = uname).first()

@login_manager.unauthorized_handler
def unauthorized():
    if request.path == '/logout/':
        return redirect(url_for("recipes"))
    if request.path == '/profile/':
        return redirect(url_for("recipes"))