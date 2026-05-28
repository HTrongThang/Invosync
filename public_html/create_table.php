<?php
define('ROOT_PATH', dirname(__FILE__).'/');
include_once(ROOT_PATH.'includes/constant.inc.php');
include_once(ROOT_PATH.'includes/config.inc.php');
include_once(ROOT_PATH.'classes/database/mysql.class.php');

$db = new DB();

$sql = "CREATE TABLE IF NOT EXISTS `dc_sale_channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `position` int(11) NOT NULL DEFAULT '0',
  `properties` text COLLATE utf8_unicode_ci,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";

if ($db->query($sql)) {
    echo "Table dc_sale_channels created successfully.\n";
} else {
    echo "Error creating table.\n";
}
?>
