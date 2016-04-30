(function (docment) {

  $('#submit-form').bind('submit', function () {
    var arr = $(this).serializeArray()
      , data = {}

    $.each(arr, function (index, item) {
      data[item.name] = item.value
    })

    // 选择题时对题目选项的特殊处理逻辑
    if (typeof data.type === '1') {
      var  choiceList = ['A', 'B', 'C', 'D']
      data.choice = {}
      $.each(choiceList, function (index, item) {
        data.choice[item] = data["choice['" + item + "']"]
        delete data["choice['" + item + "']"]
      })
    }


    var url = $(this).attr('action')
    $('#submit-btn').text("保存中，请稍候...").attr('disabled', 'disabled')
    $.post(url, data, function (result) {
      if (result && result.success === true) {
        alert("保存成功")
      } else {
        alert("保存失败")
      }
      $('#submit-btn').text("保存").removeAttr("disabled")
    })

    return false;
  })

})(document)
