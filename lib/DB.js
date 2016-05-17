module.exports = {
  init: function * (next) {
    var db = {}
    db.conn = mysql.createConnection(Config.db)
    db.conn.connect()
    db.query = function () {
      return thunkify(db.conn.query).apply(db.conn, arguments)
    }
    db.close = function () {
      db.conn.end()
    }

    global.DB = db

    yield next
  },

  close: function * (next) {
    DB.close()
  }
}
