CREATE DATABASE user_management;
use user_management;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `age` tinyint(1) NOT NULL DEFAULT '1',
  `password` VARCHAR(200) NOT NULL,
  `image_url` varchar(200),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users` MODIFY `email` VARCHAR(200) UNIQUE;

INSERT INTO `users` (`id`, `name`, `email`, `age`, `password`) VALUES
(1, 'Batgirl', 'batgirl@gmail.com', 30, 'chocolate' ),
(2, 'Batman', 'batman@gmail.com', 40, 'chocolate'),
(3, 'Black Panther', 'Panther@gmail.com', 35, 'chocolate'),
(4, 'Catwoman', 'Catwoman@gmail.com', 45, 'chocolate'),
(5, 'Elektra', 'Elektra@gmail.com', 30, 'chocolate');
