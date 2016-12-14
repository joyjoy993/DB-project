import os
SQLALCHEMY_DATABASE_URI = 'mysql://root:19930825@localhost:3306/DBproject2'
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, '../static/img/')
SQLALCHEMY_TRACK_MODIFICATIONS = False