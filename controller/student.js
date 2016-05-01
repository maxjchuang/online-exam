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

    // 处理考试时间
    var now = new Date();
    _.each(examList, function (exam, index) {
      exam.status = '1'
      if (now < exam.beginTime) exam.status = '0'
      if (now > exam.endTime) exam.status = '2'

      exam.beginText = moment(exam.beginTime).format(Config.constant.datetimeFormat)
      exam.endText = moment(exam.endTime).format(Config.constant.datetimeFormat)
    })

    yield this.render('student/examList', {
      user: this.session.user,
      nav: {
        active: 'exam'
      },
      examList: examList,
      statusMap: Config.constant.examStatusMap,
    })
  },



}

