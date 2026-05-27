<?php
define('ROOT_PATH', dirname(__FILE__) . '/');
include_once(ROOT_PATH . 'includes/config.inc.php');
$mysqli = new mysqli($config['db_server'], $config['db_user'], $config['db_pwd'], $config['db_name']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

$sql = "SELECT * FROM dc_user_group LIMIT 1";
if ($result = $mysqli->query($sql)) {
    echo "Query successful. Rows: " . $result->num_rows . "\n";
} else {
    echo "Error querying dc_user_group: " . $mysqli->error . "\n";
}

$sql2 = "SELECT * FROM dc_users LIMIT 1";
if ($result2 = $mysqli->query($sql2)) {
    echo "Query successful. Rows: " . $result2->num_rows . "\n";
} else {
    echo "Error querying dc_users: " . $mysqli->error . "\n";
}

$mysqli->close();
?>
