module.exports = {

  login: function * () {
    var number = this.request.body.number
    var password = this.request.body.password

    var user = yield Model.student.getByNumber(number)

    if (Service.auth.init.bind(this)('student', user, password)) {
      this.redirect('/student')
    }
  },

  index: function * () {
    yield this.render('student/index', {
      user: this.session.user,
      nav: {
        active: 'index'
      }
    })
  },

  examList: function * () {
    var studentId = this.session.user.studentId
      , examList = yield Model.student.getExamListById(studentId)

    _.each(examList, function (exam, index) {
      $.getExamStatus(exam)
    })

    yield this.render('student/exam-list', {
      user: this.session.user,
      nav: {
        active: 'exam'
      },
      examList: examList,
      statusMap: Config.constant.examStatusMap,
    })
  },

  exam: function * () {
    var paperId = parseInt(this.params.paperId)

    var info = yield {
      paperInfo: Model.paper.getPaperById(paperId),
      questionList: Model.paper.getQuestionListById(paperId),
    }

    $.getExamStatus(info.paperInfo)

    switch (info.paperInfo.status) {
      case '0':
        throw new Error(Config.constant.error['examNotBegin'])
      break
      case '2':
        throw new Error(Config.constant.error['examEnded'])
      break
      case '1':
        // 解析题目选项
        _.each(info.questionList, function (questionInfo) {
          questionInfo.choice = $.paramsToObj(questionInfo.choice)
        })

        yield this.render('student/exam', {
          paperInfo: info.paperInfo[0],
          questionList: info.questionList,
          user: this.session.user,
          questionTypeMap: Config.constant.questionTypeMap,
          nav: {
            active: 'exam'
          },
          cssList: [
            "/assets/css/exam.css"
          ]
        })
      break
      default:
        throw new Error(Config.constant.error['examError'])
    }
  }



}

