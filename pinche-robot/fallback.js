module.exports = exports = function(webot){
   webot.set('subscribe', {
    pattern: function(info) {
      return info.is('event') && info.param.event === 'subscribe';
    },
    handler: function(info) {
      return ['感谢关注汽车帮测试版',
      '请输入下面的关键词',
      '新闻', 
      '拼车',
      '估价',
      '或者发送当前位置获取停车场信息'].join("\n");
    }
  });

  webot.set('fallback', {
    pattern: /.*/,
    handler: function(info) {
      info.flag = true;
      return ['唔.. 暂时听不懂您说的什么呢',
      '不好意思，我不太懂您说的什么意思',
      '哎呀，听不懂啦！', 
      '这个我不是很懂，不如我们聊点别的吧？']
    }
  });

  webot.set('check_location', {
    description: '发送你的经纬度,我会查询你的位置',
    pattern: function(info){
      return info.is('location');
    },
    handler: function(info, next){
        info.session.param = info.param;
        next(null, '你当前坐标为：' + [info.param.lng, info.param.lat].join(','));
    }
  });
};