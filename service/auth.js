module.exports = {
  init: function (type, user, password) {
    if (typeof user === 'undefined') {
      this.redirect($.format('/login?tips=%s#%s', 'userNotExist', type))
      return false
    }
  
    if (user.password !== password) {
      this.redirect($.format('/login?tips=%s#%s', 'wrongPassword', type))
      return false
    }
  
    this.session.user = user
    this.session.user.type = type
  
    return true
  
  },

  check: function * (next) {
    if (typeof this.session.user === 'undefined') {
      this.redirect($.format('/login?tips=%s#%s', 'userNotLogin', this.session.type))
    } else {
      yield next
    }
  }
}

