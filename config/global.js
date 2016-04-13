module.exports = {
  require: {
    '_': 'lodash',
    '$': 'koa-middlewares',
    'path': 'path',
    'fs': 'co-fs',
    'koa': 'koa',
    'thunkify': 'thunkify',
    'mysql': 'mysql'
  },

  include: {
    'Lib': 'lib',
    'Model': 'model',
    'Controller': 'controller',
    'Config': 'config'
  }

}
