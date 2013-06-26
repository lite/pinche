var express = require('express');
var webot = require('weixin-robot');

var log = require('debug')('webot-example:log');
var verbose = require('debug')('webot-example:verbose');

var conf = require('./conf');

require('./rules')(webot);
require('./fallback')(webot);

var app = express();
app.use(express.static(__dirname + '/static'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.use(express.cookieParser());
app.use(express.session({ secret: conf.salt, store: new express.session.MemoryStore() }));

webot.watch(app, { path: conf.path,  token: conf.token });

var port = conf.port || 3000;
var hostname = conf.hostname || '127.0.0.1';

app.listen(port, function(){
  log("Listening on %s", port);
});

app.enable('trust proxy');

