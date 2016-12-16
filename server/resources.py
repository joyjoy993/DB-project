from flask_restful import Resource, fields, marshal, abort
from flask import request
from models import *
from login import login_manager
from datetime import timedelta
import json
from flask_login import login_required, login_user, logout_user, current_user, LoginManager

class LogRecentTag(Resource):

    def post(self):
        try:
            tags = request.json.get('tags')
            print tags
            for i in tags:
                queryTag = Taglog.query.filter(Taglog.uname==current_user.uname).filter(Taglog.tid==i['key']).first()
                if queryTag == None:
                    form_attributes = {'uname': current_user.uname, 'tid': i['key'], 'times': 1}
                    newTaglog = Taglog(**form_attributes)
                    db.session.add(newTaglog)
                    db.session.commit()
                else:
                    queryTag.times = queryTag.times + 1
                    db.session.commit()
            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}

        except Exception as e:
            print e
            abort(400)

class TagRecommandation(Resource):

    def get(self):
        try:
            recipes = Recipe.query\
                        .outerjoin(Recipepic)\
                        .outerjoin(Recipetag)\
                        .outerjoin(Tag)\
                        .outerjoin(Taglog)\
                        .add_entity(Recipepic)\
                        .filter(Taglog.uname==current_user.uname)\
                        .order_by(Taglog.times.desc())\
                        .limit(5)\
                        .all()
            tags = Tag.query\
                    .outerjoin(Taglog)\
                    .filter(Taglog.uname==current_user.uname)\
                    .order_by(Taglog.times.desc())\
                    .limit(5)\
                    .all()

            recipe_list = []
            tag_list = []

            for recipe in recipes:
                recipe_data = recipe[0]
                pic_data = None
                if recipe[1] != None:
                    pic_data = recipe[1].foodpic 
                data = {
                    'rid': recipe_data.rid, 
                    'rtitle': recipe_data.rtitle,
                    'numofserving': recipe_data.numofserving,
                    'description': recipe_data.description,
                    'uname': recipe_data.uname,
                    'pic': pic_data
                }
                recipe_list.append(data)

            for tag in tags:
                tag_list.append({
                        'tid': tag.tid,
                        'tname': tag.tname
                    })
            return { 'tagrecommandation': {
                        'recipes': recipe_list,
                        'tags': tag_list
                        }
                    }, 200

        except Exception as e:
            print e
            abort(400)


class EventResoure(Resource):

    def get(self, group_id):
        try:   
            events_join_query = Event.query.\
                                join(Groupevent).\
                                join(Eventreservation).\
                                filter(Groupevent.gid==group_id).\
                                filter(Eventreservation.uname==current_user.uname)
            events_join = events_join_query.all()
            event_join_list = []
            event_not_join_list = []
            events_not_join = Event.query.\
                                join(Groupevent).\
                                filter(Groupevent.gid==group_id).\
                                filter(Event.eid.notin_(events_join_query.with_entities(Event.eid))).\
                                all()

            for event_data in events_join:
                event_join_list.append({
                    'eid': event_data.eid,
                    'ename': event_data.ename,
                    'description': event_data.edescription,
                    })
            for event_data in events_not_join:
                event_not_join_list.append({
                    'eid': event_data.eid,
                    'ename': event_data.ename,
                    'description': event_data.edescription,
                    })
            return { 'events': 
                        { 
                        'join_list': event_join_list,
                        'not_join_list': event_not_join_list
                        }
                    }, 200
        except Exception as e:
            print e
            abort(400)

class EventListResource(Resource):

    def get(self):
        try:
            event = Event.query.all()
            return marshal(
                event,
                { 'eid': fields.Integer, 'edescription': fields.String },
                envelope="event"
            ), 200
        except Exception as e:
            abort(400)

