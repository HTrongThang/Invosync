<?php
require 'includes/config.inc.php';
$conn = new mysqli($config['db_server'], $config['db_user'], $config['db_password'], $config['db_name']);

$res = $conn->query("SELECT id, properties FROM dc_products");
$count = 0;
while($row = $res->fetch_assoc()) {
    $props = unserialize($row['properties']);
    if(isset($props['opening_stock'])) {
        $stock = (int)$props['opening_stock'];
        $conn->query("UPDATE dc_products SET opening_stock = $stock WHERE id = " . $row['id']);
        $count++;
    }
}
echo "Migrated $count products.";
