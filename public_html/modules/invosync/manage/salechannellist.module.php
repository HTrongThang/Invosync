<?php
$templateFile = 'managesalechannellist.tpl.html';

include_once(ROOT_PATH.'classes/dao/salechannels.class.php');
$saleChannels = new SaleChannels($storeId);

# Top navigation
$topNav = array($amessages['dash_board'] => '/'.ADMIN_SCRIPT.'?op=dashboard',
				$amessages['manage_website'] => '/'.ADMIN_SCRIPT.'?op=manage',
				'Kênh bán hàng' => '/'.ADMIN_SCRIPT.'?op=manage&act=salechannel',
				'Danh sách' => '');

# Tabs
$tabLink = '/'.ADMIN_SCRIPT.'?op=manage&act=salechannel';
$listTabs = array($amessages['list_item'] => $tabLink.'&mod=list',
				$amessages['add_new'] => $tabLink.'&mod=add',
				$amessages['clean_trash'] => $tabLink.'&mod=cleantrash');
$template->assign('listTabs',$listTabs);
$template->assign('currentTab',1);

# Result code
$result_code = $request->element('rcode');
if($result_code) $template->assign('result_code',$result_code);

# Action
$action = $request->element('doo');
if($action) {
	$listIds = $request->element('ids');
	if(is_array($listIds)) {
		foreach($listIds as $id) {
			switch($action) {
				case 'enable':
					$saleChannels->changeStatus($id, 1);
					break;
				case 'disable':
					$saleChannels->changeStatus($id, 0);
					break;
				case 'delete':
					$saleChannels->changeStatus($id, 2);
					break;
			}
		}
		header('location:'.'/'.ADMIN_SCRIPT."?op=manage&act=salechannel&mod=list&rcode=6");
		exit;
	}
}

# Generate conditions
$condition = "`status` != 2";

$kw = $request->element('kw');
if($kw) {
	$condition .= " AND (`name` LIKE '%$kw%')";
	$template->assign('kw',$kw);
}

# Pagination
$items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE;
$page = $request->element('page') ? $request->element('page') : 1;
$rowsPages = method_exists($saleChannels, "getNumItems") ? $saleChannels->getNumItems("id", $condition, $items_per_page) : array('rows'=>0, 'pages'=>0);
$total_items = $rowsPages['rows'];
$total_pages = $rowsPages['pages'];
if($page > $total_pages && $total_pages > 0) $page = $total_pages;

$listItems = $saleChannels->getObjects($page, $condition, array('position' => 'ASC', 'id' => 'DESC'), $items_per_page);
if($listItems) $template->assign('listItems',$listItems);

$url = '/'.ADMIN_SCRIPT."?op=manage&act=salechannel&mod=list&doo=$action&kw=".urlencode($kw)."&ipp=$items_per_page&pg=%d";
$urls = new Url();
$pager = $urls->genPager($url,$total_pages,$page);
$template->assign('pager',$pager);

# Paging info
$paging = array('page' => $page,
				'total_pages' => $total_pages,
				'total_items' => $total_items,
				'items_per_page' => $items_per_page);
$template->assign('paging',$paging);
?>
