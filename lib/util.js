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
      },

      getExamStatus: function (exam) {
        // 处理考试时间
        var now = new Date()
        if (exam.score || exam.score === null) {
          exam.status = '3'
        } else {
          exam.status = '2'
          if (now < exam.beginTime) exam.status = '0'
          if (now >= exam.beginTime && now < exam.endTime) exam.status = '1'
        }

        exam.beginText = moment(exam.beginTime).format(Config.constant.datetimeFormat)
        exam.endText = moment(exam.endTime).format(Config.constant.datetimeFormat)
      },

      getRank: function (arr, key) {
        var rankMap = {}, i = 1
        _.each(arr, function (item, index) {
          if (rankMap[item[key]] === undefined) {
            rankMap[item[key]] = i
            i++
          }
        })
        return rankMap
      }

    })

  }
}
