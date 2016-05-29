module.exports = {
  getStudentMark: function * (studentId, title) {
    var examList = yield Model.student.getExamListById(studentId)
      , scoreList = yield examList.map(function (item) {
          return Model.score.getStudentScore(studentId, item.paperId)
        })
      , mark = {title: "成绩", labels: [], datas: []}

    _.each(examList, function (exam, index) {
      if (scoreList[index][0]) {
        mark.labels.push(exam.name)
        mark.datas.push(scoreList[index][0].score)
      }
    })

    mark.labels.toString = function () {
      var str = ""
      _.each(this, function (item, index) {
        if (index) str+= ','
        str += '\"' + item + '\"'
      })
      return str
    }

    return mark

  }
}

