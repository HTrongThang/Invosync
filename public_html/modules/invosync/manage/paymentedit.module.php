<?php
$templateFile = 'managepaymentadd.tpl.html';
include_once(ROOT_PATH.'classes/dao/payments.class.php');
$dbObj = new PayMent($storeId);
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hình thức thanh toán' => '/'.ADMIN_SCRIPT.'?op=manage&act=payment',
				'Sửa thông tin' => '');
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=payment';
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
		header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&rcode=1");
		exit;
	}
}

if($_POST && $request->element('doo') == 'submit') { 
	$error = array();
	$error['invalid'] = 0;
	if(!$request->element('name')) {
		$error['invalid'] = 1;
		$error['INPUT']['name']['error'] = 1;
		$error['INPUT']['name']['message'] = 'Vui lòng nhập tên hình thức thanh toán.';
	}
	if($error['invalid']) {	
		$template->assign('error',$error);
	} else { 
		$properties = array('');
		$data = array('store_id' => $storeId,
					  'name' => Filter($request->element('name')),
					  'status_inv' => Filter($request->element('status_inv')),
					  'properties' => serialize($properties),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 0);
		if($dbObj->updateData($data, $id)) {
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Sửa Hình thức thanh toán '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&rcode=7");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}
?>