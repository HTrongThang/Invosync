<?php
$templateFile = 'managesalechanneladd.tpl.html';

include_once(ROOT_PATH.'classes/dao/salechannels.class.php');
$saleChannels = new SaleChannels($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Kênh bán hàng' => '/'.ADMIN_SCRIPT.'?op=manage&act=salechannel',
				'Thêm mới' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=salechannel';
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
	$validate = validateData($request, $saleChannels);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		$properties = array('');
		$data = array('store_id' => $storeId,
					  'name' => Filter($request->element('name')),
					  'description' => Filter($request->element('description')),
					  'position' => Filter($request->element('position')),
					  'properties' => serialize($properties),
					  'date_created' => date("Y-m-d H:i:s"),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		$newId = $saleChannels->addData($data);
		if($newId) {
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Thêm kênh bán hàng mới '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=salechannel&mod=list&rcode=6");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $saleChannels) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên kênh');
	
	if(!$error['INPUT']['name']['error']) {
		if($saleChannels->checkDuplicate($request->element('name'), 'name')) {
			$error['INPUT']['name']['error'] = 1;
			$error['INPUT']['name']['message'] = 'Tên kênh bán hàng đã tồn tại.';
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
