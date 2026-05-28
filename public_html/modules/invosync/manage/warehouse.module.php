<?php
/*************************************************************************
Warehouse module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('warehouse','view');

$aScript = 'admin.php';
$template->assign('aScript', $aScript);

$mod = $request->element('mod');
if(!$mod) $mod = 'list';

switch($mod) {
	case 'add':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/warehouseadd.module.php");
		break;
	case 'edit':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/warehouseedit.module.php");
		break;
	case 'cleantrash':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/warehousecleantrash.module.php");
		break;
	default:
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/warehouselist.module.php");
		break;
}
?>
