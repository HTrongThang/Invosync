<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!defined("ROOT_PATH")) {
    define("ROOT_PATH", dirname(__FILE__) . "/");
}

include_once(ROOT_PATH . 'includes/constant.inc.php');
include_once(ROOT_PATH . 'includes/config.inc.php');
include_once(ROOT_PATH . 'classes/data/translator.class.php');
include_once(ROOT_PATH . 'includes/functions.inc.php');
include_once(ROOT_PATH . 'classes/database/mysql.class.php');
include_once(ROOT_PATH . 'classes/template/smarty.class.php');
include_once(ROOT_PATH . 'classes/http/request.class.php');
include_once(ROOT_PATH . 'classes/http/url.class.php');
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
include_once(ROOT_PATH . 'classes/dao/languages.class.php');
include_once(ROOT_PATH . 'classes/dao/menus.class.php');
include_once(ROOT_PATH . "classes/dao/searchs.class.php");
include_once(ROOT_PATH.'classes/dao/comments.class.php');
include_once(ROOT_PATH . 'classes/dao/recruitment.class.php');
include_once(ROOT_PATH . 'classes/dao/imgs.class.php');
include_once(ROOT_PATH . 'classes/dao/estores.class.php');

$db = new DB();
$comments = new Comments(1);
$recruitments = new Recruitments(1);
$imgs = new Imgs();
$estores = new EStores();
$estore = $estores->getObject(1);

$baseUrl = rtrim(PROTOCOL . DOMAIN, '/');

// Lấy danh sách email đã đăng ký nhận tin
$emails = $comments->getSubscriberEmails("status=1");
$condition = "`status` = 1 AND `parent_id` = 0 AND `date_created` >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
$newJobs = $recruitments->getObjects(1, $condition);
$customFolder = $estore->getProperty('custom_name_file_img');

