#!/usr/bin/env python

import sys
sys.path.insert(0, '.')

# from sqlalchemy import *
# 
# game_host = "127.0.0.1"
# game_name = "webgame"
# game_user = "webgame"
# game_pass = "game"
# 
# def feed():
#     db = create_engine('mysql://%s:%s@%s/%s?charset=utf8'%(game_user, game_pass, game_host, game_name),  echo=False)
#     conn = db.connect()
#     if request.method == 'POST':
#         sql_query = request.form['sqltext']
#     else:
#         sql_query = 'select f_hero_name, f_hero_money from gm_trade'
#     
#     c = conn.execute(sql_query)
#     entries = [dict(f_hero_name=row['f_hero_name'], f_hero_money=row['f_hero_money']) for row in c.fetchall()]
#     conn.close()
#     return render_template('s6.html', entries=entries, sqltext=sql_query)

import requests
import json
from models import Pinche
from requests.auth import HTTPBasicAuth
    
def test_get():
    r = requests.get("http://127.0.0.1:5000/api/pinche/1/")
    print r.json

# def test_post(auth):
#     payload = {'title': 'pinche', 'phone': '12345', 'route': 'to chengdu', 'publisher': 'who', 'content': 'this is body.'}
#     r = requests.post("http://127.0.0.1:5000/api/pinche/detail/", data=json.dumps(payload), auth=auth)
#     return r.json["id"]

# def test_put(auth, pinche_id):
#     payload = {'title': 'pinche', 'phone': '12345', 'route': 'to chengdu', 'publisher': 'who', 'content': 'this is updated body.'}
#     r = requests.put("http://127.0.0.1:5000/api/pinche/detail/%s/" %(pinche_id), data=json.dumps(payload), auth=auth, )
#     print r.json

def test_delete(auth, pinche_id):
    r = requests.delete("http://127.0.0.1:5000/api/pinche/detail/%s/" %(pinche_id), auth=auth)
    print r.json
    
if __name__ == "__main__":
    auth=HTTPBasicAuth('admin', 'admin')
    host_id = test_post(auth)
    test_put(auth, host_id )
    test_get()
    test_delete(auth, host_id)
    test_get()
