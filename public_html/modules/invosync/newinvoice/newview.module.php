<?php
# Kiểm tra quyền truy cập
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
	header("Location: /" . ADMIN_SCRIPT . "?op=login");
	exit;
}

$templateFile = 'viewinvoice.tpl.html';

include_once(ROOT_PATH . 'classes/dao/einvoices.class.php');
include_once(ROOT_PATH . 'classes/dao/invoicenewitems.class.php');
include_once(ROOT_PATH . 'classes/dao/business.class.php');

$invoicenewss = new EInvoice($storeId);
$invoicenewitem = new InvoiceNewItem($storeId);
$Business = new Business($storeId);

$id = $request->element('id');
if (!$id) {
    header("Location: /" . ADMIN_SCRIPT . "?op=newinvoice&act=new&mod=list");
    exit;
}

# Lấy thông tin hóa đơn
$invoiceInfo = $invoicenewss->getObject($id);
if (!$invoiceInfo) {
    header("Location: /" . ADMIN_SCRIPT . "?op=newinvoice&act=new&mod=list");
    exit;
}
$template->assign('invoiceInfo', $invoiceInfo);

# Giải mã properties
$properties = $invoiceInfo->getProperties();
if ($properties) {
    $props = is_string($properties) ? unserialize($properties) : $properties;
    $template->assign('invoiceProps', $props);
}

# Lấy danh sách mặt hàng
$invoiceItems = $invoicenewitem->getObjects(1, "`id_iv` = '$id'", array(), 9999);
if ($invoiceItems) {
    $template->assign('invoiceItems', $invoiceItems);
}

# Lấy thông tin đơn vị bán (Seller)
$BusinessObj = $Business->getObjects(1, "`status` = '1'", "", 99);
if ($BusinessObj) {
    $template->assign('BusinessObj', $BusinessObj);
}

$pageTitle = "Chi tiết hóa đơn: " . $invoiceInfo->getSerial();
$template->assign('pageTitle', $pageTitle);

?>
