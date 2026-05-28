<?php
include_once('includes/config.inc.php');
include_once('includes/constant.inc.php');
include_once('classes/database/mysql.class.php');

$db = new DB();

$tableName = DB_PREFIX . 'payment_methods';

echo "<h3>Đang kiểm tra bảng $tableName ...</h3>";

// Check if column exists
$result = $db->query("SHOW COLUMNS FROM `$tableName` LIKE 'status_inv'");
if ($result && mysqli_num_rows($result) > 0) {
    echo "<p style='color:green;'>Cột 'status_inv' đã tồn tại trong bảng $tableName. Không cần cập nhật.</p>";
} else {
    // Add column
    echo "<p>Đang thêm cột 'status_inv'...</p>";
    $sql = "ALTER TABLE `$tableName` ADD COLUMN `status_inv` TINYINT(1) NOT NULL DEFAULT '0' AFTER `date_created`";
    if ($db->query($sql)) {
        echo "<p style='color:blue; font-weight:bold;'>Thêm cột 'status_inv' thành công! Bạn có thể thêm Hình thức thanh toán bình thường.</p>";
    } else {
        echo "<p style='color:red;'>Lỗi khi thêm cột. Vui lòng kiểm tra lại quyền Database.</p>";
    }
}
?>
