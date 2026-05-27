<?php
/*************************************************************************
Adding product type module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('producttype','add');

$templateFile = 'manageproducttypeadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/producttypes.class.php');
$productTypes = new ProductTypes($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=product',
				'Thêm loại hàng hóa' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=producttype';
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
	$validate = validateData($request, $productTypes);
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
					  'position' => (int)$request->element('position'),
					  'properties' => serialize($properties),
					  'date_created' => date("Y-m-d H:i:s"),
					  'date_updated' => date("Y-m-d H:i:s"),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		$newId = $productTypes->addData($data);
		if($newId) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Thêm loại hàng hóa mới '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=producttype&mod=list&rcode=6");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $productTypes) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên loại hàng');
	
	if(!$error['INPUT']['name']['error']) {
		include_once(ROOT_PATH."classes/data/textfilter.class.php");
		$textFilter = new TextFilter();
		$slug = $textFilter->urlize($request->element('name'),false,'-');
		if($productTypes->checkDuplicate($slug, 'slug')) {
			$error['INPUT']['name']['error'] = 1;
			$error['INPUT']['name']['message'] = 'Tên loại hàng (hoặc tên tương tự) đã tồn tại.';
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
