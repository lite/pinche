var geo2find = require('./support').geo2find;

module.exports = exports = function(webot){
  // 租车
  webot.set('租车', {
    description: '输入租车, 等待30秒后回复,会提示超时',
    pattern: '租车',
    handler: function(info) {
      info.session.wait_begin = new Date().getTime();
      info.session.keyword = "租车";
      info.wait('wait_location');
      return '请发送你的位置';
    }
  });

  // 停车
  webot.set('停车', {
    description: '输入停车, 等待30秒后回复,会提示超时',
    pattern: '停车',
    handler: function(info) {
      info.session.wait_begin = new Date().getTime();
      info.session.keyword = "停车";
      info.wait('wait_location');
      return '请发送你的位置';
    }
  });

  webot.waitRule('wait_location', function(info, next) {
    if (new Date().getTime() - info.session.wait_begin > 30000) {
      delete info.session.wait_begin;
      delete info.session.keyword;
      return '你的操作超时了,请重新输入。';
    } else {
      if(info.is('location')){
        geo2find(info.param, info.session.keyword, function(err, result) {
            console.log(result);
            next(null, result);
          });
      }else{
        return '你发送的不是位置信息。';
      }
    }
  });


};