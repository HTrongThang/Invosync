<?php
/*************************************************************************
Clean trash product type module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('producttype','delete');

include_once(ROOT_PATH.'classes/dao/producttypes.class.php');
$productTypes = new ProductTypes($storeId);
$productTypes->cleanTrash();

# Operation tracking
$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn thùng rác Loại hàng hóa','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));

header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=producttype&mod=list&rcode=8");
exit;
?>
