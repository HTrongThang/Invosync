<?php
/*************************************************************************
Clean trash warehouse module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('warehouse','cleantrash');
$templateFile = 'dashboard.tpl.html';
include_once(ROOT_PATH.'classes/dao/warehouses.class.php');
$warehouses = new WareHouse($storeId);

$result_code = 5;
if($warehouses->cleanTrash()) $result_code = 4;
# Operation tracking
$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn rác kho hàng','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=warehouse&mod=list&rcode=$result_code");
?>
