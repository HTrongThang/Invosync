<?php
/*************************************************************************
Invosync Manage module
----------------------------------------------------------------
**************************************************************************/

if(!$act) $act = 'index';
if(!$mod) $mod = 'list';
$file = '';
if($act) $file .= strtolower($act);
if($mod) $file .= strtolower($mod);

if(file_exists(ROOT_PATH.'modules/invosync/manage/'.$file.'.module.php')) {
	include_once(ROOT_PATH.'modules/invosync/manage/'.$file.'.module.php');
}
?>
