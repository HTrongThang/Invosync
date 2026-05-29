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
$pageTitle = "Chỉnh sửa hóa đơn";
$template->assign('pageTitle', $pageTitle);

$id = $request->element('id');
if ($id) {
    $itemInfo = $invoicenewss->getObject($id);
    if (!$itemInfo) {
        header("Location: /" . ADMIN_SCRIPT . "?op=newinvoice&act=new&mod=list&ecode=24");
        exit;
    }
    $template->assign('itemInfo', $itemInfo);
    $listProductInvoice = $invoicenewitem->getObjects(1, "id_iv='$id'", array('id' => 'ASC'), 9999);
    $template->assign('listProductInvoice', $listProductInvoice);
}
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
	
	$validate = validateData($request);


	if ($validate['invalid'] == 0) {
		# THU THẬP DỮ LIỆU HEADER
		$serial       = Filter($request->element('hidden_sohoadon'));
		$masothue     = Filter($request->element('masothue'));
		$namedv       = Filter($request->element('tendonvi'));
		$name_cus     = Filter($request->element('tennguoimua'));
		$address      = Filter($request->element('diachi'));
		$date_set_raw = $request->element('hidden_ngayhoadon');
		$payments     = Filter($request->element('payment_method'));
		$id_customer  = $request->element('id_customer');
		$salechannel  = $request->element('salechannel');
		$ghichu       = Filter($request->element('ghichu'));

		$date_set = '';
		if ($date_set_raw) {
			$separator = strpos($date_set_raw, '/') !== false ? '/' : '-';
			$parts = explode($separator, $date_set_raw);
			if (count($parts) == 3) {
				$date_set = $parts[2] . '-' . $parts[1] . '-' . $parts[0];
			} else {
				$date_set = date('Y-m-d');
			}
		} else {
			$date_set = date('Y-m-d');
		}

		$subtotal_novat = chuanHoaSo($request->element('hidden_tongthanhtien'));
		$sub_total      = chuanHoaSo($request->element('hidden_tongcongpriceGTGT'));
		$total_name     = Filter($request->element('hidden_bangchuGTGT'));

		$propertiesArray = array(
			'ghichu'              => $ghichu,
			'nguoimuakhonglayhoadon'=> $request->element('nguoimuakhonglayhoadon'),
			'warehouse'           => $request->element('warehouse'),
			'businessBranch'      => $IdbusinessBranch,
			'nameBusinessBranch'  => $nameBusinessBranch,
			'addressBusinessBranch' => $addressBusinessBranch,
			'codeBusinessBranch'  => $codeBusinessBranch,
			'debit_term'          => $request->element('debit_term'),
			'payment_term'        => $request->element('hidden_payment_term'),
			'sales_person'        => $request->element('sales_person'),
			'hidden_sales_person' => $request->element('hidden_sales_person'),
		);

		$invoiceData = array(
			'serial'           => $serial,
			'masothue'         => $masothue,
			'namedv'           => $namedv,
			'name_cus'         => $name_cus,
			'email'            => '',
			'address'          => $address,
			'stk'              => '',
			'date_set'         => $date_set,
			'payments'         => $payments,
			'date_created'     => date('Y-m-d H:i:s'),
			'subtotal_novat'   => $subtotal_novat,
			'sub_total'        => $sub_total,
			'total_name'       => $total_name,
			'properties'       => serialize($propertiesArray),
			'status'           => 1,
			'status_sign'      => 0,
			'status_censored'  => 0,
			'status_replace'   => 0,
			'status_repair'    => 0,
			'status_pdf'       => 0,
			'status_convert'   => 0,
			'status_delete'    => 0,
			'auto_sign'        => 0,
			'auto_post_togdt'  => 0,
			'confirmation_code' => '',
			'status_sale'      => 0,
			'reasonsale'       => '',
			'id_sale_channel'  => $salechannel ? $salechannel : 0,
			'id_symbol'        => 0,
			'id_bill'          => 0,
			'id_cus'           => $id_customer ? $id_customer : 0,
			'store_id'         => $storeId,
		);
		unset($invoiceData['date_created']); // Don't overwrite creation date on edit

		$updateSuccess = $invoicenewss->updateData($invoiceData, $id);

		if ($updateSuccess) {
			$invoiceId = $id;
			$invoicenewitem->DeleteData1($invoiceId, 'id_iv'); // Xóa chi tiết cũ để thêm lại
			# INSERT LINE ITEMS
			$arrTenHang     = isset($_POST['tenhang'])              ? $_POST['tenhang']              : array();
			$arrMaHang      = isset($_POST['mahang'])               ? $_POST['mahang']               : array();
			$arrMaSKU       = isset($_POST['masku'])                ? $_POST['masku']                : array();
			$arrIdSP        = isset($_POST['id_sp'])                ? $_POST['id_sp']                : array();
			$arrDonVT       = isset($_POST['donvt'])                ? $_POST['donvt']                : array();
			$arrDonVTId     = isset($_POST['hidden_donvt_id'])      ? $_POST['hidden_donvt_id']      : array();
			$arrSoLuong     = isset($_POST['hidden_soluong'])       ? $_POST['hidden_soluong']       : array();
			$arrDonGia      = isset($_POST['hidden_dongia'])        ? $_POST['hidden_dongia']        : array();
			$arrDonGiaVat   = isset($_POST['hidden_dongiavat'])     ? $_POST['hidden_dongiavat']     : array();
			$arrGTGT        = isset($_POST['show_GTGT'])            ? $_POST['show_GTGT']            : array();
			$arrThueGTGT    = isset($_POST['hidden_thueGTGT'])      ? $_POST['hidden_thueGTGT']      : array();
			$arrThanhTienGTGT = isset($_POST['hidden_thanhtienGTGT']) ? $_POST['hidden_thanhtienGTGT'] : array();
			$arrChietKhau   = isset($_POST['chietkhau2'])           ? $_POST['chietkhau2']           : array();
			$arrKhuyenMai   = isset($_POST['khuyenmai2'])           ? $_POST['khuyenmai2']           : array();
			$arrHHDacTrung  = isset($_POST['featuredProductStatus']) ? $_POST['featuredProductStatus'] : array();

			for ($i = 0; $i < count($arrTenHang); $i++) {
				# Bỏ qua dòng trống (không có tên hàng)
				if (empty(trim($arrTenHang[$i]))) continue;

				$itemProperties = serialize(array(
					'masku'   => isset($arrMaSKU[$i]) ? $arrMaSKU[$i] : '',
					'unit_id' => isset($arrDonVTId[$i]) ? $arrDonVTId[$i] : '',
				));

				$quantity    = isset($arrSoLuong[$i])   ? chuanHoaSo($arrSoLuong[$i])   : 0;
				$price       = isset($arrDonGia[$i])    ? chuanHoaSo($arrDonGia[$i])    : 0;
				$pricedv     = isset($arrDonGiaVat[$i]) ? chuanHoaSo($arrDonGiaVat[$i]) : 0;
				$vatPercent  = isset($arrGTGT[$i])      ? $arrGTGT[$i]                  : '';
				$thueGTGT    = isset($arrThueGTGT[$i])  ? chuanHoaSo($arrThueGTGT[$i])  : 0;
				$thuedv      = $quantity * $price; 
				$price_vat   = $thueGTGT;      

				$itemData = array(
					'ma_sp'          => isset($arrMaHang[$i]) ? Filter($arrMaHang[$i]) : '',
					'name'           => Filter($arrTenHang[$i]),
					'dvt'            => isset($arrDonVT[$i]) ? Filter($arrDonVT[$i]) : '',
					'quantity'       => $quantity,
					'price'          => $price,
					'thuedv'         => $thuedv,
					'pricedv'        => $pricedv,
					'vat'            => $vatPercent,
					'price_vat'      => $price_vat,
					'chietkhau'      => isset($arrChietKhau[$i]) ? $arrChietKhau[$i] : 0,
					'khuyenmai'      => isset($arrKhuyenMai[$i]) ? $arrKhuyenMai[$i] : 0,
					'hangHoaDacTrung' => isset($arrHHDacTrung[$i]) ? $arrHHDacTrung[$i] : 0,
					'properties'     => $itemProperties,
					'status'         => 1,
					'date_cretead'   => date('Y-m-d H:i:s'),
					'id_product'     => isset($arrIdSP[$i]) ? intval($arrIdSP[$i]) : 0,
					'id_iv'          => $invoiceId,
					'store_id'       => $storeId,
				);

				$invoicenewitem->addData($itemData);
			}

			# REDIRECT SAU KHI LƯU THÀNH CÔNG
			header("Location: /" . ADMIN_SCRIPT . "?op=newinvoice&act=new&mod=list&rcode=1");
			exit;
		} else {
			$template->assign('error_code', 'Lỗi khi lưu hóa đơn vào cơ sở dữ liệu.');
		}
	} else {
		# Validate thất bại - gán lỗi cho template để hiển thị
		$template->assign('error', $validate);
	}
} 

