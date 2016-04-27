var include = require('include-all');
var config = require('../config/global');

module.exports = {
  init: function (dirname) {
    global.basePath = dirname
  
    var name
    for (name in config.require) {
      global[name] = require(config.require[name])
    }
  
    for (name in config.include) {
      global[name] = include({
        dirname: basePath + '/' + config.include[name], filter: /(.+)\.js$/
      })
    }
  }
}
