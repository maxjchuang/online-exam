module.exports = {

  login: function* () {
    var username = this.request.body.username;
    var password = this.request.body.password;

    var user = Model.user.get(username);

    if (user.password !== password) {
      return this.status = 400;
    }

    this.session.user = {
      name: user.name
    };

    this.redirect('/');
  },


  logout: function* () {
    this.session = null;
    this.redirect('/login');
  },


  render: function* () {
    yield this.render('login');
  }

}

