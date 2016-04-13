module.exports = {

  login: function * () {
    var username = this.request.body.username;
    var password = this.request.body.password;

    var user = yield Model.teacher.getByName(username);

    if (user.password !== password) {
      return this.redirect('/login')
    }

    this.session.user = {
      name: user.name,
      type: 'teacher'
    };

    this.redirect('/');
  },

}

