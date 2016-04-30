module.exports = {
  edit: function * () {
    var paperId = this.params.paperId
      , questionId = this.params.questionId
      , questionInfo = {choice: {}}

    if (typeof questionId !== 'undefined') {
      questionId = parseInt(questionId)
      questionInfo = (yield Model.question.getQuestionById(questionId))[0]
      // 解析题目选项
      questionInfo.choice = $.paramsToObj(questionInfo.choice)
    }

    yield this.render('question/edit', {
      paperId: paperId,
      questionInfo: questionInfo,
      user: this.session.user,
      nav: {
        active: 'paper'
      },
      cssList: [
        "/assets/css/question-form.css"
      ],
      jsList: [
        "/assets/js/question-type.js",
        "/assets/js/submit-form.js"
      ]
    })
  },

  save: function * () {
    var data = this.request.body
      , paperId = this.params.paperId
      , questionId = this.params.questionId

    _.extend(data, {paperId: paperId})

    // 处理choice对象
    data.choice = $.objToParams(data.choice)

    var result = (yield Model.question.upsertQuestion(data, questionId))

    this.body = {success: true, message: result}
    
  }
}
