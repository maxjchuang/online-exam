module.exports = function* (next) {
  try {
    yield next;
  } catch (err) {
    this.app.emit('error', err, this);
    debugger;
    this.body = err.message;
    this.status = err.status || 500;
  }
}
