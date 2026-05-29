<?php
/*************************************************************************
New Invoice List module
----------------------------------------------------------------
DeraCMS Project
Company: Derasoft Co., Ltd                                  
Last updated: 19/05/2026
**************************************************************************/
# Check permission
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

$templateFile = 'listxuatban.tpl.html';

include_once(ROOT_PATH . 'classes/dao/einvoices.class.php');
$invoicenewss = new EInvoice($storeId);

# ==============================================================
# LẤY THAM SỐ TÌM KIẾM TỪ URL (GET)
# ==============================================================
$search_from = $request->element('search_from', '');
$search_to = $request->element('search_to', '');
$search_serial = $request->element('search_serial', '');
$search_masothue = $request->element('search_masothue', '');
$search_keyword = $request->element('search_keyword', '');
$items_per_page = $request->element('limit', 20);
$page = $request->element('page', 1);

# Build condition
$condition = "1>0";
if ($search_from) {
    // Chuyển d/m/Y sang Y-m-d
    $parts = explode('/', $search_from);
    if (count($parts) == 3) {
        $dateFrom = $parts[2] . '-' . $parts[1] . '-' . $parts[0];
        $condition .= " AND `date_created` >= '$dateFrom 00:00:00'";
    }
}
if ($search_to) {
    $parts = explode('/', $search_to);
    if (count($parts) == 3) {
        $dateTo = $parts[2] . '-' . $parts[1] . '-' . $parts[0];
        $condition .= " AND `date_created` <= '$dateTo 23:59:59'";
    }
}
if ($search_serial) {
    $condition .= " AND `serial` LIKE '%$search_serial%'";
}
if ($search_masothue) {
    $condition .= " AND `masothue` LIKE '%$search_masothue%'";
}
if ($search_keyword) {
    $condition .= " AND (`name_cus` LIKE '%$search_keyword%' OR `namedv` LIKE '%$search_keyword%')";
}

# Sắp xếp mới nhất lên đầu
$sort = array('id' => 'DESC');

# Truy vấn dữ liệu
$listInvoices = $invoicenewss->getObjects($page, $condition, $sort, $items_per_page);
$totalInvoices = $invoicenewss->countItems('id', "`store_id` = '$storeId' AND $condition");

# Gửi biến ra giao diện
if ($listInvoices) {
    $template->assign('listInvoices', $listInvoices);
}
$template->assign('totalInvoices', $totalInvoices);
$template->assign('search_from', $search_from);
$template->assign('search_to', $search_to);
$template->assign('search_serial', $search_serial);
$template->assign('search_masothue', $search_masothue);
$template->assign('search_keyword', $search_keyword);
$template->assign('items_per_page', $items_per_page);
$template->assign('page', $page);
$template->assign('totalPages', ceil($totalInvoices / $items_per_page));
