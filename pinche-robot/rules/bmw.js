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
        {
          title: '消息2',
          description: '图文消息描述2',
          pic: 'https://mp.weixin.qq.com/cgi-bin/getimgdata?token=2021121975&fileId=10000004&mode=large&source=file',
          url: ''
        },
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};