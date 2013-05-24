module.exports = {
  port: 3000,
  hostname: '127.0.0.1',
  path: '/weixin',  
  memcached: {
    hosts: '127.0.0.1:11211',
    options: {
      retries: 2
    }
  },
  salt: 'hirobot',
  token: 's1cr1t'
};
var environ = process.env.NODE_ENV || 'development';
try {
  var localConf = require('./' + environ);
  for (var i in localConf) {
    module.exports[i] = localConf[i];
  }
} catch (e) {}