if (!empty($newJobs) && !empty($emails)) {
    $subject = "Thông báo tuyển dụng mới từ Febifoods";

    $htmlBody = '<h3>Danh sách tuyển dụng mới:</h3>';

    foreach ($newJobs as $job) {

        foreach ($emails as $email) {
            $safeEmail = addslashes($email);
            $existing = $comments->getObjects(1, "`email`='$safeEmail'");

            // tạo token nếu chưa có (dùng sha1 của email + time + random)
            $token = substr(sha1($email . microtime(true) . rand()), 0, 40);

            if (!$existing) {
                $comments->addData([
                    'email'             => $email,
                    'mail_status'       => 'pending',
                    'unsubscribe_token' => $token
                ]);
            } else {
                // Nếu đã gửi xong hoặc đã hủy đăng ký, **không** set lại thành pending
                $currentStatus = isset($existing[0]->mail_status) ? $existing[0]->mail_status : '';
                if ($currentStatus === 'completed' || $currentStatus === 'unsubscribed') {
                    // bỏ qua — giữ nguyên
                    continue;
                }

                // nếu chưa có token thì gán, và set pending
                if (empty($existing[0]->unsubscribe_token)) {
                    $comments->updateData([
                        'mail_status'       => 'pending',
                        'unsubscribe_token' => $token
                    ], $existing[0]->id);
                } else {
                    $comments->updateData([
                        'mail_status' => 'pending'
                    ], $existing[0]->id);
                }
            }
        }

        $avatarUrl = $imgs->getUrlAFromId($job->getProperty('avatar'));

        $htmlBody .= '<div style="border:1px solid #ddd; padding:6px 8px; margin-bottom:8px; border-radius:5px; background:#fff; display:table; width:100%; table-layout:fixed; box-sizing:border-box; font-family:Arial, sans-serif; mso-line-height-rule:exactly; overflow:hidden;">';
        $htmlBody .= '<div style="display:table-cell; vertical-align:middle; width:60px; padding-right:8px; box-sizing:border-box;">';
        $htmlBody .= "<img src='$baseUrl/$customFolder/$avatarUrl' alt='".htmlspecialchars($job->name, ENT_QUOTES)."' style='display:block; width:60px; max-width:100%; height:auto; border-radius:5px;'>";
        $htmlBody .= '</div>';
        $htmlBody .= '<div style="display:table-cell; vertical-align:middle; padding-right:8px; box-sizing:border-box; word-wrap:break-word; word-break:break-word;">';
        $htmlBody .= "<strong style='font-size:16px; display:block; margin:0 0 4px 0; line-height:18px;'>".htmlspecialchars($job->name, ENT_QUOTES)."</strong>";
        $htmlBody .= "<span style='color:#FFB907; display:block; margin:0 0 4px 0; font-size:12px; line-height:14px;'><span style='color: black';>Kinh nghiệm: </span>".htmlspecialchars($job->experience, ENT_QUOTES)."</span>";
        $htmlBody .= "<span style='background:#e0f7e9; color:#2e7d32; padding:2px 6px; border-radius:3px; font-size:12px; margin-right:6px; display:inline-block; line-height:14px;'>".htmlspecialchars($job->income, ENT_QUOTES)."</span>";
        $htmlBody .= "<span style='background:#f0f0f0; color:#333; padding:2px 6px; border-radius:3px; font-size:12px; display:inline-block; line-height:14px;'>".htmlspecialchars($job->location, ENT_QUOTES)."</span>";
        $htmlBody .= '</div>';
        $htmlBody .= '<div style="display:table-cell; vertical-align:middle; width:130px; text-align:right; padding-left:8px; box-sizing:border-box;">';
        $htmlBody .= "<div style='display:inline-block; max-width:100%; box-sizing:border-box;'>";
        $htmlBody .= "<a href = '$baseUrl/tuyen-dung/$job->slug' target='_blank' rel='noopener noreferrer' style='text-decoration:none; background:#105B37; color:white; padding:8px 12px; border-radius:4px; font-size:16px; display:inline-block; line-height:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;'>Ứng tuyển</a>";
        $htmlBody .= '</div>';
        $htmlBody .= '</div>';
        $htmlBody .= '</div>';
    }
    $htmlBody .= '<div style="margin-top:20px;">Bạn không muốn nhận tin tuyển dụng nữa? <a href="'.$baseUrl.'/huy-dang-ky?t={{token}}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:#2e7d32; font-size:12px;">Hủy đăng ký</a></div>';

    // var_dump($htmlBody);die;

    // Lấy pending (mảng object CommentInfo)
    $emailsPending = $comments->getObjects(1, "`mail_status`='pending'");

    // chuẩn hoá lấy địa chỉ email dạng mảng chuỗi
    $toList = [];
    if (!is_array($emailsPending) && !is_object($emailsPending)) {
        $emailsPending = [];
    }
    foreach ($emailsPending as $item) {
        if (is_object($item) && !empty($item->email)) $toList[] = $item->email;
        elseif (is_array($item) && !empty($item['email'])) $toList[] = $item['email'];
    }
    $toList = array_unique(array_filter($toList));
    $toList = array_slice($toList, 0, 50);

    if (!empty($toList)) {

        // chuẩn emailsPending là array of objects (CommentInfo)
        $mapToken = [];
        foreach ($emailsPending as $item) {
            $mapToken[$item->email] = $item->unsubscribe_token ?? null;
        }

        // gửi từng recipient (tối đa 50 trong $toList)
        foreach ($toList as $recipient) {
            $token = isset($mapToken[$recipient]) ? $mapToken[$recipient] : substr(sha1($recipient . microtime(true)),0,40);
            $personalBody = str_replace('{{token}}', rawurlencode($token), $htmlBody);

            // Gửi 1 người
            $sentOne = sendMail($recipient, $subject, $personalBody);

            // cập nhật trạng thái cho recipient
            foreach ($emailsPending as $item) {
                $itemEmail = is_object($item) ? $item->email : (isset($item['email']) ? $item['email'] : null);
                $id = is_object($item) ? $item->id : (isset($item['id']) ? $item['id'] : null);
                if ($itemEmail === $recipient && $id) {

                    // Lấy danh sách job đã gửi cho email này
                    $sentBefore = !empty($current->sent_job_ids) ? explode(',', $current->sent_job_ids) : [];
                    // Lấy tất cả ID job hiện tại
                    $jobsToSendIds = array_map(function($j){ return $j->id; }, $newJobs);
                    // Gộp ID mới + ID cũ
                    $allSentIds = array_unique(array_merge($sentBefore, $jobsToSendIds));

                    if ($sentOne) {
                        $comments->updateData([
                            'mail_status'  => 'completed',
                            'mail_sent_at' => date('Y-m-d H:i:s'),
                            'sent_job_ids' => implode(',', $allSentIds),
                        ], $id);
                    } else {
                        $comments->updateData([
                            'mail_status' => 'failed'
                        ], $id);
                    }
                    break;
                }
            }
            usleep(50000);
        }

    }
}
?>
