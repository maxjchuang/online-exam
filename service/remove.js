module.exports = function * () {
  var table = this.params.table
    , key   = table + 'Id'
    , value = parseInt(this.params.key)
    , sql   = 'DELETE FROM ' + table + ' WHERE ' + key + ' = ' + value

  var result = yield DB.query(sql)

  this.body = {success: true, message: "删除成功"}
}
  


