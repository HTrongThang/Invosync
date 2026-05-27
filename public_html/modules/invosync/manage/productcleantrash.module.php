<?php
/*************************************************************************
Clean trash product module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('product','delete');

include_once(ROOT_PATH.'classes/dao/products.class.php');
$products = new Products($storeId);
$products->cleanTrash();

# Operation tracking
$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn thùng rác Hàng hóa','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));

header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=product&mod=list&rcode=8");
exit;
?>
