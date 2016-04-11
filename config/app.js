module.exports = {
  port: 3000,
  static: {
    path: path.join(basePath, 'static'),
    options: {
      maxAge: 60 * 60 * 24 * 7
    }
  },
  view: {
    root: path.join(basePath, 'view'),
    layout: false
  },
  session: {
    keys: ['max', 'for', 'katy']
  }
}
