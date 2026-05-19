<?php
/*************************************************************************
New Invoice List Other module
----------------------------------------------------------------
DeraCMS Project
Company: Derasoft Co., Ltd                                  
Last updated: 19/05/2026
**************************************************************************/
# Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

# Redirect to the main list view
header("Location: /" . ADMIN_SCRIPT . "?op=newinvoice&act=new&mod=list");
exit;
?>
