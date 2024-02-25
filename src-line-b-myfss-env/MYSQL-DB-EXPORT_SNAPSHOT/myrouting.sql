-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 25, 2024 at 10:31 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myrouting`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `UID` int(11) NOT NULL,
  `name` text NOT NULL,
  `FK_phases_UID` int(11) NOT NULL COMMENT 'Associated phase',
  `comments` text NOT NULL,
  `directory` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`UID`, `name`, `FK_phases_UID`, `comments`, `directory`) VALUES
(1, 'someImportant-File.txt', 1, 'This is a description of this file.', 'SGDF78676FGDS896');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `UID` int(11) NOT NULL,
  `FK_users_UID_unitCommander` int(11) NOT NULL,
  `unitName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `packets`
--

CREATE TABLE `packets` (
  `UID` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `FK_users_UID` int(11) NOT NULL COMMENT 'Member of focus concerning this packet.',
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `packets`
--

INSERT INTO `packets` (`UID`, `name`, `type`, `FK_users_UID`, `comments`) VALUES
(1, '', 'Memo for Record', 1, 'This is a description of the document.'),
(2, '', 'DEROS Extension', 1, 'Another description'),
(3, '', 'Other', 1, 'Etc comments'),
(4, '', 'Misc', 1, 'blah');

-- --------------------------------------------------------

--
-- Table structure for table `phases`
--

CREATE TABLE `phases` (
  `UID` int(11) NOT NULL,
  `FK_packets_UID` int(11) NOT NULL COMMENT 'Reference USER_UID',
  `type` text NOT NULL COMMENT 'REVIEW, CONCUR, APPROVE, NOTE',
  `suspense` text NOT NULL COMMENT 'Date due',
  `comments` text NOT NULL,
  `dateCompleted` text NOT NULL COMMENT 'Blank means incomplete',
  `stepNumber` int(11) NOT NULL COMMENT 'Defines the order in which phases should be displayed in packet',
  `FK_users_UID_stakeholder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `phases`
--

INSERT INTO `phases` (`UID`, `FK_packets_UID`, `type`, `suspense`, `comments`, `dateCompleted`, `stepNumber`, `FK_users_UID_stakeholder`) VALUES
(1, 1, 'REVIEW', '', 'Initial draft', '', 0, 4),
(2, 2, 'REVIEW', '', '', '', 1, 4),
(3, 3, 'CONCUR', '', '', '', 1, 4),
(4, 1, 'NOTE', '', 'testing', '', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UID` int(11) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `grade` text NOT NULL,
  `FK_organizations_UID` int(11) NOT NULL,
  `permissionsSelf` text NOT NULL,
  `permissionsGroups` text NOT NULL,
  `FK_users_UID_directRater` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `firstName`, `lastName`, `grade`, `FK_organizations_UID`, `permissionsSelf`, `permissionsGroups`, `FK_users_UID_directRater`) VALUES
(1, 'Luca', 'Ericson', 'E-5', 1, '', '', 2),
(2, 'Dylan', 'Thomas', 'O-2', 1, '', '', 4),
(3, 'Ryan', 'Fletcher', 'E-3', 1, '', '', 1),
(4, 'Rebecca', 'Rogers', 'O-5', 1, '', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `packets`
--
ALTER TABLE `packets`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `phases`
--
ALTER TABLE `phases`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `packets`
--
ALTER TABLE `packets`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `phases`
--
ALTER TABLE `phases`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
