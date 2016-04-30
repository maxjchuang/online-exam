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
    var paperId = parseInt(this.params.paperId)
      , paperInfo = (yield Model.paper.getPaperById(paperId))[0]

    // 日期格式转换
    paperInfo.beginTime = moment(paperInfo.beginTime).format(Config.constant.datetimeFormat)
    paperInfo.endTime = moment(paperInfo.endTime).format(Config.constant.datetimeFormat)

    yield this.render('paper/edit', {
      paperInfo: paperInfo,
      user: this.session.user,
      questionTypeMap: Config.constant.questionTypeMap,
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
      , paperId = this.params.paperId

    var result = (yield Model.paper.upsertPaper(data, paperId))

    this.body = {success: true, message: result}
  }

}
