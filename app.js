require('./lib/global').init(__dirname)

var app = koa()

// util
Lib.util.init()

// middlewares
Lib.middlewares.init()

// database
Lib.DB.init()

// logger
app.use(middlewares.logger())

// static
app.use(middlewares.static(Config.app.static.path))

// ejs
middlewares.ejs(app, Config.app.view)

app.use(middlewares.bodyParser())

// for signed cookie
app.keys = Config.app.session.keys
app.use(middlewares.session())

// error handler
middlewares.onerror(app)

// router
Lib.router(app)

app.listen(Config.app.port)
