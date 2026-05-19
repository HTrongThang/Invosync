<?php
/*************************************************************************
Receipt Other module (Phiếu thu khác)
----------------------------------------------------------------
InvoSync Project
Last updated: 19/05/2026
**************************************************************************/
# Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

# Redirect to the main receipt list for now
header("Location: /" . ADMIN_SCRIPT . "?op=receipt&act=rec&mod=list");
exit;
?>
