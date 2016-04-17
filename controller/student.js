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
      user: this.session.user
    })
  }

}

