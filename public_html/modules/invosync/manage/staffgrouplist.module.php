<?php
/*************************************************************************
Staff Group listing module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('staffgroup','list');

$allow_sort_keys = array('id','name','date_created','status');

$templateFile = 'managestaffgrouplist.tpl.html';
include_once(ROOT_PATH.'classes/dao/usergroups.class.php');

$staffGroups = new UserGroups($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Nhóm nhân viên' => '/'.ADMIN_SCRIPT.'?op=manage&act=staffgroup',
				$amessages['list_item'] => '');
# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=staffgroup';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');			
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);

# Items per pages
$items_per_page = $request->element('ipp')?$request->element('ipp'):DEFAULT_ADMIN_ROWS_PER_PAGE;
$template->assign('ipp',$items_per_page);

# Page
$page = $request->element('pg',1);
$template->assign('pg',$page);

# Sort key
$sort_key = $request->element('sk','id');
if(!in_array($sort_key,$allow_sort_keys)) $sort_key='id';
$template->assign('sk',$sort_key);

# Sort direction
$sort_direction = $request->element('sd','DESC');
$template->assign('sd',$sort_direction);

# Action
$do = $request->element('doo','');
$template->assign('do',$do);

# Keywords
$kw = $request->element('kw','');
$template->assign('kw',$kw);

# Filter status
$filter_status = $request->element('filter_status','');
$template->assign('filter_status',$filter_status);
if($do != 'search' && !$filter_status) $filter_status = 'all';

# Build WHERE condition
$condition = "1>0";
if($kw) $condition .= " AND (`id`='".controlBackSlashMySQL($kw)."' OR `name` LIKE '%".controlBackSlashMySQL($kw)."%' OR `slug` LIKE '%".controlBackSlashMySQL($kw)."%')";

if($filter_status != '' && $filter_status != 'all') {
	$condition .= " AND `status`='$filter_status'";
} else {
	// Exclude deleted by default
	$condition .= " AND `status` <> '2'";
}

$pages_condition = "`store_id` = '$storeId' AND ($condition)";
$sort = array($sort_key => $sort_direction);

# Page navigation
$rowsPages = $staffGroups->getNumItems('id', $pages_condition,$items_per_page);
$template->assign('rowsPages',$rowsPages);
if($page < 1) $page = 1;
if($page > $rowsPages['pages']) $page = $rowsPages['pages'];
$start_num = ($page-1)*$items_per_page+1;
$template->assign('startNum',$start_num);

$url = '/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&doo=$do&kw=".urlencode($kw)."&filter_status=$filter_status&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$rowsPages['pages'],$page);
$template->assign('pager',$pager);

# Get objects
$listItems = $staffGroups->getObjects($page,$pages_condition,$sort,$items_per_page);
if($listItems) $template->assign('listItems',$listItems);

# Get total members for each group
include_once(ROOT_PATH.'classes/dao/users.class.php');
$staffs = new Users($storeId);
$memberCounts = array();
if($listItems) {
    foreach($listItems as $item) {
        $gid = $item->getId();
        $cntObj = $staffs->getNumItems('id', "`store_id` = '$storeId' AND `status` <> '2' AND `properties` LIKE '%\"group_id\";s:".strlen($gid).":\"".$gid."\"%'");
        $memberCounts[$gid] = isset($cntObj['rows']) ? $cntObj['rows'] : 0;
    }
}
$template->assign('memberCounts', $memberCounts);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);
$error_code = $request->element('ecode');
if($error_code) {
	if($error_code == 10) {
		$amessages['error_code'][10] = 'Hành động bị từ chối! Không thể xóa nhóm vì vẫn còn nhân viên thuộc nhóm này.';
		$template->assign('amessages', $amessages);
	}
	$template->assign('error_code',$error_code);
}

# Link
$link = '/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&kw=".urlencode($kw)."&filter_status=$filter_status&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page";
$template->assign('link',$link);

# Submitted form
if($_POST) {
	switch($do) {
		case 'enable':
			$id = $request->element('id');
			if($id) {
				$staffGroups->changeStatus($id,S_ENABLED);
				$result_code = 1;
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt nhóm nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {		
				$ids = $request->element('ids');
				if($ids) {
					foreach ($ids as $id) {
						$staffGroups->changeStatus($id,S_ENABLED);
					}
					$result_code = 1;
				} else $error_code = 5;
			}
			break;
		case 'disable':
			$id = $request->element('id');
			if($id) {
				$staffGroups->changeStatus($id,S_DISABLED);
				$result_code = 2;
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu nhóm nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {
				$ids = $request->element('ids');
				if($ids) {
					foreach ($ids as $id) {
						$staffGroups->changeStatus($id,S_DISABLED);
					}
					$result_code = 2;
				} else $error_code = 5;
			}
			break;
		case 'delete':
			$id = $request->element('id');
			include_once(ROOT_PATH.'classes/dao/users.class.php');
			$staffs = new Users($storeId);
			if($id) {
				$cntObj = $staffs->getNumItems('id', "`store_id` = '$storeId' AND `status` <> '2' AND `properties` LIKE '%\"group_id\";s:".strlen($id).":\"".$id."\"%'");
				$usersCount = isset($cntObj['rows']) ? $cntObj['rows'] : 0;
				if($usersCount > 0) {
					$error_code = 10;
				} else {
					$staffGroups->changeStatus($id,S_DELETED);
					$result_code = 3;
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa nhóm nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				}
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$deleted = 0;
					$skipped = 0;
					foreach ($ids as $id) {
						$cntObj = $staffs->getNumItems('id', "`store_id` = '$storeId' AND `status` <> '2' AND `properties` LIKE '%\"group_id\";s:".strlen($id).":\"".$id."\"%'");
						$usersCount = isset($cntObj['rows']) ? $cntObj['rows'] : 0;
						if($usersCount > 0) {
							$skipped++;
						} else {
							$staffGroups->changeStatus($id,S_DELETED);
							$deleted++;
						}
					}
					if($deleted > 0 && $skipped == 0) {
						$result_code = 3;
					} elseif($deleted > 0 && $skipped > 0) {
						$result_code = 3;
						$error_code = 10;
					} elseif($deleted == 0 && $skipped > 0) {
						$error_code = 10;
					}
				} else $error_code = 5;
			}
			break;
		case 'cleantrash':
			$staffGroups->cleanTrash();
			$result_code = 5;
			break;
		case 'cancel':		
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&lang=$lang&ecode=7");
			exit;
			break;
	}
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&doo=$do&kw=".urlencode($kw)."&filter_status=$filter_status&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page&ecode=$error_code&rcode=$result_code");
} else {

}
?>
