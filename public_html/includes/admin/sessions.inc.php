<?php
/*************************************************************************
Admin Sessions manager
----------------------------------------------------------------
DeraCMS 4.0 Project
Company: Derasoft Co., Ltd                                  
Last updated: 03/06/2025
**************************************************************************/
error_reporting(9);
if (!defined( 'ROOT_PATH' )) {
	define('ROOT_PATH', dirname(__FILE__).'/');
}
#session_start();

# PHP>=7
session_start([
	'cookie_lifetime' => 43200,
	'cookie_secure' => (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https'),
	'cookie_httponly' => true
]);
# File manager
$_SESSION['KCFINDER'] = array();
$_SESSION['KCFINDER']['disabled'] = true;
$_SESSION['KCFINDER']['uploadURL'] = "/";
$_SESSION['KCFINDER']['uploadDir'] = "";
# File manager

if($op != 'invalidurl') {
	#Get Store Info
	$storeId = 0;
	if($sCode) {
		$stores = new EStores();
		$storeId = $stores->getStoreId("`subdomain`='$sCode' OR `domain`='$sCode'");
		if(!$storeId) die('Invalid store ID.');
		
		$estore = $stores->getObject($storeId);
		$template->assign('sCode',$sCode);
		if($estore) $template->assign('estore',$estore);

		# System Config (đọc từ estore properties, dùng được toàn cục trong admin)
		$_props = $estore ? $estore->getProperties() : array();
		$systemConfig = array(
			'currency'            => isset($_props['currency'])             ? $_props['currency']                  : 'VND',
			'lethanhtien'         => isset($_props['lethanhtien'])          ? (int)$_props['lethanhtien']          : 0,
			'ledongia'            => isset($_props['ledongia'])             ? (int)$_props['ledongia']             : 0,
			'lesoluong'           => isset($_props['lesoluong'])            ? (int)$_props['lesoluong']            : 0,
			'col_chietkhau'       => isset($_props['col_chietkhau'])        ? (int)$_props['col_chietkhau']        : 0,
			'col_khuyenmai'       => isset($_props['col_khuyenmai'])        ? (int)$_props['col_khuyenmai']        : 0,
			'col_ghichu'          => isset($_props['col_ghichu'])           ? (int)$_props['col_ghichu']           : 0,
			'col_hanghoadactrung' => isset($_props['col_hanghoadactrung'])  ? (int)$_props['col_hanghoadactrung']  : 0,
			'col_oto'             => isset($_props['col_oto'])              ? (int)$_props['col_oto']              : 0,
			'col_vanchuyen'       => isset($_props['col_vanchuyen'])        ? (int)$_props['col_vanchuyen']        : 0,
			'col_tmdt'            => isset($_props['col_tmdt'])             ? (int)$_props['col_tmdt']             : 0,
		);
		
		$template->assign('systemConfig', $systemConfig);
	}
	
	if(isset($_SESSION['userId']) && $_SESSION['userId']) {
		$userId = $_SESSION['userId'];
		$users = new Users($storeId);
		$trackings = new Trackings($storeId);
		$userInfo = $users->getObject($userId,'id');
		if($userInfo) {
			$_SESSION['username'] = $userInfo->getUSername();
			$template->assign('authUser',$userInfo);
			$_SESSION['storeId'] = $storeId;
			# File manager
			$_SESSION['KCFINDER']['disabled'] = false;
			$_SESSION['KCFINDER']['uploadURL'] = "/upload";
		} else {
			$_SESSION['userId'] = 0;
			$op = 'login';
		}
		
	} else {
		$_SESSION['userId'] = 0;
		$op = 'login';
		
	}
}
?>
