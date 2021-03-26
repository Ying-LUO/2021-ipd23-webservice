CREATE DATABASE inventorydb;

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `sku_id` varchar(20) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `expiry_date` date NOT NULL,
  `days_to_expire_from_today` int(11) NOT NULL
);
 
ALTER TABLE `products` ADD PRIMARY KEY (`id`);
ALTER TABLE `products` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `products` (`sku_id`, `product_name`, `expiry_date`, `days_to_expire_from_today`) VALUES
('iy4169', 'Butter','2021-04-10', 15 ),
('ek613', 'Whole grain bread', '2021-04-15', 20 ),
('pb016', 'Almond Milk', '2021-04-18', 23);
