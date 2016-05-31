module.exports = [
  ['get', '/', Controller.auth.render],
  ['get', '/login', Controller.auth.render],
  ['get', '/logout', Controller.auth.logout],

  ['get', '/remove/:table/:key', Service.auth.check('teacher'), Service.remove],

  // student
  ['get', '/student', Service.auth.check(), Controller.student.index],
  ['post', '/student/login', Controller.student.login],
  ['post', '/student/signup', Controller.student.signup],
  ['get', '/student/examList', Service.auth.check(), Controller.student.examList],
  ['get', '/student/exam/:paperId', Service.auth.check(), Controller.student.exam],
  ['post', '/student/exam/submit/:paperId', Service.auth.check(), Controller.student.examSubmit],
  ['get', '/student/paper/:paperId', Service.auth.check(), Controller.student.paper],
  ['get', '/student/mark', Service.auth.check(), Controller.student.mark],

  // teacher
  ['post', '/teacher/login', Controller.teacher.login],
  ['get', '/teacher', Service.auth.check('teacher'), Controller.teacher.index],
  ['get', '/teacher/paper', Service.auth.check('teacher'), Controller.teacher.paper],
  ['get', '/teacher/class', Service.auth.check('teacher'), Controller.teacher.class],
  ['get', '/teacher/student', Service.auth.check('teacher'), Controller.teacher.student],
  ['get', '/teacher/mark/:paperId', Service.auth.check('teacher'), Controller.teacher.markList],
  ['get', '/teacher/mark/:paperId/:studentId', Service.auth.check('teacher'), Controller.teacher.mark],
  ['post', '/teacher/mark/submit/:paperId/:studentId', Service.auth.check('teacher'), Controller.teacher.markSubmit],
  ['get', '/teacher/student/mark/:studentId', Service.auth.check('teacher'), Controller.teacher.studentMark],
  ['get', '/teacher/paper/mark/:paperId', Service.auth.check('teacher'), Controller.teacher.paperMark],
  ['get', '/teacher/class/mark/:classId/:paperId', Service.auth.check('teacher'), Controller.teacher.classMark],

  // class
  ['get', '/class/add', Service.auth.check('teacher'), Controller.class.edit],
  ['get', '/class/edit/:classId', Service.auth.check('teacher'), Controller.class.edit],
  ['post', '/class/create', Service.auth.check('teacher'), Controller.class.save],
  ['post', '/class/update/:classId', Service.auth.check('teacher'), Controller.class.save],

  // paper
  ['get', '/paper/question/list/:paperId', Service.auth.check('teacher'), Controller.paper.questionList],
  ['get', '/paper/edit/:paperId', Service.auth.check('teacher'), Controller.paper.edit],
  ['get', '/paper/add', Service.auth.check('teacher'), Controller.paper.edit],
  ['post', '/paper/create', Service.auth.check('teacher'), Controller.paper.save],
  ['post', '/paper/update/:paperId', Service.auth.check('teacher'), Controller.paper.save],

  // question
  ['get', '/paper/:paperId/question/edit/:questionId', Service.auth.check('teacher'), Controller.question.edit],
  ['get', '/paper/:paperId/question/add', Service.auth.check('teacher'), Controller.question.edit],
  ['post', '/paper/:paperId/question/create', Service.auth.check('teacher'), Controller.question.save],
  ['post', '/paper/:paperId/question/update/:questionId', Service.auth.check('teacher'), Controller.question.save]
];