class RecipeListResource(Resource):

    def get(self):
        try:
            recipes = Recipe.query.outerjoin(Recipepic).add_entity(Recipepic).all()
            recipe_list = []
            for recipe in recipes:
                recipe_data = recipe[0]
                pic_data = None
                if recipe[1] != None:
                    pic_data = recipe[1].foodpic 
                data = {
                    'rid': recipe_data.rid, 
                    'rtitle': recipe_data.rtitle,
                    'numofserving': recipe_data.numofserving,
                    'description': recipe_data.description,
                    'uname': recipe_data.uname,
                    'pic': pic_data
                }
                recipe_list.append(data)
            return { 'recipes': recipe_list }, 200
        except Exception as e:
            print e
            abort(400)

class RecipeResource(Resource):

    def get(self, recipe_id):
        try:
            recipe = Recipe.query.get(recipe_id)
            pic = Recipepic.query.with_entities(Recipepic.foodpic).filter(Recipepic.rid==recipe_id).first()
            tag = Recipe.query.join(Recipetag).join(Tag).with_entities(Tag.tname, Tag.tid).filter(Recipe.rid==recipe_id).all()
            ingredients = Recipecontainingredient.query.join(Ingredient).join(Unit)\
                            .with_entities(Ingredient.ingname, Recipecontainingredient.amount, Unit.unitname)\
                            .filter(Recipecontainingredient.rid==recipe_id).all()

            tags = []
            ingredient_data = []
            pic_data = None
            if pic != None:
                pic_data = ''.join(pic)
            for i in tag:
                tags.append({'key': i[1], 'title': i[0]})
            for i in ingredients:
                ingredient_data.append({'ingredient': i[0], 'amount': i[1], 'unit': i[2]})
            recipe_data = { 
                'rid': recipe.rid, 
                'rtitle': recipe.rtitle,
                'numofserving': recipe.numofserving,
                'description': recipe.description,
                'uname': recipe.uname,
                'tags': tags,
                'pic': pic_data,
                'ingredients': ingredient_data
            }
            return { 'recipe': recipe_data }, 200
        except Exception as e:
            print e
            abort(400)

class AuthenticationResource(Resource):
       
    def post(self):
        try:
            uname = request.json.get('uname')
            password = request.json.get('password')
            user = User.query.filter_by(uname=uname).first()
            print password
            if (user and user.check_password(password)):
                login_user(user)
                login_manager.remember_cookie_duration = timedelta(days=1)
                return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
            else:
                return json.dumps({'message': 'FAILED'}), 201, {'ContentType': 'application/json'}
        except Exception as e:
            abort(400)

class RegistrationResource(Resource):
       
    def post(self):
        try:
            uname = request.json.get('uname')
            password = request.json.get('password')
            profile = request.json.get('profile')
            print password
            user = User.query.filter_by(uname=uname).first()
            if user:
                return json.dumps({'message': 'FAILED'}), 201, {'ContentType': 'application/json'}
            else:
                form_attributes = {'uname': uname, 'password': password, 'uprofile': profile}
                new_user = User(**form_attributes)
                db.session.add(new_user)
                db.session.commit()
                user = User.query.filter_by(uname=uname).first()
                login_user(user)
                login_manager.remember_cookie_duration = timedelta(days=1)
                return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
        except Exception as e:
            abort(400)

class CurrentUserResource(Resource):

    def get(self):
        try:
            user = User.query.get(current_user.uname)
            if not user:
                return json.dumps({'message': 'FAILED'}), 201, {'ContentType': 'application/json'}
            else:
                return marshal(
                    user,
                    { 
                        'uname': fields.String,
                        'uprofile': fields.String
                    },
                    envelope="user"
                ), 200
        except Exception as e:
            abort(400)

