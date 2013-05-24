module.exports = {
    description: '发送0,将回复拼车图文消息',
    pattern: /^0\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {
          title: '上海', 
          description: '上海拼车信息图文消息描述1', 
          pic: 'http://42.96.159.189/static/weixin/bmc.png', 
          url: 'http://42.96.159.189/m/city/1/'
        },
        {
          title: '成都', 
          description: '成都拼车信息图文消息描述1', 
          pic: 'https://secure.gravatar.com/avatar/0024710771815ef9b74881ab21ba4173?s=420', 
          url: 'http://42.96.159.189/m/city/2/'
        },
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};
