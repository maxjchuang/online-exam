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

    yield this.render('teacher/paper', {
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      paperList: paperList
    })
  },


  class: function * () {
    var classList = yield Model.teacher.getClassList()

    yield this.render('teacher/class', {
      user: this.session.user,
      nav: {
        active: 'class'
      },
      classList: classList
    })
  },

  student: function * () {
    var studentList = yield Model.teacher.getStudentList()

    yield this.render('teacher/student', {
      user: this.session.user,
      nav: {
        active: 'student'
      },
      studentList: studentList
    })
  }

}

