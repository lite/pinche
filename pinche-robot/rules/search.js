var crypto = require('crypto');

var debug = require('debug');
var log = debug('webot-example:log');
var verbose = debug('webot-example:verbose');
var error = debug('webot-example:error');

var search = require('./support').search;
var geo2loc = require('./support').geo2loc;
var geo2stop = require('./support').geo2stop;

module.exports = {
  description: '发送你的经纬度,我会查询你附近的停车场',
  pattern: function(info){
    return info.is('location');
  },
  handler: function(info, next){
    geo2stop(info.param, function(err, location, data) {
      info = data ? data : '没发现周围有停车场。'
      next(null, info);
    });
  }
};
