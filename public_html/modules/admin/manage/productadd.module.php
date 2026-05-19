<?php
// if ($_SERVER['REMOTE_ADDR'] == DEBUG_IP) {
        // ini_set('display_errors', 1);
        // ini_set('display_startup_errors', 1);
        // error_reporting(E_ALL);
    // }

$userInfo->checkPermission('product', 'add');

$templateFile = 'manageproduct.tpl.html';
include_once(ROOT_PATH . 'classes/dao/productcategories.class.php');
include_once(ROOT_PATH . 'classes/dao/products.class.php');
include_once(ROOT_PATH . 'classes/dao/fields.class.php');
include_once(ROOT_PATH . "classes/data/textfilter.class.php");
include_once(ROOT_PATH . "classes/dao/searchs.class.php");
include_once(ROOT_PATH . 'classes/dao/customproductoptions.class.php');
include_once(ROOT_PATH . 'classes/dao/customproductoptionvalue.class.php');
include_once(ROOT_PATH . 'classes/dao/customproductoptiondefault.class.php');
include_once(ROOT_PATH . 'classes/dao/optionstructure.class.php');
include_once(ROOT_PATH . 'classes/dao/optionvalue.class.php');
include_once(ROOT_PATH . "classes/dao/uploadalbums.class.php");
include_once(ROOT_PATH . "classes/dao/uploads.class.php");
include_once(ROOT_PATH . "classes/dao/productfeatures.class.php");

$productFeatures = new ProductFeatures($storeId);
$customProductOptions = new CustomProductOptions($storeId);
$customProductOptionValues = new CustomProductOptionValues($storeId);
$customProductOptionDefault = new CustomProductOptionDefault($storeId);
$optionStructure = new OptionStructure($storeId);
$fieldValue = new OptionValue($storeId);
$productCategories = new ProductCategories($storeId);
$products = new Products($storeId);
$fields = new Fields($storeId);
$search = new Search($storeId);
$uploadAlbums = new UploadAlbums($storeId);
$uploads = new Uploads($storeId);

# Top navigation
$topNav = array(
	$amessages['dash_board'] => '/' . ADMIN_SCRIPT . '?op=dashboard',
	$amessages['manage_website'] => '/' . ADMIN_SCRIPT . '?op=manage',
	$amessages['manage_product'] => '/' . ADMIN_SCRIPT . '?op=manage&act=product',
	$amessages['add_new_product'] => ''
);

# Tabs
$tabLink = '/' . ADMIN_SCRIPT . '?op=manage&act=product';
$listTabs = array(
	$amessages['list_item'] => $tabLink . '&mod=list',
	$amessages['add_new'] => $tabLink . '&mod=add',
	$amessages['list_category'] => $tabLink . '&mod=listcategory',
	$amessages['add_product_category'] => $tabLink . '&mod=addcategory',
	$amessages['list_product_features'] => $tabLink . '&mod=listfeature',
	$amessages['add_product_features'] => $tabLink . '&mod=addfeature',
	$amessages['clean_trash'] => $tabLink . '&mod=cleantrash'
);
$template->assign('listTabs', $listTabs);
$template->assign('currentTab', 2);

# Result code
$result_code = $request->element('rcode');
if ($result_code) $template->assign('result_code', $result_code);

# Get list of product features
$productFeatureList = $productFeatures->getObjects(1, "`status`='1'", array('id' => 'DESC'),999);
if ($productFeatureList) $template->assign('productFeatureList', $productFeatureList);

# Get product categories array for generating nested combo
$arrayCategories = $productCategories->getObjectsForCombo();

# Product categories Combo
$productCategoriesCombo = $productCategories->generateNestedCombo($arrayCategories,$request->element('category_id'));
// var_dump($productCategoriesCombo);die;
if($productCategoriesCombo) $template->assign('productCategoriesCombo',$productCategoriesCombo);

# Brand
$productRootCategories = $productCategories->generateRootCombo($request->element('brand_id') ?: null);
if($productRootCategories) $template->assign('productRootCategories',$productRootCategories);

# Get list of custom fields
$fieldList = $fields->getObjects(1, "`status`='1' AND `module`='product'", array('position' => 'ASC'));
if ($fieldList) $template->assign('fieldList', $fieldList);

