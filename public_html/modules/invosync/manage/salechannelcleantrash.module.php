<?php
include_once(ROOT_PATH.'classes/dao/salechannels.class.php');
$saleChannels = new SaleChannels($storeId);

if($saleChannels->cleanTrash()) {
	$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn rác kênh bán hàng','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=salechannel&mod=list&rcode=6");
} else {
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=salechannel&mod=list&rcode=7");
}
?>
