$(function () {
  var options = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD hh:mm:ss'
  }

  $('.datetimepicker').datetimepicker(options)
  $('.datetimepicker-max').datetimepicker($.extend(options, {
    useCurrent: false
  }))

  $('.datetimepicker-min').on('dp.change', function (e) {
    if ($('.datetimepicker-max').length) {
      $('.datetimepicker-max').data('DateTimePicker').minDate(e.date)
    }
  })

  $('.datetimepicker-max').on('dp.change', function (e) {
    if ($('.datetimepicker-min').length) {
      $('.datetimepicker-min').data('DateTimePicker').maxDate(e.date)
    }
  })
})