class UserGroupResource(Resource):

    def get(self):
        try:
            group_member_query = Group.query.join(Groupmember).filter(Groupmember.uname==current_user.uname)
            group_owner_query = Group.query.filter_by(gowner=current_user.uname)
            group_member = group_member_query.all()
            group_owner = group_owner_query.all()
            groups_not_join = Group.query\
                                .filter(Group.gid.notin_(group_member_query.with_entities(Group.gid)))\
                                .filter(Group.gid.notin_(group_owner_query.with_entities(Group.gid)))\
                                .all()
            group_member_list = []
            group_owner_list = []
            group_not_join_list = []
            for group in group_member:
                group_member_list.append({
                    'gid': group.gid,
                    'gname': group.gname,
                    'gprofile': group.gprofile,
                    'gowner': group.gowner
                    })
            for group in group_owner:
                group_owner_list.append({
                    'gid': group.gid,
                    'gname': group.gname,
                    'gprofile': group.gprofile,
                    'gowner': group.gowner
                    })
            for group in groups_not_join:
                group_not_join_list.append({
                    'gid': group.gid,
                    'gname': group.gname,
                    'gprofile': group.gprofile,
                    'gowner': group.gowner
                    })
            return { 
                'groups': {
                    'group_member': group_member_list,
                    'group_owner': group_owner_list,
                    'group_not_in': group_not_join_list
                }
            }, 200
        except Exception as e:
            print e
            abort(400)

class UserRecipeListResource(Resource):

    def get(self):
        try:
            recipes = Recipe.query.outerjoin(Recipepic).add_entity(Recipepic).filter(Recipe.uname==current_user.uname).all()
            recipe_list = []
            for recipe in recipes:
                recipe_data = recipe[0]
                pic_data = None
                if recipe[1] != None:
                    pic_data = recipe[1].foodpic 
                data = {
                    'rid': recipe_data.rid, 
                    'rtitle': recipe_data.rtitle,
                    'numofserving': recipe_data.numofserving,
                    'description': recipe_data.description,
                    'pic': pic_data
                }
                recipe_list.append(data)
            return { 'posts': recipe_list }, 200
        except Exception as e:
            abort(400)


class RsvpResource(Resource):

    def post(self):
        try:
            eid = request.json.get('eid')
            op = request.json.get('op')
            if op == 1:
                form_attributes = {'uname': current_user.uname, 'eid': eid, 'status': True}
                newrsvp = Eventreservation(**form_attributes)
                db.session.add(newrsvp)
                db.session.commit()
                return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
            elif op == 0:
                rsvp = Eventreservation.query.filter(Eventreservation.uname==current_user.uname).filter(Eventreservation.eid==eid).first()
                db.session.delete(rsvp)
                db.session.commit()
                return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
        except Exception as e:
            print e
            abort(400)

class GroupJoinResource(Resource):

    def post(self):
        try:
            gid = request.json.get('gid')

            form_attributes = {'uname': current_user.uname, 'gid': gid}
            newmembership = Groupmember(**form_attributes)
            db.session.add(newmembership)
            db.session.commit()
            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
            
        except Exception as e:
            print e
            abort(400)

class PostRecipeResource(Resource):

    def check(self, ingredients, unitid):
        for ingredient in ingredients:
            if ingredient.unitid == unitid:
                return True
        return False

    def post(self):
        try:
            #print request.get_json(force=True)
            title = request.json.get('rtitle')
            numofserving = request.json.get('numofserving')
            description = request.json.get('description')
            tags = request.json.get('tags')
            tags_list = list(set(tags))
            ingredients = request.json.get('ingredients')
            file = request.json.get('file')
            form_attributes = {'rtitle': title, 'numofserving': numofserving, 'description': description, 'uname': current_user.uname}
            newrecipe = Recipe(**form_attributes)
            db.session.add(newrecipe)
            db.session.commit()
            db.session.refresh(newrecipe)
            for i in tags_list:
                form_attributes2 = {'rid': newrecipe.rid, 'tid': int(i)}
                newrelation = Recipetag(**form_attributes2)
                db.session.add(newrelation)
                db.session.commit()
            if file != None:
                form_attributes3 = {'rid': newrecipe.rid, 'foodpic': file}
                newpicrealtion = Recipepic(**form_attributes3)
                db.session.add(newpicrealtion)
                db.session.commit()

            for i in ingredients:

                newUnit = None
                newIngredient = None

                newUnit = Unit.query.filter_by(unitname=i['unit']).first()
                newIngredient = Ingredient.query.filter_by(ingname=i['ingredient']).all()
                print newIngredient

                if newUnit == None:
                    form_attributes_unit = {'unitname': i['unit'], 'unittype': i['solid']}
                    newUnit = Unit(**form_attributes_unit)
                    db.session.add(newUnit)
                    db.session.commit()
                    db.session.refresh(newUnit)

                flag = self.check(newIngredient, newUnit.unitid)

                if (newIngredient == None) or (newIngredient != None and flag == False):
                    form_attributes_ingredient = {'ingname': i['ingredient'], 'unitid': newUnit.unitid}
                    newIngredient = Ingredient(**form_attributes_ingredient)
                    db.session.add(newIngredient)
                    db.session.commit()
                    db.session.refresh(newIngredient)

                correspondIngredient = Ingredient.query.filter_by(ingname=i['ingredient'], unitid=newUnit.unitid).first()

                form_attributes_Recipecontainingredient = {'rid': newrecipe.rid, 'ingid': correspondIngredient.ingid, 'amount': i['amount']}
                newRecipecontainingredient = Recipecontainingredient(**form_attributes_Recipecontainingredient)
                db.session.add(newRecipecontainingredient)
                db.session.commit()
            
            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}

        except Exception as e:
            print e
            abort(400)

