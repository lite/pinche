from flask_peewee.rest import RestAPI, RestResource, UserAuthentication, AdminAuthentication, RestrictOwnerResource

from app import app
from auth import auth
from models import User, Message, Relationship, City, Pinche
from models import CarBrand, CarSeries, CarModel

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

class CarBrandResource(RestResource):
    exclude = ()

class CarSeriesResource(RestResource):
    exclude = ()
    owner_field = 'brand'
    include_resources = {
        'brand': CarBrandResource,
    }

class CarModelResource(RestResource):
    exclude = ()
    owner_field = 'series'
    include_resources = {
        'series': CarSeriesResource,
    }

# register our models so they are exposed via /api/<model>/
api.register(User, UserResource, auth=admin_auth)
api.register(Relationship, RelationshipResource)
api.register(Message, MessageResource)

api.register(City, CityResource)
api.register(Pinche, PincheResource)
api.register(CarBrand, CarBrandResource)
api.register(CarSeries, CarSeriesResource)
api.register(CarModel, CarModelResource)
