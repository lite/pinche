#!/usr/bin/env python
# coding=utf-8

import sys
import urlparse
from baoyang import *
import json

if "__main__" == __name__:  
	reload(sys).setdefaultencoding('utf8')
	
	site = Site()
	brands = site.get_brands()
	for brand in brands:
		pages = site.get_pages(brand)
		for page in pages:
			links = site.get_links(page)
			for link in links:
					info = site.get_info(link)
					with open('data/%s.json' %(link[16:-5]), mode='w+') as f:
						f.write(str(info))
				