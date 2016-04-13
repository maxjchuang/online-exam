module.exports = {

  login: function * () {
    var number = this.request.body.number;
    var password = this.request.body.password;

    var user = yield Model.student.getByNumber(number);

    if (user.password !== password) {
      return this.redirect('/login')
    }

    this.session.user = {
      name: user.name,
      number: user.number,
      type: 'student'
    };

    this.redirect('/');
  },

}

