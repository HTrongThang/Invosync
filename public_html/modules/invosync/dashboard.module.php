<?php
/*************************************************************************
Admin dashboard module
----------------------------------------------------------------
Derasoft BiDo Project
Coder: Mai Minh
Company: Derasoft Co., Ltd                                  
Email: info@derasoft.com                                    
Last updated: 20/11/2011
**************************************************************************/
//checkPermission(array(1,2,3,4));
echo "<!-- Debug: Loaded modules/invosync/dashboard.module.php successfully! -->\n";
if(!$act) $act = 'index';
if(!$mod) $mod = 'list';
$file = '';
if($act) $file .= $act;
if($mod) $file .= $mod;

$filePath = ROOT_PATH . 'modules/invosync/dashboard/' . strtolower($file) . '.module.php';
echo "<!-- Debug: Attempting to load file: " . $filePath . " -->\n";
if (file_exists($filePath)) {
    include_once($filePath);
} else {
    echo "Error: Target dashboard file not found at " . $filePath;
}
echo "<!-- Debug: Finished loading dashboard module. -->\n";