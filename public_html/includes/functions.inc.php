<?php

/*************************************************************************
User Functions
----------------------------------------------------------------
BiDo.vn Project
Company: Derasoft Co., Ltd                                  
Email: info@derasoft.com                                    
Last updated: 07/11/2010
Coder: Mai Minh (http://maiminh.vnweblogs.com)
 **************************************************************************/
function LoadHtml(){
	return 132;
}
function LinkPager($url, $pages = 1, $page = 1, $bound = 5, $img_path = '/images/')
{
	$pager = array();
	$start = $page - $bound;
	if ($start < 1) $start = 1;
	$end = $page + $bound;
	if ($end > $pages) $end = $pages;
	$pager[] = array('name' => '<img src="' . $img_path . 'ico_first.gif" alt="first" >', 'url' => sprintf($url, 1), 'current' => 0);
	if ($page == 1) $pager[] = array('name' => '<img src="' . $img_path . 'ico_prev.gif" alt="previous">', 'url' => sprintf($url, $page), 'current' => 0);
	else  $pager[] = array('name' => '<img src="' . $img_path . 'ico_prev.gif" alt="previous">', 'url' => sprintf($url, $page - 1), 'current' => 0);
	for ($i = $start; $i <= $end; $i++) {
		$current = 0;
		if ($i == $page) $current = 1;
		$pager[] = array('name' => $i, 'url' => sprintf($url, $i), 'current' => $current);
	}
	if ($page == $end) $pager[] = array('name' => '<img src="' . $img_path . 'ico_next.gif" alt="next" >', 'url' => sprintf($url, $page), 'current' => 0);
	else $pager[] = array('name' => '<img src="' . $img_path . 'ico_next.gif" alt="next" >', 'url' => sprintf($url, $page + 1), 'current' => 0);
	$pager[] = array('name' => '<img src="' . $img_path . 'ico_last.gif" alt="last" >', 'url' => sprintf($url, $pages), 'current' => 0);
	return $pager;
}
/// Link Page Kissparfum
function LinkPage($url, $pages = 1, $page = 1, $bound = 5, $img_path = '/images/')
{
	$pager = array();
	$start = $page - $bound;
	if ($start < 1) $start = 1;
	$end = $page + $bound;
	if ($end > $pages) $end = $pages;
	if ($page == 1) $pager[] = array('name' => 'Trở lại', 'url' => sprintf($url, $page), 'current' => 0);
	else  $pager[] = array('name' => 'Trở lại', 'url' => sprintf($url, $page - 1), 'current' => 0);
	for ($i = $start; $i <= $end; $i++) {
		$current = 0;
		if ($i == $page) $current = 1;
		$pager[] = array('name' => $i, 'url' => sprintf($url, $i), 'current' => $current);
	}
	$pager[] = array('name' => '...', 'url' => sprintf($url, '#'), 'current' => 0);
	if ($page == $end) $pager[] = array('name' => 'Xem tiếp', 'url' => sprintf($url, $page), 'current' => 0);
	else $pager[] = array('name' => 'Xem tiếp', 'url' => sprintf($url, $page + 1), 'current' => 0);
	return $pager;
}
function getCurrentUrlNoLang($url, $fromletter) {
    if (!$url) return "/";

    $path = parse_url($url, PHP_URL_PATH);

    return $path ? ltrim($path, '/') : '';
}
function getCurrentPage() {
    $pageURL = 'http';
    //if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } else {
        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}
function getCurrentURlLg($url) {
	if($url){
		$pageURL=strstr($url, "/", false);
		$result=substr($pageURL,22);
	}
	 return $result;
 }
//Function to remove HTML tags, Javascript,...
function Filter($sstring)
{
	$search = array(
		"'<'",  // Strip out javascript
		"'>'",
		"'\"'",
		"'\''",
		"'[\/\!]*?[^<>]*?>'si",  // Strip out html tags
		"'([\r\n])[\s]+'",  // Strip out white space
		"'&(quot|#34);'i",  // Replace html entities
		"'&(amp|#38);'i",
		"'&(lt|#60);'i",
		"'&(gt|#62);'i",
		"'&(nbsp|#160);'i",
		"'&(iexcl|#161);'i",
		"'&(cent|#162);'i",
		"'&(pound|#163);'i",
		"'&(copy|#169);'i",
		"'&#(\d+);'e"
	);  // evaluate as php
	$replace = array(
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		""
	);
	$text = preg_replace($search, $replace, $sstring);
	$data = explode("\\", $text);
	$cleaned = implode("", $data);
	return $cleaned;
}
function checkError($validate)
{
	foreach ($validate as $check) {
		if ($check != NULL)
			return 1;
	}
	return 0;
}
function read_local_file($filename, $mode = "r")
{
	# Read content of a file and return a string
	$file = fopen($filename, $mode);
	if (!$file) {
		return "";
	}
	$content = fread($file, filesize($filename));
	fclose($file);
	return $content;
}

