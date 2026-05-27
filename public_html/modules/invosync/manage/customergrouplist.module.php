<?php
/*************************************************************************
Customer Group listing module
----------------------------------------------------------------
**************************************************************************/
# Check permission

# Allowed sort keys - prevent SQL injection
$allow_sort_keys = array('id', 'name', 'status');
$templateFile = 'managecustomergrouplist.tpl.html';
include_once(ROOT_PATH.'classes/dao/customergroups.class.php');
include_once(ROOT_PATH.'classes/dao/customers.class.php');
$customerGroups = new CustomerGroups($storeId);
$customers = new Customers($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Khách hàng' => '/'.ADMIN_SCRIPT.'?op=manage&act=customer',
				'Danh sách nhóm khách hàng' => '');
# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=customergroup';
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

// # Sort key
$sort_key = $request->element('sk','id');
if(!in_array($sort_key,$allow_sort_keys)) $sort_key='id';
$template->assign('sk',$sort_key);

# Sort direction
$sort_direction = $request->element('sd','DESC');
$template->assign('sd',$sort_direction);

# Build Sort
$sort = array($sort_key => $sort_direction);

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
if($kw) $condition .= " AND (`id`='".controlBackSlashMySQL($kw)."' OR `name` LIKE '%".controlBackSlashMySQL($kw)."%')";

if($filter_status != '' && $filter_status != 'all') {
    $condition .= " AND `status`='$filter_status'";
} else {
    $condition .= " AND `status` != '".S_DELETED."'";
}

$pages_condition = "`store_id` = '$storeId' AND ($condition)";
$sort = array($sort_key => $sort_direction);

# Page navigation
$rowsPages = $customerGroups->getNumItems('id', $pages_condition,$items_per_page);
$template->assign('rowsPages',$rowsPages);
if($page < 1) $page = 1;
if($page > $rowsPages['pages']) $page = $rowsPages['pages'];
$start_num = ($page-1)*$items_per_page+1;
$template->assign('startNum',$start_num);
$url = '/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=list&doo=$do&kw=".urlencode($kw)."&filter_status=$filter_status&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$rowsPages['pages'],$page);
$template->assign('pager',$pager);

# Get objects
$listItems = $customerGroups->getObjects($page,$pages_condition,$sort,$items_per_page);
if($listItems) $template->assign('listItems',$listItems);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);
$error_code = $request->element('ecode');
if($error_code) $template->assign('error_code',$error_code);

# Link
$link = '/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=list&kw=".urlencode($kw)."&filter_status=$filter_status&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page";
$template->assign('link',$link);
# Submitted form
if($_POST) {
	switch($do) {
		case 'enable':
			$id = $request->element('id');

			if($id) {
				$customerGroups->changeStatus($id,S_ENABLED);
				$result_code = 1;
				
				# Operation tracking
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt nhóm khách hàng '.$customerGroups->getNameFromId($id),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {		
				$ids = $request->element('ids');
				if($ids) {
					$listCustomer = '';
					foreach ($ids as $id) {
						$customerGroups->changeStatus($id,S_ENABLED);
						$listCustomer .= ($listCustomer?',&nbsp;':'').$customerGroups->getNameFromId($id);
					}
					$result_code = 1;
					
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt nhóm khách hàng '.$listCustomer,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				} else $error_code = 5;
			}
			break;
		case 'disable':
			$id = $request->element('id');
			if($id) {
				$customerGroups->changeStatus($id,S_DISABLED);
				$result_code = 2;
				
				# Operation tracking
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu nhóm khách hàng '.$customerGroups->getNameFromId($id),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$listCustomer = '';
					foreach ($ids as $id) {
						$customerGroups->changeStatus($id,S_DISABLED);
						$listCustomer .= ($listCustomer?',&nbsp;':'').$customerGroups->getNameFromId($id);
					}
					$result_code = 2;
					
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu nhóm khách hàng '.$listCustomer,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				} else $error_code = 5;
			}
			break;
		case 'delete':
			$id = $request->element('id');
			if($id) {
				if($customers->countItems('id', "group_id='$id'") > 0) {
					$error_code = 11;
				} else {
					$customerGroups->changeStatus($id,S_DELETED);
					$result_code = 3;
					
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa nhóm khách hàng '.$customerGroups->getNameFromId($id),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				}
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$listCustomer = '';
					$hasError = false;
					foreach ($ids as $id) {
						if($customers->countItems('id', "group_id='$id'") > 0) {
							$hasError = true;
						} else {
							$customerGroups->changeStatus($id,S_DELETED);
							$listCustomer .= ($listCustomer?',&nbsp;':'').$customerGroups->getNameFromId($id);
						}
					}
					if($listCustomer) {
						$result_code = 3;
						
						# Operation tracking
						$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa nhóm khách hàng '.$listCustomer,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
					}
					if($hasError) {
						$error_code = 11;
					}
				} else $error_code = 5;
			}
			break;
		case 'cleantrash':
			$customerGroups->cleanTrash();
			$result_code = 5;
			
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Dọn rác nhóm khách hàng','date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			break;
		case 'cancel':		
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=list&lang=$lang&ecode=7");
			exit;
			break;
	}
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=list&doo=$do&kw=".urlencode($kw)."&filter_status=$filter_status&lang=$lang&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page&ecode=$error_code&rcode=$result_code");
} 

?>
