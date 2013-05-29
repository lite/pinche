var host = "http://42.96.159.189/";

module.exports = {
    description: '发送1,将回复图文消息',
    pattern: /^宝马\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {
          title: '自定义图文消息',
          description: '图文消息描述1',
          pic: encodeURI(host + 'files/华晨宝马3.jpg'),
          url: host + 'bmw/'
        },
        {
          title: '编辑模式图文消息',
          description: '图文消息描述2',
          pic: 'http://mmsns.qpic.cn/mmsns/1QPBGwF70BeO3RVsMHK3YepkI2zcticXibKibYic0a49fxNHJD8zLa8S0A/0',
          url: 'http://mp.weixin.qq.com/mp/appmsg/show?__biz=MjM5MTM4OTY0MA==&appmsgid=10000005&itemidx=1#wechat_redirect'
        },
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};