<?php
define('ROOT_PATH', 'd:/2.Company/Invosync/public_html/');
require ROOT_PATH . 'classes/template/smarty.class.php';
$smarty = new Smarty();
$smarty->template_dir = ROOT_PATH . 'templates/invosync/';
$smarty->compile_dir = ROOT_PATH . 'templates_c/';
try {
    $smarty->compile_check = true;
    $smarty->fetch('managecustomergrouplist.tpl.html');
    echo "Success!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
