from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="../static/templates", static_folder="../static")
app.config.from_object('config')
app.secret_key = 's3cr3t'

db = SQLAlchemy(app)
