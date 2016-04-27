module.exports = {

  getPaperList: function * () {
    return (yield DB.query('SELECT class.name as className, paper.paperId as paperId, paper.name as paperName FROM class, paper, class_paper WHERE class_paper.classId = class.classId AND class_paper.paperId = paper.paperId'))[0]
  },

  getPaperById: function * (paperId) {
    return (yield DB.query('SELECT paperId, name FROM paper WHERE paperId = ?', paperId))[0]
  },

  getQuestionListById: function * (paperId) {
    return (yield DB.query('SELECT questionId, type, `describe`, score, choice, answer, autoMark, `order` FROM question WHERE paperId = ? ORDER BY `order`, questionId DESC', paperId))[0]
  },

}

