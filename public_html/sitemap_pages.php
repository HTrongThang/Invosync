<?php
# Autodetect current root folder

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
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
include_once(ROOT_PATH . 'classes/dao/articlecategories.class.php');
include_once(ROOT_PATH . 'classes/dao/articles.class.php');
include_once(ROOT_PATH . 'classes/dao/menus.class.php');
include_once(ROOT_PATH . 'classes/dao/productcategories.class.php');
include_once(ROOT_PATH . "classes/dao/ads.class.php");
include_once(ROOT_PATH . "classes/dao/uploads.class.php");
include_once(ROOT_PATH . "classes/dao/uploadalbums.class.php");

$db = new DB();
$ProductCategories = new ProductCategories(1);
$url = new Url();
$ads = new Ads(1);
$estores = new EStores();
$uploads = new Uploads(1);
$uploadAlbums = new UploadAlbums(1);
$estore = $estores->getObject(1);
$articles = new Articles(1);
$menus = new Menus(1);
$link = mysqli_connect($config["db_server"], $config["db_user"], $config["db_pwd"]);
mysqli_select_db($link, $config["db_name"]) or die("Cannot connect database!");
# Table Prefix in the database
$tableprefix = 'dc_';
$url = 'https://digitrust.vn';

$sitemap_file = "sitemap_pages.xml";
# Priotity settings
$week_prio = 0.5;
$item_prio = 0.3;
$cat_prio = 0.8;
# Update frequency
$weekly = 'weekly';
$item_update = 'weekly';
$cat_update = 'daily';
$content = "";

$content .= xml_head($url);
# Print XML header
$trangchu = $url;
$defaultImg = $url . $estore->getProperty('admin_logo');
$caption = $estore->getProperty('custom_meta_title');
$imgTitle = $estore->getProperty('custom_meta_title');
$content .= print_xml($trangchu, $item_prio, date("Y-m-d"), $item_update, $defaultImg, $caption, $imgTitle);


#------------------------List articles-------------------------------
$listmenus = $menus->getObjects(1, "status = '1'", array("id" => "ASC"), 2000);
if ($listmenus) {
    foreach ($listmenus as $key => $value) {
        if ($value->getUrl()) {
            $slug = $url. $value->getUrl();
            $img = $defaultImg;
            $Namemenus = removeSpecialCharsVn($value->getName());
            $lastmod = $value->getDateUpdated() ? date("Y-m-d", strtotime($value->getDateUpdated())) : date("Y-m-d", strtotime($value->getDateCreated()));
            $lastTime = $value->getDateUpdated() ? date("H:i:s", strtotime($value->getDateUpdated())) : date("H:i:s", strtotime($value->getDateCreated()));
            
            $priority = $item_prio;
            $today    = new DateTime(date("Y-m-d"));
            $lastDate = new DateTime($lastmod);
            $diff     = $today->diff($lastDate)->days;
            if ($diff < 30) {
                $priority = 1.0;
            }
            
            $lastmod = $lastmod . "T" . $lastTime . "+07:00";
            $content .= print_xml($slug, $priority, $lastmod, $item_update, $img, $Namemenus, $Namemenus);
        }
    }
}
#
$listProductCategories = $ProductCategories->getObjects(1, "status = '1' AND `parent_id` <> '0'", array("id" => "ASC"), 2000);
if ($listProductCategories) {
    foreach ($listProductCategories as $key => $value) {
        if ($value->getSlug()) {
            $slug = $url. '/' . $value->getSlug();
            $img = $defaultImg;
            $Namemenus = removeSpecialCharsVn($value->getName());
            $lastmod = $value->getDateUpdated() ? date("Y-m-d", strtotime($value->getDateUpdated())) : date("Y-m-d", strtotime($value->getDateCreated()));
            
            $priority = $item_prio;
            $today    = new DateTime(date("Y-m-d"));
            $lastDate = new DateTime($lastmod);
            $diff     = $today->diff($lastDate)->days;
            if ($diff < 30) {
                $priority = 1.0;
            }
            
            $lastTime = $value->getDateUpdated() ? date("H:i:s", strtotime($value->getDateUpdated())) : date("H:i:s", strtotime($value->getDateCreated()));
            $lastmod = $lastmod . "T" . $lastTime . "+07:00";
            $content .= print_xml($slug, $priority, $lastmod, $item_update, $img, $Namemenus, $Namemenus);
        }
    }
}
// #
// $listads = $ads->getObjects(1, "status = '1'", array("id" => "ASC"), 2000);
// if ($listads) {
//     foreach ($listads as $key => $value) {
//         $avatar = $value->getAvatarImage($uploads);
//         if ($avatar) {
//             $slug = $url . '/' . $avatar->getPath() . '/' . $avatar->getUrlO();
//             $img = $url . '/' . $avatar->getPath() . '/' . $avatar->getUrlL();
//         } else {
//             $slug = $url . '/' . $value->getProperty('url_logo');
//             $img = $defaultImg;
//         }
//         $Namemenus = removeSpecialCharsVn($value->getName());
//         $lastmod = $value->getDateUpdated() ? date("Y-m-d", strtotime($value->getDateUpdated())) : date("Y-m-d", strtotime($value->getDateCreated()));
        
//         $priority = $item_prio;
//         $today    = new DateTime(date("Y-m-d"));
//         $lastDate = new DateTime($lastmod);
//         $diff     = $today->diff($lastDate)->days;
//         if ($diff < 30) {
//             $priority = 1.0;
//         }
        
//         $lastTime = $value->getDateUpdated() ? date("H:i:s", strtotime($value->getDateUpdated())) : date("H:i:s", strtotime($value->getDateCreated()));
//         $lastmod = $lastmod . "T" . $lastTime . "+07:00";
//         $content .= print_xml($slug, $priority, $lastmod, $item_update, $img, $Namemenus, $Namemenus);
//     }
// }


# Print XML footer
$content .= xml_foot();
write_local_file($sitemap_file, $content);
echo "Success!";

function xml_head($url)
{
    $freq = 'daily';
    $priority = '1.0';
    //$mod = date('c', time());
    $mod = date("Y-m-d") . "T" . date("H:i:s") . "+00:00";
    $str = "<?xml version='1.0' encoding='UTF-8'?>
	<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">	
<url>
  <loc>$url</loc>
  <lastmod>$mod</lastmod>
  <changefreq>$freq</changefreq>
  <priority>$priority</priority>
</url>";
    return $str;
}
#-----------------------------------------------
# xml_foot
#-----------------------------------------------
function xml_foot()
{
    $str = "
</urlset>";
    return $str;
}
#-----------------------------------------------
# print_xml
#-----------------------------------------------
function print_xml($url, $priority, $lastmod, $changefreq, $defaultImg, $caption, $imgTitle)
{
    if ($url != '') {
        $str = "
<url>
  <loc>$url</loc>
  <priority>$priority</priority>
  <lastmod>$lastmod</lastmod>
  <changefreq>$changefreq</changefreq>
  <image:image>
      <image:loc>$defaultImg</image:loc>
      <image:caption>$caption</image:caption>
      <image:title>$imgTitle</image:title>
    </image:image>
</url>";
        return $str;
    }
}