class PostReviewResource(Resource):

    def post(self):
        try:
            rid = request.json.get('rid')
            title = request.json.get('title')
            content = request.json.get('content')
            rate = request.json.get('rate')
            file = request.json.get('file')
            
            form_attributes = {'revtitle': title, 'revtext': content, 'rate': rate, 'uname': current_user.uname, 'rid': rid}
            newReview = Review(**form_attributes)
            db.session.add(newReview)
            db.session.commit()
            db.session.refresh(newReview)

            form_attributes2 = {'revid': newReview.revid, 'revpic': file}
            newPic = Reviewpic(**form_attributes2)
            db.session.add(newPic)
            db.session.commit()
            
            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}

        except Exception as e:
            print e
            abort(400)

class PostReportResource(Resource):

    def post(self):
        try:
            eid = request.json.get('eid')
            title = request.json.get('title')
            content = request.json.get('content')
            file = request.json.get('file')
            
            form_attributes = {'reptitle': title, 'reptext': content, 'uname': current_user.uname, 'eid': eid}
            newReport = Meetingreport(**form_attributes)
            db.session.add(newReport)
            db.session.commit()
            db.session.refresh(newReport)

            form_attributes2 = {'repid': newReport.repid, 'reppic': file}
            newPic = Meetreportpics(**form_attributes2)
            db.session.add(newPic)
            db.session.commit()
            
            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}

        except Exception as e:
            print e
            abort(400)

class PosterReplyResource(Resource):

    def post(self):
        try:
            revid = request.json.get('revid')
            reply = request.json.get('reply')
            
            form_attributes = {'revid': revid, 'repcontent': reply}
            newReply = PosterReply(**form_attributes)
            db.session.add(newReply)
            db.session.commit()
            
            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}

        except Exception as e:
            print e
            abort(400)

class TagsResource(Resource):

    def get(self):
        try:
            tags = Tag.query.all()
            return marshal(
                tags,
                { 
                    'tid': fields.Integer,
                    'tname': fields.String
                },
                envelope="tags"
            ), 200
        except Exception as e:
            abort(400)

class RecipeReviewResource(Resource):

    def get(self, recipe_id):
        try:
            review = Review.query.outerjoin(Reviewpic)\
                    .outerjoin(PosterReply)\
                    .add_entity(Reviewpic)\
                    .add_entity(PosterReply)\
                    .filter(Review.rid==recipe_id)\
                    .all()
            review_list = []
            print review
            for i in review:
                review_list.append({
                    'revid': i[0].revid,
                    'title': i[0].revtitle,
                    'content': i[0].revtext,
                    'rate': i[0].rate,
                    'user': i[0].uname,
                    'pic': i[1].revpic if i[1] is not None else None,
                    'reply': i[2].repcontent if i[2] is not None else None
                    })
            return {'reviews': review_list}, 200

        except Exception as e:
            print e
            abort(400)

