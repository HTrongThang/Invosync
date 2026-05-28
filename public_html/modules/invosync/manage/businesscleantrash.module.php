<?php
include_once(ROOT_PATH.'classes/dao/business.class.php');
$dbObj = new Business($storeId);
if($dbObj->cleanTrash()) {
	$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn rác Địa điểm kinh doanh','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=business&mod=list&rcode=6");
} else {
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=business&mod=list&rcode=7");
}
?>