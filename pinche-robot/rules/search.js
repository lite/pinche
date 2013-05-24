var crypto = require('crypto');

var debug = require('debug');
var log = debug('webot-example:log');
var verbose = debug('webot-example:verbose');
var error = debug('webot-example:error');

var host = 'http://42.96.159.189';
var _ = require('underscore')._;

var search = require('./support').search;
var geo2loc = require('./support').geo2loc;
var geo2stop = require('./support').geo2stop;

module.exports = exports = function(webot){
  var reg_help = /^(h|\?)$/i
  webot.set({
    name: 'hello help',
    description: '获取使用帮助，发送 h',
    pattern: function(info) {
      return info.is('event') && info.param.event === 'subscribe' || reg_help.test(info.text);
    },
    handler: function(info){
      var reply = {
        title: '拼车机器人',
        pic: 'https://secure.gravatar.com/avatar/0024710771815ef9b74881ab21ba4173?s=420',
        url: host,
        description: [
          '建议你试试这几条指令:',
            '0 : 拼车信息',
	    '1 : news',
            's+空格+关键词 : 我会帮你百度搜索喔',
            '发送你的经纬度, 查询附近的停车场',
            '重看本指令请回复help或问号',
        ].join('\n')
      };
      return reply;
    }
  });

  webot.set('check_location', {
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
  });

  webot.set('reply_one', {
    description: '发送1,将回复图文消息',
    pattern: /^1\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {title: '新闻1', description: '图文消息描述1', pic: 'https://secure.gravatar.com/avatar/0024710771815ef9b74881ab21ba4173?s=420', url: host + '/pinche/1/'},
        {title: '新闻2', description: '图文消息描述2', pic: '', url: host + '/pinche/2/'},
        {title: '新闻3', description: '图文消息描述3', pic: '', url: host + '/pinche/3/'}
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
  });

  webot.set('reply_zero', {
    description: '发送0,将回复拼车图文消息',
    pattern: /^0\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {title: '上海', description: '上海拼车信息图文消息描述1', pic: '', url: host + '/city/1/'},
        {title: '成都', description: '成都拼车信息图文消息描述1', pic: 'https://secure.gravatar.com/avatar/0024710771815ef9b74881ab21ba4173?s=420', url: host + '/city/2/'},
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
  });

};
