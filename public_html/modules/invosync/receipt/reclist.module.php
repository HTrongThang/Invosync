<?php
/*************************************************************************
Receipt List module (Danh sách phiếu thu)
----------------------------------------------------------------
InvoSync Project
Last updated: 19/05/2026
**************************************************************************/
# Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

$templateFile = 'listphieuthu.tpl.html';
$template->assign('pageTitle', 'Danh sách phiếu thu');
?>
