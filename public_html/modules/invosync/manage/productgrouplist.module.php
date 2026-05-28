<?php
/*************************************************************************
Product Group List module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('productgroup','view');

$templateFile = 'manageproductgrouplist.tpl.html';

include_once(ROOT_PATH.'classes/dao/productcategories.class.php');
include_once(ROOT_PATH.'classes/dao/products.class.php');
$productCategories = new ProductCategories($storeId);
$products = new Products($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=product',
				'Danh sách nhóm' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=productgroup';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);

# Get parameters
$items_per_page = $request->element('ipp') ? $request->element('ipp') : DEFAULT_ADMIN_ROWS_PER_PAGE;
if($items_per_page) $template->assign('ipp',$items_per_page);
$page = $request->element('pg') ? $request->element('pg') : 1;
if($page) $template->assign('pg',$page);
$sort_key = $request->element('sk') ? $request->element('sk') : 'id';
if($sort_key) $template->assign('sk',$sort_key);
$sort_direction = $request->element('sd') ? $request->element('sd') : 'DESC';
if($sort_direction) $template->assign('sd',$sort_direction);
$do = $request->element('doo') ? $request->element('doo') : '';
if($do) $template->assign('do',$do);
$kw = $request->element('kw') ? $request->element('kw') : '';
if($kw) $template->assign('kw',$kw);

# Build WHERE condition
$condition = "`status` != '".S_DELETED."'";
if($kw) $condition .= " AND (`id`='$kw' OR `name` LIKE '%$kw%' OR `slug` LIKE '%$kw%')";
$pages_condition = "`store_id` = '$storeId' AND ($condition)";
$sort = array($sort_key => $sort_direction);

# Page navigation
$rowsPages = $productCategories->getNumItems('id', $pages_condition, $items_per_page);
$template->assign('rowsPages',$rowsPages);
if($page < 1) $page = 1;
if($page > $rowsPages['pages']) $page = $rowsPages['pages'];

$start_num = ($page-1)*$items_per_page+1;
$template->assign('startNum',$start_num);
$url = '/'.ADMIN_SCRIPT."?op=manage&act=productgroup&mod=list&doo=$do&kw=".urlencode($kw)."&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$rowsPages['pages'],$page);
$template->assign('pager',$pager);

$listPage = $productCategories->getObjects($page,$condition,$sort,$items_per_page);
if($listPage) $template->assign('listItems',$listPage);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);
$error_code = $request->element('ecode');
if($error_code) $template->assign('error_code',$error_code);

# Link
$link = '/'.ADMIN_SCRIPT."?op=manage&act=productgroup&mod=list&kw=$kw&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page";
$template->assign('link',$link);

if($_POST) {
	switch($do) {
		case 'enable':
			//$userInfo->checkPermission('productgroup','edit');
			$id = $request->element('id');
			if($id) {
				$productCategories->changeStatus($id,S_ENABLED);
				$result_code = 1;
				# Operation tracking
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt nhóm hàng hóa ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {		
				$ids = $request->element('ids');
				if($ids) {
					$listId = '';
					foreach ($ids as $id) {
						$productCategories->changeStatus($id,S_ENABLED);
						$listId .= ($listId?',&nbsp;':'').$id;
					}
					$result_code = 1;
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt nhóm hàng hóa ID '.$listId,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				} else $result_code = 5;
			}
			break;
		case 'disable':
			//$userInfo->checkPermission('productgroup','edit');
			$id = $request->element('id');
			if($id) {
				$productCategories->changeStatus($id,S_DISABLED);
				$result_code = 2;
				# Operation tracking
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu hóa nhóm hàng hóa ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$listId = '';
					foreach ($ids as $id) {
						$productCategories->changeStatus($id,S_DISABLED);
						$listId .= ($listId?',&nbsp;':'').$id;
					}
					$result_code = 2;
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu hóa nhóm hàng hóa ID '.$listId,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				} else $result_code = 5;
			}
			break;
		case 'delete':
			//$userInfo->checkPermission('productgroup','delete');
			$id = $request->element('id');
			if($id) {
                $item = $productCategories->getObject($id);
				if($products->countItems('id', "category_id='$id' AND status != ".S_DELETED) > 0) {
					$error_code = 11;
				} elseif ($item && $item->getStatus() != S_DISABLED) {
                    $error_code = 12;
                } else {
					$productCategories->changeStatus($id,S_DELETED);
					$result_code = 3;
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa nhóm hàng hóa ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				}
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$listId = '';
					$hasError = false;
					foreach ($ids as $id) {
                        $item = $productCategories->getObject($id);
						if($products->countItems('id', "category_id='$id' AND status != ".S_DELETED) > 0) {
							$hasError = 11;
						} elseif ($item && $item->getStatus() != S_DISABLED) {
                            $hasError = 12;
                        } else {
							$productCategories->changeStatus($id,S_DELETED);
							$listId .= ($listId?',&nbsp;':'').$id;
						}
					}
					if($listId) {
						$result_code = 3;
						# Operation tracking
						$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa nhóm hàng hóa ID '.$listId,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
					}
					if($hasError) {
						$error_code = $hasError;
					}
				} else $result_code = 5;
			}
			break;
	}
	$redirectUrl = $link.'&rcode='.$result_code;
	if (isset($error_code)) $redirectUrl .= '&ecode='.$error_code;
	header('location:'.$redirectUrl);
}
?>
