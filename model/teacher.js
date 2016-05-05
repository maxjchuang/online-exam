module.exports = {

  getByName: function * (name) {
    var results = (yield DB.query('SELECT name, password FROM teacher WHERE name = ? limit 1', name))[0]
    return results[0]
  }

}

