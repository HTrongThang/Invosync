<?php
/*************************************************************************
Editing article module
----------------------------------------------------------------
DeraCMS 4.0 Project
Company: Derasoft Co., Ltd
Coder: Mai Minh
Last updated: 16/06/2025
**************************************************************************/
# Check permission
$userInfo->checkPermission('article', 'edit');

$templateFile = 'managearticle.tpl.html';
include_once(ROOT_PATH . 'classes/dao/articlecategories.class.php');
include_once(ROOT_PATH . 'classes/dao/articles.class.php');
include_once(ROOT_PATH . 'classes/dao/fields.class.php');
include_once(ROOT_PATH . "classes/data/textfilter.class.php");
include_once(ROOT_PATH . "classes/dao/searchs.class.php");
include_once(ROOT_PATH . 'classes/dao/uploads.class.php');
include_once(ROOT_PATH . 'classes/dao/uploadalbums.class.php');
include_once(ROOT_PATH . 'classes/dao/optionstructure.class.php');
include_once(ROOT_PATH . 'classes/dao/optionvalue.class.php'); 
$uploads = new Uploads($storeId);
$uploadAlbums = new UploadAlbums($storeId);
$articleCategories = new ArticleCategories($storeId);
$articles = new Articles($storeId);
$fields = new Fields($storeId);
$search = new Search($storeId);
$optionStructure = new OptionStructure($storeId);
$fieldValue = new OptionValue($storeId);
if ($fieldValue) $template->assign('fieldValue', $fieldValue);

# Allow some javascript
$template->assign('ckEditor', 1);

# Top navigation
$topNav = array(
	$amessages['dash_board'] => '/' . ADMIN_SCRIPT . '?op=dashboard',
	$amessages['manage_website'] => '/' . ADMIN_SCRIPT . '?op=manage',
	$amessages['manage_article'] => '/' . ADMIN_SCRIPT . '?op=manage&act=article',
	$amessages['edit_article'] => ''
);

# Tabs
$tabLink = '/' . ADMIN_SCRIPT . '?op=manage&act=article';
$listTabs = array(
	$amessages['list_item'] => $tabLink . '&mod=list',
	$amessages['edit_article'] => '#',
	$amessages['list_article_category'] => $tabLink . '&mod=listcategory',
	$amessages['add_article_category'] => $tabLink . '&mod=addcategory',
	$amessages['clean_trash'] => $tabLink . '&mod=cleantrash'
);
$template->assign('listTabs', $listTabs);
$template->assign('currentTab', 2);

# Get list of custom options
$fieldOptionList = $optionStructure->getObjects(1, "`status`='1' AND `module`='article'", array('position' => 'ASC'));
if ($fieldOptionList) $template->assign('fieldOptionList', $fieldOptionList);

# Result code
$result_code = $request->element('rcode');
if ($result_code) $template->assign('result_code', $result_code);

# Get article categories array for generating nested combo
$arrayCategories = $articleCategories->getObjectsForCombo();

# Get article information object
$id = $request->element('id');
if ($id) $template->assign('id', $id);
$articleInfo = $articles->getObject($id);

# Get all field values
$allFieldValues = $fieldValue->getAllValuesByKeyId($id);
$template->assign('allFieldValues', $allFieldValues);

