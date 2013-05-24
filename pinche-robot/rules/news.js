module.exports = {
    description: '发送1,将回复图文消息',
    pattern: /^1\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {title: '新闻1', description: '图文消息描述1', pic: 'https://secure.gravatar.com/avatar/0024710771815ef9b74881ab21ba4173?s=420', url: 'http://42.96.159.189/pinche/1/'},
        {title: '新闻2', description: '图文消息描述2', pic: '', url: 'http://42.96.159.189/pinche/2/'},
        {title: '新闻3', description: '图文消息描述3', pic: '', url: 'http://42.96.159.189/pinche/3/'}
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};
