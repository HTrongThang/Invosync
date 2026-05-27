<?php
define('ROOT_PATH', dirname(__FILE__) . '/');
include_once(ROOT_PATH . 'includes/config.inc.php');
require('classes/database/mysql.class.php');
$db = new DB();
$res = $db->query('DESCRIBE '.DB_PREFIX.'products');
print_r($res);
?>
