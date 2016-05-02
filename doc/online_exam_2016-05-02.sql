# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.21)
# Database: online_exam
# Generation Time: 2016-05-02 07:35:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
  `studentId` int(4) unsigned NOT NULL COMMENT '关联学生表',
  `questionId` int(4) NOT NULL DEFAULT '0' COMMENT '关联试题表',
  `answer` text COMMENT '学生答案',
  PRIMARY KEY (`studentId`,`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `classId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '班级ID',
  `name` char(20) NOT NULL DEFAULT '' COMMENT '班级名称',
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;

INSERT INTO `class` (`classId`, `name`)
VALUES
	(1,'12级软件工程1班');

/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table class_paper
# ------------------------------------------------------------

DROP TABLE IF EXISTS `class_paper`;

CREATE TABLE `class_paper` (
  `classId` int(4) unsigned NOT NULL COMMENT '关联班级表',
  `paperId` int(4) unsigned NOT NULL COMMENT '关联试卷表',
  PRIMARY KEY (`classId`,`paperId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `class_paper` WRITE;
/*!40000 ALTER TABLE `class_paper` DISABLE KEYS */;

INSERT INTO `class_paper` (`classId`, `paperId`)
VALUES
	(1,1);

/*!40000 ALTER TABLE `class_paper` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table paper
# ------------------------------------------------------------

DROP TABLE IF EXISTS `paper`;

CREATE TABLE `paper` (
  `paperId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '试卷ID',
  `name` char(10) NOT NULL DEFAULT '' COMMENT '试卷名称',
  `beginTime` datetime DEFAULT NULL COMMENT '考试开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '考试结束时间',
  PRIMARY KEY (`paperId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `paper` WRITE;
/*!40000 ALTER TABLE `paper` DISABLE KEYS */;

INSERT INTO `paper` (`paperId`, `name`, `beginTime`, `endTime`)
VALUES
	(1,'计算机网络基础测试题','2016-05-01 11:00:00','2016-05-03 01:00:00');

/*!40000 ALTER TABLE `paper` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `questionId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '试题ID',
  `paperId` int(4) NOT NULL COMMENT '试卷ID',
  `type` int(2) NOT NULL COMMENT '题目类型（1-选择题，2-填空题，3-简答题）',
  `describe` text NOT NULL COMMENT '题目问题',
  `score` int(4) NOT NULL COMMENT '题目分值',
  `choice` text COMMENT '题目选项，可为空，仅当题目类型为选择题时有效，格式为urlEncode的请求字符串',
  `answer` text COMMENT '正确答案，可为空，用于自动评分时的校验',
  `autoMark` int(2) DEFAULT NULL COMMENT '是否自动评分，当为1时自动校验正确答案，0时不校验',
  `order` int(4) DEFAULT NULL COMMENT '题号排序',
  PRIMARY KEY (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;

INSERT INTO `question` (`questionId`, `paperId`, `type`, `describe`, `score`, `choice`, `answer`, `autoMark`, `order`)
VALUES
	(1,1,1,'TCP是属于哪一层的协议？',5,'A=%E7%BD%91%E7%BB%9C%E5%B1%82&B=%E8%BF%90%E8%BE%93%E5%B1%82&C=%E5%BA%94%E7%94%A8%E5%B1%82&D=%E7%89%A9%E7%90%86%E5%B1%82','B',1,1),
	(2,1,1,'发生夫人夫人夫人房',4,'A=%E5%AE%89%E6%8A%9A&B=%E6%97%A5%E5%8F%91%E7%94%9F&C=%E5%A4%A9%E5%88%9A%E5%8F%91%E7%94%9F&D=%E7%83%AD%E6%B3%95','D',1,2),
	(3,1,1,'测试填空123，の',2,'A=%E6%B5%8B%E8%AF%95%E5%99%B6%E5%95%A5%E5%9C%B0%E6%96%B9&B=%E7%AA%81%E7%84%B6%E5%89%B2%E5%8F%91%E4%BB%A3%E9%A6%96&C=%E8%B7%9F%E4%BB%96%E5%88%86%E6%89%8B%E7%9A%84&D=%E5%B7%A5%E6%97%B6%E8%B4%B9%E4%BA%BA%E5%A4%9A','哈哈哈哈',1,3),
	(4,1,2,'测试天空',2,'','哈哈哈',1,4),
	(5,1,2,'测试填空题啊',4,'','啊啊啊啊',1,5),
	(6,1,3,'谁是世界上最帅的男人？请简述导火线和根本原因。',30,'','我',NULL,6),
	(7,1,3,'谁是世界上最漂亮的女人？请简述基本原因和根本原因。',30,'','老婆大人',NULL,6);

/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table score
# ------------------------------------------------------------

DROP TABLE IF EXISTS `score`;

CREATE TABLE `score` (
  `studentId` int(4) unsigned NOT NULL COMMENT '关联学生表',
  `paperId` int(4) NOT NULL DEFAULT '0' COMMENT '关联试题表',
  `score` text COMMENT '学生答案',
  PRIMARY KEY (`studentId`,`paperId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table student
# ------------------------------------------------------------

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `studentId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '学生ID',
  `classId` int(4) NOT NULL COMMENT '关联班级表',
  `number` char(10) NOT NULL DEFAULT '' COMMENT '学号',
  `name` char(10) NOT NULL DEFAULT '' COMMENT '姓名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码，md5加密',
  PRIMARY KEY (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;

INSERT INTO `student` (`studentId`, `classId`, `number`, `name`, `password`)
VALUES
	(1,1,'3212006174','梁嘉怡','ljy520'),
	(2,1,'admin','测试账号','admin123');

/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teacher
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `teacherId` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '教师ID',
  `classId` int(4) NOT NULL COMMENT '关联班级表',
  `name` char(10) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码，md5加密',
  PRIMARY KEY (`teacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;

INSERT INTO `teacher` (`teacherId`, `classId`, `name`, `password`)
VALUES
	(1,1,'Katy','katyberrys'),
	(2,1,'admin','admin123');

/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
