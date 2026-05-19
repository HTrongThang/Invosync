<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


include_once(ROOT_PATH.'classes/dao/customers.class.php');
include_once(ROOT_PATH.'classes/dao/customergroups.class.php');
include_once(ROOT_PATH.'classes/dao/countries.class.php');
include_once(ROOT_PATH.'classes/dao/areas.class.php');
include_once(ROOT_PATH.'classes/dao/wards.class.php');
include_once(ROOT_PATH.'classes/dao/carts.class.php');
include_once(ROOT_PATH.'classes/dao/cartitems.class.php');
include_once(ROOT_PATH.'includes/functions.inc.php');

$customers = new Customers(1);
$customerGroups = new CustomerGroups(1);
$countries = new Countries(1);
$areas = new Areas(1);
$wards = new Wards(1);
$carts = new Carts(1);
$cartItems = new CartItems();

if (isset($_POST['op']) && $_POST['op'] === 'login') {

    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (!$username || !$password) {
        echo json_encode([
            "success" => false,
            "message" => "Vui lòng nhập đầy đủ thông tin"
        ]);
        exit;
    }

    $user = $customers->getObject($username, 'username');
    
    if (!$user) {
        $user = $customers->getObject($username, 'email');
    }

    if (!$user) {
        echo json_encode([
            "success" => false,"field" => "username", "message" => "Tài khoản không tồn tại"
        ]);
        exit;
    }

    if ($user->getStatus() == 0) {
        echo json_encode([
            "success" => false,
            "field" => "not_verified",   // dùng field
            "email" => $user->getEmail(), // cần cho resend
            "message" => "Tài khoản chưa xác thực email. Bạn có muốn gửi lại email xác nhận?"
        ]);
        exit;
    }

    if (!$user || !password_verify($password, $user->getPassword())) {
        echo json_encode([
            "success" => false,"field" => "password", "message" => "Sai mật khẩu"
        ]);
        exit;
    }

    // merge TRƯỚC (dùng session guest hiện tại)
    $carts->mergeCart($user->getId());

    // set session user
    $_SESSION['store_customerId'] = $user->getId();
    $_SESSION['username'] = $user->getUsername();

    // regenerate session SAU CÙNG
    session_regenerate_id(true);


    echo json_encode([
        "success" => true,
        "message" => "Đăng nhập thành công",
        "redirect" => "/"
    ]);
    exit;
}