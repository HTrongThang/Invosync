<?php
/*************************************************************************
New Invoice Add module
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

include_once(ROOT_PATH.'classes/dao/orders.class.php');
$orders = new Orders($storeId);
$templateFile = 'formxuatban.tpl.html';

# Handle form submission
$doo = $request->element('doo');
if ($doo == 'submit') {
    $code = $request->element('code');
    if (!$code || $code == 'Auto serial') {
        $code = 'HD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));
    }
    
    $dateCreated = $request->element('date_created');
    if ($dateCreated) {
        // Convert dd/mm/yyyy to yyyy-mm-dd hh:ii:ss
        $parts = explode('/', $dateCreated);
        if (count($parts) == 3) {
            $formattedDate = $parts[2] . '-' . $parts[1] . '-' . $parts[0] . ' ' . date('H:i:s');
        } else {
            $formattedDate = date('Y-m-d H:i:s');
        }
    } else {
        $formattedDate = date('Y-m-d H:i:s');
    }

    $totalStr = str_replace(array('.', ','), '', $request->element('total', '10002100000'));
    $total = floatval($totalStr);

    $properties = array(
        'bill_company' => $request->element('company'),
        'bill_mst' => $request->element('mst'),
        'client_code' => $request->element('client_code'),
        'business_location' => $request->element('business_location'),
        'debt_days' => $request->element('debt_days'),
        'payment_deadline' => $request->element('payment_deadline'),
        'saleman' => $request->element('saleman'),
        'channel' => $request->element('channel'),
        'warehouse' => $request->element('warehouse'),
        'quick_search' => $request->element('quick_search'),
        'items' => $request->element('items')
    );

    $fields = array(
        'store_id' => $storeId,
        'code' => $code,
        'name' => $request->element('name'),
        'email' => $request->element('email', ''),
        'tel' => $request->element('tel', ''),
        'address' => $request->element('address'),
        'payment_method' => $request->element('payment_method', 'Chuyển khoản'),
        'total' => $total,
        'status' => 1,
        'date_created' => $formattedDate,
        'date_updated' => date('Y-m-d H:i:s'),
        'pic_id' => $_SESSION['userId'],
        'properties' => serialize($properties),
        'note' => $request->element('note', '')
    );

    // Call addData of Orders class
    $newId = $orders->addData($fields);
    if ($newId) {
        header("Location: /" . ADMIN_SCRIPT . "?op=newinvoice&act=new&mod=list&rcode=1");
        exit;
    } else {
        $error = "Đã xảy ra lỗi khi tạo hóa đơn. Vui lòng thử lại.";
        $template->assign('error', $error);
    }
}

# Suggestions for the form
$suggestedCode = 'HD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));
$suggestedDate = date('d/m/Y');

$template->assign('suggestedCode', $suggestedCode);
$template->assign('suggestedDate', $suggestedDate);
$template->assign('pageTitle', 'Thêm mới hóa đơn');
?>
