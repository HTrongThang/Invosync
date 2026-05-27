<?php
if(!defined('ROOT_PATH')) die('Error!');

header('Content-Type: application/json; charset=utf-8');
include_once(ROOT_PATH.'classes/dao/customers.class.php');
$storeId = isset($_SESSION['storeId']) ? $_SESSION['storeId'] : (isset($storeId) ? $storeId : 1);
$customers = new Customers($storeId);

$value = $request->element('value');
$response = array('success' => false, 'data' => array(), 'message' => '');

if($value) {
	$value = addslashes($value);
	$condition = "(`fullname` LIKE '%$value%' OR `company_name` LIKE '%$value%' OR `tax_code` LIKE '%$value%' OR `tel` LIKE '%$value%') AND `status` = 1";
	$customerList = $customers->getObjects(1, $condition, array('id'=>'DESC'), 20);
	
	if($customerList) {
		$response['success'] = true;
		foreach($customerList as $cus) {
			$response['data'][] = array(
				'id' => $cus->getId(),
				'masothue' => $cus->getTaxCode(),
				'madonvi' => $cus->getCompanyCode() ? $cus->getCompanyCode() : $cus->getAbbreviations(),
				'tennguoimua' => $cus->getFullName(),
				'tendonvi' => $cus->getCompanyName(),
				'diachi' => $cus->getAddress(),
				'email' => $cus->getEmail(),
				'sotaikhoan' => $cus->getSoTaiKhoan(),
				'nganhang' => $cus->getTkNganhang()
			);
		}
	} else {
		$response['message'] = 'Không tìm thấy khách hàng nào.';
	}
} else {
	$response['message'] = 'Vui lòng nhập từ khóa tìm kiếm.';
}

echo json_encode($response);
exit;
?>
