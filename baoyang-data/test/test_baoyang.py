#!/usr/bin/env python
# coding=utf-8

import unittest
import sys
sys.path.append('./src')

from baoyang import *

class TestBYInfo(unittest.TestCase):
    def setUp(self):
        self.site = Site()
	
    def test_get_brands(self):
        brands = self.site.get_brands()
        assert brands != None, "brands is None"
        assert brands["122"] == "Q 启辰"

    def test_get_pages(self):
        pages = self.site.get_pages("33")
        assert pages != None, "pages is None"
        assert pages[0] == "/baoyang/list_2_33_0_0_0.html"

    def test_get_links(self):
        uri = "/baoyang/list_1_33_0_0_0.html"
        links = self.site.get_links(uri)
        assert links != None, "links is None"
        assert links[0] == "/baoyang/detail_368_692_0_0_0_58.html"

    def test_get_info(self):
        uri = "/baoyang/detail_392_558_0_0_0_58.hthttp://sh.58.com/pinche/13391813964167x.shtml"
        info = self.site.get_info(uri)
        assert info != None, "info is None"
        assert info.models != None, "info models is None"
        
if __name__=="__main__":
	reload(sys).setdefaultencoding('utf8')
	unittest.main()