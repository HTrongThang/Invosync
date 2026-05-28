<?php
$aScript = 'admin.php';
$template->assign('aScript', $aScript);

$mod = $request->element('mod');
if(!$mod) $mod = 'list';

switch($mod) {
	case 'add':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/salechanneladd.module.php");
		break;
	case 'edit':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/salechanneledit.module.php");
		break;
	case 'cleantrash':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/salechannelcleantrash.module.php");
		break;
	default:
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/salechannellist.module.php");
		break;
}
?>
