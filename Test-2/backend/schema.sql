CREATE DATABASE managementdb;
USE managementdb;

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `writing_type` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `register_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `authors` ADD PRIMARY KEY (`id`);
ALTER TABLE `authors` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `authors` MODIFY `email` VARCHAR(200) UNIQUE;
ALTER TABLE `authors` MODIFY `writing_type` ENUM('Romantic','Fiction','Non-Fiction','Mystery','Fairytail') DEFAULT 'Fiction';

INSERT INTO `authors` (`id`, `name`, `email`, `writing_type`) VALUES
(1, 'Shakespear', 'shakespear@gmail.com', 'Romantic' ),
(2, 'Charles Dickens', 'charles@gmail.com', 'Fiction' );

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `reviews` int(5) NOT NULL,
  `publish_date` date NOT NULL,
  `isdn_no` varchar(20) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `author_id` int(11) NOT NULL
);
 
ALTER TABLE `books` ADD PRIMARY KEY (`id`);
ALTER TABLE `books` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `books` MODIFY `isdn_no` VARCHAR(20) UNIQUE;
ALTER TABLE `books` ADD FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`);

INSERT INTO `books` (`title`, `subtitle`,  `reviews`, `publish_date`, `isdn_no`, `price`, `author_id`) VALUES
('Hamlet', 'An awesome book for awesome people', 5, '1936-02-10', 'ISDN8032475', 12.59, 1 ),
('The Tempest', 'Another awesome book by your own Shakespeare', 4, '1946-12-17', 'ISDN8453762', 2.99, 1 ),
('2nd Version The Tempest', '2nd Version Another awesome book by your own Shakespeare', 4, '1926-05-09', 'ISDN824782', 21.69, 2),
('2nd Hamlet', '2nd Version An awesome book for awesome people', 5, '1937-09-10', 'ISDN1243682', 09.89, 2);