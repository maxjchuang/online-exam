module.exports = {

  login: function * () {
    var username = this.request.body.username
    var password = this.request.body.password

    var user = yield Model.teacher.getByName(username)

    if (Service.auth.init.bind(this)('teacher', user, password)) {
      this.redirect('/teacher')
    }
  },

  index: function * () {
    yield this.render('teacher/index', {
      user: this.session.user,
      nav: {
        active: 'index'
      }
    })
  },

  paper: function * () {
    var paperList = yield Model.paper.getPaperList()
      , paperClassList = yield paperList.map(function (paper) {
          return Model.paper.getPaperClassList(paper.paperId)
        })

    _.each(paperList, function (paper, index) {
      paper.classTextList = paperClassList[index].map(function (item) {
        return item.name
      })
    })

    yield this.render('teacher/paper', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      paperList: paperList
    })
  },

  markList: function * () {
    var paperId = parseInt(this.params.paperId)
      , info = yield {
          markList: Model.score.getMarkList(paperId),
          paperInfo: Model.paper.getPaperById(paperId)
        }
      , scoreList = yield info.markList.map(function (item) {
          return Model.score.getStudentScore(item.studentId, paperId)
        })

    _.each(info.markList, function (item, index) {
      item.score = scoreList[index][0] ? scoreList[index][0].score : undefined
    })

    yield this.render('teacher/mark-list', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      markList: info.markList,
      paperInfo: info.paperInfo[0],
      statusMap: Config.constant.examStatusMap
    })
  },

  mark: function * () {
    var paperId = parseInt(this.params.paperId)
      , studentId = parseInt(this.params.studentId)
      , info = yield {
          paper: Model.paper.getPaperById(paperId),
          student: Model.student.getStudentById(studentId),
          mark: Model.answer.getMarkById(paperId, studentId)
        }

    yield this.render('teacher/mark', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      paperInfo: info.paper[0],
      studentInfo: info.student[0],
      markInfo: info.mark,
      cssList: [
        "/assets/css/mark.css"
      ],
      jsList: [
        "/assets/js/submit-form.js"
      ]
    })
  },

  markSubmit: function * () {
    var paperId = parseInt(this.params.paperId)
      , studentId = parseInt(this.params.studentId)
      , data = this.request.body
      , answerList = []
      , score = 0
     
    _.each(data.score, function (mark, questionId) {
      answerList.push({
        studentId: studentId,
        questionId: questionId,
        score: mark || 0
      })
      score += parseInt(mark)
    })

    yield answerList.map(function (data) {
      return Model.answer.upsertAnswer(data)
    })

    yield Model.score.upsertScore({
      paperId: paperId,
      studentId: studentId,
      score: score
    })

    this.body = {success: true, message: "保存成功"}
  },

  class: function * () {
    var classList = yield Model.class.getClassList()
      , classPaperList = yield classList.map(function (_class) {
          return Model.class.getClassPaperList(_class.classId)
        })

    _.each(classList, function (_class, index) {
      _class.paperList = classPaperList[index]
    })

    yield this.render('teacher/class', {
      user: this.session.user,
      nav: {
        active: 'class'
      },
      classList: classList
    })
  },

  student: function * () {
    var studentList = yield Model.student.getStudentList()

    yield this.render('teacher/student', {
      user: this.session.user,
      nav: {
        active: 'student'
      },
      studentList: studentList
    })
  },

  studentMark: function * () {
    var studentId = parseInt(this.params.studentId)
      , student = (yield Model.student.getStudentById(studentId))[0]
      , mark = yield Service.mark.getStudentMark(studentId)

    yield this.render('teacher/studentMark', {
      user: this.session.user,
      mark: mark,
      name: student.name,
      jsList: [
        "/vendor/Chart.js/dist/Chart.min.js",
        "/assets/js/markChart.js"
      ],
      nav: {
        active: 'student'
      }
    })
  },

  paperMark: function * () {
    var paperId = parseInt(this.params.paperId)
      , paperInfo = (yield Model.paper.getPaperById(paperId))[0]
      , paperMarkList = yield Model.score.getPaperMarkList(paperId)
      , rankMap = $.getRank(paperMarkList, 'score')

    yield this.render('teacher/paperMark', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      rankMap: rankMap,
      paperInfo: paperInfo,
      paperMarkList: paperMarkList
    })
  },

  classMark: function * () {
    var paperId = parseInt(this.params.paperId)
      , classId = parseInt(this.params.classId)
      , classInfo = (yield Model.class.getClassById(classId))[0]
      , paperInfo = (yield Model.paper.getPaperById(paperId))[0]
      , classMarkList = yield Model.score.getClassMarkList(paperId, classId)
      , rankMap = $.getRank(classMarkList, 'score')

    yield this.render('teacher/classMark', {
      user: this.session.user,
      nav: {
        active: 'class'
      },
      rankMap: rankMap,
      classInfo: classInfo,
      paperInfo: paperInfo,
      classMarkList: classMarkList
    })
  }

}

