require('./lib/global').init(__dirname);

var app = koa();

// database
app.use(Lib.DB.init);

// logger
app.use($.logger());

// static cache
app.use($.staticCache(Config.app.static.path, Config.app.static.options));

// ejs
$.ejs(app, Config.app.view);

app.use($.bodyParser());

// for signed cookie
app.keys = Config.app.session.keys;
app.use($.session());

// error handler
$.onerror(app);

// router
Lib.router(app);

app.listen(Config.app.port);
