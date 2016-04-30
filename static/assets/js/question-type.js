(function (docment) {
  var onQuestionTypeChange = function () {
    if ($('#question-type').val() == "1") {
      $('#question-choice').show()
      $('#question-choice input').prop('disabled', false)
    } else {
      $('#question-choice').hide()
      $('#question-choice input').prop('disabled', true)
    }
  }

  $('#question-type').bind('change', onQuestionTypeChange)
  onQuestionTypeChange()
})(document)
