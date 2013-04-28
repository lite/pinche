#!/usr/bin/env python
# coding=utf-8

import sys
import urlparse
from pinche import *
import json
import time

import requests
import json
from requests.auth import HTTPBasicAuth
    
auth=HTTPBasicAuth('admin', 'admin')

def post(auth, info):
        # curl -u admin:admin -d data='{"city": 1, "title": "pinche", "car": "audi", "time": "20130428 12:00", "phone": "12345", "route": "to chengdu", "publisher": "who", "content": "this is body."}' http://127.0.0.1:5000/api/pinche/
        payload = {
            "city": 1,
            "title": info.title,
            "car": info.car,
            "time": info.time,
            "phone": info.phone,
            "route": info.route,
            "publisher": info.publisher,    
            "content": info.content
        }
        r = requests.post("http://127.0.0.1:5000/api/pinche/", data=json.dumps(payload), auth=auth)
        return r.json["id"]


if "__main__" == __name__:  
	reload(sys).setdefaultencoding('utf8')
	
	site = Site("cd")
	pages = site.get_pages("2013042700")
	for page in pages:
		time.sleep(1)
		links = site.get_links(page)
		for link in links:
				time.sleep(1)
				info = site.get_info(link)
				print unicode(info)
				print post(auth, info)
				