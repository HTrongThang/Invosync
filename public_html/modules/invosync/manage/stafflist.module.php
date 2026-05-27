<?php
/*************************************************************************
Staff listing module
----------------------------------------------------------------
**************************************************************************/
# Check permission

$allow_sort_keys = array('id','username','fullname','email','tel','date_created','last_login','status');

$templateFile = 'managestafflist.tpl.html';
include_once(ROOT_PATH.'classes/dao/users.class.php');
include_once(ROOT_PATH.'classes/dao/usergroups.class.php');

$staffs = new Users($storeId);
$staffGroups = new UserGroups($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Nhân viên' => '/'.ADMIN_SCRIPT.'?op=manage&act=staff',
				$amessages['list_item'] => '');
# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=staff';
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

# Filter groups
$filter_groups = $request->element('filter_groups','');
$template->assign('filter_groups',$filter_groups);
if($do != 'search' && !$filter_groups) $filter_groups = 'all';

# Groups combo box
$userGroupsCombo = $staffGroups->generateCombo($request->element('filter_groups'), "`status` <> '2'");
$template->assign('userGroupsCombo',$userGroupsCombo);

# Build WHERE condition
$condition = "1>0";
if($kw) $condition .= " AND (`id`='".controlBackSlashMySQL($kw)."' OR `username` LIKE '%".controlBackSlashMySQL($kw)."%' OR `fullname` LIKE '%".controlBackSlashMySQL($kw)."%' OR `email` LIKE '%".controlBackSlashMySQL($kw)."%' OR `tel` LIKE '%".controlBackSlashMySQL($kw)."%')";

if($filter_status != '' && $filter_status != 'all') {
	$condition .= " AND `status`='$filter_status'";
} else {
	// Exclude deleted by default
	$condition .= " AND `status` <> '2'";
}

if($filter_groups != '' && $filter_groups != 'all') {
    // Requires JSON search since properties are serialized, or just use LIKE. We'll use LIKE for simplicity if properties is text.
    // Actually in usergroups it might be easier to use LIKE '%"group_id":"'.$filter_groups.'"%'
    $condition .= " AND `properties` LIKE '%\"group_id\";s:".strlen($filter_groups).":\"".$filter_groups."\"%'";
}

$pages_condition = "`store_id` = '$storeId' AND ($condition)";
$sort = array($sort_key => $sort_direction);

# Page navigation
$rowsPages = $staffs->getNumItems('id', $pages_condition,$items_per_page);
$template->assign('rowsPages',$rowsPages);
if($page < 1) $page = 1;
if($page > $rowsPages['pages']) $page = $rowsPages['pages'];
$start_num = ($page-1)*$items_per_page+1;
$template->assign('startNum',$start_num);

$url = '/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&doo=$do&kw=".urlencode($kw)."&filter_status=$filter_status&filter_groups=$filter_groups&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$rowsPages['pages'],$page);
$template->assign('pager',$pager);

# Get objects
$listItems = $staffs->getObjects($page,$pages_condition,$sort,$items_per_page);
if($listItems) $template->assign('listItems',$listItems);

# Get groups dictionary for displaying names
$groupsObj = $staffGroups->getObjects(1, "1>0", array('id'=>'ASC'), 1000);
$groupDict = array();
if($groupsObj) {
    foreach($groupsObj as $g) {
        $groupDict[$g->getId()] = $g->getName();
    }
}
$template->assign('groupDict', $groupDict);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);
$error_code = $request->element('ecode');
if($error_code) $template->assign('error_code',$error_code);

# Link
$link = '/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&kw=".urlencode($kw)."&filter_status=$filter_status&filter_groups=$filter_groups&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page";
$template->assign('link',$link);

# Submitted form
if($_POST) {
	switch($do) {
		case 'enable':
			$id = $request->element('id');
			if($id) {
				$staffs->changeStatus($id,S_ENABLED);
				$result_code = 1;
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {		
				$ids = $request->element('ids');
				if($ids) {
					foreach ($ids as $id) {
						$staffs->changeStatus($id,S_ENABLED);
					}
					$result_code = 1;
				} else $error_code = 5;
			}
			break;
		case 'disable':
			$id = $request->element('id');
			if($id) {
				$staffs->changeStatus($id,S_DISABLED);
				$result_code = 2;
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {
				$ids = $request->element('ids');
				if($ids) {
					foreach ($ids as $id) {
						$staffs->changeStatus($id,S_DISABLED);
					}
					$result_code = 2;
				} else $error_code = 5;
			}
			break;
		case 'delete':
			$id = $request->element('id');
			if($id) {
				$staffs->changeStatus($id,S_DELETED);
				$result_code = 3;
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {
				$ids = $request->element('ids');
				if($ids) {
					foreach ($ids as $id) {
						$staffs->changeStatus($id,S_DELETED);
					}
					$result_code = 3;
				} else $error_code = 5;
			}
			break;
		case 'cleantrash':
			$staffs->cleanTrash();
			$result_code = 5;
			break;
		case 'cancel':		
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&lang=$lang&ecode=7");
			exit;
			break;
	}
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&doo=$do&kw=".urlencode($kw)."&filter_status=$filter_status&filter_groups=$filter_groups&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page&ecode=$error_code&rcode=$result_code");
} else {

}
?>
