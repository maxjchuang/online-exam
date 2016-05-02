module.exports = {

  getClassList: function * (paperId) {
    if (typeof paperId === 'undefined') {
      return (yield DB.query('SELECT classId, name FROM class'))[0]
    } else {
      return (yield DB.query('SELECT class.classId as classId, class.name as name FROM class, class_paper WHERE class.classId = class_paper.classId AND class_paper.paperId = ?', paperId))[0]
    }
  },

  updateClassPaper: function * (paperId, classList) {
    if (!paperId || !classList.length) return true

    var removeResult = yield DB.query('DELETE FROM class_paper WHERE paperId = ?', paperId)
    var insertResult = yield classList.map(function (item) {
      return DB.query('INSERT INTO class_paper SET ?', {classId: item, paperId: paperId})
    })

    return true

  }

}

