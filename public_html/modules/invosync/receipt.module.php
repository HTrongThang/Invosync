<?php
/*************************************************************************
Receipt module dispatcher (Phiếu thu)
----------------------------------------------------------------
InvoSync Project
Last updated: 19/05/2026
**************************************************************************/
// Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

if(!$act) $act = 'rec';
if(!$mod) $mod = 'list';

$file = strtolower($act . $mod);
$filePath = ROOT_PATH . 'modules/invosync/receipt/' . $file . '.module.php';

if (file_exists($filePath)) {
    include_once($filePath);
} else {
    // Fallback to receipt list
    header("Location: /" . ADMIN_SCRIPT . "?op=receipt&act=rec&mod=list");
    exit;
}
?>
