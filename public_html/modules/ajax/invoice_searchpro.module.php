<?php
if(!defined('ROOT_PATH')) die('Error!');
header('Content-Type: application/json; charset=utf-8');

$storeId = isset($_SESSION['storeId']) ? $_SESSION['storeId'] : (isset($storeId) ? $storeId : 1);
$valueSearch = $request->element("value");
$row = $request->element('row');

$response = array('success' => 0, 'data' => array(), 'message' => '');

if($valueSearch){
	$ObjectPro = [];
	
	$stmt = $db->connection->prepare("SELECT `id`, `name`, `slug`, `keyword`, `price` FROM `".DB_PREFIX."products` WHERE `store_id` = ? AND `status` = 1 AND (`name` LIKE ? OR `keyword` LIKE ? OR `slug` LIKE ?) LIMIT 30");
	
	$name = "%$valueSearch%";
	$stmt->bind_param("isss", $storeId, $name, $name, $name);
	
	$stmt->execute();
	$result = $stmt->get_result();

	while($row_db = mysqli_fetch_object($result)){
		$arrayValue = [];
		$arrayValue['id'] = $row_db->id;
		$arrayValue['series'] = $row_db->slug;      // Mã hàng = cột slug
		$arrayValue['name'] = $row_db->name;
		$arrayValue['sku'] = $row_db->keyword;       // Mã SKU = cột keyword
		$arrayValue['price'] = $row_db->price;       // Giá sản phẩm
		array_push($ObjectPro, $arrayValue);
	}

	$stmt->close();
    
    if (count($ObjectPro) > 0) {
        $response['success'] = 1;
        $response['data'] = $ObjectPro;
    } else {
        $response['message'] = 'Không tìm thấy sản phẩm nào.';
    }
} else {
    $response['message'] = 'Vui lòng nhập từ khóa.';
}

echo json_encode($response);
exit;
?>
