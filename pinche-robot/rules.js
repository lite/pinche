var crypto = require('crypto');

var debug = require('debug');
var log = debug('webot-example:log');
var verbose = debug('webot-example:verbose');
var error = debug('webot-example:error');

var _ = require('underscore')._;
var search = require('./support').search;
var geo2loc = require('./support').geo2loc;
var geo2stop = require('./support').geo2stop;

var host = 'http://42.96.159.189';

/**
 * 初始化路由规则
 */
module.exports = exports = function(webot){
  var reg_help = /^(help|\?)$/i
  webot.set({
    // name 和 description 都不是必须的
    name: 'hello help',
    description: '获取使用帮助，发送 help',
    pattern: function(info) {
      //首次关注时,会收到subscribe event
      return info.is('event') && info.param.event === 'subscribe' || reg_help.test(info.text);
    },
    handler: function(info){
      var reply = {
        title: '拼车机器人',
        pic: '',
        url: host,
        description: [
          '建议你试试这几条指令:',
            '0 : 拼车信息',
            's+空格+关键词 : 我会帮你百度搜索喔',
            '发送你的经纬度, 查询你附近的停车场',
            '重看本指令请回复help或问号',
        ].join('\n')
      };
      // 返回值如果是list，则回复图文消息列表
      return reply;
    }
  });

  // 简单的纯文本对话，可以用单独的 yaml 文件来定义
  // require('js-yaml');
  // webot.dialog(__dirname + '/dialog.yaml');

  function do_search(info, next){
    // pattern的解析结果将放在param里
    var q = info.param[1];
    log('searching: ', q);
    // 从某个地方搜索到数据...
    return search(q , next);
  }

  // 可以通过回调返回结果
  webot.set('search', {
    description: '发送: s 关键词 ',
    pattern: /^(?:搜索?|search|百度|s\b)\s*(.+)/i,
    //handler也可以是异步的
    handler: do_search
  });

  //支持location消息,已经提供了geo转地址的工具，使用的是高德地图的API
  //http://restapi.amap.com/rgeocode/simple?resType=json&encode=utf-8&range=3000&roadnum=0&crossnum=0&poinum=0&retvalue=1&sid=7001&region=113.24%2C23.08
  // webot.set('check_location', {
  //   description: '发送你的经纬度,我会查询你的位置',
  //   pattern: function(info){
  //     return info.is('location');
  //   },
  //   handler: function(info, next){
  //     geo2loc(info.param, function(err, location, data) {
  //       location = location || info.label;
  //       next(null, location ? '你正在' + location : '我不知道你在什么地方。');
  //     });
  //   }
  // });

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

  // 回复图文消息
  webot.set('reply_news', {
    description: '发送news,将回复图文消息',
    pattern: /^news\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {title: '新闻1', description: '图文消息描述1', pic: '', url: host + '/pinche/1/'},
        {title: '新闻2', description: '图文消息描述2', pic: '', url: host + '/pinche/2/'},
        {title: '新闻3', description: '图文消息描述3', pic: '', url: host + '/pinche/3/'}
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
  });

  // 回复图文消息
  webot.set('reply_zero', {
    description: '发送0,将回复拼车图文消息',
    pattern: /^0\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {title: '上海', description: '上海拼车信息图文消息描述1', pic: '', url: host + '/city/1/'},
        {title: '成都', description: '成都拼车信息图文消息描述1', pic: '', url: host + '/city/2/'},
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
  });

  // 可以指定图文消息的映射关系
  webot.config.mapping = function(item, index, info){
    //item.title = (index+1) + '> ' + item.title;
    return item;
  };

  //所有消息都无法匹配时的fallback
  webot.set(/.*/, function(info){
    // 利用 error log 收集听不懂的消息，以利于接下来完善规则
    // 你也可以将这些 message 存入数据库
    log('unhandled message: %s', info.text);
    info.flag = true;
    return '你发送了「' + info.text + '」,可惜我太笨了,听不懂. 发送: help 查看可用的指令';
  });
};
