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

  check: function (type) {
    type = type === 'teacher' ? 'teacher' : 'student'

    return function * (next) {
      var user = this.session.user

      if (typeof user === 'undefined') {
        this.redirect($.format('/login?tips=%s#%s', 'userNotLogin', this.session.type))
      } else {
        if (user.type !== 'teacher' && user.type !== type) {
          this.status = 403
        } else {
          yield next
        }
      }
    }
  }
    
}

