module.exports = {
  init: function * (next) {
    var db = {}
    db.pool = mysql.createPool(Config.db)
    //db.query = thunkify(db.pool.query).bind(db.pool)
    db.query = function * () {
      var connection = yield thunkify(db.pool.getConnection).bind(db.pool)()
      var result = yield thunkify(connection.query).apply(connection, arguments)
      connection.release()

      return result
    }

    global.DB = db

    yield next
  }
}
