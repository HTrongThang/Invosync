<?php
/*************************************************************************
Product module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('product','view');

$aScript = 'admin.php';
$template->assign('aScript', $aScript);

$mod = $request->element('mod');
if(!$mod) $mod = 'list';

switch($mod) {
	case 'add':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productadd.module.php");
		break;
	case 'edit':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productedit.module.php");
		break;
	case 'cleantrash':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productcleantrash.module.php");
		break;
	default:
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/productlist.module.php");
		break;
}
?>
