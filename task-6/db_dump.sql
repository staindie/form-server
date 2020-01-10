-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.4.11-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных test_db
CREATE DATABASE IF NOT EXISTS `test_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test_db`;

-- Дамп структуры для таблица test_db.test_table
CREATE TABLE IF NOT EXISTS `test_table` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `other` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы test_db.test_table: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `test_table` DISABLE KEYS */;
INSERT INTO `test_table` (`id`, `name`, `other`) VALUES
	(1, 'dfsdf', '0sdfsdf'),
	(2, 'sdfsdf', 'dfsdfsdfsdf'),
	(3, 'ffgfg', 'fdgdfg');
/*!40000 ALTER TABLE `test_table` ENABLE KEYS */;

-- Дамп структуры для таблица test_db.test_table_2
CREATE TABLE IF NOT EXISTS `test_table_2` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `name2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы test_db.test_table_2: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `test_table_2` DISABLE KEYS */;
INSERT INTO `test_table_2` (`id`, `name`, `name2`) VALUES
	(1, 'fd', 'sdf'),
	(2, 'dfssd', 'sdfsd');
/*!40000 ALTER TABLE `test_table_2` ENABLE KEYS */;


-- Дамп структуры базы данных test_db_2
CREATE DATABASE IF NOT EXISTS `test_db_2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `test_db_2`;

-- Дамп структуры для таблица test_db_2.test_table_3
CREATE TABLE IF NOT EXISTS `test_table_3` (
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы test_db_2.test_table_3: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `test_table_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_table_3` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
