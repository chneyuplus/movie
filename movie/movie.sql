/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50559
Source Host           : localhost:3306
Source Database       : movie

Target Server Type    : MYSQL
Target Server Version : 50559
File Encoding         : 65001

Date: 2021-06-19 16:54:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bymovie
-- ----------------------------
DROP TABLE IF EXISTS `bymovie`;
CREATE TABLE `bymovie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `movieid` int(11) NOT NULL,
  `changid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `movieid` (`movieid`),
  KEY `changid` (`changid`),
  CONSTRAINT `bymovie_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  CONSTRAINT `bymovie_ibfk_2` FOREIGN KEY (`movieid`) REFERENCES `list` (`id`),
  CONSTRAINT `bymovie_ibfk_3` FOREIGN KEY (`changid`) REFERENCES `chang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bymovie
-- ----------------------------
INSERT INTO `bymovie` VALUES ('1', '1', '1', '1');
INSERT INTO `bymovie` VALUES ('2', '2', '1', '1');

-- ----------------------------
-- Table structure for chang
-- ----------------------------
DROP TABLE IF EXISTS `chang`;
CREATE TABLE `chang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieid` int(11) NOT NULL,
  `lookid` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `langulage` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movieid` (`movieid`),
  KEY `lookid` (`lookid`),
  CONSTRAINT `chang_ibfk_1` FOREIGN KEY (`movieid`) REFERENCES `list` (`id`),
  CONSTRAINT `chang_ibfk_2` FOREIGN KEY (`lookid`) REFERENCES `look` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chang
-- ----------------------------
INSERT INTO `chang` VALUES ('1', '1', '1', '34.40', '国语2D', '2021-06-19 10:05:00', '2021-06-19 11:49:07', '2021-06-19 10:08:17');
INSERT INTO `chang` VALUES ('2', '1', '2', '34.40', '国语2D', '2021-06-19 09:27:49', '2021-06-19 11:27:51', '2021-06-19 10:08:25');
INSERT INTO `chang` VALUES ('3', '1', '1', '34.40', '国语2D', '2021-06-19 09:46:51', '2021-06-19 11:46:54', '2021-06-20 10:08:31');

-- ----------------------------
-- Table structure for common
-- ----------------------------
DROP TABLE IF EXISTS `common`;
CREATE TABLE `common` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `instime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movieid` (`movieid`),
  KEY `userid` (`userid`),
  CONSTRAINT `common_ibfk_1` FOREIGN KEY (`movieid`) REFERENCES `list` (`id`),
  CONSTRAINT `common_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of common
-- ----------------------------
INSERT INTO `common` VALUES ('1', '1', '1', '可以', '2021-06-09 15:29:58');
INSERT INTO `common` VALUES ('2', '1', '1', '打的', '2021-06-25 15:30:01');
INSERT INTO `common` VALUES ('3', '1', '1', '演的不错！', '2021-06-29 15:30:04');
INSERT INTO `common` VALUES ('4', '1', '1', '大叔大婶', '2021-06-02 15:30:08');
INSERT INTO `common` VALUES ('5', '1', '1', '菜市场萨达', '2021-06-04 15:30:11');
INSERT INTO `common` VALUES ('6', '1', '1', '真心不错！！', '2021-06-13 15:41:05');
INSERT INTO `common` VALUES ('7', '1', '1', 'hdjjd', '2021-06-19 09:05:56');

-- ----------------------------
-- Table structure for country
-- ----------------------------
DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of country
-- ----------------------------
INSERT INTO `country` VALUES ('1', '大陆');
INSERT INTO `country` VALUES ('2', '美国');
INSERT INTO `country` VALUES ('3', '韩国');
INSERT INTO `country` VALUES ('4', '日本');
INSERT INTO `country` VALUES ('5', '中国香港');
INSERT INTO `country` VALUES ('6', '中国台湾');
INSERT INTO `country` VALUES ('7', '泰国');
INSERT INTO `country` VALUES ('8', '印度');
INSERT INTO `country` VALUES ('9', '法国');
INSERT INTO `country` VALUES ('10', '英国');
INSERT INTO `country` VALUES ('11', '俄罗斯');
INSERT INTO `country` VALUES ('12', '意大利');
INSERT INTO `country` VALUES ('13', '西班牙');
INSERT INTO `country` VALUES ('14', '德国');
INSERT INTO `country` VALUES ('15', '其他');

