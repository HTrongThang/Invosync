<?php
define('ROOT_PATH', dirname(__FILE__) . '/');
include_once(ROOT_PATH . 'includes/config.inc.php');
$mysqli = new mysqli($config['db_server'], $config['db_user'], $config['db_pwd'], $config['db_name']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

$sql_create = "CREATE TABLE IF NOT EXISTS `dc_product_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `position` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `properties` text,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

if ($mysqli->query($sql_create)) {
    echo "Tạo bảng dc_product_types thành công!\n";
} else {
    echo "Lỗi tạo bảng dc_product_types: " . $mysqli->error . "\n";
}

$mysqli->close();
?>
