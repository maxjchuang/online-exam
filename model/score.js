module.exports = {

  getStudentScore: function * (studentId, paperId) {
    return (yield DB.query('SELECT studentId, paperId, score FROM score WHERE studentId = ? AND paperId = ?', [studentId, paperId]))[0]
  },

  upsertScore: function * (data) {
    var result = (yield DB.query('SELECT * FROM score WHERE studentId = ? AND paperId = ?', [data.studentId, data.paperId]))[0]
    if (result.length) {
      return (yield DB.query('UPDATE score SET ? WHERE studentId = ? AND paperId = ?', [{score: data.score}, data.studentId, data.paperId]))[0]
    } else {
      return (yield DB.query('INSERT INTO score SET ?', data))[0]
    }
  },

  getMarkList: function * (paperId) {
    return (yield DB.query('SELECT student.studentId as studentId, student.name as studentName, student.number as studentNumber, class.name as className FROM score, student, class WHERE score.paperId = ? AND score.studentId = student.studentId AND student.classId = class.classId', paperId))[0]
  },

  getPaperMarkList: function * (paperId) {
    return (yield DB.query('SELECT student.studentId as studentId, student.name as studentName, student.number as studentNumber, class.name as className, score FROM score, student, class WHERE score.paperId = ? AND score.studentId = student.studentId AND student.classId = class.classId ORDER BY score DESC', paperId))[0]
  },

  getClassMarkList: function * (paperId, classId) {
    return (yield DB.query('SELECT student.studentId as studentId, student.name as studentName, student.number as studentNumber, class.name as className, score FROM score, student, class WHERE score.paperId = ? AND class.classId = ? AND score.studentId = student.studentId AND student.classId = class.classId ORDER BY score DESC', [paperId, classId]))[0]
  },

}