-- ----------------------------
-- Table structure for era
-- ----------------------------
DROP TABLE IF EXISTS `era`;
CREATE TABLE `era` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of era
-- ----------------------------
INSERT INTO `era` VALUES ('1', '70年代');
INSERT INTO `era` VALUES ('2', '80年代');
INSERT INTO `era` VALUES ('3', '90年代');
INSERT INTO `era` VALUES ('4', '2000-2010');
INSERT INTO `era` VALUES ('5', '2011');
INSERT INTO `era` VALUES ('6', '2012');
INSERT INTO `era` VALUES ('7', '2013');
INSERT INTO `era` VALUES ('8', '2014');
INSERT INTO `era` VALUES ('9', '2015');
INSERT INTO `era` VALUES ('10', '2016');
INSERT INTO `era` VALUES ('11', '2017');
INSERT INTO `era` VALUES ('12', '2018');
INSERT INTO `era` VALUES ('13', '2019');
INSERT INTO `era` VALUES ('14', '2020');
INSERT INTO `era` VALUES ('15', '2021');

-- ----------------------------
-- Table structure for hotlist
-- ----------------------------
DROP TABLE IF EXISTS `hotlist`;
CREATE TABLE `hotlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listid` int(11) NOT NULL,
  `totlemoney` float NOT NULL,
  `totleclick` int(11) NOT NULL,
  `isup` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listid` (`listid`),
  CONSTRAINT `hotlist_ibfk_1` FOREIGN KEY (`listid`) REFERENCES `list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotlist
-- ----------------------------
INSERT INTO `hotlist` VALUES ('1', '1', '116800000', '1299112000', '1');
INSERT INTO `hotlist` VALUES ('2', '2', '8823000000', '999223212', '1');
INSERT INTO `hotlist` VALUES ('3', '3', '122000000', '1442121112', '1');
INSERT INTO `hotlist` VALUES ('4', '4', '123000000', '1555212121', '1');
INSERT INTO `hotlist` VALUES ('5', '5', '10990000000', '1200000000', '1');
INSERT INTO `hotlist` VALUES ('6', '6', '242000000', '255550000', '1');
INSERT INTO `hotlist` VALUES ('7', '7', '400000000', '459000000', '1');
INSERT INTO `hotlist` VALUES ('8', '8', '89800000', '123210000', '1');
INSERT INTO `hotlist` VALUES ('9', '9', '0', '5567', '2');
INSERT INTO `hotlist` VALUES ('10', '10', '0', '2332', '2');
INSERT INTO `hotlist` VALUES ('11', '11', '0', '998', '2');
INSERT INTO `hotlist` VALUES ('12', '12', '0', '1234', '2');
INSERT INTO `hotlist` VALUES ('13', '13', '0', '9987', '2');
INSERT INTO `hotlist` VALUES ('14', '14', '0', '12345', '2');
INSERT INTO `hotlist` VALUES ('15', '15', '0', '7654', '3');
INSERT INTO `hotlist` VALUES ('16', '16', '0', '32456', '3');

