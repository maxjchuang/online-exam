var include = require('include-all');
var config = require('../config/global');

module.exports = function (basePath) {
  var name;
  for (name in config.require) {
    global[name] = require(config.require[name]);
  }

  for (name in config.include) {
    global[name] = include({dirname: basePath + '/' + config.include[name], filter: /(.+)\.js$/});
  }
}
