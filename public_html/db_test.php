<?php
define('ROOT_PATH', dirname(__FILE__) . '/');
include_once(ROOT_PATH . 'includes/config.inc.php');
$mysqli = new mysqli($config['db_server'], $config['db_user'], $config['db_pwd'], $config['db_name']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}
$result = $mysqli->query("SHOW TABLES");
while ($row = $result->fetch_array()) {
    echo $row[0] . "\n";
}
$mysqli->close();
?>
