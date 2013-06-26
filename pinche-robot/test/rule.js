var should = require('should');

var token = 's1cr1t';
var port = 3000;

var bootstrap = require('./bootstrap.js');
var makeRequest = bootstrap.makeRequest;
var sendRequest = makeRequest('http://localhost:' + port + "/weixin", token);

var app = require('../app.js');

//公用检测指令
var detect = function(info, err, json, content){
  should.exist(info);
  should.not.exist(err);
  should.exist(json);
  json.should.be.a('object');
  if(content){
    json.should.have.property('Content');
    json.Content.should.match(content);
  }
};

//测试规则
describe('Rule', function(){
  //初始化
  var info = null;
  beforeEach(function(){
    info = {
      sp: 'webot',
      user: 'client',
      type: 'text'
    };
  });

  describe('估价', function(){
    it('should return 估价 msg', function(done){
      info.type = 'text';
      info.text = '估价';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.Articles.item[1].Title[0].toString().should.match(/二手车估价/);
        done();
      });
    });
  });

  describe('奥迪', function(){
    it('should return 保养 msg', function(done){
      info.type = 'text';
      info.text = '奥迪';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.Articles.item[0].Title[0].toString().should.match(/保养/);
        done();
      });
    });
  });

  describe('拼车', function(){
    it('should return 拼车 msg', function(done){
      info.type = 'text';
      info.text = '拼车';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.Articles.item[0].Title[0].toString().should.match(/上海/);
        done();
      });
    });
  });

  describe('新闻', function(){
    it('should return 新闻 msg', function(done){
      info.type = 'text';
      info.text = '新闻';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.Articles.item[0].Title[0].toString().should.match(/编辑模式图文消息1/);
        done();
      });
    });
  });

  describe('A6', function(){
    it('should return 奥迪A6L价格 msg', function(done){
      info.type = 'text';
      info.text = 'A6';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.Articles.item[1].Title[0].toString().should.match(/奥迪A6L价格/);
        done();
      });
    });
  });

  describe('subscribe', function(){
    //检测首次收听指令
    it('should return subscribe message.', function(done){
      info.type = 'event';
      info.event = 'subscribe';
      info.eventKey = '';
      sendRequest(info, function(err, json){
        detect(info, err, json, /感谢关注汽车帮测试版/);
        done();
      });
    });
  });

  //测试地理位置
  describe('location', function(){
    //检测check_location指令
    it('should return check_location msg', function(done){
      info.type = 'location';
      info.xPos = '23.08';
      info.yPos = '113.24';
      info.scale = '12';
      info.label = '广州市 某某地点';
      sendRequest(info, function(err, json){
        detect(info, err, json, /113.24,23.08/);
        done();
      });
    });
  });

  //测试租车信息
  describe('租车', function(){
    it('should return 租车 msg', function(done){
      info.type = 'text';
      info.text = '租车';
      sendRequest(info, function(err, json){
        detect(info, err, json, /请发送你的位置/);
        setTimeout(function(){
          // 发送位置信息
          info.type = 'location';
          info.xPos = '30.649532345778';
          info.yPos = '103.99671210534';
          info.scale = '12';
          info.label = '成都 某某地点';
          sendRequest(info, function(err, json){
            detect(info, err, json);
            json.Articles.item[1].Title[0].toString().should.match(/成都/);
            done();
          });
        }, 2000); 
      });
    });
  });

  // describe('租车超时', function(){
  //   it('should return 租车超时 msg', function(done){
  //     info.type = 'text';
  //     info.text = '租车';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /请发送你的位置/);
  //       setTimeout(function(){
  //         // 发送位置信息
  //         info.type = 'location';
  //         info.xPos = '30.649532345778';
  //         info.yPos = '103.99671210534';
  //         info.scale = '12';
  //         info.label = '成都 某某地点';
  //         sendRequest(info, function(err, json){
  //           detect(info, err, json, /超时/);
  //           done();
  //         });
  //       }, 30100); 
  //     });
  //   });
  // });

  //测试租车信息
  describe('停车', function(){
    it('should return 停车 msg', function(done){
      info.type = 'text';
      info.text = '停车';
      sendRequest(info, function(err, json){
        detect(info, err, json, /请发送你的位置/);
        setTimeout(function(){
          // 发送位置信息
          info.type = 'location';
          info.xPos = '30.649532345778';
          info.yPos = '103.99671210534';
          info.scale = '12';
          info.label = '成都 某某地点';
          sendRequest(info, function(err, json){
            detect(info, err, json);
            json.Articles.item[1].Title[0].toString().should.match(/晋阳/);
            done();
          });
        }, 2000); 
      });
    });
  });
});

