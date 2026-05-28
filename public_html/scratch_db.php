<?php
include('d:/invosync/public_html/config.inc.php');
include('d:/invosync/public_html/classes/database/mysqli.class.php');
$db = new DB();
$result = $db->query('SHOW TABLES');
if ($result) {
    while($row = $result->fetch_array()) {
        echo $row[0] . "\n";
    }
} else {
    echo "Query failed";
}
