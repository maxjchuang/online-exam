module.exports = {

  getByName: function * (name) {
    var results = (yield DB.query('SELECT name, password FROM teacher WHERE name = ? limit 1', name))[0]
    return results[0]
  },

  getMarkList: function * (paperId) {
    return (yield DB.query('SELECT student.studentId as studentId, student.name as studentName, student.number as studentNumber, class.name as className FROM score, student, class WHERE score.paperId = ? AND score.studentId = student.studentId AND student.classId = class.classId', paperId))[0]
  },

  getMarkById: function * (paperId, studentId) {
    return (yield DB.query('SELECT question.questionId as questionId, question.type as type, question.`describe` as `describe`, question.score as questionScore, question.choice as choice, question.answer as questionAnswer, question.autoMark as autoMark, question.`order` as `order`, answer.studentId as studentId, answer.answer as studentAnswer, answer.score as studentScore FROM question, answer WHERE question.paperId = ? AND answer.studentId = ? AND answer.questionId = question.questionId ORDER BY `order`, questionId DESC', [paperId, studentId]))[0]
  },


}

