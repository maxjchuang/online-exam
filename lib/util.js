module.exports = {
  init: function () {

    // 扩展原生的util对象方法
    _.extend($, {

      // 解析URLEncode的请求字符串为对象形式
      paramsToObj: function (str) {
        var obj = {}, arr = []

        if (str && str !== "") {
          arr = str.split('&')
          _.each(arr, function (item) {
            obj[item.split('=')[0]] = decodeURIComponent(item.split('=')[1])
          })
        }

        return obj
      },

      objToParams: function (obj) {
        var str = "", i = 0

        _.each(obj, function (value, key) {
          if (i) str += '&'
          str += key + '=' + encodeURIComponent(value)
          i++
        })

        return str
      }

    })

  }
}