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
          markList: Model.teacher.getMarkList(paperId),
          paperInfo: Model.paper.getPaperById(paperId)
        }

    yield this.render('teacher/mark-list', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      markList: info.markList,
      paperInfo: info.paperInfo[0]
    })
  },

  mark: function * () {
    var paperId = parseInt(this.params.paperId)
      , studentId = parseInt(this.params.studentId)
      , info = yield {
          paper: Model.paper.getPaperById(paperId),
          student: Model.student.getStudentById(studentId),
          mark: Model.teacher.getMarkById(paperId, studentId)
        }

    yield this.render('teacher/mark', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      paperInfo: info.paper[0],
      studentInfo: info.student[0],
      markInfo: info.mark,
      jsList: [
        "/assets/js/submit-form.js"
      ]
    })
  },

  markSubmit: function * () {
    var paperId = parseInt(this.params.paperId)
      , studentId = parseInt(this.params.studentId)
      , data = this.request.body
      , score = 0
     
    _.each(data.score, function (item) {
      score += parseInt(item)
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
  }

}