if (!$articleInfo) {
	$template->assign('validItem', 0);
} else {
	$template->assign('validItem', 1);
	
	# Get avatar object
	if($articleInfo->getProperty('avatarId')) {
		$avatarItem = $uploads->getObject($articleInfo->getProperty('avatarId'));
		if($avatarItem) $template->assign('avatarItem',$avatarItem);
	}
		
	# Get file upload objects
	if($articleInfo->getProperty('fileIds')) {
		$uploadIds = implode(',',$articleInfo->getProperty('fileIds'));
		$fileItems = $uploads->getObjects(1,"u.id IN ($uploadIds)");
		if($fileItems) $template->assign('fileItems',$fileItems);
	}

	# Delete avatar upload
	if ($request->element('doo') == 'delAvatar') {
		$avatarId = (int)$request->element('avatarId');
		if($avatarId>0) $avatarInfo = $uploads->getObject($avatarId);
		if(isset($avatarInfo)) {
			$articles->deleteAvatarFromObject($articleInfo,$avatarId);
			
			# Operation tracking
			$trackings->addData(array('store_id' => $storeId, 'username' => $userInfo->getUsername(), 'action' => sprintf($amessages['tracking']['edit_article_delete_avatar'], $articleInfo->getTitle()), 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));
			
			# Redirect to editing page
			header('location:' . '/' . ADMIN_SCRIPT . "?op=manage&act=article&mod=edit&lang=$lang&id=$id&rcode=7");
		} # End if(isset($avatarInfo)) {
	} # End if ($request->element('doo') == 'delAvatar') {

	# Delete file upload
	if ($request->element('doo') == 'delFile') {
		$fileId = (int)$request->element('fileId');
		if($fileId>0) $fileInfo = $uploads->getObject($fileId);
		if(isset($fileInfo)) {
			$articles->deleteFileFromObject($articleInfo,$fileId);
			
			# Operation tracking
			$trackings->addData(array('store_id' => $storeId, 'username' => $userInfo->getUsername(), 'action' => sprintf($amessages['tracking']['edit_article_delete_file'], $articleInfo->getTitle()), 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));
			
			# Redirect to editing page
			header('location:' . '/' . ADMIN_SCRIPT . "?op=manage&act=article&mod=edit&lang=$lang&id=$id&rcode=7");
		} # End if(isset($avatarInfo)) {
	} # End if ($request->element('doo') == 'delAvatar') {

	# Submitted form
	if ($_POST && $request->element('doo') == 'submit') { # if form is submitted
		# Get list of custom fields
		$fieldList = $fields->getObjects(1, "`status`='1' AND `module`='article'", array('position' => 'ASC'));
		if ($fieldList) $template->assign('fieldList', $fieldList);

		# Get list of custom options
		$fieldOptionList = $optionStructure->getObjects(1, "`status`='1' AND `module`='article'", array('position' => 'ASC'));
		if ($fieldOptionList) $template->assign('fieldOptionList', $fieldOptionList);

		# Validate the data input
		$validate = validateData($request);
		if ($validate['invalid']) {	# data input is not in valid form
			$template->assign('error', $validate);
			$articleInfo = $articles->getObject($id);
			$template->assign('itemInfo', $articleInfo);

			# Category combo box
			$categoryCombo = $articleCategories->generateNestedCombo($arrayCategories,$request->element('category_id'));
			if ($categoryCombo) $template->assign('categoryCombo', $categoryCombo);
		} else { # Valid data input
			# Category combo box
			$categoryCombo = $articleCategories->generateNestedCombo($arrayCategories,$request->element('category_id'));
			if ($categoryCombo) $template->assign('categoryCombo', $categoryCombo);

			# check duplicate category name
			if ($estore->getProperty('check_duplicate_article_name')) {
				if ($articles->checkDuplicate($request->element('name'), 'name', "`id` <> '$id' AND `category_id` = '" . $request->element('category_id') . "'")) {
					$validate['INPUT']['name']['message'] = $amessages['name_duplicated'];
					$validate['INPUT']['name']['error'] = 1;
					$validate['invalid'] = 1;
					$template->assign('error', $validate);
				}
			}
			# Check if duplicate slug
			$textFilter = new TextFilter();
			$slug = $textFilter->urlize($request->element('slug'), false, '-');
			$i = 0;
			$dup = 1;
			while ($dup) {
				$dup = $articles->checkDuplicate($slug . ($i ? '-' . $i : ''), 'slug', "`id` <> '$id' AND `category_id` = '" . $request->element('category_id') . "'");
				if ($dup) $i++;
			}
			$slug .= $i ? '-' . $i : '';
			
			# Check if the image upload album for this year exists. If not exists, create it
			$thisYearAlbum = $uploadAlbums->getObject(date("Y"),"name");
			if(!$thisYearAlbum) { # Album for this year not exists, create it
				$newAlbumData = array('store_id' => $storeId,
									 'name' => date("Y"),
									 'status' => 1,
									 'folder' => date("Y"),
									 'date_created' => date("Y-m-d H:i:s"),
									 'properties' => serialize(array()));
				$thisYearAlbumId = $uploadAlbums->addData($newAlbumData);

				# Get album object that just created
				$thisYearAlbum = $uploadAlbums->getObject($thisYearAlbumId);
			} else { # Album for this year exists
				# Return error if cannot create the image upload folder
				if($thisYearAlbum->getProperty('create_album_error')) {
					$template->assign('albumCreateError',$amessages['cannot_create_folder']." ".$thisYearAlbum->getAbsoluteFolder());
				}
			}
			
			# Check if album and folder exists now. If not, stop here and ask the staff to set permission for the folder
			if(!$thisYearAlbum->getProperty('create_album_error')) {
				# Everything is ok. Update data to DB
				if (!$validate['invalid']) {
					$articleInfo = $articles->getObject($id);
				if ($articleInfo) {
					$properties = $articleInfo->getProperties();
					
					# Avatar upload
					$fileAvatar = isset($_FILES['avatar']) ? $_FILES['avatar'] : '';
					
					# Only upload if uploaded file is image
					if(isImage($fileAvatar['name'])) {
						$newAvatarId = '';
						$newAvatarUrl = '';
						if($fileAvatar) {
							$newAvatarId = (int)$uploads->uploadFile($thisYearAlbum,
																$fileAvatar['name'],
																$fileAvatar['tmp_name'],
																$fileAvatar['size'],
																'article',
																$userInfo->getId(),
																0);
							# Change old avatar to DELETED if exists
							$oldAvatarId = (int)$properties['avatarId'];
							if($oldAvatarId>0) $uploads->changeStatus($oldAvatarId,S_DELETED);
							
							$newAvatarObject = $uploads->getObject($newAvatarId);
							if($newAvatarObject) {
								$newAvatarUrl = '/'.$newAvatarObject->getPath().'/'.$newAvatarObject->getUrlA();
								$newAvatarLargeUrl = '/'.$newAvatarObject->getPath().'/'.$newAvatarObject->getUrlL();
							}
						
							# Properties
							$properties['avatarId'] = $newAvatarId;
							$properties['avatarUrl'] = $newAvatarUrl;
							$properties['avatarLargeUrl'] = $newAvatarLargeUrl;
						} # End if($fileAvatar) {
					} # End if(isImage($fileAvatar['name'])) {
					
					# Files upload
					$files = isset($_FILES['files']) ? $_FILES['files'] : '';
					$newFileIds = $properties['fileIds'];
					if (is_array($files)) {
						for ($i = 0; $i < count($files['name']); $i++) {
							$newFileId = (int)$uploads->uploadFile($thisYearAlbum,
															  $files['name'][$i],
															  $files['tmp_name'][$i],
															  $files['size'][$i],
															  'article',
															  $userInfo->getId(),
															  0);
							if($newFileId>0) array_push($newFileIds, $newFileId);
						} # End for ($i =0;
						$properties['fileIds'] = $newFileIds;
					} # if (is_array($files)) {

					# Custom fields
					foreach ($fieldList as $field) {
						$properties[$field->getName()] = stripslashes($request->element($field->getName()));
					}

					$data = array(
						'store_id' => $storeId,
						'category_id' => (int)$request->element('category_id'),
						'viewed' => (int)$request->element('view'),
						'slug' => $slug,
						'title' => $request->element('title'),
						'keyword' => $request->element('keyword'),
						'description' => $request->element('description'),
						'detail' => $request->element('detail'),
						'position' => (int)$request->element('position'),
						'status' => (int)$request->element('status'),
						'properties' => serialize($properties),
						'updater_id' => (int)$userInfo->getId(),
						'date_updated' => date("Y-m-d H:i:s")
					);

					$result = $articles->updateData($data, $id);

					# Custom Options
					if ($result) {
						foreach ($fieldOptionList as $field) {
							$fieldId = $field->getId();
							$valueType = $request->element($field->getFieldName());
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

							$result = $fieldValue->updateOrInsertFieldValue($valueType, $fieldId, $id, $storeId);
						}
					}

					# Operation tracking
					$trackings->addData(array('store_id' => $storeId, 'username' => $userInfo->getUsername(), 'action' => sprintf($amessages['tracking']['edit_article'], $request->element('title')), 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));

					# Redirect to editing page
					header('location:' . '/' . ADMIN_SCRIPT . "?op=manage&act=article&mod=edit&lang=$lang&id=$id&rcode=7");
				
				} # End if ($articleInfo) {
			} # End if (!$validate['invalid']) {
			} # End if(!$thisYearAlbum->getProperty('create_album_error')) {
		} # End if ($validate['invalid']) {
	} else { # Load article information to edit
		$template->assign('item', $articleInfo);
		
		# Category combo box
		$categoryCombo = $articleCategories->generateNestedCombo($arrayCategories,$articleInfo->getCategoryId());
		if ($categoryCombo) $template->assign('categoryCombo', $categoryCombo);

		# Get list of custom fields
		$fieldList = $fields->getObjects(1, "`status`='1' AND `module`='article'", array('position' => 'ASC'));
		if ($fieldList) $template->assign('fieldList', $fieldList);
	} # End if ($_POST && $request->element('doo') == 'submit') {
} # End if (!$articleInfo) {

