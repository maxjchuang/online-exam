module.exports = {

  logout: function* () {
    this.session = null
    this.redirect('/login')
  },

  render: function* () {
    var tipsKey   = this.query.tips
      , classList = yield Model.class.getClassList()

    yield this.render('login', {
      tips: Config.constant.loginTips[tipsKey],
      classList: classList,
      jsList: [
        "/assets/js/submit-form.js"
      ]
    })
  }

}