-- ----------------------------
-- Table structure for kookseat
-- ----------------------------
DROP TABLE IF EXISTS `kookseat`;
CREATE TABLE `kookseat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `secat` varchar(255) NOT NULL,
  `lookid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lookid` (`lookid`),
  CONSTRAINT `kookseat_ibfk_1` FOREIGN KEY (`lookid`) REFERENCES `look` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kookseat
-- ----------------------------
INSERT INTO `kookseat` VALUES ('1', '[[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,1]]', '1');

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `enName` varchar(255) NOT NULL,
  `detail` varchar(500) NOT NULL,
  `image` varchar(255) NOT NULL,
  `country` int(11) NOT NULL,
  `times` varchar(255) NOT NULL,
  `upaddress` varchar(255) NOT NULL,
  `uptimes` datetime NOT NULL,
  `mType` int(11) NOT NULL,
  `isup` int(11) NOT NULL,
  `eraid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mType` (`mType`),
  KEY `country` (`country`),
  KEY `eraid` (`eraid`),
  CONSTRAINT `list_ibfk_3` FOREIGN KEY (`eraid`) REFERENCES `era` (`id`),
  CONSTRAINT `list_ibfk_1` FOREIGN KEY (`mType`) REFERENCES `movietype` (`id`),
  CONSTRAINT `list_ibfk_2` FOREIGN KEY (`country`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('1', '速度与激情9', 'F9: The Fast Saga', '范·迪塞尔饰演的唐老大多姆·托莱多，与莱蒂和他的儿子小布莱恩，过上了远离纷扰的平静生活。然而他们也知道，安宁之下总潜藏着危机。这一次，为了保护他所爱的人，唐老大不得不直面过去。他和伙伴们面临的是一场足以引起世界动荡的阴谋，以及一个前所未遇的一流杀手和高能车手。而这个名叫雅各布（约翰·塞纳饰）的人，恰巧是多姆遗落在外的亲弟弟。', '/movie/fdd380fb2f7f0f1742f9f7c8ae7c5fec7189073.jpg', '1', '142分钟', '中国大陆上映', '2021-05-21 00:00:00', '1', '1', '15');
INSERT INTO `list` VALUES ('2', '哆啦A梦：伴我同行2', 'STAND BY ME ドラえもん2', '时隔6年，动画电影“伴我同行”系列回归，同时本片也是该系列的终章。大雄为了实现奶奶看到妻子的愿望，想坐着时光机去未来参加他的婚礼，但爱情长跑50年终于要娶到静香的大雄竟然想逃婚…', '/movie/69291d617c3dc5dcac5e3bf29dda63ac2200192.jpg', '2', '96分钟', '中国大陆上映', '2021-05-28 08:00:00', '2', '1', '15');
INSERT INTO `list` VALUES ('3', '疯狂海盗团', 'Captain Sabertooth And The Magic Diamond', '在加勒比地区的一个黑暗的丛林里，年轻的男孩马可正在逃离可怕的巫师Maga Kahn和他的猿猴军队，马可偷了一颗能在满月时实现愿望的魔法钻石。不久，声名狼藉的虎牙船长听说了这颗神奇的钻石，决定把它走......', '/movie/a92998b29040ac0527d0a3f651fa879c1658061.jpg', '3', '82分钟', '中国大陆上映', '2021-05-29 00:00:00', '3', '1', '14');
INSERT INTO `list` VALUES ('4', '\r\n我要我们在一起', 'Love Will Tear Us Apart', '你有没有爱过一个人，曾经拼了命，只为和TA在一起。十年前，差生吕钦扬当众告白凌一尧，两人从校园步入社会，为了让她幸福，他不惜以命相搏。然而金钱、房子、婚姻等现实的考验，却将两人越推越远。十年长跑，他们能否还记得曾经刻在心底的约定：我要我们在一起。电影改编自长帖《与我十年长跑的女友明天要嫁人了》', '/movie/dc2fed6001e809e4553f90cc6fad9a59245170.jpg', '4', '105分钟', '中国大陆上映', '2021-05-20 13:14:00', '4', '1', '13');
INSERT INTO `list` VALUES ('5', '悬崖之上', 'Cliff Walkers', '上世纪三十年代，四位曾在苏联接受特训的共产党特工组成任务小队，回国执行代号为“乌特拉”的秘密行动。由于叛徒的出卖，他们从跳伞降落的第一刻起， 就已置身于敌人布下的罗网之中。同志能否脱身，任务能否完成，雪一直下，立于“悬崖之上”的行动小组面临严峻考验。', '/movie/3ad18f011110130e927d50046fde86f71038961.jpg', '2', '120分钟', '中国大陆上映', '2021-04-30 18:00:00', '3', '1', '15');
INSERT INTO `list` VALUES ('6', '追虎擒龙', 'Once Upon a Time in Hong Kong', '故事讲述 1973 年香港警黑勾结， 在英国人指使下贪污巨利，荼毒市民。港督成立廉政公署，最先两位检察官为黑白双煞 （古天乐、林家栋）历尽千辛万苦调查权倾黑白两道的总华探长徐乐（吴镇宇）及跛豪（梁家辉），终把二人绳之以法的故事。', '/movie/67a1fe8a23b913b305a37fed1c54b7a35019988.jpg', '6', '105分钟', '中国大陆上映', '2021-05-01 08:00:00', '4', '1', '1');
INSERT INTO `list` VALUES ('7', '扫黑·决战', 'BREAK THROUGH THE DARKNESS', '该片是国内首部以“扫黑除恶”行动为题材、展现全国扫黑办督办案件的影视化作品，讲述某扫黑专案组组长宋一锐带领组员由一起征地案深入调查，突破层层阻挠，与幕后的黑恶势力展开激烈斗争，最终揭开腐败官员利用公职权力充当犯罪保护伞的虚伪面具，将犯罪分子绳之以法的故事。', '/movie/3084e88f63eef2c6a0df576153a3fad0327782.jpg', '7', '112分钟', '中国大陆上映', '2021-05-01 08:00:00', '4', '1', '2');
INSERT INTO `list` VALUES ('8', '寂静之地2', 'A Quiet Place: Part II', '《寂静之地2》故事紧承上一部展开。在丈夫为保护家人牺牲后，伊芙琳（艾米莉·布朗特 饰）不得不独自带着孩子们（米莉森·西蒙斯、诺亚·尤佩 饰）面对全新的生存挑战。他们将被迫离开家园，踏上一段未知的旅途。在无声的世界里，除了要躲避“猎声怪物”的捕杀，铺满细沙的道路尽头还暗藏着新的危机。', '/movie/4f5ecc2cb68afdfce773914c126cb2dd146582.jpg', '2', '97分钟', '中国大陆上映', '2021-05-28 00:00:00', '3', '1', '3');
INSERT INTO `list` VALUES ('9', '速度与激情9', 'F9: The Fast Saga', '范·迪塞尔饰演的唐老大多姆·托莱多，与莱蒂和他的儿子小布莱恩，过上了远离纷扰的平静生活。然而他们也知道，安宁之下总潜藏着危机。这一次，为了保护他所爱的人，唐老大不得不直面过去。他和伙伴们面临的是一场足以引起世界动荡的阴谋，以及一个前所未遇的一流杀手和高能车手。而这个名叫雅各布（约翰·塞纳饰）的人，恰巧是多姆遗落在外的亲弟弟。', '/movie/fdd380fb2f7f0f1742f9f7c8ae7c5fec7189073.jpg', '8', '142分钟', '中国大陆上映', '2021-07-08 00:00:00', '1', '2', '4');
INSERT INTO `list` VALUES ('10', '哆啦A梦：伴我同行2', 'STAND BY ME ドラえもん2', '时隔6年，动画电影“伴我同行”系列回归，同时本片也是该系列的终章。大雄为了实现奶奶看到妻子的愿望，想坐着时光机去未来参加他的婚礼，但爱情长跑50年终于要娶到静香的大雄竟然想逃婚…', '/movie/69291d617c3dc5dcac5e3bf29dda63ac2200192.jpg', '1', '96分钟', '中国大陆上映', '2021-05-28 08:00:00', '2', '2', '5');
INSERT INTO `list` VALUES ('11', '疯狂海盗团', 'Captain Sabertooth And The Magic Diamond', '在加勒比地区的一个黑暗的丛林里，年轻的男孩马可正在逃离可怕的巫师Maga Kahn和他的猿猴军队，马可偷了一颗能在满月时实现愿望的魔法钻石。不久，声名狼藉的虎牙船长听说了这颗神奇的钻石，决定把它走......', '/movie/a92998b29040ac0527d0a3f651fa879c1658061.jpg', '7', '82分钟', '中国大陆上映', '2021-05-29 00:00:00', '3', '2', '6');
INSERT INTO `list` VALUES ('12', '\r\n我要我们在一起', 'Love Will Tear Us Apart', '你有没有爱过一个人，曾经拼了命，只为和TA在一起。十年前，差生吕钦扬当众告白凌一尧，两人从校园步入社会，为了让她幸福，他不惜以命相搏。然而金钱、房子、婚姻等现实的考验，却将两人越推越远。十年长跑，他们能否还记得曾经刻在心底的约定：我要我们在一起。电影改编自长帖《与我十年长跑的女友明天要嫁人了》', '/movie/dc2fed6001e809e4553f90cc6fad9a59245170.jpg', '9', '105分钟', '中国大陆上映', '2021-05-20 13:14:00', '4', '2', '7');
INSERT INTO `list` VALUES ('13', '悬崖之上', 'Cliff Walkers', '上世纪三十年代，四位曾在苏联接受特训的共产党特工组成任务小队，回国执行代号为“乌特拉”的秘密行动。由于叛徒的出卖，他们从跳伞降落的第一刻起， 就已置身于敌人布下的罗网之中。同志能否脱身，任务能否完成，雪一直下，立于“悬崖之上”的行动小组面临严峻考验。', '/movie/3ad18f011110130e927d50046fde86f71038961.jpg', '1', '120分钟', '中国大陆上映', '2021-04-30 18:00:00', '3', '2', '8');
INSERT INTO `list` VALUES ('14', '追虎擒龙', 'Once Upon a Time in Hong Kong', '故事讲述 1973 年香港警黑勾结， 在英国人指使下贪污巨利，荼毒市民。港督成立廉政公署，最先两位检察官为黑白双煞 （古天乐、林家栋）历尽千辛万苦调查权倾黑白两道的总华探长徐乐（吴镇宇）及跛豪（梁家辉），终把二人绳之以法的故事。', '/movie/67a1fe8a23b913b305a37fed1c54b7a35019988.jpg', '11', '105分钟', '中国大陆上映', '2021-05-01 08:00:00', '4', '2', '9');
INSERT INTO `list` VALUES ('15', '扫黑·决战', 'BREAK THROUGH THE DARKNESS', '该片是国内首部以“扫黑除恶”行动为题材、展现全国扫黑办督办案件的影视化作品，讲述某扫黑专案组组长宋一锐带领组员由一起征地案深入调查，突破层层阻挠，与幕后的黑恶势力展开激烈斗争，最终揭开腐败官员利用公职权力充当犯罪保护伞的虚伪面具，将犯罪分子绳之以法的故事。', '/movie/3084e88f63eef2c6a0df576153a3fad0327782.jpg', '1', '112分钟', '中国大陆上映', '2021-05-01 08:00:00', '2', '3', '2');
INSERT INTO `list` VALUES ('16', '寂静之地2', 'A Quiet Place: Part II', '《寂静之地2》故事紧承上一部展开。在丈夫为保护家人牺牲后，伊芙琳（艾米莉·布朗特 饰）不得不独自带着孩子们（米莉森·西蒙斯、诺亚·尤佩 饰）面对全新的生存挑战。他们将被迫离开家园，踏上一段未知的旅途。在无声的世界里，除了要躲避“猎声怪物”的捕杀，铺满细沙的道路尽头还暗藏着新的危机。', '/movie/4f5ecc2cb68afdfce773914c126cb2dd146582.jpg', '2', '97分钟', '中国大陆上映', '2021-05-28 00:00:00', '3', '3', '14');

-- ----------------------------
-- Table structure for listtype
-- ----------------------------
DROP TABLE IF EXISTS `listtype`;
CREATE TABLE `listtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listid` int(11) NOT NULL,
  `typeid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listid` (`listid`),
  KEY `typeid` (`typeid`),
  CONSTRAINT `listtype_ibfk_2` FOREIGN KEY (`typeid`) REFERENCES `type` (`id`),
  CONSTRAINT `listtype_ibfk_1` FOREIGN KEY (`listid`) REFERENCES `list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of listtype
