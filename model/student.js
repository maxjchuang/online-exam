module.exports = {

  getByNumber: function * (number) {
    var results = (yield DB.query('SELECT * FROM student WHERE number = ? limit 1', number))[0]
    return results[0]
  }

}

