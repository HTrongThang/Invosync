<?php
/*************************************************************************
Adding warehouse module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('warehouse','add');

$templateFile = 'managewarehouseadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/warehouses.class.php');
$warehouses = new WareHouse($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Kho hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=warehouse',
				'Thêm kho hàng mới' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=warehouse';
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
	$validate = validateData($request, $warehouses);
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
					  'date_created' => date("Y-m-d H:i:s"),
					  'status_default' => (int)$request->element('status_default') ? 1 : 0,
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		$newId = $warehouses->addData($data);
		if($newId) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Thêm kho hàng mới '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=warehouse&mod=list&rcode=6");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $warehouses) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên kho hàng');
	
	if(!$error['INPUT']['name']['error']) {
		if($warehouses->checkDuplicate($request->element('name'), 'name')) {
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