-- ----------------------------
INSERT INTO `listtype` VALUES ('1', '1', '1');
INSERT INTO `listtype` VALUES ('2', '1', '2');
INSERT INTO `listtype` VALUES ('3', '1', '4');
INSERT INTO `listtype` VALUES ('4', '1', '7');
INSERT INTO `listtype` VALUES ('5', '1', '8');
INSERT INTO `listtype` VALUES ('6', '2', '3');
INSERT INTO `listtype` VALUES ('7', '2', '4');
INSERT INTO `listtype` VALUES ('8', '3', '3');
INSERT INTO `listtype` VALUES ('9', '3', '8');
INSERT INTO `listtype` VALUES ('10', '4', '1');
INSERT INTO `listtype` VALUES ('11', '4', '4');
INSERT INTO `listtype` VALUES ('12', '5', '4');
INSERT INTO `listtype` VALUES ('13', '5', '8');
INSERT INTO `listtype` VALUES ('14', '6', '4');
INSERT INTO `listtype` VALUES ('15', '6', '8');
INSERT INTO `listtype` VALUES ('16', '7', '4');
INSERT INTO `listtype` VALUES ('17', '7', '8');
INSERT INTO `listtype` VALUES ('18', '8', '4');
INSERT INTO `listtype` VALUES ('19', '8', '5');
INSERT INTO `listtype` VALUES ('20', '9', '6');
INSERT INTO `listtype` VALUES ('21', '10', '1');
INSERT INTO `listtype` VALUES ('22', '11', '2');
INSERT INTO `listtype` VALUES ('23', '12', '3');
INSERT INTO `listtype` VALUES ('24', '13', '4');
INSERT INTO `listtype` VALUES ('25', '15', '5');
INSERT INTO `listtype` VALUES ('26', '16', '7');

