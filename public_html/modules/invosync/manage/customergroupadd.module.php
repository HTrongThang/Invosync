<?php
/*************************************************************************
Adding customer group module
----------------------------------------------------------------
**************************************************************************/
# Check permission

$templateFile = 'managecustomergroupadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/customergroups.class.php');
$customerGroups = new CustomerGroups($storeId);
# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Khách hàng' => '/'.ADMIN_SCRIPT.'?op=manage&act=customer',
				'Thêm nhóm khách hàng' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=customergroup';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => '',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',2);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	
	$validate = validateData($request);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		if(!$validate['invalid']) {
			#Properties
			$properties = array(
				'description' => $request->element('description')
			);

		   $data = array('store_id' => $storeId,
						  'name' => Filter($request->element('name')),
						  'properties' => serialize($properties),
						  'date_created' => date("Y-m-d H:i:s"),
						  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
						  $newId = $customerGroups->addData($data);
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Thêm nhóm khách hàng mới '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=list&rcode=6");
		}
	}
}

# Check validate input
function validateData($request) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), $amessages['name']);
	$error['INPUT']['description'] = $validate->pasteString($request->element('description'));
	$error['INPUT']['status'] = $validate->pasteString($request->element('status'));
	
	if($error['INPUT']['name']['error']){
		$error['invalid'] = 1;
		return $error;
	}
	$error['invalid'] = 0;

	return $error;
}
?>