# Get list of custom options
$fieldOptionList = $optionStructure->getObjects(1, "`status`='1' AND `module`='product'", array('position' => 'ASC'));
if ($fieldOptionList) $template->assign('fieldOptionList', $fieldOptionList);

# Allow some javascript
$template->assign('ckEditor', 1);

# Default product options
$valueDefault = $customProductOptionDefault->getAllNamesAndValueDefault();
if ($valueDefault) $template->assign('valueDefault', $valueDefault);

# Submitted form
if ($_POST && $request->element('doo') == 'submit') { # if form is submitted
	# Validate the data input
	$validate = validateData($request);
	if ($validate['invalid']) {	# data input is not in valid form
		$template->assign('error', $validate);
		
		# Get list of custom options
		$fieldOptionList = $optionStructure->getObjects(1, "`status`='1' AND `module`='product'", array('position' => 'ASC'));
		if ($fieldOptionList) $template->assign('fieldOptionList', $fieldOptionList);
	} else { # Valid data input
		# check duplicate product name
		// if ($estore->getProperty('check_duplicate_product_name')) {
			if ($products->checkDuplicate($request->element('name'), 'name', "category_id = '" . $request->element('category_id') . "'")) {
				$validate['INPUT']['name']['message'] = $amessages['name_duplicated'];
				$validate['INPUT']['name']['error'] = 1;
				$validate['invalid'] = 1;
				$template->assign('error', $validate);
			}
		// }
		# Check if duplicate slug
		$textFilter = new TextFilter();
		$slug = $textFilter->urlize($request->element('name'), false, '-');
		$i = 0;
		$dup = 1;
		while ($dup) {
			$dup = $products->checkDuplicate($slug . ($i ? '-' . $i : ''), 'slug', "category_id = '" . $request->element('category_id') . "'");
			if ($dup) $i++;
		}
		$slug .= $i ? '-' . $i : '';
		# Everything is ok. Add data to DB
		if (!$validate['invalid']) {
			$properties = array('');
			
			# User upload
			$userUpload = $userInfo->getId();

			$thisYearAlbum = getOrCreateYearUploadAlbum($storeId, $uploadAlbums);

			$avatarUploadId = uploadAvatar(
				$thisYearAlbum,
				$uploads,
				$userInfo,
				'avatar',     // name input
				'product'     // object
			);

			$fileIds = uploadFiles(
				$thisYearAlbum,
				$uploads,
				$userInfo,
				'files',
				'product'
			);						

			$properties = array(
				// 'avatar' => $avatar,
				// 'photos' => $uphotos,
				// 'videos' => $uvideos,
				// 'files' => $ufiles,
				'user_upload' => $userUpload,
			);

			# Custom fields
			foreach ($fieldList as $field) {
				$properties[$field->getName()] = stripslashes($request->element($field->getName()));
			}
			$data = array(
				'store_id' => $storeId,
				'category_id' => (int)$request->element('category_id'),
				'slug' => $slug,
				'name' => $request->element('name'),
				'keyword' => $request->element('keyword'),
				'description' => $request->element('description'),
				'detail' => $request->element('detail'),
				'avatar' => $avatarUploadId,
				'file_ids' => implode(',', $fileIds),
				'date_created' => date("Y-m-d H:i:s"),
				'viewed' => (int)$request->element('viewed') ? (int)$request->element('viewed') : 0,
				'position' => (int)$request->element('position') ? (int)$request->element('position') : 0,
				'properties' => serialize($properties),
				'status' => (int)$request->element('status'),
				'price' => (float)$request->element('price'),
				'period' => $request->element('period'),
				'key_features' => $request->element('key_features'),
				'validation_level' => $request->element('validation_level'),
				'trust_seal_type' => $request->element('trust_seal_type'),
				'warranty_amount' => (float)$request->element('warranty_amount'),
				'issuance_time' => $request->element('issuance_time'),
				'green_bar' => $request->element('green_bar'),
				'encryption_strength' => $request->element('encryption_strength'),
				'algorithm' => $request->element('algorithm'),
				'san_support' => $request->element('san_support'),
				'wildcard_support' => $request->element('wildcard_support'),
				'malware_scan' => $request->element('malware_scan'),
				'vulnerability_scan' => $request->element('vulnerability_scan'),
				'browser_compatibility' => $request->element('browser_compatibility'),
				'server_licenses' => $request->element('server_licenses'),
				'reissue_policy' => $request->element('reissue_policy'),
				'smart_screen' => $request->element('smart_screen'),
				'windows_hardware' => $request->element('windows_hardware'),
				'supported_platform' => $request->element('supported_platform'),
				'storage' => $request->element('storage'),
				'time_tamping' => $request->element('time_tamping'),
				'supported_format' => $request->element('supported_format'),
				'compliance_standard' => $request->element('compliance_standard'),
				'product_feature_ids' => $request->element('product_feature_ids') ? implode(',', $request->element('product_feature_ids')) : '',
				'highlight_feature_ids' => $request->element('highlight_feature_ids') ? implode(',', $request->element('highlight_feature_ids')) : '',
				// 'expiration_date' => $request->element('expiration_date'),
				// 'availability' => $request->element('availability'),

				'service_type' => (int)$request->element('service_type'),
				'operating_system' => (int)$request->element('operating_system'),
				'storage_capacity' => $request->element('storage_capacity'),
				'ram' => $request->element('ram'),
				'cpu' => $request->element('cpu'),
				'bandwidth' => $request->element('bandwidth'),
				'ip_address' => $request->element('ip_address'),
				'web_server' => $request->element('web_server'),
				'control_panel' => $request->element('control_panel'),
				'php_version' => $request->element('php_version'),
				'framework' => $request->element('framework'),
				'mysql_db_type' => $request->element('mysql_db_type'),
				'ssl_certificate' => $request->element('ssl_certificate'),
				'backup' => $request->element('backup'),
				'ddos_protection' => (int)$request->element('ddos_protection'),
				'uptime_commitment' => $request->element('uptime_commitment'),
				'allowed_accounts' => $request->element('allowed_accounts'),
				'mailbox_storage' => $request->element('mailbox_storage'),
				'max_attachment_size' => $request->element('max_attachment_size'),
				'send_limit' => $request->element('send_limit'),
				'dedicated_ip' => $request->element('dedicated_ip'),
				'supported_protocol' => $request->element('supported_protocol'),
				'webmail' => $request->element('webmail'),
				'has_encryption' => (int)$request->element('has_encryption'),
				'dns_config' => $request->element('dns_config'),
				'spam_filter' => (int)$request->element('spam_filter'),

			);
			$newId = $products->addData($data);
			
			# Start PO
			if ($newId) {
				$optionNames = ($_POST['option_names'] ?? []);
				$valueNames = $_POST['value_names'] ?? [];
				$valueModifiers = $_POST['value_modifiers'] ?? [];

				foreach ($optionNames as $index => $optionName) {
					if (empty(trim($optionName))) continue;

					$productOptionData = [
						'store_id' => $storeId,
						'product_id' => $newId,
						'name' => $optionName,
						'product' => Filter($request->element('name')),
						'status' => 1
					];

					$customProductOptionId = $customProductOptions->addData($productOptionData);

					$values = $valueNames[$index] ?? [];
					$modifiers = $valueModifiers[$index] ?? [];
					foreach ($values as $j => $value) {
						if (empty($value)) continue;

						$modifier = isset($modifiers[$j]) ? (float)$modifiers[$j] : 0.0;

						$productOptionValueData = [
							'store_id' => $storeId,
							'option_id' => $customProductOptionId,
							'value' => $value,
							'price_modifier' => $modifier,
							'status' => 1
						];

						$customProductOptionValues->addData($productOptionValueData);
					}
				}
			}	

			# Custom Options
			if ($newId) {
				foreach ($fieldOptionList as $field) {
					$valueType = stripslashes($request->element($field->getFieldName()));
					if ($field->getFieldType() == 4 || $field->getFieldType() == 7) {
						$selectedKeys = (array) $request->element($field->getFieldName());
						$options = $field->getValue(); 
						$selectedValues = array_map(function ($key) use ($options) {
							return isset($options[$key]) ? $options[$key] : $key;
						}, $selectedKeys);

						$valueType = implode(", ", $selectedValues);
					}
					if ($field->getFieldType() == 5 || $field->getFieldType() == 6) {
						$options = $field->getValue();
						$valueType = isset($options[$valueType]) ? $options[$valueType] : $valueType; 
					}
					$fieldData = array(
						'store_id' => $storeId,
						'field_id' => $field->getId(),
						'key_id' => $newId,
						'field_value' => html_entity_decode($valueType),
						'status' => 1,
					);
					$newFieldValue = $fieldValue->addData($fieldData);
				}
			}

			#Add data search
			$newItem = $products->getObject($newId, 'id');
			$url = '';
			if ($newItem) {
				$url = $newItem->getSlug();
			}

			$dataSearch = array(
				"search_id" => (int)$newItem,
				"slug" => $slug,
				"title" => Filter($request->element('name')),
				"type" => "product",
				"status" => 1,
				"sapo" => addslashes($request->element('description')),
				"detail" => addslashes($request->element('detail')),
				"store_id" => 1,
				"keyword" => Filter($request->element('keyword')),
				"tag" => $request->element('tag'),
				"url" => $slug,
			);

			$searchId = $search->addData($dataSearch);
			# Operation tracking
			$trackings->addData(array('store_id' => $storeId, 'username' => $userInfo->getUsername(), 'action' => sprintf($amessages['tracking']['add_product'], $request->element('name')), 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));
			
			header('location:' . '/' . ADMIN_SCRIPT . "?op=manage&act=product&mod=list&filter_categories=" . $request->element('category_id') . "&rcode=6");
		}
	}
}