-- ----------------------------
-- Table structure for look
-- ----------------------------
DROP TABLE IF EXISTS `look`;
CREATE TABLE `look` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of look
-- ----------------------------
INSERT INTO `look` VALUES ('1', 'VIP1号城堡厅（若3D影片建议自备3D眼镜）');
INSERT INTO `look` VALUES ('2', 'VIP2号城堡厅');
INSERT INTO `look` VALUES ('3', 'VIP3号棒棒糖厅');
INSERT INTO `look` VALUES ('4', 'VIP4号哆啦A梦厅');
INSERT INTO `look` VALUES ('5', 'VIP5号哆啦A梦厅（若3D影片建议自备3D眼镜）');

-- ----------------------------
-- Table structure for movietype
-- ----------------------------
DROP TABLE IF EXISTS `movietype`;
CREATE TABLE `movietype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movietype
-- ----------------------------
INSERT INTO `movietype` VALUES ('1', '3D');
INSERT INTO `movietype` VALUES ('2', '3DIMAX');
INSERT INTO `movietype` VALUES ('3', '2DIMAX');
INSERT INTO `movietype` VALUES ('4', '');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieid` int(11) NOT NULL,
  `score` double(11,1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movieid` (`movieid`),
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`movieid`) REFERENCES `list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('1', '1', '3.2');
INSERT INTO `score` VALUES ('2', '2', '4.7');
INSERT INTO `score` VALUES ('3', '3', '2.8');
INSERT INTO `score` VALUES ('4', '4', '1.7');
INSERT INTO `score` VALUES ('5', '5', '4.3');
INSERT INTO `score` VALUES ('6', '6', '4.9');
INSERT INTO `score` VALUES ('7', '7', '4.8');
INSERT INTO `score` VALUES ('8', '8', '4.5');
INSERT INTO `score` VALUES ('9', '9', '4.2');
INSERT INTO `score` VALUES ('10', '10', '4.7');
INSERT INTO `score` VALUES ('11', '11', '3.9');
INSERT INTO `score` VALUES ('12', '12', '3.8');
INSERT INTO `score` VALUES ('13', '13', '4.6');
INSERT INTO `score` VALUES ('14', '14', '4.3');
INSERT INTO `score` VALUES ('15', '15', '4.7');
INSERT INTO `score` VALUES ('16', '16', '4.9');

-- ----------------------------
-- Table structure for seatlist
-- ----------------------------
DROP TABLE IF EXISTS `seatlist`;
CREATE TABLE `seatlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `byid` int(11) NOT NULL,
  `seat` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `byid` (`byid`),
  CONSTRAINT `seatlist_ibfk_1` FOREIGN KEY (`byid`) REFERENCES `bymovie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seatlist
-- ----------------------------
INSERT INTO `seatlist` VALUES ('1', '1', '2-4');
INSERT INTO `seatlist` VALUES ('2', '1', '2-5');
INSERT INTO `seatlist` VALUES ('3', '1', '2-6');
INSERT INTO `seatlist` VALUES ('4', '2', '0-5');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('1', '爱情');
INSERT INTO `type` VALUES ('2', '喜剧');
INSERT INTO `type` VALUES ('3', '动画');
INSERT INTO `type` VALUES ('4', '剧情');
INSERT INTO `type` VALUES ('5', '恐怖');
INSERT INTO `type` VALUES ('6', '惊悚');
INSERT INTO `type` VALUES ('7', '科幻');
INSERT INTO `type` VALUES ('8', '动作');
INSERT INTO `type` VALUES ('9', '历史');
INSERT INTO `type` VALUES ('10', '悬疑');
INSERT INTO `type` VALUES ('11', '犯罪');
INSERT INTO `type` VALUES ('12', '战争');
INSERT INTO `type` VALUES ('13', '奇幻');
INSERT INTO `type` VALUES ('14', '家庭');
INSERT INTO `type` VALUES ('15', '古装 ');
INSERT INTO `type` VALUES ('16', '纪录片');
INSERT INTO `type` VALUES ('17', '其他');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `face` varchar(255) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '毛豆', '/face/65672e7a812d680278abcecbac36589413349.jpg', 'abc123', '1234');
INSERT INTO `user` VALUES ('2', '张三', '/face/65672e7a812d680278abcecbac36589413349.jpg', 'abc', '123');
