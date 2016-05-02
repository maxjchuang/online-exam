module.exports = {

  getPaperList: function * () {
    return (yield DB.query('SELECT paperId, name FROM paper'))[0]
  },

  getPaperClassList: function * (paperId) {
    return (yield DB.query('SELECT class.name as name, class.classId as classId FROM class, class_paper WHERE class.classId = class_paper.classId AND class_paper.paperId = ?', paperId))[0]
  },

  getPaperById: function * (paperId) {
    return (yield DB.query('SELECT paperId, name, beginTime, endTime FROM paper WHERE paperId = ?', paperId))[0]
  },

  getQuestionListById: function * (paperId) {
    return (yield DB.query('SELECT questionId, type, `describe`, score, choice, answer, autoMark, `order` FROM question WHERE paperId = ? ORDER BY `order`, questionId DESC', paperId))[0]
  },

  upsertPaper: function * (data, paperId) {
    if (typeof paperId === 'undefined') {
      return (yield DB.query('INSERT INTO paper SET ? ', data))[0]
    } else {
      return (yield DB.query('UPDATE paper SET ? WHERE paperId = ?', [data, paperId]))[0]
    }
  }
}

