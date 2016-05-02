module.exports = {

  questionList: function * () {
    var paperId = parseInt(this.params.paperId)

    var info = yield {
      paperInfo: Model.paper.getPaperById(paperId),
      questionList: Model.paper.getQuestionListById(paperId),
    }

    yield this.render('paper/question-list', {
      paperInfo: info.paperInfo[0],
      questionList: info.questionList,
      user: this.session.user,
      questionTypeMap: Config.constant.questionTypeMap,
      nav: {
        active: 'paper'
      }
    })
  },

  edit: function * () {
    var paperId = parseInt(this.params.paperId) || undefined
      , paperInfo = {}
      , classList = yield Model.class.getClassList()

    if (paperId) {
      var paperInfo = (yield Model.paper.getPaperById(paperId))[0]

      // 日期格式转换
      paperInfo.beginTime = moment(paperInfo.beginTime).format(Config.constant.datetimeFormat)
      paperInfo.endTime = moment(paperInfo.endTime).format(Config.constant.datetimeFormat)

      var selectedList = (yield Model.class.getClassList(paperId)).map(function (item) {
        return item.classId
      })

      _.each(classList, function (item) {
        if (selectedList.indexOf(item.classId) > -1) item.selected = true
      })
    }

    yield this.render('paper/edit', {
      paperInfo: paperInfo,
      user: this.session.user,
      questionTypeMap: Config.constant.questionTypeMap,
      classList: classList,
      nav: {
        active: 'paper'
      },
      cssList: [
        "/vendor/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"
      ],
      jsList: [
        "/vendor/moment/min/moment-with-locales.min.js",
        "/vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
        "/assets/js/datetime-picker.js",
        "/assets/js/submit-form.js"
      ]
    })
  },

  save: function * () {
    var data = this.request.body
      , paperId = this.params.paperId ? parseInt(this.params.paperId) : undefined
      , classList = data.classList

    delete data.classList

    yield Model.paper.upsertPaper(data, paperId)
    yield Model.class.updateClassPaper(paperId, classList)

    this.body = {success: true, message: "保存成功"}
  }

}
