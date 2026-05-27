<?php
/*************************************************************************
Clean trash product group module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('productgroup','delete');

include_once(ROOT_PATH.'classes/dao/productcategories.class.php');
$productCategories = new ProductCategories($storeId);
$productCategories->cleanTrash();

# Operation tracking
$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn thùng rác Nhóm hàng hóa','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));

header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=productgroup&mod=list&rcode=8");
exit;
?>
