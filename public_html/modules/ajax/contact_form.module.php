<?php

// ===== Chỉ trả JSON =====
ini_set('display_errors', 0);
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

$response = ['success' => false, 'message' => ''];

include_once(ROOT_PATH . 'classes/dao/contacts.class.php');
$contacts = new Contacts(1);

// ===== Lấy dữ liệu =====
$name            = trim($request->element('name', ''));
$email           = trim($request->element('email', ''));
$phone_number    = trim($request->element('phone_number', ''));
$company_name    = trim($request->element('company_name', ''));
$type_of_service = trim($request->element('type_of_service', ''));
$expected_budget = trim($request->element('expected_budget', ''));
$description     = trim($request->element('description', ''));
$recaptcha       = $request->element('g-recaptcha-response', '');

// ===== Validate reCAPTCHA tồn tại =====
if (!$recaptcha) {
    $response['message'] = 'Vui lòng xác nhận bạn không phải robot.';
    echo json_encode($response);
    exit;
}

// ===== Verify với Google =====
$secretKey = "6Lfcw3wsAAAAAIn3k2myXVOUk8QmpNACEHdcCE_B";
$verifyURL = "https://www.google.com/recaptcha/api/siteverify";

$postData = http_build_query([
    'secret'   => $secretKey,
    'response' => $recaptcha,
    'remoteip' => $_SERVER['REMOTE_ADDR']
]);

$opts = [
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'content' => $postData
    ]
];

$context = stream_context_create($opts);
$result  = @file_get_contents($verifyURL, false, $context);
$captchaSuccess = json_decode($result, true);


if (!empty($captchaSuccess['success'])) {
    // ===== Validate enum dịch vụ =====
    $allowedServices = [
        'Tư vấn dịch vụ',
        'SSL Certificates',
        'Cloud Server',
        'Email doanh nghiệp',
        'Khác'
    ];
    
    if (!in_array($type_of_service, $allowedServices)) {
        $response['message'] = 'Loại dịch vụ không hợp lệ.';
        echo json_encode($response);
        exit;
    }
    
    // ===== Validate bắt buộc =====
    if (!$name || !$phone_number || !$type_of_service || !$expected_budget || !$description) {
        $response['message'] = 'Thiếu thông tin bắt buộc.';
        echo json_encode($response);
        exit;
    }
    
    // ===== Chuẩn bị dữ liệu insert =====
    $data = [
        'name'            => $name,
        'email'           => $email ?: null,
        'phone_number'    => $phone_number,
        'company_name'    => $company_name ?: null,
        'type_of_service' => $type_of_service,
        'expected_budget' => $expected_budget,
        'description'     => $description,
        'status'          => 0,
    ];
    
    // ===== Insert DB =====
    $ok = $contacts->addData($data);
    
    if ($ok) {
        $response['success'] = true;
        $response['message'] = 'Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.';
    } else {
        $response['message'] = 'Không thể lưu dữ liệu vào hệ thống.';
    }
    
    echo json_encode($response);
    exit;
} else {
    $response['message'] = 'Xác minh reCAPTCHA thất bại.';
    echo json_encode($response);
    exit;
}
