CREATE DATABASE projectdb;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users` MODIFY `email` VARCHAR(200) UNIQUE;
ALTER TABLE `users` ADD `password` VARCHAR(15) NOT NULL AFTER `email`;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Peter', 'John', 'peter@test.com', 'test' ),
(2, 'Andy', 'James', 'andy@test.com', 'test' ),
(3, 'Mathew', 'Partner', 'mathew@test.com', 'test' ),
(4, 'Robert', 'Windy', 'robert@test.com', 'test' ),
(5, 'Mark', 'Teddy', 'mark@test.com', 'test' );

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `sku_id` varchar(20) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `expiry_date` date NOT NULL,
  `days_to_expire_from_today` int(11) NOT NULL
);
 
ALTER TABLE `products` ADD PRIMARY KEY (`id`);
ALTER TABLE `products` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `products` MODIFY `sku_id` VARCHAR(20) UNIQUE;
ALTER TABLE `products` ADD `category` ENUM('Grain','Vegetable','Fruit','Protein','Meet') DEFAULT 'Grain' AFTER `sku_id`;

INSERT INTO `products` (`sku_id`, `category`,  `product_name`, `price`, `expiry_date`, `days_to_expire_from_today`) VALUES
('iy4169', 'Protein', 'Butter', 12.59, '2021-04-10', 15 ),
('ek613', 'Grain', 'Whole grain bread', 3.99, '2021-04-15', 20 ),
('pb016', 'Protein', 'Almond Milk', 6.49, '2021-04-18', 23);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `ordered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `orders` ADD PRIMARY KEY (`id`);
ALTER TABLE `orders` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `orders` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`);
ALTER TABLE `orders` ADD FOREIGN KEY (`productId`) REFERENCES `products`(`id`);

INSERT INTO `orders` (`order_number`, `userId`, `productId`, `quantity`, `amount`) VALUES
('order8052', 1, 1, 5, 62.69 ),
('order9825', 2, 2, 2, 7.89 ),
('order3480', 3, 3, 3, 19.69);