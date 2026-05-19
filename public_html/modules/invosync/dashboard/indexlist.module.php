<?php
/*************************************************************************
Dashboard module for InvoSync (Static/Visual Design Only)
----------------------------------------------------------------
Derasoft CMS Project
Company: Derasoft Co., Ltd                                  
Last updated: 19/05/2026 (Premium Static Redesign)
Coder: Antigravity AI
 **************************************************************************/
// Check if user is logged in
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
    header("Location: /" . ADMIN_SCRIPT . "?op=login");
    exit;
}

$templateFile = 'dashboard.tpl.html';

$topNav = array(
    $amessages['dash_board'] => '/' . ADMIN_SCRIPT . '?op=dashboard',
    $amessages['summary'] => ''
);

// 1. Define beautiful realistic static statistics
$totalInvoices = 156;
$totalRevenue = 389400000;
$pendingInvoices = 14;
$totalCustomers = 42;

// 2. Define beautiful static invoice records for visual representation
$formattedOrders = array(
    array(
        'id' => 1,
        'code' => 'HD-2026-0001',
        'name' => 'Công ty TNHH Giải Pháp Công Nghệ Sao Mai',
        'total' => 12500000,
        'status' => 1,
        'date_created' => date('d/m/Y H:i', strtotime('-1 hour')),
        'payment_method' => 'Chuyển khoản'
    ),
    array(
        'id' => 2,
        'code' => 'HD-2026-0002',
        'name' => 'Công ty CP Đầu Tư & Phát Triển Địa Ốc Xanh',
        'total' => 8400000,
        'status' => 0,
        'date_created' => date('d/m/Y H:i', strtotime('-3 hours')),
        'payment_method' => 'Chuyển khoản'
    ),
    array(
        'id' => 3,
        'code' => 'HD-2026-0003',
        'name' => 'Doanh Nghiệp Tư Nhân Vận Tải An Phát',
        'total' => 31000000,
        'status' => 1,
        'date_created' => date('d/m/Y H:i', strtotime('-1 day')),
        'payment_method' => 'Tiền mặt'
    ),
    array(
        'id' => 4,
        'code' => 'HD-2026-0004',
        'name' => 'Cửa Hàng Bán Lẻ Bách Hóa Việt',
        'total' => 1500000,
        'status' => 1,
        'date_created' => date('d/m/Y H:i', strtotime('-1 day')),
        'payment_method' => 'Tiền mặt'
    ),
    array(
        'id' => 5,
        'code' => 'HD-2026-0005',
        'name' => 'Công ty TNHH Thương Mại & Dịch Vụ Kim Phát',
        'total' => 19200000,
        'status' => 0,
        'date_created' => date('d/m/Y H:i', strtotime('-2 days')),
        'payment_method' => 'Chuyển khoản'
    ),
    array(
        'id' => 6,
        'code' => 'HD-2026-0006',
        'name' => 'Hộ Kinh Doanh Cá Thể Minh Hoàng',
        'total' => 4700000,
        'status' => 1,
        'date_created' => date('d/m/Y H:i', strtotime('-3 days')),
        'payment_method' => 'Chuyển khoản'
    )
);

// 3. Assign stats variables directly
$template->assign('latestOrders', $formattedOrders);
$template->assign('totalInvoices', $totalInvoices);
$template->assign('totalRevenue', $totalRevenue);
$template->assign('pendingInvoices', $pendingInvoices);
$template->assign('totalCustomers', $totalCustomers);
$template->assign('isMock', true); // Static presentation indicator
$template->assign('pageTitle', 'Bảng điều khiển');

?>