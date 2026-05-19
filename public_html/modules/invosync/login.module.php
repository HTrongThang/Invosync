<?php
/*************************************************************************
 * Module Đăng nhập (Login module)
 * ----------------------------------------------------------------
 * Derasoft CMS Project
 * Công ty: Derasoft Co., Ltd
 * Email: info@derasoft.com
 * Cập nhật lần cuối: 02/07/2008 (Đã tối ưu & Bảo mật lại năm 2026)
 **************************************************************************/

include_once(ROOT_PATH . 'classes/dao/users.class.php');
include_once(ROOT_PATH . 'classes/security/checklogin.class.php');

$template->assign('storeId', $storeId);
$pageTitle = "Đăng nhập";		
$template->assign('pageTitle', $pageTitle);
$template->assign('currentYear', date('Y'));
$crpg = getCurrentPage();
$currentUrlx = getCurrentURlLg($crpg, '/');

if (isset($currentUrlx) && $currentUrlx != '') {
    $_SESSION['redirectLink'] =  $currentUrlx;
} else {
    $_SESSION['redirectLink'] =  "/index.html";
}
$template->assign("redirectLink", $_SESSION['redirectLink']);

if (isset($_GET['order_id'])) {
    $_SESSION['order_id_for_invoice'] = intval($_GET['order_id']); 
}

$estore = $stores->getObject($storeId);
if ($estore) {
    $logo = $estore->getProperty('logo_company');
    $background = $estore->getProperty('background_company');
    if ($background == '') $background = '/upload/images/invoicebgr.jpg'; 
    
    $template->assign('logo', $logo);
    $template->assign('background', $background);

}

// KIỂM TRA SESSION ĐĂNG NHẬP CŨ: Nếu người dùng đã đăng nhập trước đó rồi
if (isset($_SESSION['userId']) && $_SESSION['userId'] != 0) {
    if (!isset($users)) $users = new Users($storeId); 
    
    $userIdC = $users->getObject($_SESSION['userId']);
    if ($userIdC) {
        $real = $userIdC->getRealEmployee();

        // Nếu là nhân viên chính thức (real == 1) thì cho thẳng vào trang chủ
        if ($real == 1) {
            header("location: /index.html");
            exit; 
        } else {
            // Nếu tài khoản chưa đổi mật khẩu hoặc chưa hợp lệ, yêu cầu đổi mật khẩu
            $templateFile = 'login.tpl.html';
            $template->assign("error_doimk", "Vui lòng đổi mật khẩu để có thể đăng nhập vào phần mềm!");
        }
    }
} else {
    // Nếu chưa đăng nhập thì hiển thị file giao diện đăng nhập
    $templateFile = 'login.tpl.html';
}

$template->assign('userTemplate', $userTemplate);
$error = '';
$site = $request->element("site"); 
if (!$site) $site = '';

