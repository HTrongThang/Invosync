<?php
include_once(ROOT_PATH.'classes/dao/payments.class.php');
$dbObj = new Payments($storeId);
if($dbObj->cleanTrash()) {
	$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn rác Hình thức thanh toán','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&rcode=6");
} else {
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&rcode=7");
}
?>