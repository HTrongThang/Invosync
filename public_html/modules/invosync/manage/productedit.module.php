<?php
/*************************************************************************
Edit product module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('product','edit');

$templateFile = 'manageproductadd.tpl.html';

include_once(ROOT_PATH.'classes/dao/products.class.php');
include_once(ROOT_PATH.'classes/dao/productcategories.class.php');
include_once(ROOT_PATH.'classes/dao/producttypes.class.php');
include_once(ROOT_PATH.'classes/dao/units.class.php');
include_once(ROOT_PATH.'classes/dao/vat.class.php');
include_once(ROOT_PATH.'classes/dao/warehouses.class.php');

$products = new Products($storeId);
$productCategories = new ProductCategories($storeId);
$productTypes = new ProductTypes($storeId);
$units = new Units($storeId);
$vats = new Vat($storeId);
$warehouses = new Warehouses($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=product',
				'Sửa hàng hóa' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=product';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);

# Get parameters
$id = $request->element('id');
if(!$id) {
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=product&mod=list&rcode=11");
	exit;
}
$product = $products->getObject($id);
if(!$product) {
	header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=product&mod=list&rcode=11");
	exit;
}
$template->assign('item',$product);

# Dropdowns
$categoryCombo = $productCategories->generateRootCombo($product->category_id, false);
$template->assign('categoryCombo', $categoryCombo);

$productTypeCombo = $productTypes->generateCombo($product->properties['product_type_id'], 1);
$template->assign('productTypeCombo', $productTypeCombo);

$listUnits = $units->getObjects(1, 'status=1', array('position'=>'ASC'), 999);
$template->assign('listUnits', $listUnits);

$listVats = $vats->getObjects(1, 'status=1', array('vat'=>'ASC'), 999);
$template->assign('listVats', $listVats);

$listWarehouses = $warehouses->getObjects(1, 'status=1', array('name'=>'ASC'), 999);
$template->assign('listWarehouses', $listWarehouses);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

# Submitted form
if($_POST && $request->element('doo') == 'submit') { 
	# Validate the data input
	$validate = validateData($request, $products, $id);
	if($validate['invalid']) {	
		$template->assign('error',$validate);
	} else { 
		#Properties
		$properties = array(
			'product_type_id' => $request->element('product_type_id'),
			'unit_id' => $request->element('unit_id'),
			'vat_id' => $request->element('vat_id'),
			'opening_stock' => str_replace(',', '', $request->element('opening_stock')),
			'opening_value' => str_replace(',', '', $request->element('opening_value')),
			'min_stock' => str_replace(',', '', $request->element('min_stock')),
			'max_stock' => str_replace(',', '', $request->element('max_stock')),
			'warning_date' => $request->element('warning_date'),
			'warehouse_id' => $request->element('warehouse_id'),
			'nhap_dau_ky_kho_khac' => $request->element('nhap_dau_ky_kho_khac')
		);

		$data = array('category_id' => (int)$request->element('category_id'),
					  'slug' => Filter($request->element('slug')),
					  'name' => Filter($request->element('name')),
					  'keyword' => Filter($request->element('sku')),
					  'description' => Filter($request->element('description')),
					  'price' => str_replace(',', '', $request->element('price')),
					  'expiration_date' => $request->element('expiration_date'),
					  'properties' => serialize($properties),
					  'date_updated' => date("Y-m-d H:i:s"),
					  'status' => (int)$request->element('status') ? (int)$request->element('status') : 1);
					  
		$products->updateData($data, $id);
		
		# Operation tracking
		$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Sửa hàng hóa '.$request->element('name'),'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
		header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=product&mod=list&rcode=7");
		exit;
	}
}

# Check validate input
function validateData($request, $products, $id) {
	global $amessages;
	include_once(ROOT_PATH.'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['INPUT']['name'] = $validate->validString($request->element('name'), 'Tên sản phẩm');
	$error['INPUT']['slug'] = $validate->validString($request->element('slug'), 'Mã sản phẩm');
	$error['INPUT']['sku'] = $validate->validString($request->element('sku'), 'Mã SKU');
	$error['INPUT']['unit_id'] = $validate->validString($request->element('unit_id'), 'Đơn vị tính');
	$error['INPUT']['vat_id'] = $validate->validString($request->element('vat_id'), 'Thuế VAT');
	
	if(!$error['INPUT']['slug']['error']) {
		if($products->checkDuplicate($request->element('slug'), 'slug', "`id` <> '$id'")) {
			$error['INPUT']['slug']['error'] = 1;
			$error['INPUT']['slug']['message'] = 'Mã sản phẩm đã tồn tại.';
		}
	}

	if($error['INPUT']['name']['error'] || $error['INPUT']['slug']['error'] || $error['INPUT']['sku']['error'] || $error['INPUT']['unit_id']['error'] || $error['INPUT']['vat_id']['error']) {
		$error['invalid'] = 1;
		return $error;
	}
	$error['invalid'] = 0;
	return $error;
}
?>
