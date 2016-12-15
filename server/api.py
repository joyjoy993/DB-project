from flask_restful import Api

from app import app
from resources import *

api = Api(app)

#event resource/ rsvp
api.add_resource(EventListResource,         '/api/v1/events/')
api.add_resource(EventResoure,              '/api/v1/events/<string:group_id>')
api.add_resource(RsvpResource,              '/api/v1/rsvps/') #get a rsvp, or delete rsvp
api.add_resource(TagsResource,              '/api/v1/tags/')
api.add_resource(UserEventResource,         '/api/v1/user-events/')
api.add_resource(PostReportResource,        '/api/v1/postreport/')
api.add_resource(EventReportResource,       '/api/v1/eventreport/<string:event_id>')

#user resource/ login/ logout
api.add_resource(AuthenticationResource,    '/api/v1/authentication/')
api.add_resource(RegistrationResource,      '/api/v1/registration/')
api.add_resource(CurrentUserResource,       '/api/v1/current-user/')
api.add_resource(UserRecipeListResource,    '/api/v1/user-recipes/')

#Recipe resource/ post
api.add_resource(RecipeListResource,        '/api/v1/recipes/')
api.add_resource(RecipeResource,            '/api/v1/recipes/<string:recipe_id>')
api.add_resource(PostRecipeResource,        '/api/v1/postrecipe/')
api.add_resource(RecipeReviewResource,      '/api/v1/reviews/<string:recipe_id>')
api.add_resource(PostReviewResource,        '/api/v1/postreview/')
api.add_resource(PostSuggestionResource,    '/api/v1/postsuggestion/')

#Group
api.add_resource(UserGroupResource,         '/api/v1/user-groups/')
api.add_resource(GroupCreationResource,     '/api/v1/group-creation/')
api.add_resource(GroupJoinResource,         '/api/v1/group-join/')
api.add_resource(EventCreationResource,     '/api/v1/event-creation/')


#search
api.add_resource(SearchResource,            '/api/v1/search/keyword/')
api.add_resource(RecipeWithRelatedTag,      '/api/v1/search/tag/')