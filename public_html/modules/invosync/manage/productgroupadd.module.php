<?php
/*************************************************************************
Adding product group module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('productgroup','add');

$templateFile = 'manageproductgroupadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/productcategories.class.php');
$productCategories = new ProductCategories($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=product',
				'Thêm nhóm hàng hóa' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=productgroup';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => '',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',2);

# Get parent categories
$categoryCombo = $productCategories->generateRootCombo($request->element('parent_id'), false);
$template->assign('categoryCombo', $categoryCombo);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	$validate = validateData($request, $productCategories);
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
					  'parent_id' => (int)$request->element('parent_id'),
					  'name' => Filter($request->element('name')),
					  'slug' => $slug,
					  'position' => (int)$request->element('position'),
					  'properties' => serialize($properties),
					  'date_created' => date("Y-m-d H:i:s"),
					  'date_updated' => date("Y-m-d H:i:s"),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		$newId = $productCategories->addData($data);
		if($newId) {
			# Operation tracking
			$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Thêm nhóm hàng hóa mới '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=productgroup&mod=list&rcode=6");
			exit;
		} else {
			$template->assign('result_code', 'error');
		}
	}
}

# Check validate input
function validateData($request, $productCategories) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên nhóm hàng');
	
	if(!$error['INPUT']['name']['error']) {
		include_once(ROOT_PATH."classes/data/textfilter.class.php");
		$textFilter = new TextFilter();
		$slug = $textFilter->urlize($request->element('name'),false,'-');
		if($productCategories->checkDuplicate($slug, 'slug')) {
			$error['INPUT']['name']['error'] = 1;
			$error['INPUT']['name']['message'] = 'Tên nhóm hàng (hoặc tên tương tự) đã tồn tại.';
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
