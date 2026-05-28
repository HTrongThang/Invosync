<?php

# Kiểm tra quyền truy cập
if (!isset($_SESSION['userId']) || $_SESSION['userId'] == 0) {
	header("Location: /" . ADMIN_SCRIPT . "?op=login");
	exit;
}
$templateFile = 'formxuatban.tpl.html';
include_once(ROOT_PATH . "classes/data/textfilter.class.php");
include_once(ROOT_PATH . 'classes/dao/customers.class.php');
include_once(ROOT_PATH . 'classes/dao/einvoices.class.php');
include_once(ROOT_PATH . 'classes/dao/invoicenewitems.class.php');
include_once(ROOT_PATH . 'classes/dao/payments.class.php');
include_once(ROOT_PATH . 'classes/dao/currencies.class.php');
include_once(ROOT_PATH . 'classes/dao/warehouses.class.php');
include_once(ROOT_PATH . 'classes/dao/vat.class.php');
include_once(ROOT_PATH . 'classes/phpqrcode/qrlib.php');
include_once(ROOT_PATH . 'classes/dao/business.class.php');
include_once(ROOT_PATH . "classes/dao/units.class.php");

$estoreObject = new EStores($storeId);
$invoicenewss = new EInvoice($storeId);
$invoicenewitem = new InvoiceNewItem($storeId);
$payments = new PayMent($storeId);
$currencies = new Currencies($storeId);
$warehouses = new WareHouse($storeId);
$vat = new Vat($storeId);
$Business = new Business($storeId);
$warehouse = new WareHouse($storeId);
$customers = new Customers($storeId);
$textFilter = new TextFilter();
$unitsss = new Units($storeId);

include_once(ROOT_PATH . 'classes/dao/einvoices.class.php');
$invoicenewss = new EInvoice($storeId);

$gallery_root = ROOT_PATH . "upload/newinvoice/";
$gallery_path = $gallery_root . $storeId . "/";
if (!file_exists($gallery_root)) mkdir("$gallery_root");
if (!file_exists($gallery_path)) mkdir("$gallery_path");

$invoiceMultiplePagesArray = array('28');

$template->assign('storeId', $storeId);
$invoiceformatnumber = $estore->getProperty('formatnumber') ? $estore->getProperty('formatnumber') : 1;
$invoicedongiachopheple = $estore->getProperty('ledongia') ? $estore->getProperty('ledongia') : 0;
$invoicesoluongchopheple = $estore->getProperty('lesoluong') ? $estore->getProperty('lesoluong') : 0;

# =====================================================================
# KẾT QUẢ THÔNG BÁO
# =====================================================================
$result_code = $request->element('rcode');
if ($result_code) $template->assign('result_code', $result_code);
$error_code = $request->element('ecode');
if ($error_code) $template->assign('error_code', $error_code);

# =====================================================================
# TIÊU ĐỀ & ĐỊNH DẠNG NGÀY
# =====================================================================
$pageTitle = "Xuất hóa đơn";
$template->assign('pageTitle', $pageTitle);
if ($formatdate == '/') {
	$formatdateModule = 'd/m/Y';
} else {
	$formatdateModule = 'd-m-Y';
}


# Danh sách thuế GTGT
$listVAT = $vat->getObjects(1, "`status`='1'", "", 999999);
if ($listVAT) $template->assign('listVAT', $listVAT);


# =====================================================================
# THIẾT LẬP KÝ HIỆU & SỐ HÓA ĐƠN
# =====================================================================
$BusinessObj = $Business->getObjects(1, "`status` = '1'", "", 99);
if ($BusinessObj) $template->assign('BusinessObj', $BusinessObj);


$template->assign('storeId', $storeId);

# =============================================================================
# XỬ LÝ POST - TẠO HÓA ĐƠN MỚI
# =============================================================================
if ($_POST && $request->element('doo') == 'submit') {

	$currentDate = date('dmY');

	# Lấy thông tin chi nhánh kinh doanh
	$IdbusinessBranch = isset($_POST['businessBranch']) ? $_POST['businessBranch'] : '';
	$nameBusinessBranch = "";
	$addressBusinessBranch = "";
	$codeBusinessBranch = "";
	if ($IdbusinessBranch) {
		$businessBrachObj = $Business->getObject($IdbusinessBranch);
		$nameBusinessBranch = $businessBrachObj->getNameBusiness();
		$addressBusinessBranch = $businessBrachObj->getAddressBusiness();
		$codeBusinessBranch = $businessBrachObj->getCodeBusiness();
	}

	# =====================================================================
	# VALIDATE DỮ LIỆU
	# =====================================================================
	$validate = validateData($request);
	
} else {
	
	

	// Xử lý các logic khác (nếu có) khi không có POST...
}

