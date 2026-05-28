<?php
$templateFile = 'managepaymentlist.tpl.html';
include_once(ROOT_PATH.'classes/dao/payments.class.php');
$dbObj = new PayMent($storeId);
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Hình thức thanh toán' => '/'.ADMIN_SCRIPT.'?op=manage&act=payment',
				'Danh sách' => '');
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=payment';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

$action = $request->element('doo');
if($action) {
	$id = $request->element('id');
	if($id) {
		switch($action) {
			case 'enable':
				$dbObj->changeStatus($id, 1);
				break;
			case 'disable':
				$dbObj->changeStatus($id, 0);
				break;
			case 'delete':
				$itemObj = $dbObj->getObject($id);
				if($itemObj && $itemObj->getStatus() == 0) {
					$dbObj->changeStatus($id, 2);
				}
				break;
		}
		header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&rcode=6");
		exit;
	} else {
		$listIds = $request->element('ids');
		if(is_array($listIds)) {
			foreach($listIds as $id) {
				switch($action) {
					case 'enable':
						$dbObj->changeStatus($id, 1);
						break;
					case 'disable':
						$dbObj->changeStatus($id, 0);
						break;
					case 'delete':
						$itemObj = $dbObj->getObject($id);
						if($itemObj && $itemObj->getStatus() == 0) {
							$dbObj->changeStatus($id, 2);
						}
						break;
				}
			}
			header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&rcode=6");
			exit;
		}
	}
}

$condition = "`status` != 2";
$kw = $request->element('kw');
if($kw) {
	$condition .= " AND (`name` LIKE '%$kw%')";
	$template->assign('kw',$kw);
}

$items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE;
$page = $request->element('page') ? $request->element('page') : 1;
$rowsPages = method_exists($dbObj, "getNumItems") ? $dbObj->getNumItems("id", $condition, $items_per_page) : array('rows'=>0, 'pages'=>0);
$total_items = $rowsPages['rows'];
$total_pages = $rowsPages['pages'];
if($page > $total_pages && $total_pages > 0) $page = $total_pages;

$listItems = method_exists($dbObj, "getObjects") ? $dbObj->getObjects($page, $condition, array("id" => "DESC"), $items_per_page) : array();
if($listItems) $template->assign('listItems',$listItems);

$url = '/'.ADMIN_SCRIPT."?op=manage&act=payment&mod=list&doo=$action&kw=".urlencode($kw)."&ipp=$items_per_page&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$total_pages,$page);
$template->assign('pager',$pager);

$paging = array('page' => $page, 'total_pages' => $total_pages, 'total_items' => $total_items, 'items_per_page' => $items_per_page);
$template->assign('paging',$paging);
$template->assign('rowsPages', $rowsPages);
?>