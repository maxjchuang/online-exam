module.exports = {

  logout: function* () {
    this.session = null
    this.redirect('/login')
  },

  render: function* () {
    var tipsKey = this.query.tips

    yield this.render('login', {
      tips: Config.constant.loginTips[tipsKey]
    })
  }

}

