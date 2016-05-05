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
  }

}

