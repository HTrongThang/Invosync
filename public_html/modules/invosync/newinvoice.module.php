<?php
/*************************************************************************
Admin newinvoice module dispatcher
----------------------------------------------------------------
DeraCMS Project
Company: Derasoft Co., Ltd                                  
Last updated: 19/05/2026
**************************************************************************/
// Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}
if(!$act) $act = 'new';
if(!$mod) $mod = 'list';

$file = strtolower($act . $mod);
$filePath = ROOT_PATH . 'modules/invosync/newinvoice/' . $file . '.module.php';

if (file_exists($filePath)) {

    include_once($filePath);
} else {
    echo "Error: Target newinvoice file not found at " . $filePath;
}
?>
