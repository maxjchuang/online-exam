module.exports = {
  require: {
    '_': 'lodash'
    , '$': 'util'
    , 'middlewares': 'koa-middlewares'
    , 'path': 'path'
    , 'fs': 'co-fs'
    , 'koa': 'koa'
    , 'thunkify': 'thunkify'
    , 'mysql': 'mysql'
    , 'moment': 'moment'
  },

  include: {
    'Lib': 'lib'
    , 'Model': 'model'
    , 'Service': 'service'
    , 'Controller': 'controller'
    , 'Config': 'config'
  }

}
