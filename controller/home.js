module.exports = {

  render: function* () {
    if (!this.session.user) {
      return this.status = 403;
    }

    yield this.render('home', {
      user: this.session.user
    });
  }

}

