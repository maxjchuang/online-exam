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
          ],
          jsList: [
            "/assets/js/submit-form.js"
          ]
        })
      break
      default:
        throw new Error(Config.constant.error['examError'])
    }
  },

  examSubmit: function * () {
    var data = this.request.body
      , paperId = parseInt(this.params.paperId)
      , questionList = yield Model.paper.getQuestionListById(paperId)
      , user = this.session.user
      , answerDataList = []
      , mark = null
      , answer

    _.each(questionList, function (item) {
      mark = null
      answer = data[item.questionId]
      if (item.autoMark) {
        if (answer === item.answer) mark = item.score
        else mark = 0
      }

      answerDataList.push({
        studentId: user.studentId,
        questionId: item.questionId,
        answer: answer,
        score: mark
      })
    })

    yield answerDataList.map(function (data) {
      return Model.answer.upsertAnswer(data)
    })

    yield Model.score.upsertScore({
      studentId: user.studentId,
      paperId: paperId,
      score: null
    })

    this.body = {success: true, message: "保存成功"}
  }


}

