# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: DBproject
# Generation Time: 2016-12-11 19:54:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table averagerating
# ------------------------------------------------------------

DROP VIEW IF EXISTS `averagerating`;

CREATE TABLE `averagerating` (
   `rid` INT(11) NOT NULL DEFAULT '0',
   `avgrate` DECIMAL(14) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table Event
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Event`;

CREATE TABLE `Event` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `edescription` varchar(200) DEFAULT NULL,
  `ename` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Eventreservation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Eventreservation`;

CREATE TABLE `Eventreservation` (
  `uname` varchar(200) NOT NULL,
  `eid` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`uname`,`eid`),
  KEY `eid` (`eid`),
  CONSTRAINT `eventreservation_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`),
  CONSTRAINT `eventreservation_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `Event` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table events
# ------------------------------------------------------------

DROP VIEW IF EXISTS `events`;

CREATE TABLE `events` (
   `eid` INT(11) NOT NULL
) ENGINE=MyISAM;



# Dump of table Group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Group`;

CREATE TABLE `Group` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `gname` varchar(200) NOT NULL,
  `gprofile` varchar(200) DEFAULT NULL,
  `gowner` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`gid`),
  KEY `gowner` (`gowner`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`gowner`) REFERENCES `User` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Groupevent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Groupevent`;

CREATE TABLE `Groupevent` (
  `gid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  PRIMARY KEY (`gid`,`eid`),
  KEY `eid` (`eid`),
  CONSTRAINT `groupevent_ibfk_1` FOREIGN KEY (`gid`) REFERENCES `Group` (`gid`),
  CONSTRAINT `groupevent_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `Event` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Groupmember
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Groupmember`;

