<?php
/*************************************************************************
Edit warehouse module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('warehouse','edit');

$templateFile = 'managewarehouseadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/warehouses.class.php');
$warehouses = new WareHouse($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Kho hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=warehouse',
				'Sửa kho hàng' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=warehouse';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

# Id
$id = $request->element('id');
if($id) {
	$item = $warehouses->getObject($id);
	if($item) {
		$template->assign('item',$item);
	}
} else {
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=warehouse&mod=list&ecode=24");
	exit;
}

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	$validate = validateData($request, $warehouses, $id);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		#Properties
		$properties = array('');
		
		$data = array('store_id' => $storeId,
					  'name' => Filter($request->element('name')),
					  'address' => Filter($request->element('address')),
					  'note' => Filter($request->element('note')),
					  'properties' => serialize($properties),
					  'status_default' => (int)$request->element('status_default') ? 1 : 0,
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		$result = $warehouses->updateData($data, $id);
		if($result) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Sửa kho hàng ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=warehouse&mod=list&rcode=7");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $warehouses, $id) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên kho hàng');
	
	if(!$error['INPUT']['name']['error']) {
		if($warehouses->checkDuplicate($request->element('name'), 'name', "id != '$id'")) {
			$error['INPUT']['name']['error'] = 1;
			$error['INPUT']['name']['message'] = 'Tên kho hàng đã tồn tại.';
		}
	}

	if($error['INPUT']['name']['error']) {
		$error['invalid'] = 1;
		return $error;
	}
	$error['invalid'] = 0;
	return $error;
}
?>
