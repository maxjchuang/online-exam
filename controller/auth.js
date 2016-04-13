module.exports = {

  logout: function* () {
    this.session = null;
    this.redirect('/login');
  },

  render: function* () {
    yield this.render('login');
  }

}