function write_local_file($filename, $content, $mode = "w")
{
	# Write a string to a file
	$file = fopen($filename, $mode);
	if (!$file) {
		return 0;
	}
	fwrite($file, $content);
	fclose($file);
	return 1;
}

function createComboFromSql($sql, $db, $value = '')
{
	$result = mysqli_query($sql);
	$str = '';
	while ($row = mysqli_fetch_array($result)) {
		$str .= "<option value=\"" . $row['id'] . "\"" . ($row['id'] == $value ? " selected" : "") . ">" . $row['name'] . "</option>
";
	}
	mysqli_free_result($result);
	return $str;
}

function optionSizeColor($value = '', $where = '(1=1)')
{
	global $db;
	$sql = "SELECT concat( size, \" / \", color ) AS `id`,concat( size, \" / \", color ) AS `name` FROM `n_product_size_color` WHERE $where";
	return createComboFromSql($sql, $db, $value);
}

function optionProvinces($value = '', $lang = 'vn', $where = '(1=1)')
{
	global $db;
	$sql = "SELECT id,vn_name AS `name` FROM `n_provinces` WHERE $where ORDER BY position";
	return createComboFromSql($sql, $db, $value);
}

function getProvinceName($id = 0)
{
	global $db;
	$sql = "SELECT vn_name AS `name` FROM `n_provinces` WHERE id='$id'";
	$result = $db->query($sql);
	if (mysqli_num_rows($result)) {
		$row = mysqli_fetch_row($result);
		mysqli_free_result($result);
		return $row[0];
	}
	return "";
}

function sendSMS($phone, $message = '')
{
	$user = "derasoft";
	$password = "rdt6ca";
	$api_id = "3160455";
	$from = "84918178278";
	$baseurl = "http://api.clickatell.com";
	$text = urlencode("$message");
	$to = "$phone";
	// auth call
	$url = "$baseurl/http/auth?user=$user&password=$password&api_id=$api_id";
	// do auth call
	$ret = file($url);
	// split our response. return string is on first line of the data returned
	$sess = split(":", $ret[0]);
	if ($sess[0] == "OK") {
		$sess_id = trim($sess[1]); // remove any whitespace
		$url = "$baseurl/http/sendmsg?session_id=$sess_id&to=$to&text=$text&from=$from";
		// do sendmsg call
		$ret = file($url);
		#		echo $ret[0].'---';
		$send = split(":", $ret[0]);
		if ($send[0] == "ID") return $send[1]; #echo "success message ID: ". $send[1];
		else return 0; #echo "send message failed";
	} else {
		#		echo 'failed';
		return 0; #echo "Authentication failure: ". $ret[0];
		exit();
	}
}

