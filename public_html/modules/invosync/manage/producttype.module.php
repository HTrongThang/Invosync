<?php
/*************************************************************************
Product Type module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('producttype','view');

$aScript = 'admin.php';
$template->assign('aScript', $aScript);

$mod = $request->element('mod');
if(!$mod) $mod = 'list';

switch($mod) {
	case 'add':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/producttypeadd.module.php");
		break;
	case 'edit':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/producttypeedit.module.php");
		break;
	case 'cleantrash':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/producttypecleantrash.module.php");
		break;
	default:
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/producttypelist.module.php");
		break;
}
?>
