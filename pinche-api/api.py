from flask_peewee.rest import RestAPI, RestResource, UserAuthentication, AdminAuthentication, RestrictOwnerResource

from app import app
from auth import auth
from models import User, Message, Relationship, City, Pinche


user_auth = UserAuthentication(auth)
admin_auth = AdminAuthentication(auth)

# instantiate our api wrapper
api = RestAPI(app, default_auth=user_auth)

class UserResource(RestResource):
    exclude = ('password', 'email',)

class MessageResource(RestrictOwnerResource):
    owner_field = 'user'
    include_resources = {'user': UserResource}

class RelationshipResource(RestrictOwnerResource):
    owner_field = 'from_user'
    include_resources = {
        'from_user': UserResource,
        'to_user': UserResource,
    }
    paginate_by = None

class CityResource(RestResource):
    exclude = ()

class PincheResource(RestResource):
    exclude = ('pub_date', )
    owner_field = 'city'
    include_resources = {
        'city': CityResource,
    }

# register our models so they are exposed via /api/<model>/
api.register(User, UserResource, auth=admin_auth)
api.register(Relationship, RelationshipResource)
api.register(Message, MessageResource)

api.register(City, CityResource)
api.register(Pinche, PincheResource)
