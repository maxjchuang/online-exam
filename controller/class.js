module.exports = {
  edit: function * () {
    var classId = parseInt(this.params.classId) || undefined
      , classInfo = {}

    if (classId) {
      var classInfo = (yield Model.class.getClassById(classId))[0]
    }

    yield this.render('class/edit', {
      classInfo: classInfo,
      user: this.session.user,
      nav: {
        active: 'class'
      },
      jsList: [
        "/assets/js/submit-form.js"
      ]
    })
  },

  save: function * () {
    var data = this.request.body
      , classId = this.params.classId ? parseInt(this.params.classId) : undefined

    yield Model.class.upsertClass(data, classId)

    this.body = {success: true, message: "保存成功"}
  }

}

