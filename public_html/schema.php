<?php
require 'includes/config.inc.php';
$conn = new mysqli($config['db_server'], $config['db_user'], $config['db_password'], $config['db_name']);
$res = $conn->query("DESCRIBE dc_products");
$out = "";
while($row = $res->fetch_assoc()) {
    $out .= $row['Field'] . " - " . $row['Type'] . "\n";
}
file_put_contents('schema.txt', $out);
echo "Done";
