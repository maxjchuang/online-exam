module.exports = [
  ['get', '/', Controller.auth.render],
  ['get', '/login', Controller.auth.render],
  ['get', '/logout', Controller.auth.logout],

  // student
  ['get', '/student', Service.auth.check, Controller.student.index],
  ['post', '/student/login', Controller.student.login],

  // teacher
  ['get', '/teacher', Service.auth.check, Controller.teacher.index],
  ['post', '/teacher/login', Controller.teacher.login]
];
