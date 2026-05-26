<?php

include_once(ROOT_PATH . 'classes/dao/estores.class.php');

$storeId = 1;
if(isset($_SESSION['storeId'])) {
    $storeId = $_SESSION['storeId'];
}

$estores = new EStores();
$estore = $estores->getObject($storeId);

if ($estore) {
    $array_col = $request->element('array_col');
    $array_notcol = $request->element('array_notcol');

    $properties = $estore->getProperties();

    if (!empty($array_col) && is_array($array_col)) {
        foreach ($array_col as $col) {
            $properties[$col] = 1;
        }
    }

    if (!empty($array_notcol) && is_array($array_notcol)) {
        foreach ($array_notcol as $col) {
            $properties[$col] = 0;
        }
    }

    $estores->updateData(array('properties' => serialize($properties)), $storeId);
    $estore->setProperties($properties);

    $debugLog = "Saved storeId: $storeId\narray_col: " . print_r($array_col, true) . "\narray_notcol: " . print_r($array_notcol, true) . "\nprops: " . print_r($properties, true);
    file_put_contents(ROOT_PATH . 'debug.txt', $debugLog);

    echo "success";
} else {
    file_put_contents(ROOT_PATH . 'debug.txt', "Error: estore not found for storeId: $storeId");
    echo "error";
}
?>
