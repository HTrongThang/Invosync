<?php
/*************************************************************************
Editing staff group module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('staffgroup','edit');

$templateFile = 'managestaffgroupedit.tpl.html';

include_once(ROOT_PATH.'classes/dao/usergroups.class.php');
$staffGroups = new UserGroups($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Nhóm nhân viên' => '/'.ADMIN_SCRIPT.'?op=manage&act=staffgroup',
				'Sửa thông tin nhóm' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=staffgroup';
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
    header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&ecode=5");
    exit;
}
$itemInfo = $staffGroups->getObject($id);
if(!$itemInfo) {
    header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&ecode=5");
    exit;
}
$template->assign('itemInfo', $itemInfo);
$template->assign('itemProperties', $itemInfo->getProperties());

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	$validate = validateData($request, $staffGroups, $id);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		#Properties
		$properties = array(
			'description' => $request->element('description')
		);
		
		include_once(ROOT_PATH."classes/data/textfilter.class.php");
		$textFilter = new TextFilter();
		$slug = $textFilter->urlize($request->element('name'),false,'-');

		$data = array('store_id' => $storeId,
					  'name' => Filter($request->element('name')),
					  'slug' => $slug,
					  'properties' => serialize($properties),
					  'date_updated' => date("Y-m-d H:i:s"),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		if($staffGroups->updateData($data, $id)) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Sửa nhóm nhân viên ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=staffgroup&mod=list&rcode=7");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $staffGroups, $id) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên nhóm');
	
	if(!$error['INPUT']['name']['error']) {
		include_once(ROOT_PATH."classes/data/textfilter.class.php");
		$textFilter = new TextFilter();
		$slug = $textFilter->urlize($request->element('name'),false,'-');
		if($staffGroups->checkDuplicate($slug, 'slug', "`id` <> '$id'")) {
			$error['INPUT']['name']['error'] = 1;
			$error['INPUT']['name']['message'] = 'Tên nhóm (hoặc tên tương tự) đã tồn tại.';
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
