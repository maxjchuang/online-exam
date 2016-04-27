module.exports = {

  getQuestionById: function * (questionId) {
    return (yield DB.query('SELECT questionId, paperId, type, `describe`, score, choice, answer, autoMark, `order` FROM question WHERE questionId = ?', questionId))[0]
  },

  upsertQuestion: function * (data, questionId) {
    if (typeof questionId === 'undefined') {
      return (yield DB.query('INSERT INTO question SET ? ', data))[0]
    } else {
      return (yield DB.query('UPDATE question SET ? WHERE questionId = ?', [data, questionId]))[0]
    }
  }
}

