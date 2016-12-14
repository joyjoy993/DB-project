-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: localhost    Database: DBproj
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Event` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `edescription` varchar(200) DEFAULT NULL,
  `ename` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Eventreservation`
--

DROP TABLE IF EXISTS `Eventreservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Eventreservation` (
  `uname` varchar(200) NOT NULL,
  `eid` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`uname`,`eid`),
  KEY `eid` (`eid`),
  CONSTRAINT `eventreservation_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`),
  CONSTRAINT `eventreservation_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `Event` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Eventreservation`
--

LOCK TABLES `Eventreservation` WRITE;
/*!40000 ALTER TABLE `Eventreservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Eventreservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Group`
--

DROP TABLE IF EXISTS `Group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Group` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `gname` varchar(200) NOT NULL,
  `gprofile` varchar(200) DEFAULT NULL,
  `gowner` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`gid`),
  KEY `gowner` (`gowner`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`gowner`) REFERENCES `User` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Group`
--

LOCK TABLES `Group` WRITE;
/*!40000 ALTER TABLE `Group` DISABLE KEYS */;
/*!40000 ALTER TABLE `Group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Groupevent`
--

DROP TABLE IF EXISTS `Groupevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Groupevent` (
  `gid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  PRIMARY KEY (`gid`,`eid`),
  KEY `eid` (`eid`),
  CONSTRAINT `groupevent_ibfk_1` FOREIGN KEY (`gid`) REFERENCES `Group` (`gid`),
  CONSTRAINT `groupevent_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `Event` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Groupevent`
--

LOCK TABLES `Groupevent` WRITE;
/*!40000 ALTER TABLE `Groupevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `Groupevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Groupmember`
--

DROP TABLE IF EXISTS `Groupmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Groupmember` (
  `gid` int(11) NOT NULL,
  `uname` varchar(200) NOT NULL,
  PRIMARY KEY (`gid`,`uname`),
  KEY `uname` (`uname`),
  CONSTRAINT `groupmember_ibfk_1` FOREIGN KEY (`gid`) REFERENCES `Group` (`gid`),
  CONSTRAINT `groupmember_ibfk_2` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Groupmember`
--

LOCK TABLES `Groupmember` WRITE;
/*!40000 ALTER TABLE `Groupmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `Groupmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredient`
--

DROP TABLE IF EXISTS `Ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ingredient` (
  `ingid` int(11) NOT NULL AUTO_INCREMENT,
  `ingname` varchar(200) NOT NULL,
  `unitid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ingid`),
  KEY `unitid` (`unitid`),
  CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`unitid`) REFERENCES `Unit` (`unitid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredient`
--

LOCK TABLES `Ingredient` WRITE;
/*!40000 ALTER TABLE `Ingredient` DISABLE KEYS */;
INSERT INTO `Ingredient` VALUES (1,'chicken breast',3),(2,'chicken leg',3),(3,'buttermilk',2),(4,'all-purpose flour',1),(5,'corn oil',2),(6,'seasame oil',5),(7,'salt',4),(8,'white wine',5),(9,'soy sauce',5),(10,'vinegar',5),(11,'sugar(g)',1),(12,'sugar(ts)',4),(13,'minced garlic',1),(14,'chopped peanuts',1),(15,'chinese Eggplant',1),(16,'green pepper',1),(17,'cornstarch',4),(18,'green onion',1),(19,'water',2),(20,'ketchup',5),(21,'wonton wrappers(3.5 inch square)',3),(22,'pork',3),(23,'minced ginger root',4),(24,'egg',5),(25,'shreded cabbage',1);
/*!40000 ALTER TABLE `Ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Meetingreport`
--

DROP TABLE IF EXISTS `Meetingreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meetingreport`
--

LOCK TABLES `Meetingreport` WRITE;
/*!40000 ALTER TABLE `Meetingreport` DISABLE KEYS */;
/*!40000 ALTER TABLE `Meetingreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Meetreportpics`
--

DROP TABLE IF EXISTS `Meetreportpics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Meetreportpics` (
  `picid` int(11) NOT NULL AUTO_INCREMENT,
  `repid` int(11) DEFAULT NULL,
  `reppic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`picid`),
  KEY `repid` (`repid`),
  CONSTRAINT `meetreportpics_ibfk_1` FOREIGN KEY (`repid`) REFERENCES `Meetingreport` (`repid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meetreportpics`
--

LOCK TABLES `Meetreportpics` WRITE;
/*!40000 ALTER TABLE `Meetreportpics` DISABLE KEYS */;
/*!40000 ALTER TABLE `Meetreportpics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe`
--

DROP TABLE IF EXISTS `Recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipe` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `rtitle` varchar(200) NOT NULL,
  `numofserving` int(11) NOT NULL DEFAULT '1',
  `description` text,
  `uname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  KEY `uname` (`uname`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `User` (`uname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe`
--

LOCK TABLES `Recipe` WRITE;
/*!40000 ALTER TABLE `Recipe` DISABLE KEYS */;
INSERT INTO `Recipe` VALUES (1,'Fried Chicken',6,'Great choice when accompanied by beer','chaoyue'),(2,'Kung Pao Chicken',4,'Spicy chicken with peanuts, similar to what is served in Chinese restaurants. ','chaoyue'),(3,'Hot and Sour Chinese Eggplant',4,'Eggplant is sauteed, then coated in a spicy sweet sauce. Simple and delicious!','junyuan'),(4,'General Tao Chicken',6,'Great chicken that tastes the same as the one served in the Chinese restaurants, without the deep frying.','junyuan'),(5,'Pork Dumplings',6,'These tasty treats make a perfect appetizer or you can serve them as a main dish.','junyuan');
/*!40000 ALTER TABLE `Recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipecontainingredient`
--

DROP TABLE IF EXISTS `Recipecontainingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipecontainingredient` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `ingid` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`rid`,`ingid`),
  KEY `ingid` (`ingid`),
  CONSTRAINT `recipecontainingredient_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`),
  CONSTRAINT `recipecontainingredient_ibfk_2` FOREIGN KEY (`ingid`) REFERENCES `Ingredient` (`ingid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipecontainingredient`
--

LOCK TABLES `Recipecontainingredient` WRITE;
/*!40000 ALTER TABLE `Recipecontainingredient` DISABLE KEYS */;
INSERT INTO `Recipecontainingredient` VALUES (1,2,4),(1,3,100),(1,4,250),(1,5,2000),(1,7,2),(2,1,2),(2,6,2),(2,8,2),(2,9,2),(2,10,1),(2,11,50),(2,13,30),(2,14,50),(2,18,250),(3,6,2),(3,7,2),(3,9,2),(3,10,1),(3,11,25),(3,15,500),(3,16,100),(3,17,1),(4,1,2),(4,4,6),(4,6,4),(4,7,1),(4,10,2),(4,12,4),(4,17,2),(4,18,100),(4,19,50),(4,20,2),(5,6,3),(5,9,4),(5,13,50),(5,21,2),(5,22,2),(5,23,1),(5,24,1),(5,25,250);
/*!40000 ALTER TABLE `Recipecontainingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipepic`
--

DROP TABLE IF EXISTS `Recipepic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipepic` (
  `picid` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `foodpic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`picid`),
  KEY `rid` (`rid`),
  CONSTRAINT `recipepic_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipepic`
--

LOCK TABLES `Recipepic` WRITE;
/*!40000 ALTER TABLE `Recipepic` DISABLE KEYS */;
INSERT INTO `Recipepic` VALUES (1,1,'FriedChicken.jpg'),(2,2,'KungPaoChicken1.jpg'),(3,3,'HotAndSourEggplant.jpg'),(4,4,'GeneralTaoChicken.jpg'),(5,5,'PorkDumpling1.jpg');
/*!40000 ALTER TABLE `Recipepic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reciperelation`
--

DROP TABLE IF EXISTS `Reciperelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reciperelation` (
  `fromrid` int(11) NOT NULL,
  `torid` int(11) NOT NULL,
  PRIMARY KEY (`fromrid`,`torid`),
  KEY `torid` (`torid`),
  CONSTRAINT `reciperelation_ibfk_1` FOREIGN KEY (`fromrid`) REFERENCES `Recipe` (`rid`),
  CONSTRAINT `reciperelation_ibfk_2` FOREIGN KEY (`torid`) REFERENCES `Recipe` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reciperelation`
--

LOCK TABLES `Reciperelation` WRITE;
/*!40000 ALTER TABLE `Reciperelation` DISABLE KEYS */;
INSERT INTO `Reciperelation` VALUES (1,2),(4,2),(1,4);
/*!40000 ALTER TABLE `Reciperelation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipetag`
--

DROP TABLE IF EXISTS `Recipetag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipetag` (
  `rid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`rid`,`tid`),
  KEY `tid` (`tid`),
  CONSTRAINT `recipetag_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `Recipe` (`rid`),
  CONSTRAINT `recipetag_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `Tag` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipetag`
--

LOCK TABLES `Recipetag` WRITE;
/*!40000 ALTER TABLE `Recipetag` DISABLE KEYS */;
INSERT INTO `Recipetag` VALUES (2,1),(4,1),(5,1),(1,2),(2,2),(4,2),(1,3),(2,4),(5,5);
/*!40000 ALTER TABLE `Recipetag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviewpic`
--

DROP TABLE IF EXISTS `Reviewpic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviewpic` (
  `picid` int(11) NOT NULL AUTO_INCREMENT,
  `revid` int(11) DEFAULT NULL,
  `revpic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`picid`),
  KEY `revid` (`revid`),
  CONSTRAINT `reviewpic_ibfk_1` FOREIGN KEY (`revid`) REFERENCES `Review` (`revid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviewpic`
--

LOCK TABLES `Reviewpic` WRITE;
/*!40000 ALTER TABLE `Reviewpic` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviewpic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviewsuggestion`
--

DROP TABLE IF EXISTS `Reviewsuggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviewsuggestion` (
  `sugid` int(11) NOT NULL AUTO_INCREMENT,
  `revid` int(11) DEFAULT NULL,
  `sugcontent` text,
  PRIMARY KEY (`sugid`),
  KEY `revid` (`revid`),
  CONSTRAINT `reviewsuggestion_ibfk_1` FOREIGN KEY (`revid`) REFERENCES `Review` (`revid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviewsuggestion`
--

LOCK TABLES `Reviewsuggestion` WRITE;
/*!40000 ALTER TABLE `Reviewsuggestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviewsuggestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tag` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tag`
--

LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;
INSERT INTO `Tag` VALUES (1,'chinese'),(2,'chicken'),(3,'fried'),(4,'asian'),(5,'dim sum');
/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Unit`
--

DROP TABLE IF EXISTS `Unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Unit` (
  `unitid` int(11) NOT NULL AUTO_INCREMENT,
  `unitname` varchar(200) DEFAULT NULL,
  `unittype` tinyint(4) NOT NULL DEFAULT '1',
  `unitformat` double DEFAULT NULL,
  PRIMARY KEY (`unitid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Unit`
--

LOCK TABLES `Unit` WRITE;
/*!40000 ALTER TABLE `Unit` DISABLE KEYS */;
INSERT INTO `Unit` VALUES (1,'g',0,1),(2,'ml',1,1),(3,'pound',0,453),(4,'teaspoon(solid)',0,15),(5,'teaspoon(liquid)',1,15),(6,'egg',0,NULL);
/*!40000 ALTER TABLE `Unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `uname` varchar(200) NOT NULL,
  `password` varchar(32) NOT NULL,
  `uprofile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('chaoyue','cytemp','Nothing to tell.'),('junyuan','jytemp','superman');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `averagerating`
--

DROP TABLE IF EXISTS `averagerating`;
/*!50001 DROP VIEW IF EXISTS `averagerating`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `averagerating` AS SELECT 
 1 AS `rid`,
 1 AS `avgrate`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `events`
--

DROP TABLE IF EXISTS `events`;
/*!50001 DROP VIEW IF EXISTS `events`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `events` AS SELECT 
 1 AS `eid`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `members`
--

DROP TABLE IF EXISTS `members`;
/*!50001 DROP VIEW IF EXISTS `members`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `members` AS SELECT 
 1 AS `uname`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `averagerating`
--

/*!50001 DROP VIEW IF EXISTS `averagerating`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `averagerating` AS (select `r`.`rid` AS `rid`,avg(`re`.`rate`) AS `avgrate` from (`recipe` `r` join `review` `re`) where (`r`.`rid` = `re`.`rid`) group by `r`.`rid`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `events`
--

/*!50001 DROP VIEW IF EXISTS `events`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `events` AS (select `ge`.`eid` AS `eid` from (`group` `g` join `groupevent` `ge` on((`g`.`gid` = `ge`.`gid`))) where (`g`.`gname` = 'Park Slope Cake Club')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `members`
--

/*!50001 DROP VIEW IF EXISTS `members`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `members` AS (select `gm`.`uname` AS `uname` from (`group` `g` join `groupmember` `gm` on((`g`.`gid` = `gm`.`gid`))) where (`g`.`gname` = 'Park Slope Cake Club')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-11 17:24:40
