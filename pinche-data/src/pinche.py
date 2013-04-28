#!/usr/bin/env python
# coding=utf-8

import re
import time
import urlparse
from bs4 import BeautifulSoup
from mechanize import Browser

import json
    
class PincheInfo:
    def __init__(self):
        self.title = ""
        self.car = ""
        self.time = ""
        self.route = ""
        self.phone = ""
        self.transmit = ""
        self.publisher = ""
        self.content = ""
        
    def __unicode__(self):
        # return json.dumps(self.__dict__, indent=2)
        return self.title + self.publisher + self.content;

class Site:

    def __init__(self, city):
        self.br = Browser()
        self.br.addheaders = [("HTTP_CONNECTION", "keep-alive")]
        self.host = "http://%s.58.com" % city

    def open_with_retry(self, uri, retry=5, wait=3):
        for i in xrange(retry):
            try:
                if self.host not in uri:
                    uri = self.host + uri
                print "%s - %d" %(uri, i)
                res = self.br.open(uri)
            except Exception, e:
                print str(e)
                time.sleep(wait)
                continue
            else:
                return res

    def get_pages(self, today):
        uri = "/pinche/?StartTime=%s" %(today)
        res = self.open_with_retry(uri)
        data = res.get_data()
        pages = re.findall("/pinche/pn\d+/\?StartTime=%s"%(today), data)
        return list(set([uri] + pages))
        
    def get_links(self, uri):
        res = self.open_with_retry(uri)
        data = res.get_data() 
        links = re.findall("%s/pinche/\d+x.shtml"%(self.host), data) 
        return links
        
    def get_info(self, uri):
        res = self.open_with_retry(uri)
        data = res.get_data() 
        soup = BeautifulSoup(data, "html5lib")

        info = PincheInfo()
        info.title = soup.find('div', attrs={"class" : "headline"}).h1.string;
        lists = soup.find('ul', attrs={"class" : "info"}).find_all("li");
        info.car = lists[0].text;
        info.time = lists[1].text;
        info.route = lists[2].text;
        # info.transmit = lists[3].text;
        publisher = re.search("linkman:'(.+?)',", data)
        info.publisher = publisher.group(1)
        content = soup.find('div', attrs={"class" : "maincon"}).text;
        info.content = content
        return info
