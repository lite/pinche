module.exports = {
    description: '发送1,将回复图文消息',
    pattern: /^1\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {
          title: '新闻1', 
          description: '图文消息描述1', 
          pic: 'http://42.96.159.189/static/weixin/bmc.png', 
          url: 'http://42.96.159.189/m/pinche/1/'
        },
        {
          title: '新闻2', 
          description: '图文消息描述2', 
          pic: 'http://42.96.159.189/static/weixin/bmc.png', 
          url: 'http://42.96.159.189/m/pinche/2/'
        },
        {
          title: '新闻3', 
          description: '图文消息描述3', 
          pic: 'http://42.96.159.189/static/weixin/bmc.png', 
          url: 'http://42.96.159.189/m/pinche/3/'
        }
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};
