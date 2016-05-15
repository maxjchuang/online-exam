var co = require('co')
  , _ = require('lodash')
  , mysql = require('mysql')
  , thunkify = require('thunkify')

  , config = {
    answerTemplate: {
      choose: [
        'A',
        'B',
        'C',
        'D',
      ],
      text: [
        "这是一个测试的答案1",
        "这是一个测试的答案2",
        "这是一个测试的答案3",
        "这是一个测试的答案4"
      ]
    },
    db: require('../../config/db'),
    SQL: {
      'clearAnswer': 'TRUNCATE TABLE answer',
      'clearScore': 'TRUNCATE TABLE score',
      'getStudentQuestionList': 'SELECT * FROM student, question',
      'insertAnswer': 'INSERT INTO answer SET ?',
      'insertScore': 'INSERT INTO score SET ?',
      'getClassList': 'SELECT * FROM class',
      'getClassStudentList': 'SELECT * FROM student WHERE classId = ? LIMIT ?'
    },
    count: {
      answer: 30, // 每班做题的人数
      mark: 15 // 每班批改的人数
    }
  }

  , DB = function (config) {
    var self = this
    this.conn = mysql.createConnection(config.db)
    this.conn.connect()
    this.SQL = config.SQL
    this.query = function () {
      return thunkify(this.conn.query).apply(this.conn, arguments)
    }
    this.action = function * (sqlKey, data) {
      return (yield self.query(self.SQL[sqlKey], data))[0]
    }
  }

  , random = function (max) {
    return Math.floor(Math.random() * (max + 1))
  }
  
  , getAnswer = function (type) {
    return type === 1 ? config.answerTemplate.choose[random(3)] : config.answerTemplate.text[random(3)]
  }

  , getScore = function (item, answer) {
    if (item.type === 1) {
      return (item.answer.trim() === answer.trim()) ? item.score : 0
    } else {
      return random(item.score)
    }
  }

co(function * () {
  var db = new DB(config)
    , insertAnswerList = []
    , insertScoreList = []
    , insertScoreMap = {}
    , classCount = {}
    , answer
    , score

  console.log("正在清除旧数据...")
  yield [db.action('clearAnswer'), db.action('clearScore')]
  console.log("清除成功")

  console.log("正在读取学生试题列表...")
  var studentQuestionlist = yield db.action('getStudentQuestionList')

  console.log("正在读取班级列表...")
  var classList = yield db.action('getClassList')

  var getClassStudent = function * (classId) {
        return yield {
          classId: classId,
          answer: db.action('getClassStudentList', [classId, config.count.answer]),
          mark: db.action('getClassStudentList', [classId, config.count.mark])
        }
      }

  classList = yield classList.map(function (item) {
    return getClassStudent(item.classId)
  })

  _.each(classList, function (item) {
    classCount[item.classId] = {
      answer: item.answer.map(function (item) {return item.studentId}),
      mark: item.mark.map(function (item) {return item.studentId})
    }
  })

  console.log("正在生成学生做题答案...")
  _.each(studentQuestionlist, function (item, index) {
    answer = getAnswer(item.type)
    score = getScore(item, answer)

    if (classCount[item.classId].answer.indexOf(item.studentId) > -1) {
      insertAnswerList.push({
        studentId: item.studentId,
        questionId: item.questionId,
        answer: answer,
        score: score
      })

      if (insertScoreMap[item.studentId + '-' + item.paperId] === undefined)
        insertScoreMap[item.studentId + '-' + item.paperId] = null
    }
    
    if (classCount[item.classId].mark.indexOf(item.studentId) > -1) {
      if (insertScoreMap[item.studentId + '-' + item.paperId]) {
        insertScoreMap[item.studentId + '-' + item.paperId] += score
      } else {
        insertScoreMap[item.studentId + '-' + item.paperId] = score
      }
    }
  })

  _.each(insertScoreMap, function (value, key) {
    insertScoreList.push({
      studentId: key.split('-')[0],
      paperId: key.split('-')[1],
      score: value
    })
  })

  console.log("正在写入成绩...")
  var result = yield {
    answer: insertAnswerList.map(function (item) {
      return db.action('insertAnswer', item)
    }),

    score: insertScoreList.map(function (item) {
      return db.action('insertScore', item)
    }) 
  }

  console.log("操作成功")

})
.catch(function (err) {
  console.log("操作失败：" + err.message)
  console.log(err)
})
