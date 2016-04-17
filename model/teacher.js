module.exports = {

  getByName: function * (name) {
    var results = (yield DB.query('SELECT name, password FROM teacher WHERE name = ? limit 1', name))[0]
    return results[0]
  },

  getClassList: function * () {
    return (yield DB.query('SELECT name FROM class'))[0]
  },

  getStudentList: function * () {
    return (yield DB.query('SELECT student.name as studentName, student.number as studentNumber, class.name as className FROM class, student WHERE student.classId = class.classId'))[0]
  }

}