function cleanText($string)
{
	#By Mai Minh for Vietnamese
	$string = utf8_encode($string);
	$string = str_replace(array("Ã", "Ã€", "áº¢", "Ãƒ", "áº ", "Ã‚", "áº¤", "áº¦", "áº¨", "áºª", "áº¬", "Ä‚", "áº®", "áº°", "áº²", "áº´", "áº¶", "Ã¡", "Ã ", "áº£", "Ã£", "áº¡", "Ã¢", "áº¥", "áº§", "áº©", "áº«", "áº­", "Äƒ", "áº¯", "áº±", "áº³", "áºµ", "áº·"), "a", $string);
	$string = str_replace(array("Ä", "Ä‘",), "d", $string);
	$string = str_replace(array("Ã‰", "Ãˆ", "áºº", "áº¼", "áº¸", "ÃŠ", "áº¾", "á»€", "á»‚", "á»„", "á»†", "Ã©", "Ã¨", "áº»", "áº½", "áº¹", "Ãª", "áº¿", "á»", "á»ƒ", "á»…", "á»‡"), "e", $string);
	$string = str_replace(array("Ã", "ÃŒ", "á»ˆ", "Ä¨", "á»Š", "Ã­", "Ã¬", "á»‰", "Ä©", "á»‹"), "i", $string);
	$string = str_replace(array("Ã“", "Ã’", "á»Ž", "Ã•", "á»Œ", "Ã”", "á»", "á»’", "á»”", "á»–", "á»˜", "Æ ", "á»š", "á»œ", "á»ž", "á» ", "á»¢", "Ã³", "Ã²", "á»", "Ãµ", "á»", "Ã´", "á»‘", "á»“", "á»•", "á»—", "á»™", "Æ¡", "á»›", "á»", "á»Ÿ", "á»¡", "á»£"), "o", $string);
	$string = str_replace(array("Ãš", "Ã™", "á»¦", "Å¨", "á»¤", "Æ¯", "á»¨", "á»ª", "á»¬", "á»®", "á»°", "Ãº", "Ã¹", "á»§", "Å©", "á»¥", "Æ°", "á»©", "á»«", "á»­", "á»¯", "á»±"), "u", $string);
	$string = str_replace(array("Ã", "á»²", "á»¶", "á»¸", "á»´", "Ã½", "á»³", "á»·", "á»¹", "á»µ"), "y", $string);
	// replace some characters to similar ones
	$search  = array(
		'ä', 'ö', 'ü', 'é', 'è', 'à', 'ç', 'à', 'è', 'ì',
		'ò', 'ù', 'á', 'é', 'í', 'ó', 'ú', 'ë', 'ï'
	);
	$replace = array(
		'a', 'o', 'u', 'e', 'e', 'a', 'c', 'a', 'e', 'i',
		'o', 'u', 'a', 'e', 'i', 'o', 'u', 'e', 'i'
	);
	$string = str_replace($search, $replace, $string);
	return $string;
}

function userLog($store_id = 0, $uid = 0, $username = '', $type = 0, $page = "")
{
	global $db, $sessId;
	$ip = $_SERVER['REMOTE_ADDR'];
	$time = date("Y-m-d H:i:s");
	#echo $sessId;

	$sql = "SELECT * FROM " . DB_PREFIX . "estore_online_users WHERE `store_id` = '$store_id' AND `sid`='$sessId'";
	$result = $db->query($sql);
	if (mysqli_num_rows($result)) { #Dang dang nhap
		$db->query("UPDATE " . DB_PREFIX . "estore_online_users SET username='$username',sid='$sessId',uid='$uid',usertype='$type',ip='$ip',last_updated='$time',last_page='$page' WHERE sid='$sessId'");
	} else {
		$db->query("INSERT INTO " . DB_PREFIX . "estore_online_users (id,store_id,sid,uid,username,usertype,ip,last_updated,last_page) VALUES (NULL,'$store_id','$sessId','$uid','$username','$type','$ip','$time','$page')");
	}
	return 1;
}

function clearUserLog($store_id = 0, $uid = 0, $type = 0, $ip = '')
{
	global $db;
	$sql = "DELETE FROM " . DB_PREFIX . "estore_online_users WHERE store_id = '$store_id' AND uid='$uid' AND usertype='$type' AND ip='$ip'";
	$result = $db->query($sql);
	return 1;
}

function isUserOnline($store_id = 0, $uid = 0, $type = 0)
{
	global $db;
	$time = date("Y-m-d H:i:s", time() - 3600 * ONLINE_TIME);
	$sql = "SELECT * FROM " . DB_PREFIX . "estore_online_users WHERE store_id = '$store_id' AND uid='$uid' AND usertype='$type'";
	$result = $db->query($sql);
	if (mysqli_num_rows($result)) { #Dang dang nhap
		$row = mysqli_fetch_array($result);
		if ($row['last_updated'] > $time) return 1;
	}
	return 0;
}

function debug($text = "")
{
	write_local_file("./tmp/debug.txt", date("Y-m-d H:i:s") . " " . $text . "\n", "a");
}

function increaseHit($store_id = 0)
{
	global $db;
	$sql = "SELECT id FROM " . DB_PREFIX . "estore_statistics WHERE id = '$store_id'";
	$result = $db->query($sql);
	if (mysqli_num_rows($result)) { #Da ton tai statistic cho Estore
		$sql = "UPDATE " . DB_PREFIX . "estore_statistics SET hits=hits+1,him=him+1,hid=hid+1 WHERE id='$store_id'";
		$db->query($sql);
	} else {
		$db->query("INSERT INTO " . DB_PREFIX . "estore_statistics (id,hits) VALUES ('$store_id','1')");
	}
	return 1;
}

