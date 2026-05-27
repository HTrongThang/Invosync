<?php
/*************************************************************************
Product Group module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('productgroup','view');

$aScript = 'admin.php';
$template->assign('aScript', $aScript);

$mod = $request->element('mod');
if(!$mod) $mod = 'list';

switch($mod) {
	case 'add':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productgroupadd.module.php");
		break;
	case 'edit':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productgroupedit.module.php");
		break;
	case 'cleantrash':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productgroupcleantrash.module.php");
		break;
	default:
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productgrouplist.module.php");
		break;
}
?>
