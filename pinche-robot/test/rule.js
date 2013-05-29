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

  // //测试news消息
  describe('news', function(){
    it('should return news msg', function(done){
      info.type = 'text';
      info.text = '0';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.should.have.property('MsgType', 'news');
        json.should.have.property('FuncFlag', 0);
        json.Articles.item.should.have.length(json.ArticleCount);
        json.Articles.item[0].Title[0].toString().should.match(/上海/);
        done();
      });
    });
  });

  //测试图文消息
  describe('news', function(){
    //检测首次收听指令
    it('should return subscribe message.', function(done){
      info.type = 'event';
      info.event = 'subscribe';
      info.eventKey = '';
      sendRequest(info, function(err, json){
        detect(info, err, json);
        json.should.have.property('MsgType', 'news');
        json.should.have.property('FuncFlag', 0);
        json.Articles.item.should.have.length(json.ArticleCount);
        json.Articles.item[0].Title[0].toString().should.match(/感谢你收听/);
        done();
      });
    });
  });

  //测试地理位置
  describe('location', function(){
    //检测check_location指令
    it('should return check_location msg', function(done){
      info.type = 'location';
      info.xPos = '30.649532345778';
      info.yPos = '103.99671210534';
      info.scale = '12';
      info.label = '成都 某某地点';
      sendRequest(info, function(err, json){
        detect(info, err, json, /成都/);
        done();
      });
    });
  });

  // //测试wait
  // describe('wait', function(){
  //   //检测sex指令
  //   it('should pass guess sex', function(done){
  //     info.text = '你是男人还是女人';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /猜猜看/);
  //       //下次回复
  //       info.text = '哈哈';
  //       sendRequest(info, function(err, json){
  //         detect(info, err, json, /还猜不猜嘛/);
  //         info.text = '男的';
  //         sendRequest(info, function(err, json){
  //           detect(info, err, json, /是的/);
  //           done();
  //         });
  //       });
  //     });
  //   });

  //   //检测game指令
  //   it('should pass game-no-found', function(done){
  //     info.text = 'game 1';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /游戏/);
  //       info.text = '2';
  //       sendRequest(info, function(err, json){
  //         detect(info, err, json, /再猜/);
  //         info.text = '3';
  //         sendRequest(info, function(err, json){
  //           detect(info, err, json, /再猜/);
  //           info.text = '4';
  //           sendRequest(info, function(err, json){
  //             detect(info, err, json, /答案是/);
  //             done();
  //           });
  //         });
  //       });
  //     });
  //   });

  //   //检测game指令
  //   it('should return game-found msg', function(done){
  //     info.text = 'game 1';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /游戏/);
  //       info.text = '2';
  //       sendRequest(info, function(err, json){
  //         detect(info, err, json, /再猜/);
  //         info.text = '3';
  //         sendRequest(info, function(err, json){
  //           detect(info, err, json, /再猜/);
  //           info.text = '1';
  //           sendRequest(info, function(err, json){
  //             detect(info, err, json, /聪明/);
  //             done();
  //           });
  //         });
  //       });
  //     });
  //   });

  //   //检测suggest_keyword指令
  //   it('should return keyword correction accepted result.', function(done){
  //     info.text = 's nde';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json,/拼写错误.*nodejs/);
  //       //下次回复
  //       info.text = 'y';
  //       sendRequest(info, function(err, json){
  //         detect(info, err, json, /百度搜索.*nodejs/);
  //         done();
  //       });
  //     });
  //   });

  //   //检测suggest_keyword指令
  //   it('should return refused keyword correction result.', function(done){
  //     info.text = 's nde';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json,/拼写错误.*nodejs/);
  //       //下次回复
  //       info.text = 'n';
  //       sendRequest(info, function(err, json){
  //         detect(info, err, json, /百度搜索.*nde/);
  //         done();
  //       });
  //     });
  //   });

  //   //检测search指令
  //   it('should return search msg', function(done){
  //     info.text = 's javascript';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /百度搜索.*javascript/);
  //       done();
  //     });
  //   });

  //   //检测timeout指令
  //   it('should pass not timeout', function(done){
  //     info.text = 'timeout';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /请等待/);
  //       setTimeout(function(){
  //         info.text = 'Hehe...';
  //         sendRequest(info, function(err, json){
  //           detect(info, err, json, new RegExp('输入了: ' + info.text));
  //           done();
  //         });
  //       }, 2000);
  //     });
  //   });

  //   //检测timeout指令
  //   it('should return timeout msg', function(done){
  //     info.text = 'timeout';
  //     sendRequest(info, function(err, json){
  //       detect(info, err, json, /请等待/);
  //       setTimeout(function(){
  //         info.text = 'timeout ok';
  //         sendRequest(info, function(err, json){
  //           detect(info, err, json, /超时/);
  //           done();
  //         });
  //       }, 5100);
  //     });
  //   });
  // });

});

