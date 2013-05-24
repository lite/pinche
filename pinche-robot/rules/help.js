var reg_help = /^(h|\?)$/i

module.exports = {
    name: 'hello help',
    description: '获取使用帮助，发送 h',
    pattern: function(info) {
      return info.is('event') && info.param.event === 'subscribe' || reg_help.test(info.text);
    },
    handler: function(info){
      var reply = {
        title: '拼车机器人',
        pic: 'https://secure.gravatar.com/avatar/0024710771815ef9b74881ab21ba4173?s=420',
        url: 'http://42.96.159.189/m/',
        description: [
          '建议你试试这几条指令:',
            '0 : 拼车信息',
	    '1 : news',
            's+空格+关键词 : 我会帮你百度搜索喔',
            '发送你的经纬度, 查询附近的停车场',
            '重看本指令请回复help或问号',
        ].join('\n')
      };
      return reply;
    }
};
