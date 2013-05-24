var host = "http://42.96.159.189/";

module.exports = {
    description: '发送1,将回复图文消息',
    pattern: /^1\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {
          title: '新闻1', 
          description: '图文消息描述1', 
          pic: host + 'files/bmc.png', 
          url: host + 'pinche/1/'
        },
        {
          title: '图文消息描述3图文消息描述3图文消息描述3图文消息描', 
          description: '图文消息描述2', 
          pic: '', 
          url: host + 'pinche/2/'
        },
        {
          title: '新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3新闻3', 
          description: '图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3图文消息描述3', 
          pic: host + '', 
          url: host + 'pinche/3/'
        }
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};
