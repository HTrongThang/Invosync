<?php
/*************************************************************************
Product List module
----------------------------------------------------------------
**************************************************************************/
# Check permission
//$userInfo->checkPermission('product','view');

$templateFile = 'manageproductlist.tpl.html';

include_once(ROOT_PATH.'classes/dao/products.class.php');
include_once(ROOT_PATH.'classes/dao/productcategories.class.php');
$products = new Products($storeId);
$productCategories = new ProductCategories($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hàng hóa' => '/'.ADMIN_SCRIPT.'?op=manage&act=product',
				'Danh sách hàng hóa' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=product';
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
$sort_key = $request->element('sk') ? $request->element('sk') : 'p.id';
if($sort_key) $template->assign('sk',$sort_key);
$sort_direction = $request->element('sd') ? $request->element('sd') : 'DESC';
if($sort_direction) $template->assign('sd',$sort_direction);
$do = $request->element('doo') ? $request->element('doo') : '';
if($do) $template->assign('do',$do);
$kw = $request->element('kw') ? $request->element('kw') : '';
if($kw) $template->assign('kw',$kw);

# Build WHERE condition
$condition = "1>0";
if($kw) $condition .= " AND (`p`.`id`='$kw' OR `p`.`name` LIKE '%$kw%' OR `p`.`slug` LIKE '%$kw%' OR `p`.`keyword` LIKE '%$kw%')";
$pages_condition = "`p`.`store_id` = '$storeId' AND `p`.`status` != '" . S_DELETED . "' AND ($condition)";

$sql_sort_key = $sort_key;
if ($sort_key == 'opening_stock') {
    $sql_sort_key = "p.opening_stock";
}
$sort = array($sql_sort_key => $sort_direction);

# Page navigation
// Since Products has complex joins, we need to adapt getNumItems or just use count
// $rowsPages = $products->getNumItems('id', $pages_condition, $items_per_page);
// Since getNumItems might not support `p.` alias properly, I'll bypass it for now.
$sql_count = "SELECT COUNT(p.id) FROM " . DB_PREFIX . "products p WHERE $pages_condition";
$res_count = $db->query($sql_count);
$rows = 0;
if($res_count) {
    $row = $res_count->fetch_row();
    $rows = $row[0];
}
$pages = ceil($rows / $items_per_page);
$rowsPages = array('rows'=>$rows, 'pages'=>$pages);
$template->assign('rowsPages',$rowsPages);

if($page < 1) $page = 1;
if($page > $rowsPages['pages']) $page = $rowsPages['pages'];

# Since Products::getObjects doesn't support JOIN yet, we'll write a custom query to fetch lists with categories.
$start = max(0, ($page - 1) * $items_per_page);
$sql = "SELECT p.id, p.keyword, p.slug, p.name, p.price, p.opening_stock, p.status, p.properties, c.name AS category_name
        FROM " . DB_PREFIX . "products p 
        LEFT JOIN " . DB_PREFIX . "product_categories c ON p.category_id = c.id 
        WHERE $pages_condition 
        ORDER BY $sql_sort_key $sort_direction 
        LIMIT $start, $items_per_page";
$res = $db->query($sql);
$listPage = array();
if($res) {
    while($row = $res->fetch_assoc()) {
        $row['properties'] = unserialize($row['properties']);
        $listPage[] = $row;
    }
}
if($listPage) $template->assign('listItems',$listPage);

# Pagination html
$url = '/'.ADMIN_SCRIPT."?op=manage&act=product&mod=list&kw=".urlencode($kw)."&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$rowsPages['pages'],$page);
$template->assign('pager',$pager);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);
$error_code = $request->element('ecode');
if($error_code) $template->assign('error_code',$error_code);

# Link
$link = '/'.ADMIN_SCRIPT."?op=manage&act=product&mod=list&kw=$kw&ipp=$items_per_page&sk=$sort_key&sd=$sort_direction&pg=$page";
$template->assign('link',$link);

if($_POST) {
	switch($do) {
		case 'enable':
			//$userInfo->checkPermission('product','edit');
			$id = $request->element('id');
			if($id) {
				$products->changeStatus($id,S_ENABLED);
				$result_code = 1;
				# Operation tracking
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt hàng hóa ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {		
				$ids = $request->element('ids');
				if($ids) {
					$listId = '';
					foreach ($ids as $id) {
						$products->changeStatus($id,S_ENABLED);
						$listId .= ($listId?',&nbsp;':'').$id;
					}
					$result_code = 1;
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Kích hoạt hàng hóa ID '.$listId,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				} else $result_code = 5;
			}
			break;
		case 'disable':
			//$userInfo->checkPermission('product','edit');
			$id = $request->element('id');
			if($id) {
				$products->changeStatus($id,S_DISABLED);
				$result_code = 2;
				# Operation tracking
				$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu hóa hàng hóa ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$listId = '';
					foreach ($ids as $id) {
						$products->changeStatus($id,S_DISABLED);
						$listId .= ($listId?',&nbsp;':'').$id;
					}
					$result_code = 2;
					# Operation tracking
					$trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Vô hiệu hóa hàng hóa ID '.$listId,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
				} else $result_code = 5;
			}
			break;
		case 'delete':
			//$userInfo->checkPermission('product','delete');
			$id = $request->element('id');
			if($id) {
                $item = $products->getObject($id);
                if ($item && $item->getStatus() == S_DISABLED) {
				    $products->changeStatus($id,S_DELETED);
				    $result_code = 3;
				    # Operation tracking
				    $trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa hàng hóa ID '.$id,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
                } else {
                    $error_code = 12;
                }
			} else {
				$ids = $request->element('ids');
				if($ids) {
					$listId = '';
					foreach ($ids as $id) {
                        $item = $products->getObject($id);
                        if ($item && $item->getStatus() == S_DISABLED) {
						    $products->changeStatus($id,S_DELETED);
						    $listId .= ($listId?',&nbsp;':'').$id;
                        }
					}
					$result_code = 3;
                    if (!$listId) {
                        $error_code = 12;
                    } else {
					    # Operation tracking
					    $trackings->addData(array('store_id'=>$storeId,'username'=>$userInfo->getUsername(),'action'=>'Xóa hàng hóa ID '.$listId,'date_created'=>date("Y-m-d H:i:s"),'ip'=>$_SERVER['REMOTE_ADDR']));
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
