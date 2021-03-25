CREATE DATABASE superherodb;

CREATE TABLE IF NOT EXISTS `superheros` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `age` tinyint(1) NOT NULL DEFAULT '1',
  `image_url` varchar(200),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `superheros` ADD PRIMARY KEY (`id`);
ALTER TABLE `superheros` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `superheros` (`id`, `name`, `age`) VALUES
(1, 'Batgirl', 30 ),
(2, 'Batman', 40 ),
(3, 'Black Panther', 35),
(4, 'Catwoman', 45),
(5, 'Elektra', 30);