function generateOrderCode($length = 6)
{
	$str = '';
	for ($i = 0; $i < $length; $i++) {
		$a = rand(1, 4);
		switch ($a) {
			case 1:
				// this numbers refer to numbers of the ascii table (upper-caps)
				$str .= chr(mt_rand(65, 90));
				break;
			case 2:
				// number
				$str .= mt_rand(1, 9);
				break;
			case 3:
				// this numbers refer to numbers of the ascii table (upper-caps)
				$str .= chr(mt_rand(65, 90));
				break;
			case 4:
				// this numbers refer to numbers of the ascii table (upper-caps)
				$str .= chr(mt_rand(65, 90));
				break;
		}
	}
	$find = array('I', 'O');
	$replace = array(chr(mt_rand(74, 90)), chr(mt_rand(65, 72)));
	$str = str_replace($find, $replace, $str);
	return $str;
}

/*function listRDay($value = '0', $lang = DEFAULT_ADMIN_LANGUAGE){
	global $messages;
	$str = '';
	for($i=0; $i<28; $i++){
	$str .= '<option value="'.$messages['rday'][$i].'"'.($value==$messages['rday'][$i]?' selected="selected" ':'').'>'.$messages['rday'][$i].'</option>';
	}
	return $str;
}*/
function stripUnicode($str)
{
	if (!$str) return false;
	$unicode = array(
		'a' => 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ',
		'A' => 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
		'd' => 'đ',
		'D' => 'Đ',
		'e' => 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
		'E' => 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
		'i' => 'í|ì|ỉ|ĩ|ị',
		'I' => 'Í|Ì|Ỉ|Ĩ|Ị',
		'o' => 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
		'O' => 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
		'u' => 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
		'U' => 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
		'y' => 'ý|ỳ|ỷ|ỹ|ỵ',
		'Y' => 'Ý|Ỳ|Ỷ|Ỹ|Ỵ'
	);
	foreach ($unicode as $khongdau => $codau) {
		$arr = explode("|", $codau);
		$str = str_replace($arr, $khongdau, $str);
	}
	return $str;
} // Doi tu co dau => khong dau
function changeTitle($str)
{
	$str = stripUnicode($str);
	$str = mb_convert_case($str, MB_CASE_LOWER, 'utf-8');
	$str = trim($str);
	$str = preg_replace('/[^a-zA-Z0-9\ ]/', '', $str);
	$str = str_replace("  ", " ", $str);
	$str = str_replace(" ", "-", $str);
	return $str;
}
function removeSpecialCharsVn($str) {
    return preg_replace('/[^a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/u', '', $str);
}

function buildBreadcrumb($module, $categoryTree = [], $item = []) {
    $breadcrumb = [];
    $breadcrumb[] = ['name' => 'Trang chủ', 'link' => '/'];

    // Module chính
    $breadcrumb[] = [
        'name' => ucfirst($module['title']), 
        'link' => $module['link']
    ];

    // Nếu có danh mục cha/con
    if (!empty($categoryTree)) {
        foreach ($categoryTree as $cat) {
            $breadcrumb[] = [
                'name' => $cat['name'],
                'link' => $cat['link']
            ];
        }
    }

    // Nếu là trang chi tiết (sản phẩm/bài viết)
    if (!empty($item)) {
        $breadcrumb[] = ['name' => $item['name'], 'link' => ''];
    }

    return $breadcrumb;
}

// function sendMail($recipients, $subject, $htmlContent, $fromName = '', $fromEmail = ''): bool {
//     $recipientList = is_array($recipients) ? $recipients : [$recipients];

//     if (!$fromEmail) {
//         $fromEmail = defined('SMTP_USER') && SMTP_USER ? SMTP_USER : (defined('ADMIN_EMAIL') ? ADMIN_EMAIL : 'no-reply@localhost');
//     }

// 	if (!$fromName) {
// 		$fromName = 'System';
// 	}

//     // Nếu không dùng SMTP, fallback PHP mail()
//     if (!defined('SMTP_MAIL') || !SMTP_MAIL) {
//         // $headers  = "From: $fromName <$fromEmail>\r\n";
// 		$headers  = "From: =?UTF-8?B?".base64_encode($fromName)."?= <$fromEmail>\r\n";
//         $headers .= "Reply-To: " . (defined('ADMIN_EMAIL') ? ADMIN_EMAIL : $fromEmail) . "\r\n";
//         $headers .= "MIME-Version: 1.0\r\n";
//         $headers .= "Content-Type: text/html; charset=utf-8\r\n";

