module.exports = {
  edit: function * () {
    var paperId = parseInt(this.params.paperId)

    var info = yield {
      paperInfo: Model.paper.getPaperById(paperId),
      questionList: Model.paper.getQuestionListById(paperId),
    }

    yield this.render('paper/edit', {
      paperInfo: info.paperInfo[0],
      questionList: info.questionList,
      user: this.session.user,
      questionTypeMap: {
        '1': "选择题",
        '2': "填空题",
        '3': "简答题"
      },
      nav: {
        active: 'paper'
      }
    })
  }

}
