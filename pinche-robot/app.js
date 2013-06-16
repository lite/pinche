var express = require('express');
var webot = require('weixin-robot');

var log = require('debug')('webot-example:log');
var verbose = require('debug')('webot-example:verbose');

var conf = require('./conf');

require('./rules')(webot);

var app = express();
app.use(express.static(__dirname + '/static'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.use(express.cookieParser());
app.use(express.session({ secret: conf.salt, store: new express.session.MemoryStore() }));

webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return ['感谢关注汽车帮测试版',
    '请输入下面的关键词',
    '新闻', 
    '拼车',
    '估价',
    '或者发送当前位置获取停车场信息'].join("\n");
  }
});

webot.set('fallback', {
  pattern: /.*/,
  handler: function(info) {
    info.flag = true;
    return ['唔.. 暂时听不懂您说的什么呢',
    '不好意思，我不太懂您说的什么意思',
    '哎呀，听不懂啦！', 
    '这个我不是很懂，不如我们聊点别的吧？']
  }
});

webot.watch(app, { path: conf.path,  token: conf.token });

var port = conf.port || 3000;
var hostname = conf.hostname || '127.0.0.1';

app.listen(port, function(){
  log("Listening on %s", port);
});

app.enable('trust proxy');