# GÁN DỮ LIỆU CHO TEMPLATE (LUÔN CHẠY)
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

# HÀM KIỂM TRA DỮ LIỆU ĐẦU VÀO
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
	$req_sohoadon = $request->element("hidden_sohoadon");
	$req_ngayhoadon = $request->element("show_ngayhoadon");
	$req_tax_code = $request->element("masothue");
	$req_company_name = $request->element("tendonvi");

	$error['INPUT']['hidden_sohoadon'] = $validate->validString($req_sohoadon, $amessages['sohoadon']);
	$error['INPUT']['show_ngayhoadon'] = $validate->validString($req_ngayhoadon, $amessages['ngayhoadon']);

	# Kiểm tra MST & tên đơn vị (bắt buộc)
	$error['INPUT']['masothue'] = $validate->validString($req_tax_code, $amessages['tax_code']);
	$error['INPUT']['tennguoimua'] = $validate->validString($req_company_name, $amessages['name_customer']);
	$error['INPUT']['tendonvi'] = $validate->validString($req_company_name, $amessages['name_company']);

	if ($error['INPUT']['hidden_sohoadon']['error'] == 1 or $error['INPUT']['show_ngayhoadon']['error'] == 1) {
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
	$giatri = trim((string)$giatri);
	
	if (strpos($giatri, ',') !== false && strpos($giatri, '.') !== false) {
		$giatri = str_replace('.', '', $giatri);
		$giatri = str_replace(',', '.', $giatri);
	} elseif (strpos($giatri, ',') !== false) {
		$giatri = str_replace(',', '.', $giatri);
	} elseif (strpos($giatri, '.') !== false) {
		if (substr_count($giatri, '.') > 1) {
			$giatri = str_replace('.', '', $giatri);
		} else {
			$parts = explode('.', $giatri);
			if (isset($parts[1]) && strlen($parts[1]) === 3) {
				$giatri = str_replace('.', '', $giatri);
			}
		}
	}
	return (float)$giatri;
}