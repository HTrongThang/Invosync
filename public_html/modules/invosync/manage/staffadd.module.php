<?php
/*************************************************************************
Adding staff module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('staff','add');

$templateFile = 'managestaffadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/users.class.php');
include_once(ROOT_PATH.'classes/dao/usergroups.class.php');

$staffs = new Users($storeId);
$staffGroups = new UserGroups($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Nhân viên' => '/'.ADMIN_SCRIPT.'?op=manage&act=staff',
				'Thêm nhân viên mới' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=staff';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => '',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',2);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

# Generate User Groups combo box
$userGroupsCombo = $staffGroups->generateCombo($request->element('group_id'), "`status` <> '2'");
$template->assign('userGroupsCombo', $userGroupsCombo);

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	$validate = validateData($request, $staffs);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		#Properties
		$properties = array(
			'group_id' => $request->element('group_id'),
			'note' => $request->element('note')
		);

		$data = array('store_id' => $storeId,
					  'username' => trim($request->element('username')),
					  'password' => md5($request->element('password')),
					  'fullname' => Filter($request->element('fullname')),
					  'email' => Filter($request->element('email')),
					  'address' => Filter($request->element('address')),
					  'tel' => Filter($request->element('tel')),
					  'type' => U_SITE_STAFF, // Default to staff
					  'properties' => serialize($properties),
					  'date_created' => date("Y-m-d H:i:s"),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
		
		$newId = $staffs->addData($data);
		if($newId) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Thêm nhân viên mới '.$request->element('username'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&rcode=6");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}
# Check validate input
function validateData($request, $staffs) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	
	$error['INPUT']['fullname'] = $validate->validString($request->element('fullname'), 'Họ và tên');
	
	$error['invalid'] = 0;
	if($error['INPUT']['fullname']['error']) {
		$error['invalid'] = 1;
	}
	return $error;
}
?>
