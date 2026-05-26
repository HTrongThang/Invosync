<?php
/*************************************************************************
Invosync System Config module
----------------------------------------------------------------
**************************************************************************/
# Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}
$templateFile = 'managesystemconfig.tpl.html';

global $estore, $storeId, $request, $template;
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
$stores = new EStores();
$doo = $request->element('doo');

// Handle save
if ($doo == 'submit') {
    $configs = $request->element('config');
    
    // Checkboxes (chỉ gửi lên nếu được check), cần gán 0 cho các ô không check
    $checkboxes = array('col_chietkhau', 'col_khuyenmai', 'col_ghichu', 'col_hanghoadactrung', 'col_oto', 'col_vanchuyen', 'col_tmdt');
    foreach ($checkboxes as $cb) {
        if (!isset($configs[$cb])) {
            $configs[$cb] = 0;
        }
    }

    if (is_array($configs)) {
        $properties = $estore->getProperties();
        foreach ($configs as $k => $v) {
            $properties[$k] = $v;
        }

        $stores->updateData(array('properties' => serialize($properties)), $storeId);
        $estore->setProperties($properties);
    }

    // Redirect back to config
    header("Location: /" . ADMIN_SCRIPT . "?op=manage&act=system&mod=config");
    exit;
}


?>
