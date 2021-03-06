module.exports = {

  getStudentById: function * (studentId) {
    return (yield DB.query('SELECT studentId, classId, name, number, password FROM student WHERE studentId = ? limit 1', studentId))[0]
  },

  getByNumber: function * (number) {
    var results = (yield DB.query('SELECT studentId, classId, name, number, password FROM student WHERE number = ? limit 1', number))[0]
    return results[0]
  },

  getExamListById: function * (studentId) {
    return (yield DB.query('SELECT paper.paperId as paperId, paper.name as name , paper.beginTime as beginTime, paper.endTime as endTime FROM class, student, paper, class_paper WHERE student.classId = class.classId AND student.studentId = ? AND class_paper.classId = class.classId AND class_paper.paperId = paper.paperId', studentId))[0]
  },

  getStudentList: function * () {
    return (yield DB.query('SELECT student.studentId as studentId, student.name as studentName, student.number as studentNumber, class.name as className FROM class, student WHERE student.classId = class.classId'))[0]
  },

  createStudent: function * (data) {
    return (yield DB.query('INSERT INTO student SET ?', data))
  }

}

