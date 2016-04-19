module.exports = [
  ['get', '/', Controller.auth.render],
  ['get', '/login', Controller.auth.render],
  ['get', '/logout', Controller.auth.logout],

  // student
  ['get', '/student', Service.auth.check, Controller.student.index],
  ['post', '/student/login', Controller.student.login],

  // teacher
  ['post', '/teacher/login', Controller.teacher.login],
  ['get', '/teacher', Service.auth.check, Controller.teacher.index],
  ['get', '/teacher/paper', Service.auth.check, Controller.teacher.paper],
  ['get', '/teacher/class', Service.auth.check, Controller.teacher.class],
  ['get', '/teacher/student', Service.auth.check, Controller.teacher.student],

  // paper
  ['get', '/paper/edit/:paperId', Service.auth.check, Controller.paper.edit]
];
