-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: database:3306
-- Generation Time: Sep 12, 2023 at 01:24 PM
-- Server version: 8.0.33
-- PHP Version: 8.1.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int NOT NULL,
  `task_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `commentary` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `comment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `task_id`, `user_id`, `commentary`, `comment_date`) VALUES
(5, 1, 2, 'sadfasdfasdf', '2023-06-15'),
(6, 1, 2, 'fsdfasdfasdf', '2023-06-15'),
(7, 2, 1, 'fdsafjnsdajfkndfkasndfkjasdnfaskldfmskldmsalkdcmsakldfmsakldfmaskdlfmaskldfmasdflmasdlfmasdfčlmasdflmasdlfčkamsdfsa', '2023-06-15'),
(8, 2, 1, 'Uh neznam sto da kazem ovo ono ovaj zadatak je jako dobar ajajaj jedva cekam da ga pocnem rjesavat kolega mile mi je susjed jedva cekam da odem s njim pecat ', '2023-06-15'),
(9, 2, 1, 'fjdsiafnsjdfnndfgjkdfngkjlsdnfkjasfnsdafsadf', '2023-06-15'),
(20, 19, 16, 'fasmdk asdmfklasmdf sdf ksdnfksdfasad', '2023-06-29'),
(21, 2, 2, 'dfsjnfkasnfdjkasnfkasdf', '2023-06-29'),
(22, 2, 16, 'Ovaj zadatak je dobar', '2023-07-14'),
(27, 1, 1, 'fdsafsadfsadfsadf', '2023-09-12'),
(30, 1, 1, 'sdfjnaksdfnjksadfsadf', '2023-09-12'),
(31, 1, 1, 'sdfjnaksdfnjksadfsadf', '2023-09-12'),
(32, 1, 1, 'fsajkdfhasdjkfnasdf', '2023-09-12'),
(34, 20, 1, 'fsakldfskdlfsakdfnsadjkflnasdf', '2023-09-12'),
(35, 1, 2, 'fsjkadfskjadfnsjkadfnkjasdfnkfadsjlsadfnjksadfbsadjkflbsadjkfbnasdfkjbsadfas', '2023-09-12'),
(36, 1, 2, 'fjsdafksnfdjkasfnjksdfsa', '2023-09-12'),
(37, 1, 2, 'wow', '2023-09-12');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `person_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `firstname` text,
  `lastname` text,
  `avgperf` text,
  `totcomp` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `lowcomp` text,
  `medcomp` text,
  `highcomp` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`person_id`, `user_id`, `firstname`, `lastname`, `avgperf`, `totcomp`, `lowcomp`, `medcomp`, `highcomp`) VALUES
(1, 1, 'Robert', 'Grk', '2', '0', '0', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solved` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deadline` date NOT NULL,
  `finish_date` text,
  `importance` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `user_id`, `name`, `description`, `solved`, `deadline`, `finish_date`, `importance`) VALUES
(1, 1, 'Rjesavanje zadatka', 'Ovaj zadatak treba rjesiti', 'Finished', '2023-08-20', NULL, 'Medium'),
(2, 2, 'Rjesavanje ovog zadatka', 'Treba rjesiti i ovaj zadatak', 'Not Started', '2023-09-04', NULL, 'Low'),
(19, 2, 'Marko treba rjesiti ovaj za toljdfnasjk', 'fasdjfisdnaj dsfnkjasdfn asndfjna andfjsnak lsdkfjn', 'In Process', '2023-07-08', NULL, 'High'),
(20, 1, 'asdfsadf', 'asdfsadfsadf', 'In Process', '2023-09-22', NULL, 'Medium'),
(21, 15, 'fsadjfnkfadsnsa', 'sdamkfsafndjkasnfk', 'Not Started', '2023-09-30', NULL, 'Medium'),
(24, 17, 'fsldfsmdalfmsakdlfmsaldfkmnsakldfnsmfad', 'mkdfslgnklasfnjkasldfnjskadlfnsjakdfnsdf', 'Not Started', '2023-10-07', NULL, 'Medium');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`) VALUES
(1, 'robert13', 'ea41bfb66dc9c89269687d4557fddfadd602aa820fe4f54f57746fd9e6ad552b'),
(2, 'marki65', 'dea5fdfc537949cd144ff6f6615f893ac5d2b49b1a0eda3ba777a8ec92c6fef0'),
(15, 'omar32', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'),
(16, 'filip', 'ba6cdaa53ded44285963014c83dccacfe9e06e9b438763bc4ba1a23833edd477'),
(17, 'omega', '304b4a90a76a1cbe4c112e074b30e75181f54df43d60f883597457844293b341');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
