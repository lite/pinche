# config

class Configuration(object):
    # DATABASE = {
    #     'name': 'test.db',
    #     'engine': 'peewee.SqliteDatabase',
    #     'check_same_thread': False,
    # }
    DATABASE = {
        "engine": "peewee.MySQLDatabase", 
        "name": "pinche",
        "user": "root", 
        "passwd": "",
        "host": "127.0.0.1", 
        "port": 3306,
        'threadlocals': False
    }
    DEBUG = True
    SECRET_KEY = 'shhhh'
