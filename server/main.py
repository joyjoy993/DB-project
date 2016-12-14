from api import *
from flask import render_template, request, redirect, url_for
from flask_login import login_required, login_user, logout_user, current_user, LoginManager
from models import *
import json
import os
import uuid

@app.route('/recipes/')
def recipes():
    return render_template('index.html')

@app.route('/search/<keyword>')
def search(keyword=None):
    return render_template('search.html')

@app.route('/recipes/<id>')
def recipe(id=None):
    return render_template('index.html')

@app.route('/events/<id>')
def events(id=None):
    return render_template('events.html')

@app.route('/login/', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("recipes"))
    else:
        return render_template('login.html')

@app.route('/logout/')
@login_required
def logout():
    logout_user()
    return redirect(url_for("recipes"))

@app.route('/profile/')
@login_required
def profile():
    return render_template('profile.html')

@app.route('/upload/', methods=['GET', 'POST'])
@login_required
def upload():
    if request.method == 'POST':
        try:
            file = request.files['file']
            extension = os.path.splitext(file.filename)[1]
            f_name = str(uuid.uuid4()) + extension
            file.save(app.config['UPLOAD_FOLDER'] + f_name)
            return json.dumps({'filename':f_name})
        except Exception as e:
            print e


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5566, debug=True, threaded=True)
