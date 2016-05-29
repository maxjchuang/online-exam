module.exports = [
  ['get', '/', Controller.auth.render],
  ['get', '/login', Controller.auth.render],
  ['get', '/logout', Controller.auth.logout],

  // student
  ['get', '/student', Service.auth.check, Controller.student.index],
  ['post', '/student/login', Controller.student.login],
  ['get', '/student/examList', Service.auth.check, Controller.student.examList],
  ['get', '/student/exam/:paperId', Service.auth.check, Controller.student.exam],
  ['post', '/student/exam/submit/:paperId', Service.auth.check, Controller.student.examSubmit],
  ['get', '/student/paper/:paperId', Service.auth.check, Controller.student.paper],
  ['get', '/student/mark', Service.auth.check, Controller.student.mark],

  // teacher
  ['post', '/teacher/login', Controller.teacher.login],
  ['get', '/teacher', Service.auth.check, Controller.teacher.index],
  ['get', '/teacher/paper', Service.auth.check, Controller.teacher.paper],
  ['get', '/teacher/class', Service.auth.check, Controller.teacher.class],
  ['get', '/teacher/student', Service.auth.check, Controller.teacher.student],
  ['get', '/teacher/mark/:paperId', Service.auth.check, Controller.teacher.markList],
  ['get', '/teacher/mark/:paperId/:studentId', Service.auth.check, Controller.teacher.mark],
  ['post', '/teacher/mark/submit/:paperId/:studentId', Service.auth.check, Controller.teacher.markSubmit],
  ['get', '/teacher/student/mark/:studentId', Service.auth.check, Controller.teacher.studentMark],
  ['get', '/teacher/paper/mark/:paperId', Service.auth.check, Controller.teacher.paperMark],
  ['get', '/teacher/class/mark/:classId/:paperId', Service.auth.check, Controller.teacher.classMark],

  // class
  ['get', '/class/add', Service.auth.check, Controller.class.edit],
  ['get', '/class/edit/:classId', Service.auth.check, Controller.class.edit],
  ['post', '/class/create', Service.auth.check, Controller.class.save],
  ['post', '/class/update/:classId', Service.auth.check, Controller.class.save],

  // paper
  ['get', '/paper/question/list/:paperId', Service.auth.check, Controller.paper.questionList],
  ['get', '/paper/edit/:paperId', Service.auth.check, Controller.paper.edit],
  ['get', '/paper/add', Service.auth.check, Controller.paper.edit],
  ['post', '/paper/create', Service.auth.check, Controller.paper.save],
  ['post', '/paper/update/:paperId', Service.auth.check, Controller.paper.save],

  // question
  ['get', '/paper/:paperId/question/edit/:questionId', Service.auth.check, Controller.question.edit],
  ['get', '/paper/:paperId/question/add', Service.auth.check, Controller.question.edit],
  ['post', '/paper/:paperId/question/create', Service.auth.check, Controller.question.save],
  ['post', '/paper/:paperId/question/update/:questionId', Service.auth.check, Controller.question.save]
];
