<?php
$templateFile = 'managebusinessadd.tpl.html';
include_once(ROOT_PATH.'classes/dao/business.class.php');
$dbObj = new Business($storeId);
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Địa điểm kinh doanh' => '/'.ADMIN_SCRIPT.'?op=manage&act=business',
				'Sửa thông tin' => '');
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=business';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

$id = $request->element('id');
if($id) {
	$item = $dbObj->getObject($id);
	if($item) {
		$template->assign('item', $item);
	} else {
		header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=business&mod=list&rcode=1");
		exit;
	}
}

if($_POST && $request->element('doo') == 'submit') { 
	$error = array();
	$error['invalid'] = 0;
	if(!$request->element('codoBusiness')) {
		$error['invalid'] = 1;
		$error['INPUT']['codoBusiness']['error'] = 1;
		$error['INPUT']['codoBusiness']['message'] = 'Vui lòng nhập mã địa điểm.';
	}
	if(!$request->element('nameBusiness')) {
		$error['invalid'] = 1;
		$error['INPUT']['nameBusiness']['error'] = 1;
		$error['INPUT']['nameBusiness']['message'] = 'Vui lòng nhập tên địa điểm.';
	}

	if($error['invalid']) {	
		$template->assign('error',$error);
	} else { 
		$properties = array('');
		$data = array('store_id' => $storeId,
					  'codoBusiness' => Filter($request->element('codoBusiness')),
					  'nameBusiness' => Filter($request->element('nameBusiness')),
					  'addressBusiness' => Filter($request->element('addressBusiness')),
					  'properties' => serialize($properties),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 0);
		if($dbObj->updateData($data, $id)) {
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Sửa Địa điểm kinh doanh '.$request->element('nameBusiness'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=business&mod=list&rcode=7");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}
?>