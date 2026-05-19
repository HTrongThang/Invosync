<?php
define('ROOT_PATH', dirname(__FILE__).'/');
include_once(ROOT_PATH.'includes/constant.inc.php');
include_once(ROOT_PATH.'classes/template/smarty.class.php');

$template = new Smarty;
$template->assign('templatePath', TEMPLATE_PATH);
$template->assign('userTemplate', 'invosync');
$template->assign('pageTitle', 'Test Render');
$template->assign('aScript', 'admin.php');

$output = $template->fetch('invosync/formxuatban.tpl.html');
echo "=== OUTPUT START ===\n";
echo $output;
echo "\n=== OUTPUT END ===\n";
?>