//         $allSent = true;
//         foreach ($recipientList as $recipient) {
//             if (!mail($recipient, '=?UTF-8?B?'.base64_encode($subject).'?=', $htmlContent, $headers)) {
//                 $allSent = false;
//             }
//         }
//         return $allSent;
//     }

//     // Dùng SMTP
//     $host = SMTP_HOST;
//     $port = SMTP_PORT ?: 25;
//     $user = SMTP_USER;
//     $pass = SMTP_PASSWORD;

//     $fp = fsockopen($host, $port, $errno, $errstr, 10);
//     if (!$fp) return false;

//     $read = function() use ($fp) {
//         $data = '';
//         while ($line = fgets($fp, 515)) {
//             $data .= $line;
//             if (substr($line, 3, 1) == ' ') break;
//         }
//         return $data;
//     };

//     $write = function($cmd) use ($fp) { fputs($fp, $cmd."\r\n"); };

//     $read(); // banner
//     $write("EHLO $host");
//     $read();

//     // $write("AUTH LOGIN");
//     // $read();
//     // $write(base64_encode($user));
//     // $read();
//     // $write(base64_encode($pass));
//     // if (strpos($read(), '235') !== 0) { fclose($fp); return false; }

//     $write("MAIL FROM:<$fromEmail>");
//     $read();

//     foreach ($recipientList as $recipient) {
//         $write("RCPT TO:<$recipient>");
//         $read();
//     }

//     $write("DATA");
//     $read();

//     $headers  = "From: =?UTF-8?B?".base64_encode($fromName)."?= <$fromEmail>\r\n";
//     $headers .= "MIME-Version: 1.0\r\n";
//     $headers .= "Content-Type: text/html; charset=utf-8\r\n";
//     $headers .= "Subject: =?UTF-8?B?".base64_encode($subject)."?=\r\n";

//     $message = $headers . "\r\n" . $htmlContent . "\r\n.\r\n";
//     fputs($fp, $message);
//     $read();

//     $write("QUIT");
//     fclose($fp);

//     return true;
// }


function sendMail(array|string $recipients, string $subject, string $htmlContent, string $fromName = DOMAIN, string $fromEmail = SMTP_USER): bool {
    // Chuẩn hóa danh sách email
    $recipientList = array_filter(
        is_array($recipients) ? $recipients : [$recipients],
        fn($email) => !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)
    );

    if (empty($recipientList)) return false;

    $headers = "From: $fromName <$fromEmail>\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    return mail(implode(',', $recipientList), $subject, $htmlContent, $headers);
}

// Hạn chế request theo IP để tránh spam form
function rateLimitByIP($key = 'default', $limit = 5, $seconds = 300) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $ip = $_SERVER['REMOTE_ADDR'];
    $now = time();

    $sessionKey = "rate_limit_{$key}_{$ip}";

    if (!isset($_SESSION[$sessionKey])) {
        $_SESSION[$sessionKey] = [];
    }

    // lọc request cũ
    $_SESSION[$sessionKey] = array_filter(
        $_SESSION[$sessionKey],
        fn($t) => ($now - $t) < $seconds
    );

    if (count($_SESSION[$sessionKey]) >= $limit) {
        return false;
    }

    $_SESSION[$sessionKey][] = $now;

    return true;
}

function buildBreadcrumbSchema($topNav)
{
    if (empty($topNav) || !is_array($topNav)) {
        return null;
    }

    $schema = [
        "@context" => "https://schema.org",
        "@type" => "BreadcrumbList",
        "itemListElement" => []
    ];

    foreach ($topNav as $index => $item) {

        if (empty($item['name']) || empty($item['url'])) {
            continue;
        }

        $schema["itemListElement"][] = [
            "@type" => "ListItem",
            "position" => $index + 1,
            "name" => $item['name'],
            "item" => rtrim(PROTOCOL . DOMAIN, '/') . '/' . ltrim($item['url'], '/')
        ];
    }

    if (empty($schema["itemListElement"])) {
        return null;
    }

    return json_encode(
        $schema,
        JSON_UNESCAPED_UNICODE
        | JSON_UNESCAPED_SLASHES
        | JSON_PRETTY_PRINT
    );
}

function generateInvoiceCode($prefix = 'HD', $randomLength = 4) {
    $dateString = date('dmY');
    $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomSuffix = substr(str_shuffle(str_repeat($chars, 2)), 0, $randomLength);
    return $prefix . $dateString . $randomSuffix;
}
