module.exports = {

  render: function* () {
    if (!this.session.user) {
      return this.redirect('/login')
    }

    yield this.render('home', {
      user: this.session.user
    })
  }

}

