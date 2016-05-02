module.exports = {

  getByNumber: function * (number) {
    var results = (yield DB.query('SELECT studentId, classId, name, number, password FROM student WHERE number = ? limit 1', number))[0]
    return results[0]
  },

  getExamListById: function * (studentId) {
    return (yield DB.query('SELECT paper.paperId as paperId, paper.name as name , paper.beginTime as beginTime, paper.endTime as endTime FROM class, student, paper, class_paper WHERE student.classId = class.classId AND student.studentId = ? AND class_paper.classId = class.classId AND class_paper.paperId = paper.paperId', studentId))[0]
  },

  getStudentList: function * () {
    return (yield DB.query('SELECT student.name as studentName, student.number as studentNumber, class.name as className FROM class, student WHERE student.classId = class.classId'))[0]
  },

  upsertAnswer: function * (data) {
    var result = (yield DB.query('SELECT * FROM answer WHERE studentId = ? AND questionId = ?', [data.studentId, data.questionId]))[0]

    if (result.length) {
      return (yield DB.query('UPDATE answer SET ? WHERE studentId = ? AND questionId = ?', [{answer: data.answer, score: data.score}, data.studentId, data.questionId]))[0]
    } else {
      return (yield DB.query('INSERT INTO answer SET ?', data))[0]
    }
  }


}

