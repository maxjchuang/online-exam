(function (docment) {

  $('.remove-btn').bind('click', function (e) {
    var table = $(this).data('table')
      , key   = $(this).data('key')
      , url   = '/remove/' + table + '/' + key

    $.get(url, function (result) {
      if (result && result.success === true) {
        alert("删除成功")
        location.reload()
      } else {
        alert("删除失败")
      }
    })
  })

})(document)