if ($_POST) {
    # Kiểm tra và làm sạch dữ liệu đầu vào (Validation)
    $validate = validateData($request);

    if ($validate['invalid']) { 
        unset($_SESSION['userId']); 
        unset($_SESSION['customerId']);
        $template->assign('error', $validate);
    } else {
        $username = Filter($request->element('username'));
        $password = Filter($request->element('password')); 
        
        $users = new Users($storeId);
        $preUserId = $users->getUserId("username='$username'"); // Tìm ID của user dựa vào username
		

        $checkLogin = new CheckLogin();
        $failLoginInfo = $checkLogin->getFailLoginInfo($preUserId); // Lấy lịch sử những lần đăng nhập sai
        
		
        // BẢO MẬT: Chống lỗi Open Redirect (Không cho phép chuyển hướng sang website lạ nguy hiểm)
        $rawRedirect = $request->element("redirectLink");
        if (!empty($rawRedirect) && strpos($rawRedirect, '/') === 0 && strpos($rawRedirect, '//') !== 0) {
            $redirectLinkpost = $rawRedirect; 
        } else {
            $redirectLinkpost = '/index.html'; 
        }

        // KIỂM TRA KHÓA TÀI KHOẢN: Nếu đăng nhập sai quá số lần quy định trong thời gian giới hạn
        if ($failLoginInfo && $failLoginInfo['fail_times'] >= MAX_FAIL_TIMES && $failLoginInfo['last_try'] >= date("Y-m-d H:i:s", time() - MAX_GRACE_TIME * 60)) { 
            unset($_SESSION['userId']);
            
            $validate['message'][] = $amessages['your_account_has_been_blocked'];
            $template->assign('error', $validate);

            // Ghi lại nhật ký hệ thống (Tracking) việc tài khoản bị khóa do nhập sai quá nhiều lần
            $trackings = new Trackings($storeId);
            $trackings->addData(array('store_id' => $storeId, 'username' => $username, 'action' => $amessages['tracking']['lock_too_many_fail_logins'], 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));
        } else { 
            // TIẾN HÀNH XÁC THỰC: Kiểm tra username và password trong Database
            $userId = $users->authenticateUser($username, $password);

            if ($userId > 0) { 
                // TRƯỜNG HỢP 1: ĐĂNG NHẬP THÀNH CÔNG
                session_regenerate_id(true); // Làm mới Session ID để chống tấn công Session Hijacking
                $_SESSION['userId'] = $userId; // Lưu ID người dùng vào Session
                
                // Cấu hình thời gian lưu thông tin User (mặc định là 30 ngày nếu không thiết lập)
                $dateSaveUser = $estore->getProperty('saveuser');
                if (!isset($dateSaveUser) || $dateSaveUser < 1) {
                    $dateSaveUser = 30;
                }
                
                // Lưu danh sách ID người dùng đã đăng nhập vào Cookie trình duyệt để tiện chuyển đổi tài khoản nhanh
                if (!isset($_COOKIE['listUserChange']) || !is_array($_COOKIE['listUserChange'])) {
                    setcookie("listUserChange[" . $userId . "]", $userId, time() + (86400 * $dateSaveUser), '/');
                } else {
                    if (!in_array($userId, $_COOKIE['listUserChange'])) {
                        setcookie("listUserChange[" . $userId . "]", $userId, time() + (86400 * $dateSaveUser), '/');
                    }
                }
                
                // Ghi nhật ký hệ thống: Đăng nhập thành công
                $trackings = new Trackings($storeId);
                $trackings->addData(array('store_id' => $storeId, 'username' => $username, 'action' => $amessages['tracking']['login_ok'], 'date_created' => date("Y-m-d H:i:s"), 'ip' => $_SERVER['REMOTE_ADDR']));

                if ($site == 'admin') {
                    $userIdC = $users->getObject($_SESSION['userId']);
                    $real = $userIdC->getRealEmployee();
                    
                    if ($real == 1) {
                        header("location: " . $redirectLinkpost); // Vào trang quản trị
                        exit; 
                    } else {
                        // Bắt buộc đổi mật khẩu nếu chưa phải nhân viên chính thức hợp lệ
                        $templateFile = 'login.tpl.html';
                        $template->assign("error_doimk", "Vui lòng đổi mật khẩu để có thể đăng nhập vào phần mềm!");
                    }
                } else {
                    // Nếu ở ngoài trang chủ/tên miền riêng thì chuyển về trang chính của domain đó
                    global $customDomain; 
                    $url = (!empty($customDomain)) ? PROTOCOL . $customDomain : '/';
                    header('location: ' . $url);
                    exit; 
                }
            } else { 
                // TRƯỜNG HỢP 2: ĐĂNG NHẬP THẤT BẠI
                if ($userId == -1) {    
                    // Tài khoản bị vô hiệu hóa chủ động từ phía Admin
                    unset($_SESSION['userId']);
                    $validate['message'][] = $amessages['your_account_has_been_disabled'];
                } else {
                    // Nhập sai Tên đăng nhập hoặc Mật khẩu
                    $fail = 0;
                    $failUid = $users->getUserId("username='$username'");
                    
                    if ($failUid) { 
                        // Cập nhật hoặc thêm mới số lần đăng nhập sai vào bảng theo dõi `checklogin`
                        $failLoginInfo = $checkLogin->getFailLoginInfo($failUid);
                        if ($failLoginInfo) { 
                            // Nếu lần thử lại trước đó đã quá thời gian block tạm thời, reset số lần sai về 1, ngược lại tăng thêm 1
                            if ($failLoginInfo['last_try'] < date("Y-m-d H:i:s", time() - MAX_GRACE_TIME * 60))
                                $fail = 1;
                            else
                                $fail = $failLoginInfo['fail_times'] + 1;
                                
                            $checkLogin->updateData(array('uid' => $failUid, 'fail_times' => $fail, 'last_try' => date('Y-m-d H:i:s'), 'last_ip' => $_SERVER['REMOTE_ADDR']), $failLoginInfo['id']);
                        } else { 
                            // Lần đầu tiên đăng nhập sai
                            $fail = 1;
                            $checkLogin->addData(array('uid' => $failUid, 'fail_times' => $fail, 'last_try' => date('Y-m-d H:i:s'), 'last_ip' => $_SERVER['REMOTE_ADDR']));
                        }
                    }
                    unset($_SESSION['userId']);
                    $validate['message'][] = $amessages['invalid_user_password']; // Thông báo sai tài khoản/mật khẩu
                    if ($fail) $validate['message'][] = sprintf($amessages['fail_login_times'], $fail); // Thông báo số lần đã sai
                }
            }
            $template->assign('error', $validate);
        }
    }
} else {
    $template->assign('error', $error);
}

/**
 * Hàm kiểm tra và hợp lệ hóa dữ liệu form đăng nhập (Username & Password)
 */
function validateData($request)
{
    global $amessages;
    include_once(ROOT_PATH . 'classes/data/validate.class.php');
    $error = array();
    $validate = new Validate();
    
    // Gọi hàm kiểm tra độ hợp lệ của username và password từ class Validate
    $error['INPUT']['username'] = $validate->validUsername(Filter($request->element('username')));
    $error['INPUT']['password'] = $validate->validPassword(Filter($request->element('password')));

    // Giữ lại Tên đăng nhập đã điền trên form HTML để người dùng đỡ phải gõ lại nếu chỉ nhập sai mật khẩu
    if (!isset($error['INPUT']['username']['value'])) {
        $error['INPUT']['username']['value'] = Filter($request->element('username'));
    }

    // Nếu một trong hai trường có lỗi định dạng, đánh dấu toàn bộ form là không hợp lệ (invalid = 1)
    if ($error['INPUT']['username']['error'] || $error['INPUT']['password']['error']) {
        $error['invalid'] = 1;
        return $error;
    }
    $error['invalid'] = 0;
    return $error;
}
?>