<?php
/*************************************************************************
Editing customer group module
----------------------------------------------------------------
**************************************************************************/
# Check permission
$userInfo->checkPermission('customer','edit');

$templateFile = 'managecustomergroupedit.tpl.html';
include_once(ROOT_PATH.'classes/dao/customergroups.class.php');
include_once(ROOT_PATH."classes/data/textfilter.class.php");

$customerGroups = new CustomerGroups($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Khách hàng' => '/'.ADMIN_SCRIPT.'?op=manage&act=customer',
				'Sửa nhóm khách hàng' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=customergroup';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				'Sửa' => '',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');			
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',2);

# Result code
$result_code = $request->element('rcode'); 
if($result_code) $template->assign('result_code',$result_code);

$id = $request->element('id');
if($id) $template->assign('id',$id);
$item = $customerGroups->getObject($id);

if(!$item) {
	$template->assign('validItem',0);
} else {
	$template->assign('validItem',1);
	if($_POST && $request->element('doo') == 'submit') { # if form is submitted

		# Validate the data input
		$validate = validateData($request);
		if($validate['invalid']) {	# data input is not in valid form
			$template->assign('error',$validate);
			$item = $customerGroups->getObject($id);
			$template->assign('item',$item);
		} else { 
			# Everything is ok. Update data to DB
			if(!$validate['invalid']) {
				$item = $customerGroups->getObject($id);
				if($item) {
					$properties = array(
						'description' => $request->element('description')
					);
					
				   $data = array('store_id' => $storeId,
							  'name' => Filter($request->element('name')),
							  'properties' => serialize($properties),
							  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					$customerGroupUpdateId = $customerGroups->updateData($data,$id);

					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Cập nhật nhóm khách hàng '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));

					# Redirect to editing page
					header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=customergroup&mod=edit&lang=$lang&id=$id&rcode=7");
				}
			}
		}
	} else { # Load item information to edit
		$item = $customerGroups->getObject($id);
		if($item) {
			$template->assign('item',$item);
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
