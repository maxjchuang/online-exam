module.exports = function (app) {
  app.use($.router(app));

  var method;
  _.each(Config.route, function (item) {
    method = item[0];
    item.splice(0, 1);
  
    app[method].apply(this, item);
  });

}

