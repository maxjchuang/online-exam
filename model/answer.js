module.exports = {

  upsertAnswer: function * (data) {
    var result = (yield DB.query('SELECT * FROM answer WHERE studentId = ? AND questionId = ?', [data.studentId, data.questionId]))[0]

    if (result.length) {
      return (yield DB.query('UPDATE answer SET ? WHERE studentId = ? AND questionId = ?', [{answer: data.answer, score: data.score}, data.studentId, data.questionId]))[0]
    } else {
      return (yield DB.query('INSERT INTO answer SET ?', data))[0]
    }
  },

}

