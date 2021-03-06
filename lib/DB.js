module.exports = {
  init: function () {
    var db = {}
    db.pool = mysql.createPool(Config.db)
    db.query = thunkify(db.pool.query).bind(db.pool)

    global.DB = db
  }
}
