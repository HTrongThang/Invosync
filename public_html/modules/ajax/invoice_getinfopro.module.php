<?php
if(!defined('ROOT_PATH')) die('Error!');
header('Content-Type: application/json; charset=utf-8');

include_once(ROOT_PATH.'classes/dao/products.class.php');

$storeId = isset($_SESSION['storeId']) ? $_SESSION['storeId'] : (isset($storeId) ? $storeId : 1);
$products = new Products($storeId);

$idPro = $request->element('idPro');

$response = array('success' => 0, 'message' => '');

if($idPro) {
    // We query the database directly to ensure we get all fields including series and sku
    $stmt = $db->connection->prepare("SELECT * FROM `".DB_PREFIX."products` WHERE `id` = ? AND `store_id` = ? LIMIT 1");
    $stmt->bind_param("ii", $idPro, $storeId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($row = mysqli_fetch_object($result)) {
        $properties = $row->properties ? unserialize($row->properties) : array();
        
        $response['success'] = 1;
        $response['proSkuCode'] = $row->keyword;          // Mã SKU = cột keyword
        $response['proCode'] = $row->slug;                 // Mã hàng/Series = cột slug
        $response['id_pro'] = $row->id;
        $response['proName'] = $row->name;
        $response['proPrice'] = $row->price;               // Giá = cột price (trực tiếp)
        
        // Lấy tên đơn vị từ bảng dc_units dựa trên unit_id trong properties
        $unitName = '';
        if (isset($properties['unit_id']) && $properties['unit_id']) {
            $unitId = $properties['unit_id'];
            $stmtUnit = $db->connection->prepare("SELECT `name` FROM `".DB_PREFIX."units` WHERE `id` = ? LIMIT 1");
            $stmtUnit->bind_param("i", $unitId);
            $stmtUnit->execute();
            $unitResult = $stmtUnit->get_result();
            if ($unitRow = mysqli_fetch_object($unitResult)) {
                $unitName = $unitRow->name;
            }
            $stmtUnit->close();
        }
        $response['nameUnit'] = $unitName;
        $response['unitId'] = isset($properties['unit_id']) ? $properties['unit_id'] : '';
        
        // Extra fields
        $response['proIdWarehouse'] = isset($properties['warehouse_id']) ? $properties['warehouse_id'] : '';
        $response['proIdParcel'] = isset($properties['solo']) ? $properties['solo'] : '';
        $response['proDateExpiry'] = $row->expiration_date; // Hạn sử dụng = cột trực tiếp
        $response['proIdGroup'] = isset($properties['nhomhang']) ? $properties['nhomhang'] : '';
        $response['proIdProductType'] = isset($properties['product_type_id']) ? $properties['product_type_id'] : '';
        $response['proNote'] = $row->description;
    } else {
        $response['message'] = 'Không tìm thấy sản phẩm.';
    }
    $stmt->close();
} else {
    $response['message'] = 'ID sản phẩm không hợp lệ.';
}

echo json_encode($response);
exit;
?>
