var debug = require('debug');
var log = debug('webot-example:log');

var _ = require('underscore')._;
var request = require('request');

/**
 * 通过百度地图API查询周围停车场的位置信息
 */

// curl "http://api.map.baidu.com/telematics/v2/geocoding?keyWord=晋吉北路&cityName=成都&output=json&ak=E082a470d4aa20ca369874f807d4ab5d"

// "precise":0,
//   "location":{
//       "lng":103.99671210534,
//       "lat":30.649532345778
//   }

// curl "http://api.map.baidu.com/telematics/v2/local?location=103.99671210534,30.649532345778&keyWord=停车场&ak=E082a470d4aa20ca369874f807d4ab5d"
// {
//     "status":"Success",
//     "total":188,
//     "pointList":[
//         {
//             "name":"\u51c0\u548c\u9152\u697c\u4e13\u7528\u505c\u8f66\u573a",
//             "cityName":"\u6210\u90fd\u5e02",
//             "location":{
//                 "lng":103.99804611469,
//                 "lat":30.649822961322
//             },
//             "address":"\u56db\u5ddd\u7701\u6210\u90fd\u5e02\u6b66\u4faf\u533a",
//             "district":null,
//             "type":"\u4ea4\u901a\u8bbe\u65bd<font color=\"#c60a00\">\u505c\u8f66\u573a<\/font>\/\u505c\u8f66\u533a"
//         },
//     ]
// }
// 

function distanceByLnglat(lng1,lat1,lng2,lat2)
{
  var EARTH_RADIUS = 6378137.0;
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;// 取WGS84标准参考椭球中的地球长半径(单位:m)
  return Math.round(s * 10000) / 10000;
}

function Rad(d)
{
  return d * Math.PI / 180.0;
}

function parse_result(param, data){
  var params = new Array();
  pointList = data.pointList;
  for(i=0; i<pointList.length; i++){
    data = pointList[i];
    var distance = distanceByLnglat(data.location.lng, data.location.lat, param.lng, param.lat);
    var item = {}
    item.title = data.name + "\n地址：" + data.address + "\n距离：" + distance + "米";
    item.pic = 'http://mmsns.qpic.cn/mmsns/1QPBGwF70BeO3RVsMHK3YepkI2zcticXibKibYic0a49fxNHJD8zLa8S0A/0';
    item.url = 'http://m.autohome.com.cn/brand/33/?search=1';
    params.push(item);
  }
  return params;
}
// curl "http://api.map.baidu.com/telematics/v2/point?keyWord=晋吉北路&cityName=成都&ak=E082a470d4aa20ca369874f807d4ab5d"
exports.geo2find = function geo2find(param, kw, cb){
  var token = 'E082a470d4aa20ca369874f807d4ab5d';
  var options = {
    url: 'http://api.map.baidu.com/telematics/v2/local',
    qs: {
      location: [param.lng, param.lat].join(','),
      resType: 'json',
      keyWord: kw,
      output: 'json',
      ak: token
    }
  };
  log('querying amap for: [%s]', options.qs.location);

  //查询
  request.get(options, function(err, res, body){
    if(err){
      error('geo2find failed', err);
      return cb(err);
    }
    var data = JSON.parse(body);
    if(data.pointList && data.pointList.length>=1){
      // var result = JSON.stringify(parse_result(param, data));
      var result = parse_result(param, data);
      return cb(null, result);
    }
    return cb('geo2find found nth.');
  });
};


/**
 * 通过高德地图API查询用户的位置信息
 */
exports.geo2loc = function geo2loc(param, cb){
  var options = {
    url: 'http://restapi.amap.com/rgeocode/simple',
    qs: {
      resType: 'json',
      encode: 'utf-8',
      range: 3000,
      roadnum: 0,
      crossnum: 0,
      poinum: 0,
      retvalue: 1,
      sid: 7001,
      region: [param.lng, param.lat].join(',')
    }
  };
  log('querying amap for: [%s]', options.qs.region);

  //查询
  request.get(options, function(err, res, body){
    if(err){
      error('geo2loc failed', err);
      return cb(err);
    }
    var data = JSON.parse(body);
    if(data.list && data.list.length>=1){
      data = data.list[0];
      var location = data.city.name || data.province.name;
      log('location is %s, %j', location, data);
      return cb(null, location, data);
    }
    log('geo2loc found nth.');
    return cb('geo2loc found nth.');
  });
};

/**
 * 搜索百度
 *
 * @param  {String}   keyword 关键词
 * @param  {Function} cb            回调函数
 * @param  {Error}    cb.err        错误信息
 * @param  {String}   cb.result     查询结果
 */
exports.search = function(keyword, cb){
  log('searching: %s', keyword);
  var options = {
    url: 'http://www.baidu.com/s',
    qs: {
      wd: keyword
    }
  };
  request.get(options, function(err, res, body){
    if (err || !body){
      return cb(null, '现在暂时无法搜索，待会儿再来好吗？');
    }
    var regex = /<h3 class="t">\s*(<a.*?>.*?<\/a>).*?<\/h3>/gi;
    var links = [];
    var i = 1;

    while (true) {
      var m = regex.exec(body);
      if (!m || i > 5) break;
      links.push(i + '. ' + m[1]);
      i++;
    }

    var result;
    if (links.length) {
      result = '在百度搜索:' + keyword +',得到以下结果：\n' + links.join('\n');
      result = result.replace(/\s*data-click=".*?"/gi,  '');
      result = result.replace(/\s*onclick=".*?"/gi,  '');
      result = result.replace(/\s*target=".*?"/gi,  '');
      result = result.replace(/<em>(.*?)<\/em>/gi,  '$1');
      result = result.replace(/<font.*?>(.*?)<\/font>/gi,  '$1');
      result = result.replace(/<span.*?>(.*?)<\/span>/gi,  '$1');
    } else {
      result = '搜不到任何结果呢';
    }

    // result 会直接作为
    // robot.reply() 的返回值
    //
    // 如果返回的是一个数组：
    // result = [{
    //   pic: 'http://img.xxx....',
    //   url: 'http://....',
    //   title: '这个搜索结果是这样的',
    //   description: '哈哈哈哈哈....'
    // }];
    //
    // 则会生成图文列表
    return cb(null, result);
  });
};

/**
 * 下载图片
 *
 * 注意:只是简陋的实现,不负责检测下载是否正确,实际应用还需要检查statusCode.
 * @param  {String} url  目标网址
 * @param  {String} path 保存路径
 */
exports.download = function(url, stream){
  log('downloading %s a stream', url);
  return request(url).pipe(stream);
};
