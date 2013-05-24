var host = "http://42.96.159.189/";

module.exports = {
    description: '发送0,将回复拼车图文消息',
    pattern: /^0\s*(\d*)$/,
    handler: function(info){
      var reply = [
        {
          title: '上海上海上海上海上海', 
          description: '上海拼车信息图文消息描述1上海拼车信息图文消息描述1上海拼车信息图文消息描述1', 
          pic: host + 'files/bmc.png', 
          url: host + 'city/1/'
        },
        {
          title: '成都成都成都成都成都', 
          description: '成都拼车信息图文消息描述1成都拼车信息图文消息描述1成都拼车信息图文消息描述1成都拼车信息图文消息描述1成都拼车信息图文消息描述1', 
          pic: '', 
          url: host + 'city/2/'
        },
      ];
      // 发送 "news 1" 时只回复一条图文消息
      return Number(info.param[1]) == 1 ? reply[0] : reply;
    }
};
