from flask import Flask

# flask-peewee bindings
from flask_peewee.db import Database


app = Flask(__name__)
app.config.from_object('config.Configuration')

db = Database(app)

def create_tables():
    from models import User, Message, Note, Relationship, City, Pinche
    
    # User.create_table()
    Relationship.create_table()
    Note.create_table()
    Message.create_table()
    City.create_table()
    Pinche.create_table()
    
def create_car_tables():
    from models import CarBrand, CarSeries, CarModel

    CarBrand.create_table()
    CarSeries.create_table()
    CarModel.create_table()

@app.template_filter('is_following')
def is_following(from_user, to_user):
    return from_user.is_following(to_user)
