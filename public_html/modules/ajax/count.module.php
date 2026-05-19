
<?php

include_once(ROOT_PATH . 'classes/dao/trackingicons.class.php');
$trackingIcons = new TrackingIcons(1);

$type = $request->element('type');
#
if ($type == 'tel') {
    $action = 'tel';
}
if ($type == 'map') {
    $action = 'map';
}
if ($type == 'mess') {
    $action = 'mess';
}
if ($type == 'zalo') {
    $action = 'zalo';
}
if ($type == 'fanpage') {
    $action = 'fanpage';
}
if ($type == 'google') {
    $action = 'google';
}
if ($type == 'tiktok') {
    $action = 'tiktok';
}
if ($type == 'youtube') {
    $action = 'youtube';
}
# End change by Thai Nguyen
$new = $trackingIcons->addData(array('store_id' => 1, 'username' => 'user', 'action' => $action, 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));

$result = array("erron" => $new);
echo json_encode($result);
