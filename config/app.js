module.exports = {
  port: 3000,
  static: {
    path: path.join(basePath, 'static'),
    options: {
      maxAge: 0 * 60 * 60 * 24 * 7
    }
  },
  view: {
    root: path.join(basePath, 'view'),
    cache: false,
    debug: true,
    layout: 'layout'
  },
  session: {
    keys: ['max', 'for', 'katy']
  }
}
