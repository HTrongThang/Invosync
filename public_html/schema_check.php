<?php
include 'includes/config.inc.php';
include 'classes/database/mysql.class.php';
$db = new DB();
$res = $db->query('SHOW CREATE TABLE dc_products');
print_r($res->fetch_assoc());
$res2 = $db->query('SHOW CREATE TABLE dc_product_categories');
print_r($res2->fetch_assoc());
?>
