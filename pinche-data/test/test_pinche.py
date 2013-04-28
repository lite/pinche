#!/usr/bin/env python
# coding=utf-8

import unittest
import sys
sys.path.append('./src')

from pinche import *

class TestPincheInfo(unittest.TestCase):
    def setUp(self):
        self.site = Site('sh')
	
    def test_get_pages(self):
        # http://sh.58.com/pinche/?StartTime=2013042700
        pages = self.site.get_pages("2013042700")
        assert pages != None, "pages is None"
        assert pages[0] != None, "page[0] is None"

    def test_get_links(self):
        uri = "/pinche/pn3/?StartTime=2013042700"
        links = self.site.get_links(uri)
        assert links != None, "links is None"
        assert links[0] != None, "links[0] is None"

    def test_get_info(self):
        uri = "/pinche/13391813964167x.shtml"
        info = self.site.get_info(uri)
        print unicode(info)
        assert info != None, "info is None"
        assert info.publisher != "", "info publisher is empty"
        
if __name__=="__main__":
	reload(sys).setdefaultencoding('utf8')
	unittest.main()