<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include_once(ROOT_PATH.'classes/dao/customers.class.php');
include_once(ROOT_PATH.'classes/dao/customergroups.class.php');
include_once(ROOT_PATH.'classes/dao/countries.class.php');
include_once(ROOT_PATH.'classes/dao/areas.class.php');
include_once(ROOT_PATH.'classes/dao/wards.class.php');
include_once(ROOT_PATH.'includes/functions.inc.php');

$customers = new Customers(1);
$customerGroups = new CustomerGroups(1);
$countries = new Countries(1);
$areas = new Areas(1);
$wards = new Wards(1);

if (isset($_POST['op']) && $_POST['op'] === 'register') {

    // ===== CSRF =====
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
        echo json_encode([
            "success" => false,
            "field" => "form",
            "message" => "CSRF không hợp lệ"
        ]);
        exit;
    }

    // ===== DATA =====
    $username = strtolower(trim($_POST['username'] ?? ''));
    $password = trim($_POST['password'] ?? '');
    $confirmPassword = trim($_POST['confirmPassword'] ?? '');
    $email = strtolower(trim($_POST['email'] ?? ''));
    $phone = trim($_POST['phone'] ?? '');
    $agree = $_POST['agree'] ?? '';

    // ===== VALIDATE =====
    if (!$username && !$password && !$email && !$phone && !$confirmPassword) {
        echo json_encode(["success" => false,"field" => "form", "message" => "Vui lòng nhập đầy đủ thông tin"]);
        exit;
    }

    if (!$username) {
    echo json_encode(["success" => false,"field" => "username", "message" => "Tên tài khoản không được để trống"]);
    exit;
    }

    if (!$password) {
        echo json_encode(["success" => false,"field" => "password", "message" => "Mật khẩu không được để trống"]);
        exit;
    }

    if (!$email) {
        echo json_encode(["success" => false,"field" => "email", "message" => "Email không được để trống"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false,"field" => "email", "message" => "Email không hợp lệ"]);
        exit;
    }

    if (strlen($username) < 6) {
        echo json_encode(["success" => false,"field" => "username", "message" => "Tài khoản tối thiểu 6 ký tự"]);
        exit;
    }

    if (strlen($username) > 50) {
        echo json_encode(["success" => false,"field" => "username", "message" => "Tài khoản quá dài"]);
        exit;
    }

    if (!preg_match('/^[a-z0-9._]+$/', $username)) {
        echo json_encode(["success" => false,"field" => "username", "message" => "Tài khoản không dấu, không khoảng trắng"]);
        exit;
    }

    if (!preg_match('/^[a-z0-9](?:[a-z0-9._]*[a-z0-9])?$/', $username)) {
        echo json_encode(["success" => false,"field" => "username", "message" => "Tài khoản không hợp lệ"]);
        exit;
    }

    if (strlen($password) < 8) {
        echo json_encode(["success" => false,"field" => "password", "message" => "Mật khẩu tối thiểu 8 ký tự"]);
        exit;
    }

    if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d).{8,}$/', $password)) {
        echo json_encode(["success" => false,"field" => "password", "message" => "Password phải có chữ và số"]);
        exit;
    }

    if (!$confirmPassword) {
        echo json_encode(["success" => false,"field" => "confirmPassword", "message" => "Nhập xác nhận mật khẩu"]);
        exit;
    }

    if ($password != $confirmPassword) {
        echo json_encode(["success" => false,"field" => "confirmPassword", "message" => "Mật khẩu không khớp"]);
        exit;
    }

    if ($customers->checkDuplicate($username, 'username')) {
        echo json_encode(["success" => false,"field" => "username", "message" => "Tài khoản đã tồn tại"]);
        exit;
    }

    // if ($customers->checkDuplicate($email, 'email')) {
    //     echo json_encode(["success" => false,"field" => "email", "message" => "Email đã tồn tại"]);
    //     exit;
    // }

    $user = $customers->getObject($email, 'email');

    if ($user) {

        if (!$user->getStatus()) {

            $token = bin2hex(random_bytes(32));

            $customers->updateData(
                [
                    "verify_token" => $token,
                    "verify_expired_at" => date("Y-m-d H:i:s", strtotime("+1 day"))
                ],
                $user->getId()
            );

            $link = "https://" . DOMAIN . "/verify-user?token=" . $token;

            $subject = "Xác nhận tài khoản";
            $html = "
                <p>Xin chào {$user->getUsername()},</p>
                <p>Tài khoản của bạn chưa được xác nhận.</p>
                <p><a href='{$link}'>Click để xác nhận tài khoản</a></p>
            ";

            sendMail($email, $subject, $html, 'Digitrust');

            echo json_encode(["success" => false, "field" => "email", "message" => "Email đã đăng ký nhưng chưa xác thực. Chúng tôi đã gửi lại email."]); exit;
        }

        echo json_encode(["success" => false, "field" => "email", "message" => "Email đã tồn tại"]);
        exit;
    }

    if (strlen($email) > 255) {
        echo json_encode(["success" => false,"field" => "email", "message" => "Email quá dài"]);
        exit;
    }

    if (strlen($email) < 6) {
        echo json_encode(["success" => false,"field" => "email", "message" => "Email tối thiểu 6 ký tự"]);
        exit;
    }

    if (!$phone) {
        echo json_encode(["success" => false, "field" => "phone", "message" => "Số điện thoại không được để trống"]);
        exit;
    }

    if ($phone && strlen($phone) < 10) {
        echo json_encode(["success" => false,"field" => "phone", "message" => "Số điện thoại tối thiểu 10 ký tự"]);
        exit;
    }

    if ($phone && strlen($phone) > 11) {
        echo json_encode(["success" => false,"field" => "phone", "message" => "Số điện thoại quá dài"]);
        exit;
    }

    if (!preg_match('/^(0|\+84)[0-9]{9}$/', $phone)) {
        echo json_encode(["success" => false, "field" => "phone", "message" => "Số điện thoại không hợp lệ"]);
        exit;
    }

    if (!$agree) {
        echo json_encode(["success" => false, "field" => "agree", "message" => "Bạn phải đồng ý với điều khoản"]);
        exit;
    }

    // ===== reCAPTCHA =====
    $recaptchaSecret = "YwsAAAAAGpg4AGtDNaLGeo499Xaxa3edVZl";
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    if (!$recaptchaResponse) {
        echo json_encode(["success" => false,"field" => "recaptcha", "message" => "Vui lòng xác nhận RECAPTCHA"]);
        exit;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'secret' => $recaptchaSecret,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $verify = curl_exec($ch);
    curl_close($ch);

    $responseData = json_decode($verify);

    if (!$responseData || !$responseData->success) {
        echo json_encode([
            "success" => false,
            "field" => "recaptcha",
            "message" => "Captcha không hợp lệ",
        ]);
        exit;
    }
    

    // ===== INSERT =====

    $token = bin2hex(random_bytes(32));

    $fields = [
        "username" => $username,
        "password" => password_hash($password, PASSWORD_DEFAULT),
        "email" => $email,
        "tel" => $phone,
        "status" => 0,
        "verify_token" => $token,
        "verify_expired_at" => date("Y-m-d H:i:s", strtotime("+1 day")),
        "store_id" => 1,
        "date_created" => date("Y-m-d H:i:s")
    ];

    $customerId = $customers->addData($fields);

    if ($customerId) {
        $link = "https://" . DOMAIN . "/verify-user?token=" . $token;

            $subject = "Xác nhận tài khoản";
            $html = "
                <p>Xin chào {$username},</p>
                <p>Bạn đã tạo mới tài khoản.</p>
                <p><a href='{$link}'>Đây là đường dẫn xác nhận tài khoản</a></p>
            ";
            // var_dump($html);die;

            sendMail($email, $subject, $html, 'Digitrust');
    }

    if ($customerId) {
        echo json_encode([
            "success" => true,
            // "message" => "Đăng ký thành công, vui lòng đăng nhập",
            "redirect" => "/dang-nhap"
        ]);
        exit;
    }

    echo json_encode([
        "success" => false,
        "message" => "Đăng ký thất bại"
    ]);
    exit;
}