# Ham kiem tra du lieu nguoi dung nhap vao
function validateData($request)
{
	global $amessages;
	include_once(ROOT_PATH . 'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['invalid'] = 0;

	$error['INPUT']['category_id'] = $validate->pasteString($request->element('category_id'));
	$error['INPUT']['name'] = $validate->validString($request->element('name'), $amessages['name']);
	$error['INPUT']['keyword'] = $validate->validString($request->element('keyword'), $amessages['keyword']);
	$error['INPUT']['position'] = $validate->pasteString($request->element('position'));
	$error['INPUT']['status'] = $validate->pasteString($request->element('status'));
	$error['INPUT']['description'] = $validate->validString($request->element('description'), $amessages['description']);
	$error['INPUT']['detail'] = $validate->validString($request->element('detail'), $amessages['detail']);
	$error['INPUT']['expiration_date'] = $validate->pasteString($request->element('expiration_date'));
	$error['INPUT']['availability'] = $validate->pasteString($request->element('availability'));
	$error['INPUT']['price'] = $validate->pasteString($request->element('price'));
	$error['INPUT']['period'] = $validate->pasteString($request->element('period'));
	$error['INPUT']['validation_level'] = $validate->pasteString($request->element('validation_level'));
	$error['INPUT']['trust_seal_type'] = $validate->pasteString($request->element('trust_seal_type'));
	$error['INPUT']['warranty_amount'] = $validate->pasteString($request->element('warranty_amount'));
	$error['INPUT']['issuance_time'] = $validate->pasteString($request->element('issuance_time'));
	$error['INPUT']['green_bar'] = $validate->pasteString($request->element('green_bar'));
	$error['INPUT']['encryption_strength'] = $validate->pasteString($request->element('encryption_strength'));
	$error['INPUT']['algorithm'] = $validate->pasteString($request->element('algorithm'));
	$error['INPUT']['san_support'] = $validate->pasteString($request->element('san_support'));
	$error['INPUT']['wildcard_support'] = $validate->pasteString($request->element('wildcard_support'));
	$error['INPUT']['malware_scan'] = $validate->pasteString($request->element('malware_scan'));
	$error['INPUT']['vulnerability_scan'] = $validate->pasteString($request->element('vulnerability_scan'));
	$error['INPUT']['browser_compatibility'] = $validate->pasteString($request->element('browser_compatibility'));
	$error['INPUT']['server_licenses'] = $validate->pasteString($request->element('server_licenses'));
	$error['INPUT']['reissue_policy'] = $validate->pasteString($request->element('reissue_policy'));
	$error['INPUT']['smart_screen'] = $validate->pasteString($request->element('smart_screen'));
	$error['INPUT']['windows_hardware'] = $validate->pasteString($request->element('windows_hardware'));
	$error['INPUT']['supported_platform'] = $validate->pasteString($request->element('supported_platform'));
	$error['INPUT']['storage'] = $validate->pasteString($request->element('storage'));
	$error['INPUT']['time_tamping'] = $validate->pasteString($request->element('time_tamping'));
	$error['INPUT']['supported_format'] = $validate->pasteString($request->element('supported_format'));
	$error['INPUT']['compliance_standard'] = $validate->pasteString($request->element('compliance_standard'));

	$error['INPUT']['service_type'] = $validate->pasteString($request->element('service_type'));
	$error['INPUT']['operating_system'] = $validate->pasteString($request->element('operating_system'));
	$error['INPUT']['storage_capacity'] = $validate->pasteString($request->element('storage_capacity'));
	$error['INPUT']['ram'] = $validate->pasteString($request->element('ram'));
	$error['INPUT']['cpu'] = $validate->pasteString($request->element('cpu'));
	$error['INPUT']['bandwidth'] = $validate->pasteString($request->element('bandwidth'));
	$error['INPUT']['ip_address'] = $validate->pasteString($request->element('ip_address'));
	$error['INPUT']['web_server'] = $validate->pasteString($request->element('web_server'));
	$error['INPUT']['control_panel'] = $validate->pasteString($request->element('control_panel'));
	$error['INPUT']['php_version'] = $validate->pasteString($request->element('php_version'));
	$error['INPUT']['framework'] = $validate->pasteString($request->element('framework'));
	$error['INPUT']['mysql_db_type'] = $validate->pasteString($request->element('mysql_db_type'));
	$error['INPUT']['ssl_certificate'] = $validate->pasteString($request->element('ssl_certificate'));
	$error['INPUT']['backup'] = $validate->pasteString($request->element('backup'));
	$error['INPUT']['ddos_protection'] = $validate->pasteString($request->element('ddos_protection'));
	$error['INPUT']['uptime_commitment'] = $validate->pasteString($request->element('uptime_commitment'));
	$error['INPUT']['allowed_accounts'] = $validate->pasteString($request->element('allowed_accounts'));
	$error['INPUT']['mailbox_storage'] = $validate->pasteString($request->element('mailbox_storage'));
	$error['INPUT']['max_attachment_size'] = $validate->pasteString($request->element('max_attachment_size'));
	$error['INPUT']['send_limit'] = $validate->pasteString($request->element('send_limit'));
	$error['INPUT']['dedicated_ip'] = $validate->pasteString($request->element('dedicated_ip'));
	$error['INPUT']['supported_protocol'] = $validate->pasteString($request->element('supported_protocol'));
	$error['INPUT']['webmail'] = $validate->pasteString($request->element('webmail'));
	$error['INPUT']['has_encryption'] = $validate->pasteString($request->element('has_encryption'));
	$error['INPUT']['dns_config'] = $validate->pasteString($request->element('dns_config'));
	$error['INPUT']['spam_filter'] = $validate->pasteString($request->element('spam_filter'));



	# Paste value of custom fields
	global $fieldList;
	foreach ($fieldList as $field) {
		$error['INPUT'][$field->getName()] = $validate->pasteString($request->element($field->getName()));
		if ($field->getType() == 4 || $field->getType() == 7) {	# Listbox and checkbox
			$error['INPUT'][$field->getName()]['value'] = $request->element($field->getName());
		}
	}

	if ($error['INPUT']['name']['error'] || $error['INPUT']['keyword']['error'] || $error['INPUT']['description']['error'] || $error['INPUT']['detail']['error'] ) {
		$error['invalid'] = 1;
		$error['message'] = '';
	}

	# Custom Options
	global $fieldOptionList;
	$fieldOptionList = is_iterable($fieldOptionList) ? $fieldOptionList : [];
	foreach ($fieldOptionList as $field) {

		$fieldName = $field->getFieldName();
		$fieldValue = $request->element($fieldName);

		if ((is_null($fieldValue) || $fieldValue === '') && $field->getRequired() == 1) {
			$error['INPUT'][$fieldName] = [
				'value' => $fieldValue,
				'error' => 1,
				'message' => $amessages["field"] . " - " . $amessages['invalid_field']
			];
			$error['invalid'] = 1;
		} else {
			$error['INPUT'][$fieldName] = [
				'value' => $fieldValue,
				'error' => 0,
				'message' => ''
			];
		}
	}

	return $error;
}