# =====================================================================
# GÁN DỮ LIỆU CHO TEMPLATE (LUÔN CHẠY)
# =====================================================================
$BusinessObj = $Business->getObjects(1, "`status` = '1'", "", 99);
if ($BusinessObj) $template->assign('BusinessObj', $BusinessObj);

$listVat = $vat->getObjects(1, "`status` = '1'", "", 99);
if ($listVat) $template->assign('listVat', $listVat);

$listPayment = $payments->getObjects(1, "`status` = '1'", "", 99);
if ($listPayment) $template->assign('listPayment', $listPayment);

include_once(ROOT_PATH . 'classes/dao/salechannels.class.php');
$saleChannels = new SaleChannels($storeId);
$listSaleChannel = $saleChannels->getObjects(1, "`status` = '1'", array('position' => 'ASC'), 99);
if ($listSaleChannel) $template->assign('listSaleChannel', $listSaleChannel);

$listCurrency = $currencies->getObjects(1, "`status` = '1'", "", 99);
if ($listCurrency) $template->assign('listCurrency', $listCurrency);

$listWarehouse = $warehouses->getObjects(1, "`status` = '1'", "", 99);
if ($listWarehouse) {
	$template->assign('listWarehouse', $listWarehouse);
	$template->assign('listWarePro', $listWarehouse);
}

$listUnit = $unitsss->getObjects(1, "`status` = '1'", "", 99);
if ($listUnit) $template->assign('listUnit', $listUnit);

# =============================================================================
# HÀM KIỂM TRA DỮ LIỆU ĐẦU VÀO
# =============================================================================
function validateData($request)
{
	global $amessages;
	include_once(ROOT_PATH . 'classes/data/validate.class.php');
	include_once(ROOT_PATH . "classes/data/textfilter.class.php");
	$textFilter = new TextFilter();
	$error = array();
	$errorResult = 0;
	$validate = new Validate();

	# Kiểm tra thông tin hóa đơn
	$req_kyhieu = $request->element("hidden_kyhieu");
	$req_sohoadon = $request->element("hidden_sohoadon");
	$req_ngayhoadon = $request->element("show_ngayhoadon");
	$req_tax_code = $request->element("masothue");
	$req_company_name = $request->element("tendonvi");

	$error['INPUT']['hidden_kyhieu'] = $validate->validString($req_kyhieu, $amessages['kihieu']);
	$error['INPUT']['hidden_sohoadon'] = $validate->validString($req_sohoadon, $amessages['sohoadon']);
	$error['INPUT']['show_ngayhoadon'] = $validate->validString($req_ngayhoadon, $amessages['ngayhoadon']);

	# Kiểm tra MST & tên đơn vị (bắt buộc)
	$error['INPUT']['masothue'] = $validate->validString($req_tax_code, $amessages['tax_code']);
	$error['INPUT']['tennguoimua'] = $validate->validString($req_company_name, $amessages['name_customer']);
	$error['INPUT']['tendonvi'] = $validate->validString($req_company_name, $amessages['name_company']);

	if ($error['INPUT']['hidden_kyhieu']['error'] == 1 or $error['INPUT']['hidden_sohoadon']['error'] == 1 or $error['INPUT']['show_ngayhoadon']['error'] == 1) {
		$error['invalid'] = 1;
		$error['message'] = '';
		return $error;
	}

	$error['invalid'] = 0;
	return $error;
}

# =============================================================================
# HÀM KIỂM TRA NGÀY HÓA ĐƠN
# =============================================================================
function checkInvDate($inputDate, $dateRelease, $date_InvBefore, $maxSeriInv)
{
	$flag = true;

	if ($date_InvBefore == '') {
		# Hóa đơn đầu tiên: chỉ so sánh với ngày thông báo phát hành
		if (strtotime($inputDate) < strtotime($dateRelease)) {
			return false;
		}
	} else {
		# Đã có hóa đơn trước đó: so sánh với hóa đơn cuối và ngày phát hành
		if (strtotime($inputDate) < strtotime($dateRelease)) {
			return false;
		} else if (strtotime($inputDate) < strtotime($date_InvBefore)) {
			return false;
		}
	}
	return $flag;
}

# =============================================================================
# HÀM CHUẨN HÓA SỐ
# =============================================================================
function chuanHoaSo($giatri) {
	if (empty($giatri)) return 0;
	$giatri = str_replace('.', '', $giatri);
	$giatri = str_replace(',', '.', $giatri);
	return (float)$giatri;
}