module.exports = {

  upsertAnswer: function * (data) {
    var studentId = data.studentId
      , questionId = data.questionId
      , result = (yield DB.query('SELECT * FROM answer WHERE studentId = ? AND questionId = ?', [studentId, questionId]))[0]

    if (result.length) {
      delete data.studentId
      delete data.questionId
      return (yield DB.query('UPDATE answer SET ? WHERE studentId = ? AND questionId = ?', [data, studentId, questionId]))[0]
    } else {
      return (yield DB.query('INSERT INTO answer SET ?', data))[0]
    }
  },

  getMarkById: function * (paperId, studentId) {
    return (yield DB.query('SELECT question.questionId as questionId, question.type as type, question.`describe` as `describe`, question.score as questionScore, question.choice as choice, question.answer as questionAnswer, question.autoMark as autoMark, question.`order` as `order`, answer.studentId as studentId, answer.answer as studentAnswer, answer.score as studentScore FROM question, answer WHERE question.paperId = ? AND answer.studentId = ? AND answer.questionId = question.questionId ORDER BY `order`, questionId DESC', [paperId, studentId]))[0]
  }


}

