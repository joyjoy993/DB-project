from app import db
from flask.ext.login import UserMixin

class Event(db.Model):
    __tablename__ = 'Event'
    eid = db.Column(db.Integer, primary_key=True)
    ename = db.Column(db.String(256), nullable=False)
    edescription = db.Column(db.String(256), nullable=True, default=None)
    
    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Recipe(db.Model):
    __tablename__ = 'Recipe'
    rid = db.Column(db.Integer, primary_key=True)
    rtitle = db.Column(db.String(256), nullable=False)
    numofserving = db.Column(db.Integer, nullable=False, default=1)
    description = db.Column(db.String(256), nullable=True, default=None)
    uname = db.Column(db.String(256), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class User(db.Model, UserMixin):
    __tablename__ = 'User'
    uname = db.Column(db.String(256), primary_key=True)
    password = db.Column(db.String(256), nullable=False)
    uprofile = db.Column(db.String(256), nullable=True)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

    def check_password(self, password):
        return self.password == password

    def get_id(self):
        return unicode(self.uname)

    def is_authenticated(self):
        return True

    def is_active(self):   
        return True           

    def is_anonymous(self):
        return False 


class Review(db.Model):
    __tablename__ = 'Review'
    revid = db.Column(db.Integer, primary_key=True)
    revtitle = db.Column(db.String(256), nullable=False)
    revtext = db.Column(db.Text(), nullable=False)
    rate = db.Column(db.Integer, primary_key=True)
    uname = db.Column(db.String(256), db.ForeignKey('User.uname'), nullable=False)
    rid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), nullable=False)
    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Ingredient(db.Model):
    __tablename__ = 'Ingredient'
    ingid = db.Column(db.Integer, primary_key=True)
    ingname = db.Column(db.String(256), nullable=False)
    unitid = db.Column(db.Integer, db.ForeignKey('Unit.unitid'), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Tag(db.Model):
    __tablename__ = 'Tag'
    tid = db.Column(db.Integer, primary_key=True)
    tname = db.Column(db.String(256), nullable=False)

class Unit(db.Model):
    __tablename__ = 'Unit'
    unitid = db.Column(db.Integer, primary_key=True)
    unitname = db.Column(db.String(256))
    unittype = db.Column(db.Boolean, nullable=False, default=True)
    unitformat = db.Column(db.Float)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Recipecontainingredient(db.Model):
    __tablename__ = 'Recipecontainingredient'
    rid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), primary_key=True, nullable=False)
    ingid = db.Column(db.Integer, db.ForeignKey('Ingredient.ingid'), primary_key=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Recipetag(db.Model):
    __tablename__ = 'Recipetag'
    rid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), primary_key=True, nullable=False)
    tid = db.Column(db.Integer, db.ForeignKey('Tag.tid'), primary_key=True, nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Recipepic(db.Model):
    __tablename__ = 'Recipepic'
    picid = db.Column(db.Integer, primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), nullable=False)
    foodpic = db.Column(db.String(256), nullable=False)
    
    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Reciperelation(db.Model):
    __tablename__ = 'Reciperelation'
    fromrid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), primary_key=True, nullable=False)
    torid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), primary_key=True, nullable=False)

class Reviewpic(db.Model):
    __tablename__ = 'Reviewpic'
    picid = db.Column(db.Integer, primary_key=True)
    revid = db.Column(db.Integer, db.ForeignKey('Review.revid'), nullable=False)
    revpic = db.Column(db.Text(), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class PosterReply(db.Model):
    __tablename__ = 'PosterReply'
    repid = db.Column(db.Integer, primary_key=True)
    revid = db.Column(db.Integer, db.ForeignKey('Review.revid'), nullable=False)
    repcontent = db.Column(db.Text(), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Group(db.Model):
    __tablename__ = 'Group'
    gid = db.Column(db.Integer, primary_key=True)
    gname = db.Column(db.String(256), nullable=False)
    gprofile = db.Column(db.String(256), nullable=False)
    gowner = db.Column(db.String(256), db.ForeignKey('User.uname'), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Meetingreport(db.Model):
    __tablename__ = 'Meetingreport'
    repid = db.Column(db.Integer, primary_key=True)
    reptitle = db.Column(db.String(256), nullable=False)
    reptext = db.Column(db.Text(), nullable=False)
    uname = db.Column(db.String(256), db.ForeignKey('User.uname'), nullable=False)
    eid = db.Column(db.String(256), db.ForeignKey('Event.eid'), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Groupmember(db.Model):
    __tablename__ = 'Groupmember'
    gid = db.Column(db.Integer, db.ForeignKey('Group.gid'), primary_key=True)
    uname = db.Column(db.String(256), db.ForeignKey('User.uname'), primary_key=True,  nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Groupevent(db.Model):
    __tablename__ = 'Groupevent'
    gid = db.Column(db.String(256), db.ForeignKey('Group.gid'), primary_key=True, nullable=False)
    eid = db.Column(db.String(256), db.ForeignKey('Event.eid'), primary_key=True, nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)
        
class Meetreportpics(db.Model):
    __tablename__ = 'Meetreportpics'
    picid = db.Column(db.Integer, primary_key=True)
    repid = db.Column(db.Integer, db.ForeignKey('Meetingreport.repid'), nullable=False)
    reppic = db.Column(db.String(256), nullable=False)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)

class Eventreservation(db.Model):
    __tablename__ = 'Eventreservation'
    uname = db.Column(db.String(256), db.ForeignKey('User.uname'), primary_key=True)
    eid = db.Column(db.String(256), db.ForeignKey('Event.eid'), primary_key=True)
    status = db.Column(db.Boolean, default=True)

    def __init__(self, **kwargs):
        db.Model.__init__(self, **kwargs)