CREATE TABLE `Groupmember` (
  `gid` int(11) NOT NULL,
  `uname` varchar(200) NOT NULL,
  PRIMARY KEY (`gid`,`uname`),
  KEY `uname` (`uname`),
  CONSTRAINT `groupmember_ibfk_1` FOREIGN KEY (`gid`) REFERENCES `Group` (`gid`),
  CONSTRAINT `groupmember_ibfk_2` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Ingredient
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Ingredient`;

CREATE TABLE `Ingredient` (
  `ingid` int(11) NOT NULL AUTO_INCREMENT,
  `ingname` varchar(200) NOT NULL,
  `unitid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ingid`),
  KEY `unitid` (`unitid`),
  CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`unitid`) REFERENCES `Unit` (`unitid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Meetingreport
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Meetingreport`;

CREATE TABLE `Meetingreport` (
  `repid` int(11) NOT NULL AUTO_INCREMENT,
  `reptitle` varchar(200) NOT NULL,
  `reptext` text,
  `uname` varchar(200) DEFAULT NULL,
  `eid` int(11) DEFAULT NULL,
  PRIMARY KEY (`repid`),
  KEY `uname` (`uname`),
  KEY `eid` (`eid`),
  CONSTRAINT `meetingreport_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`),
  CONSTRAINT `meetingreport_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `Event` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Meetreportpics
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Meetreportpics`;

CREATE TABLE `Meetreportpics` (
  `picid` int(11) NOT NULL AUTO_INCREMENT,
  `repid` int(11) DEFAULT NULL,
  `reppic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`picid`),
  KEY `repid` (`repid`),
  CONSTRAINT `meetreportpics_ibfk_1` FOREIGN KEY (`repid`) REFERENCES `Meetingreport` (`repid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table members
# ------------------------------------------------------------

DROP VIEW IF EXISTS `members`;

CREATE TABLE `members` (
   `uname` VARCHAR(200) NOT NULL
) ENGINE=MyISAM;



# Dump of table Recipe
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Recipe`;

CREATE TABLE `Recipe` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `rtitle` varchar(200) NOT NULL,
  `numofserving` int(11) NOT NULL DEFAULT '1',
  `description` text,
  `uname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  KEY `uname` (`uname`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Recipecontainingredient
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Recipecontainingredient`;

CREATE TABLE `Recipecontainingredient` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `ingid` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`rid`,`ingid`),
  KEY `ingid` (`ingid`),
  CONSTRAINT `recipecontainingredient_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`),
  CONSTRAINT `recipecontainingredient_ibfk_2` FOREIGN KEY (`ingid`) REFERENCES `Ingredient` (`ingid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Recipepic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Recipepic`;

CREATE TABLE `Recipepic` (
  `picid` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `foodpic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`picid`),
  KEY `rid` (`rid`),
  CONSTRAINT `recipepic_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Reciperelation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Reciperelation`;

CREATE TABLE `Reciperelation` (
  `fromrid` int(11) NOT NULL,
  `torid` int(11) NOT NULL,
  PRIMARY KEY (`fromrid`,`torid`),
  KEY `torid` (`torid`),
  CONSTRAINT `reciperelation_ibfk_1` FOREIGN KEY (`fromrid`) REFERENCES `Recipe` (`rid`),
  CONSTRAINT `reciperelation_ibfk_2` FOREIGN KEY (`torid`) REFERENCES `Recipe` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Recipetag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Recipetag`;

CREATE TABLE `Recipetag` (
  `rid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`rid`,`tid`),
  KEY `tid` (`tid`),
  CONSTRAINT `recipetag_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`),
  CONSTRAINT `recipetag_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `Tag` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Review
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Review`;

CREATE TABLE `Review` (
  `revid` int(11) NOT NULL AUTO_INCREMENT,
  `revtitle` varchar(200) NOT NULL,
  `revtext` text,
  `rate` int(11) NOT NULL,
  `uname` varchar(200) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`revid`,`uname`,`rid`),
  KEY `uname` (`uname`),
  KEY `rid` (`rid`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Reviewpic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Reviewpic`;

CREATE TABLE `Reviewpic` (
  `picid` int(11) NOT NULL AUTO_INCREMENT,
  `revid` int(11) DEFAULT NULL,
  `revpic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`picid`),
  KEY `revid` (`revid`),
  CONSTRAINT `reviewpic_ibfk_1` FOREIGN KEY (`revid`) REFERENCES `Review` (`revid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Reviewsuggestion
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Reviewsuggestion`;

CREATE TABLE `Reviewsuggestion` (
  `sugid` int(11) NOT NULL AUTO_INCREMENT,
  `revid` int(11) DEFAULT NULL,
  `sugcontent` text,
  PRIMARY KEY (`sugid`),
  KEY `revid` (`revid`),
  CONSTRAINT `reviewsuggestion_ibfk_1` FOREIGN KEY (`revid`) REFERENCES `Review` (`revid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Tag`;

CREATE TABLE `Tag` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Unit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Unit`;

CREATE TABLE `Unit` (
  `unitid` int(11) NOT NULL AUTO_INCREMENT,
  `unitname` varchar(200) DEFAULT NULL,
  `unittype` tinyint(4) NOT NULL DEFAULT '1',
  `unitformat` double DEFAULT NULL,
  PRIMARY KEY (`unitid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `uname` varchar(200) NOT NULL,
  `password` varchar(32) NOT NULL,
  `uprofile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





# Replace placeholder table for events with correct view syntax
# ------------------------------------------------------------

DROP TABLE `events`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `events` AS (select `ge`.`eid` AS `eid` from (`group` `g` join `groupevent` `ge` on((`g`.`gid` = `ge`.`gid`))) where (`g`.`gname` = 'Park Slope Cake Club'));


# Replace placeholder table for members with correct view syntax
# ------------------------------------------------------------

DROP TABLE `members`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `members` AS (select `gm`.`uname` AS `uname` from (`group` `g` join `groupmember` `gm` on((`g`.`gid` = `gm`.`gid`))) where (`g`.`gname` = 'Park Slope Cake Club'));


# Replace placeholder table for averagerating with correct view syntax
# ------------------------------------------------------------

DROP TABLE `averagerating`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `averagerating` AS (select `r`.`rid` AS `rid`,avg(`re`.`rate`) AS `avgrate` from (`recipe` `r` join `review` `re`) where (`r`.`rid` = `re`.`rid`) group by `r`.`rid`);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
