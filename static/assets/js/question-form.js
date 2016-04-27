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
  onQuestionTypeChange()

  $('#question-type').bind('change', onQuestionTypeChange)

  $('#question-form').bind('submit', function () {
    var arr = $(this).serializeArray()
      , data = {}
      , choiceList = ['A', 'B', 'C', 'D']

    $.each(arr, function (index, item) {
      data[item.name] = item.value
    })

    data.choice = {}
    $.each(choiceList, function (index, item) {
      data.choice[item] = data["choice['" + item + "']"]
      delete data["choice['" + item + "']"]
    })

    var url = $('#question-form').attr('action')
    $('#submit-btn').text("保存中，请稍候...")
    $.post(url, data, function (result) {
      if (result && result.success === true) {
        alert("保存成功")
      } else {
        alert("保存失败")
      }
      $('#submit-btn').text("保存试题")
    })

    return false;
  })

})(document)
