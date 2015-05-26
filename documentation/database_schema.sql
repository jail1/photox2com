-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2015 at 11:06 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `photox`
--

-- --------------------------------------------------------

--
-- Table structure for table `photox_products`
--

CREATE TABLE IF NOT EXISTS `photox_products` (
`ID` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `is_listable` tinyint(1) NOT NULL DEFAULT '0',
  `is_complex` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(254) COLLATE utf8_bin NOT NULL,
  `description` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `extra_data` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `ratio` double NOT NULL,
  `lost_ratio` double DEFAULT NULL,
  `min_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `photox_products`
--
ALTER TABLE `photox_products`
 ADD PRIMARY KEY (`ID`), ADD KEY `FK_PRODUCT_ID2` (`parent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `photox_products`
--
ALTER TABLE `photox_products`
MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=91;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `photox_products`
--
ALTER TABLE `photox_products`
ADD CONSTRAINT `FK_PRODUCT_ID2` FOREIGN KEY (`parent_id`) REFERENCES `photox_products` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
