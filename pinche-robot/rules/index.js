module.exports = function(webot) {
  require('js-yaml');

  var doc = require(__dirname + "/conf/links.yaml");
  Object.keys(doc).forEach(function(key) {
    webot.set({
      pattern: "/^"+key+"$/i",
      handler: function(info) { return doc[key];}
    });
  });

  // var dialog_files = ['emoji.yaml', 'short.yaml'];
  // webot.dialog(dialog_files.map(function(f) {
  //   return __dirname + '/dialogs/' + f;
  // }));
  
  // var pages = ["search"];
  // pages.forEach(function(item) {
  //   webot.set(item, require('./' + item));
  // });
  
  var pages = ["services"];
  pages.forEach(function(item) {
    require('./' + item)(webot);
  });
};