# Ham kiem tra du lieu nguoi dung nhap vao
function validateData($request)
{
	global $amessages;
	include_once(ROOT_PATH . 'classes/data/validate.class.php');
	$error = array();
	$validate = new Validate();
	$error['invalid'] = 0;

	$error['INPUT']['category_id'] = $validate->pasteString($request->element('category_id'));
	$error['INPUT']['slug'] = $validate->validString($request->element('slug'), $amessages['slug']);
	$error['INPUT']['title'] = $validate->validString($request->element('title'), $amessages['title']);
	$error['INPUT']['keyword'] = $validate->validString($request->element('keyword'), $amessages['keyword']);
	$error['INPUT']['description'] = $validate->validString($request->element('description'), $amessages['description']);
	$error['INPUT']['detail'] = $validate->validString($request->element('detail'), $amessages['detail']);
	$error['INPUT']['position'] = $validate->pasteString($request->element('position'));
	$error['INPUT']['status'] = $validate->pasteString($request->element('status'));
	$error['INPUT']['view'] = $validate->pasteString($request->element('view'));

	global $fieldOptionList;
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

	# Paste value of custom fields
	global $fieldList;
	foreach ($fieldList as $field) {
		$error['INPUT'][$field->getName()] = $validate->pasteString($request->element($field->getName()));
		if ($field->getType() == 4 || $field->getType() == 7) {	# Listbox and checkbox
			$error['INPUT'][$field->getName()]['value'] = $request->element($field->getName());
		}
	}

	if ($error['INPUT']['slug']['error'] || $error['INPUT']['title']['error'] || $error['INPUT']['keyword']['error'] || $error['INPUT']['description']['error'] || $error['INPUT']['detail']['error']) {
		$error['invalid'] = 1;
	}

	return $error;
}
