<?php
/*************************************************************************
Editing staff module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('staff','edit');

$templateFile = 'managestaffedit.tpl.html';

include_once(ROOT_PATH.'classes/dao/users.class.php');
include_once(ROOT_PATH.'classes/dao/usergroups.class.php');

$staffs = new Users($storeId);
$staffGroups = new UserGroups($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Nhân viên' => '/'.ADMIN_SCRIPT.'?op=manage&act=staff',
				'Sửa thông tin nhân viên' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=staff';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',0);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);
$error_code = $request->element('ecode');
if($error_code) $template->assign('error_code',$error_code);

# Get item info
$id = $request->element('id');
if(!$id) {
    header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&ecode=5");
    exit;
}
$itemInfo = $staffs->getObject($id);
if(!$itemInfo) {
    header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&ecode=5");
    exit;
}
$template->assign('itemInfo', $itemInfo);
$itemProperties = $itemInfo->getProperties();
$template->assign('itemProperties', $itemProperties);

# Generate User Groups combo box
$groupId = isset($itemProperties['group_id']) ? $itemProperties['group_id'] : '';
if($request->element('group_id')) $groupId = $request->element('group_id');
$userGroupsCombo = $staffGroups->generateCombo($groupId, "`status` <> '2'");
$template->assign('userGroupsCombo', $userGroupsCombo);

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	$validate = validateData($request, $staffs, $id);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		#Properties
		$properties = $itemProperties;
		$properties['group_id'] = $request->element('group_id');
		$properties['note'] = $request->element('note');

		$data = array('store_id' => $storeId,
					  'fullname' => Filter($request->element('fullname')),
					  'email' => Filter($request->element('email')),
					  'address' => Filter($request->element('address')),
					  'tel' => Filter($request->element('tel')),
					  'properties' => serialize($properties),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		# Update password if provided
		$password = trim($request->element('password'));
		if($password) {
			$data['password'] = md5($password);
		}
		
		# Update username if provided
		$username = trim($request->element('username'));
		if($username) {
		    $data['username'] = $username;
		}

		if($staffs->updateData($data, $id)) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Sửa thông tin nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staff&mod=list&rcode=7");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $staffs, $id) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	
	$username = trim($request->element('username'));
	if($username) {
		$error['INPUT']['username'] = $validate->validString($username, 'Tên đăng nhập');
		if(!$error['INPUT']['username']['error']) {
			if($staffs->checkDuplicate($username, 'username', "`id` <> '$id'")) {
				$error['INPUT']['username']['error'] = 1;
				$error['INPUT']['username']['message'] = 'Tên đăng nhập đã tồn tại trong hệ thống.';
			}
		}
	}
	
	$password = $request->element('password');
	if($password) {
		$error['INPUT']['password'] = $validate->validString($password, 'Mật khẩu');
	}
	
	$error['INPUT']['fullname'] = $validate->validString($request->element('fullname'), 'Họ và tên');
	
	$error['invalid'] = 0;
	if((isset($error['INPUT']['username']) && $error['INPUT']['username']['error']) || 
	   (isset($error['INPUT']['password']) && $error['INPUT']['password']['error']) || 
	   $error['INPUT']['fullname']['error']) {
		$error['invalid'] = 1;
	}
	return $error;
}
?>