class SearchResource(Resource):

    def post(self):
        try:
            keyword = request.json.get('keyword')
            recipes = Recipe.query.outerjoin(Recipepic).add_entity(Recipepic).filter(Recipe.rtitle.like('%'+keyword+'%')).all()
            recipe_list = []
            for recipe in recipes:
                recipe_data = recipe[0]
                pic_data = None
                if recipe[1] != None:
                    pic_data = recipe[1].foodpic 
                data = {
                    'rid': recipe_data.rid, 
                    'rtitle': recipe_data.rtitle,
                    'numofserving': recipe_data.numofserving,
                    'description': recipe_data.description,
                    'uname': recipe_data.uname,
                    'pic': pic_data
                }
                recipe_list.append(data)
            return { 'recipes': recipe_list }, 200
        except Exception as e:
            abort(400)


class GroupCreationResource(Resource):
       
    def post(self):
        try:
            gname = request.json.get('gname')
            profile = request.json.get('profile')
    
            form_attributes = {'gname': gname, 'gprofile': profile, 'gowner': current_user.uname}
            new_group = Group(**form_attributes)
            db.session.add(new_group)
            db.session.commit()

            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
        except Exception as e:
            abort(400)

class EventCreationResource(Resource):
       
    def post(self):
        try:
            edescription = request.json.get('edescription')
            ename = request.json.get('ename')
            gid = request.json.get('gid')
    
            form_attributes = {'edescription': edescription, 'ename': ename}
            new_event = Event(**form_attributes)
            db.session.add(new_event)
            db.session.commit()
            db.session.refresh(new_event)

            form_attributes2 = {'eid': new_event.eid, 'gid': gid}
            new_relationship = Groupevent(**form_attributes2)
            db.session.add(new_relationship)
            db.session.commit()

            return json.dumps({'message': 'SUCCESS'}), 200, {'ContentType': 'application/json'}
        except Exception as e:
            abort(400)

class UserEventResource(Resource):

    def get(self):
        try:
            events = Event.query\
                    .outerjoin(Eventreservation)\
                    .filter(Eventreservation.uname==current_user.uname)\
                    .all()
            events_list = []
            for i in events:
                events_list.append({
                    'eid': i.eid,
                    'edescription': i.edescription,
                    'ename': i.ename
                    })
            return { 'userevents': events_list }, 200
        except Exception as e:
            abort(400)

class EventReportResource(Resource):

    def get(self, event_id):
        try:
            events = Meetingreport.query\
                    .outerjoin(Meetreportpics)\
                    .add_entity(Meetreportpics)\
                    .filter(Meetingreport.eid==event_id)\
                    .all()
            events_list = []
            for i in events:
                events_list.append({
                    'repid': i[0].repid,
                    'reptitle': i[0].reptitle,
                    'reptext': i[0].reptext,
                    'uname': i[0].uname,
                    'reppic': i[1].reppic if i[1] is not None else None
                    })
            return { 'eventreports': events_list }, 200
        except Exception as e:
            print e
            abort(400)

class RecipeWithRelatedTag(Resource):

    def post(self):
        try:
            tagid = request.json.get('tagid')
            recipes = Recipe.query\
                        .outerjoin(Recipepic)\
                        .outerjoin(Recipetag)\
                        .add_entity(Recipepic)\
                        .filter(Recipetag.tid==tagid)\
                        .all()
            recipe_list = []
            for recipe in recipes:
                recipe_data = recipe[0]
                pic_data = None
                if recipe[1] != None:
                    pic_data = recipe[1].foodpic 
                data = {
                    'rid': recipe_data.rid, 
                    'rtitle': recipe_data.rtitle,
                    'numofserving': recipe_data.numofserving,
                    'description': recipe_data.description,
                    'uname': recipe_data.uname,
                    'pic': pic_data
                }
                recipe_list.append(data)
            return { 'recipes': recipe_list }, 200

        except Exception as e:
            print e
            abort(400)




















































