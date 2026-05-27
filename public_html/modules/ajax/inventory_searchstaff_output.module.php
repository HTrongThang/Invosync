<?php
if(!defined('ROOT_PATH')) die('Error!');

header('Content-Type: application/json; charset=utf-8');
include_once(ROOT_PATH.'classes/dao/users.class.php');
$storeId = isset($_SESSION['storeId']) ? $_SESSION['storeId'] : (isset($storeId) ? $storeId : 1);
$staffs = new Users($storeId);

$value = $request->element('value');
$response = array('success' => false, 'data' => array(), 'message' => '');

if($value) {
	$value = addslashes($value);
	$condition = "(`fullname` LIKE '%$value%' OR `username` LIKE '%$value%' OR `tel` LIKE '%$value%') AND `status` = 1";
	$staffList = $staffs->getObjects(1, $condition, array('id'=>'DESC'), 20);
	
	if($staffList) {
		$response['success'] = true;
		foreach($staffList as $staff) {
			$response['data'][] = array(
				'id' => $staff->getId(),
				'username' => $staff->getUsername(),
				'fullname' => $staff->getFullName(),
				'tel' => $staff->getTel()
			);
		}
	} else {
		$response['message'] = 'Không tìm thấy nhân viên nào.';
	}
} else {
	$response['message'] = 'Vui lòng nhập từ khóa tìm kiếm.';
}

echo json_encode($response);
exit;
?>
