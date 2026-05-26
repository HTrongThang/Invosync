<?php
/*************************************************************************
Clean trash customer group module
----------------------------------------------------------------
**************************************************************************/
# Check permission
$userInfo->checkPermission('customer','clean',0);

include_once(ROOT_PATH.'classes/dao/customergroups.class.php');
$customerGroups = new CustomerGroups($storeId);
$customerGroups->cleanTrash();

# Operation tracking
$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn rác nhóm khách hàng','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));

header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=list&rcode=5");
?>
