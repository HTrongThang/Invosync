<?php
define('ROOT_PATH', dirname(__FILE__).'/');
$configs = [
    [
        'name' => 'Địa điểm kinh doanh',
        'dao' => 'Business',
        'dao_file' => 'business.class.php',
        'prefix' => 'business',
    ],
    [
        'name' => 'Hình thức thanh toán',
        'dao' => 'Payments',
        'dao_file' => 'payments.class.php',
        'prefix' => 'payment',
    ]
];

foreach ($configs as $c) {
    $prefix = $c['prefix'];
    
    // 1. Router module
    $router = '<?php
$aScript = \'admin.php\';
$template->assign(\'aScript\', $aScript);
$mod = $request->element(\'mod\');
if(!$mod) $mod = \'list\';
switch($mod) {
	case \'add\':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/'.$prefix.'add.module.php");
		break;
	case \'edit\':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/'.$prefix.'edit.module.php");
		break;
	case \'cleantrash\':
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/'.$prefix.'cleantrash.module.php");
		break;
	default:
		include_once(ROOT_PATH."modules/".DOMAIN."/manage/'.$prefix.'list.module.php");
		break;
}
?>';
    file_put_contents(ROOT_PATH . "modules/invosync/manage/{$prefix}.module.php", $router);

    // 2. Add module
    $add = '<?php
$templateFile = \'manage'.$prefix.'add.tpl.html\';
include_once(ROOT_PATH.\'classes/dao/'.$c['dao_file'].'\');
$dbObj = new '.$c['dao'].'($storeId);
$topNav = array($amessages[\'dash_board\'] => \'/\'.ADMIN_SCRIPT.\'?op=dashboard\',
				$amessages[\'manage_website\'] => \'/\'.ADMIN_SCRIPT.\'?op=manage\',
				\''.$c['name'].'\' => \'/\'.ADMIN_SCRIPT.\'?op=manage&act='.$prefix.'\',
				\'Thêm mới\' => \'\');
$tabLink = \'/\'.ADMIN_SCRIPT.\'?op=manage&act='.$prefix.'\';
$listTabs = array($amessages[\'list_item\'] => $tabLink.\'&mod=list\',
				$amessages[\'add_new\'] => \'\',
				$amessages[\'clean_trash\'] => $tabLink.\'&mod=cleantrash\');
$template->assign(\'listTabs\',$listTabs);
$template->assign(\'currentTab\',2);
$result_code = $request->element(\'rcode\');
if($result_code) $template->assign(\'result_code\',$result_code);

if($_POST && $request->element(\'doo\') == \'submit\') { 
	$error = array();
	$error[\'invalid\'] = 0;
	if($error[\'invalid\']) {	
		$template->assign(\'error\',$error);
	} else { 
		$properties = array(\'\');
		$data = array(\'store_id\' => $storeId,
					  \'name\' => Filter($request->element(\'name\')),
					  \'position\' => Filter($request->element(\'position\')),
					  \'properties\' => serialize($properties),
					  \'date_created\' => date("Y-m-d H:i:s"),
					  \'status\' => (int)$request->element(\'status\') ? (int)$request->element(\'status\') : 1);
		$newId = $dbObj->addData($data);
		if($newId) {
			$trackings->addData(array(\'store_id\'=>$storeId,\'username\'=>$userInfo->getUsername(),\'action\'=>\'Thêm mới '.$c['name'].' \'.$request->element(\'name\'),\'date_created\'=>date("Y-m-d H:i:s"),\'ip\'=>$_SERVER[\'REMOTE_ADDR\']));
			header(\'location:\'.\'/\'.ADMIN_SCRIPT."?op=manage&act='.$prefix.'&mod=list&rcode=6");
			exit;
		} else {
			$template->assign(\'result_code\', \'error\');
		}
	}
}
?>';
    file_put_contents(ROOT_PATH . "modules/invosync/manage/{$prefix}add.module.php", $add);

    // 3. Edit module
    $edit = '<?php
$templateFile = \'manage'.$prefix.'add.tpl.html\';
include_once(ROOT_PATH.\'classes/dao/'.$c['dao_file'].'\');
$dbObj = new '.$c['dao'].'($storeId);
$topNav = array($amessages[\'dash_board\'] => \'/\'.ADMIN_SCRIPT.\'?op=dashboard\',
				$amessages[\'manage_website\'] => \'/\'.ADMIN_SCRIPT.\'?op=manage\',
				\''.$c['name'].'\' => \'/\'.ADMIN_SCRIPT.\'?op=manage&act='.$prefix.'\',
				\'Sửa thông tin\' => \'\');
$tabLink = \'/\'.ADMIN_SCRIPT.\'?op=manage&act='.$prefix.'\';
$listTabs = array($amessages[\'list_item\'] => $tabLink.\'&mod=list\',
				$amessages[\'add_new\'] => $tabLink.\'&mod=add\',
				$amessages[\'clean_trash\'] => $tabLink.\'&mod=cleantrash\');
$template->assign(\'listTabs\',$listTabs);
$template->assign(\'currentTab\',1);
$result_code = $request->element(\'rcode\');
if($result_code) $template->assign(\'result_code\',$result_code);

$id = $request->element(\'id\');
if($id) {
	$item = $dbObj->getObject($id);
	if($item) {
		$template->assign(\'item\', $item);
	} else {
		header(\'location:\'.\'/\'.ADMIN_SCRIPT."?op=manage&act='.$prefix.'&mod=list&rcode=1");
		exit;
	}
}

if($_POST && $request->element(\'doo\') == \'submit\') { 
	$error = array();
	$error[\'invalid\'] = 0;
	if($error[\'invalid\']) {	
		$template->assign(\'error\',$error);
	} else { 
		$properties = array(\'\');
		$data = array(\'store_id\' => $storeId,
					  \'name\' => Filter($request->element(\'name\')),
					  \'position\' => Filter($request->element(\'position\')),
					  \'properties\' => serialize($properties),
					  \'status\' => (int)$request->element(\'status\') ? (int)$request->element(\'status\') : 0);
		if($dbObj->updateData($data, $id)) {
			$trackings->addData(array(\'store_id\'=>$storeId,\'username\'=>$userInfo->getUsername(),\'action\'=>\'Sửa '.$c['name'].' \'.$request->element(\'name\'),\'date_created\'=>date("Y-m-d H:i:s"),\'ip\'=>$_SERVER[\'REMOTE_ADDR\']));
			header(\'location:\'.\'/\'.ADMIN_SCRIPT."?op=manage&act='.$prefix.'&mod=list&rcode=7");
			exit;
		} else {
			$template->assign(\'result_code\', \'error\');
		}
	}
}
?>';
    file_put_contents(ROOT_PATH . "modules/invosync/manage/{$prefix}edit.module.php", $edit);

    // 4. List module
    $list = '<?php
$templateFile = \'manage'.$prefix.'list.tpl.html\';
include_once(ROOT_PATH.\'classes/dao/'.$c['dao_file'].'\');
$dbObj = new '.$c['dao'].'($storeId);
$topNav = array($amessages[\'dash_board\'] => \'/\'.ADMIN_SCRIPT.\'?op=dashboard\',
				$amessages[\'manage_website\'] => \'/\'.ADMIN_SCRIPT.\'?op=manage\',
				\''.$c['name'].'\' => \'/\'.ADMIN_SCRIPT.\'?op=manage&act='.$prefix.'\',
				\'Danh sách\' => \'\');
$tabLink = \'/\'.ADMIN_SCRIPT.\'?op=manage&act='.$prefix.'\';
$listTabs = array($amessages[\'list_item\'] => $tabLink.\'&mod=list\',
				$amessages[\'add_new\'] => $tabLink.\'&mod=add\',
				$amessages[\'clean_trash\'] => $tabLink.\'&mod=cleantrash\');
$template->assign(\'listTabs\',$listTabs);
$template->assign(\'currentTab\',1);
$result_code = $request->element(\'rcode\');
if($result_code) $template->assign(\'result_code\',$result_code);

$action = $request->element(\'doo\');
if($action) {
	$listIds = $request->element(\'ids\');
	if(is_array($listIds)) {
		foreach($listIds as $id) {
			switch($action) {
				case \'enable\':
					$dbObj->changeStatus($id, 1);
					break;
				case \'disable\':
					$dbObj->changeStatus($id, 0);
					break;
				case \'delete\':
					$dbObj->changeStatus($id, 2);
					break;
			}
		}
		header(\'location:\'.\'/\'.ADMIN_SCRIPT."?op=manage&act='.$prefix.'&mod=list&rcode=6");
		exit;
	}
}

$condition = "`status` != 2";
$kw = $request->element(\'kw\');
if($kw) {
	$condition .= " AND (`name` LIKE \'%$kw%\')";
	$template->assign(\'kw\',$kw);
}

$items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE;
$page = $request->element(\'page\') ? $request->element(\'page\') : 1;
// Mock pagination or use real if exists
$total_items = method_exists($dbObj, "getNumItems") ? $dbObj->getNumItems("id", $condition) : 20;
$total_pages = ceil($total_items / $items_per_page);
if($page > $total_pages && $total_pages > 0) $page = $total_pages;

$listItems = method_exists($dbObj, "getObjects") ? $dbObj->getObjects($page, $condition, array("id" => "DESC"), $items_per_page) : array();
if($listItems) $template->assign(\'listItems\',$listItems);

$paging = array(\'page\' => $page, \'total_pages\' => $total_pages, \'total_items\' => $total_items, \'items_per_page\' => $items_per_page);
$template->assign(\'paging\',$paging);
?>';
    file_put_contents(ROOT_PATH . "modules/invosync/manage/{$prefix}list.module.php", $list);

    // 5. Clean trash module
    $clean = '<?php
include_once(ROOT_PATH.\'classes/dao/'.$c['dao_file'].'\');
$dbObj = new '.$c['dao'].'($storeId);
if($dbObj->cleanTrash()) {
	$trackings->addData(array(\'store_id\'=>$storeId,\'username\'=>$userInfo->getUsername(),\'action\'=>\'Dọn rác '.$c['name'].'\',\'date_created\'=>date("Y-m-d H:i:s"),\'ip\'=>$_SERVER[\'REMOTE_ADDR\']));
	header(\'location:\'.\'/\'.ADMIN_SCRIPT."?op=manage&act='.$prefix.'&mod=list&rcode=6");
} else {
	header(\'location:\'.\'/\'.ADMIN_SCRIPT."?op=manage&act='.$prefix.'&mod=list&rcode=7");
}
?>';
    file_put_contents(ROOT_PATH . "modules/invosync/manage/{$prefix}cleantrash.module.php", $clean);

    // 6. Template List
    $tplList = file_get_contents(ROOT_PATH . "templates/invosync/managesalechannellist.tpl.html");
    $tplList = str_replace('KÊNH BÁN HÀNG', mb_strtoupper($c['name'], 'UTF-8'), $tplList);
    $tplList = str_replace('Kênh bán hàng', $c['name'], $tplList);
    $tplList = str_replace('act=salechannel', 'act='.$prefix, $tplList);
    $tplList = str_replace('Tên kênh', 'Tên', $tplList);
    file_put_contents(ROOT_PATH . "templates/invosync/manage{$prefix}list.tpl.html", $tplList);

    // 7. Template Add
    $tplAdd = file_get_contents(ROOT_PATH . "templates/invosync/managesalechanneladd.tpl.html");
    $tplAdd = str_replace('KÊNH BÁN HÀNG', mb_strtoupper($c['name'], 'UTF-8'), $tplAdd);
    $tplAdd = str_replace('Kênh bán hàng', $c['name'], $tplAdd);
    $tplAdd = str_replace('act=salechannel', 'act='.$prefix, $tplAdd);
    $tplAdd = str_replace('Tên kênh', 'Tên', $tplAdd);
    file_put_contents(ROOT_PATH . "templates/invosync/manage{$prefix}add.tpl.html", $tplAdd);
}
echo "Done";
?>
