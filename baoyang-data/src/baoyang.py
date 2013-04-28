#!/usr/bin/env python
# coding=utf-8

import re
import time
import urlparse
from bs4 import BeautifulSoup
from mechanize import Browser

import json
    
class BYInfo:
    def __init__(self, models):
        models =  models.split(">")
        # 奥迪 > 一汽-大众奥迪 > 奥迪A4L > 1.8T 涡轮增压 L4 > 无级变速箱
        # 众泰 > 众泰汽车 > 众泰2008 > 1.3升 L4 > 手动变速箱
        self.models = [ models[i].strip() for i in xrange(2, 6)] 
        # c0 (5000 * i) 公里 (6 * i) 个月</td>
        # r0 发动机机油
        # r1 机油滤清器
        # r2 空气滤清器
        # r3 燃油滤清器
        # r4 全部火花塞
        # r5 变速箱油（MT）
        # r6 转向助力液
        # r7 整车制动液
        # r8 差速器油
        self.tables =  [([""] * 50) for i in xrange(20)]
        # self.dicts = {}
        # 
    def __repr__(self):
        return json.dumps(self.__dict__, indent=2)

class Site:

    def __init__(self):
        self.br = Browser()
        self.br.addheaders = [("HTTP_CONNECTION", "keep-alive")]
        self.host = "http://car.autohome.com.cn"

    def get_brands(self):
        # curl "http://car.autohome.com.cn/JavaScript/Baoyang/brandData.js"
        brands_data = """\
33,A 奥迪,13,B 标致,120,B 宝骏,27,B 北京汽车,40,B 保时捷,15,B 宝马,75,B 比亚迪,36,B 奔驰,38,B 别克,14,B 本田,95,B 奔腾,\
76,C 长安,77,C 长城,169,D DS,81,D 东南,1,D 大众,41,D 道奇,113,D 东风风神,96,F 福田,165,F 风行,11,F 菲亚特,3,F 丰田,\
8,F 福特,82,G 广汽传祺,86,H 海马,181,H 哈弗,87,H 华泰,106,J 吉利英伦,44,J 捷豹,108,J 吉奥,46,J Jeep,105,J 吉利帝豪,\
84,J 江淮,47,K 凯迪拉克,53,L 铃木,124,L 理念,10,L 雷诺,49,L 路虎,80,L 力帆,52,L 雷克萨斯,58,M 马自达,20,M MG,56,M MINI,\
130,N 纳智捷,60,O 讴歌,26,Q 奇瑞,62,Q 起亚,122,Q 启辰,103,R 瑞麒,63,R 日产,19,R 荣威,45,S smart,69,S 双龙,65,S 斯巴鲁,\
162,S 思铭,67,S 斯柯达,68,S 三菱,70,W 沃尔沃,102,W 威麟,12,X 现代,72,X 雪铁龙,98,X 西雅特,71,X 雪佛兰,73,Y 英菲尼迪,\
110,Y 一汽,94,Z 众泰,22,Z 中华,74,Z 中兴"""
        # brands_data = """33,A 奥迪"""
        brands = {}
        items = brands_data.split(",")
        for x in range(0, len(items), 2):
            brands[items[x]] = items[x+1]

        return brands

    def open_with_retry(self, uri, retry=5, wait=3):
        for i in xrange(retry):
            try:
                print "%s - %d" %(uri, i)
                res = self.br.open(self.host + uri)
            except Exception, e:
                time.sleep(wait)
                continue
            else:
                return res

    def get_pages(self, brand_id):
        uri = "/baoyang/list_1_%s_0_0_0.html" %(brand_id)
        res = self.open_with_retry(uri)
        data = res.get_data() 
        pages = re.findall("/baoyang/list_\d+_%s_0_0_0.html" %(brand_id), data)
        return list(set([uri] + pages))
        
    def get_links(self, uri):
        res = self.open_with_retry(uri)
        data = res.get_data() 
        links = re.findall("/baoyang/detail_\d+_\d+_\d+_\d+_\d+_\d+.html", data) 
        return links
        
    def get_info(self, uri):
        res = self.open_with_retry(uri)
        data = res.get_data() 
        soup = BeautifulSoup(data, "html5lib")

        model = soup.find('span', attrs={"class" : "floatLeft"}).text
        info = BYInfo(model)
        table = soup.find('table', attrs={"class" : "t_H3"})
        rows = table.findAll('tr')
        for i in xrange(len(rows)):
            cols = rows[i].findAll('td')
            for j in xrange(len(cols)):
                info.tables[i][j]=cols[j].text.encode("utf-8")

        return info
