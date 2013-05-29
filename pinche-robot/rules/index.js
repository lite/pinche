module.exports = function(webot) {
  var pages = ['news', 'help', 'home', "bmw", "search"];
  pages.forEach(function(item) {
    webot.set(item, require('./' + item));
  });

  require('js-yaml');

  // var dialog_files = ['emoji.yaml', 'short.yaml'];
  // webot.dialog(dialog_files.map(function(f) {
  //   return __dirname + '/dialogs/' + f;
  // }));
};

