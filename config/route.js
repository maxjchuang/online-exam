module.exports = [
  ['get', '/', Controller.home.render],
  ['get', '/login', Controller.auth.render],
  ['post', '/student/login', Controller.student.login],
  ['post', '/teacher/login', Controller.teacher.login],
  ['get', '/logout', Controller.auth.logout]
];
