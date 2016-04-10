require('./lib/initGlobal')(__dirname);

var app = koa();


// ejs
$.ejs(app, {
  root: path.join(__dirname, 'view'),
  layout: false
});

app.use($.bodyParser());

// for signed cookie
app.keys = ['i', 'am', 'secret'];
app.use($.session());

// error handler
app.use(Lib.errorHandler);

// router
Lib.router(app, this);

app.listen(3000);
