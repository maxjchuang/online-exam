module.exports = {

  list: [
    {name: "admin", password: "admin123"},
    {name: "visitor", password: "visitor123"}
  ],

  get: function (name) {
    return _.find(this.list, {name: name});
  }
}
