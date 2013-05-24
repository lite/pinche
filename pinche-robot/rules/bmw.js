var host = "http://42.96.159.189/";

module.exports = {
    description: '发送1,将回复图文消息',
    pattern: /^宝马\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {
          title: '新闻1',
          description: '图文消息描述1',
          pic: encodeURI(host + 'files/华晨宝马3.jpg'),
          url: host + 'bmw/'
        },
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};