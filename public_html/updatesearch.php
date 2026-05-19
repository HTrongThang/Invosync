<?php

/*************************************************************************
Index page
----------------------------------------------------------------
Warranty SG Project
Company: Derasoft Co., Ltd                                  
Email: info@derasoft.com                                    
Last updated: 07/07/2021
Coder: Truong Luc
 **************************************************************************/
#---
error_reporting(9);
if (!defined('ROOT_PATH')) {
    define('ROOT_PATH', dirname(__FILE__) . '/');
}
include_once(ROOT_PATH . 'PHPExcel.php');
include_once(ROOT_PATH . 'PHPExcel/IOFactory.php');
include_once(ROOT_PATH . 'PHPExcel/Writer/Excel5.php');
include_once(ROOT_PATH . 'includes/constant.inc.php');
include_once(ROOT_PATH . 'includes/config.inc.php');
include_once(ROOT_PATH . 'classes/data/translator.class.php');
include_once(ROOT_PATH . 'includes/admin/functions.inc.php');
include_once(ROOT_PATH . 'classes/database/mysql.class.php');
include_once(ROOT_PATH . 'classes/template/smarty.class.php');
include_once(ROOT_PATH . 'classes/http/request.class.php');
include_once(ROOT_PATH . 'classes/http/url.class.php');
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
include_once(ROOT_PATH . 'classes/dao/languages.class.php');
include_once(ROOT_PATH . 'classes/dao/addons.class.php');
include_once(ROOT_PATH . 'classes/dao/registers.class.php');
include_once(ROOT_PATH . 'classes/dao/fields.class.php');
include_once(ROOT_PATH . "classes/data/textfilter.class.php");


# Setting time zone
if (function_exists('date_default_timezone_set')) date_default_timezone_set(TIME_ZONE);
# Database connection
$db = new DB();
include_once(ROOT_PATH . 'classes/dao/customers.class.php');
$customers = new Customers(1);
include_once(ROOT_PATH . 'classes/dao/products.class.php');
$products = new Products(1);
include_once(ROOT_PATH . 'classes/dao/comments.class.php');
$comments = new Comments(1);
include_once(ROOT_PATH . 'classes/dao/productoptions.class.php');
$productOptions = new ProductOptions(1);
include_once(ROOT_PATH . 'classes/dao/specifications.class.php');
$specifications = new Specifications(1);
include_once(ROOT_PATH . "classes/dao/searchs.class.php");
$search = new Search(1);
$gallery_root = "upload/1/";
$gallery_path = $gallery_root . "products";
include_once(ROOT_PATH . 'dom/simple_html_dom.php');
$dom = new simple_html_dom();
include_once(ROOT_PATH . 'classes/dao/customers.class.php');
$customers = new Customers(1);
include_once(ROOT_PATH . 'classes/dao/productaccessorys.class.php');
$productaccessorys = new Productaccessorys(1);
include_once(ROOT_PATH . 'classes/dao/articles.class.php');
$articles = new Articles(1);
include_once(ROOT_PATH . 'classes/dao/imgs.class.php');
include_once(ROOT_PATH . 'classes/dao/static.class.php');
$statics = new StaticPage(1);
$imgs = new Imgs();
include_once(ROOT_PATH . 'classes/dao/ads.class.php');
$ads = new Ads(1);

// #lôp xe
// $listProductsxproduct = $products->getObjects(1, "`status` = 1", array("id" => "DESC"), 9999);
// foreach ($listProductsxproduct as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => $item->getSlug(),
//         "title" => $item->getName(),
//         "type" => "product",
//         "status" => 1,
//         "sapo" => $item->getDescription(),
//         "detail" => $item->getDetail(),
//         "store_id" => 1,
//         "keyword" => $item->getKeyword(),
//         "tag" => $item->getTag(),
//         "url" => $item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'product'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
// #phụ kiện
// $listProductsx = $productaccessorys->getObjects(1, "`status` = 1", array("id" => "DESC"), 9999);
// foreach ($listProductsx as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => $item->getSlug(),
//         "title" => $item->getName(),
//         "type" => "productaccessorys",
//         "status" => 1,
//         "sapo" => $item->getDescription(),
//         "detail" => $item->getDetail(),
//         "store_id" => 1,
//         "keyword" => $item->getKeyword(),
//         "tag" => $item->getTag(),
//         "url" => $item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productaccessorys'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }

// #theo thương hiệu
// $listproductOptions = $productOptions->getObjects(1, "`status` = 1 AND `pc_id` = 28", array("id" => "DESC"), 9999);
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => $item->getSlug(),
//         "title" => "Lốp " . $item->getName(),
//         "type" => "productOptions",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Lốp " . $item->getName(),
//         "url" => $item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptions'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
// #kích thước
// $listproductOptions = $productOptions->getObjects(1, "`status` = 1 AND `pc_id` = 30", array("id" => "DESC"), 9999);
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => "lop-xe-" .$item->getSlug(),
//         "title" => "Lốp xe " . $item->getName(),
//         "type" => "productOptions",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Lốp xe " . $item->getName(),
//         "url" => "lop-xe-" .$item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptions'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
#hãng xe
$listproductOptions = $productOptions->getObjects(1, "`status` = 1 AND `pc_id` = 29", array("id" => "DESC"), 9999);
#xe theo lốp
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => $item->getSlug() . "-nen-thay-lop-gi-chi-phi-bao-nhieu",
//         "title" => "Xe " . $item->getName() . " nên thay lốp gì chi phí bao nhiêu",
//         "type" => "productOptionslop",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Xe " .$item->getName() . " nên thay lốp gì chi phí bao nhiêu",
//         "url" => $item->getSlug() . "-nen-thay-lop-gi-chi-phi-bao-nhieu",
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptionslop'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
#xe theo bình ắc quy
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => "binh-ac-quy-xe-".$item->getSlug(),
//         "title" => "Bình ắc quy xe " . $item->getName(),
//         "type" => "productOptionsacquy",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Bình ắc quy xe " .$item->getName(),
//         "url" => "binh-ac-quy-xe-".$item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptionsacquy'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
// #xe theo camera
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => "camera-hanh-trinh-xe-".$item->getSlug(),
//         "title" => "Camera hành trình xe " . $item->getName(),
//         "type" => "productOptionscamera",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Camera hành trình xe " .$item->getName(),
//         "url" => "camera-hanh-trinh-xe-".$item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptionscamera'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
// #xe theo cảm biến
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => "cam-bien-ap-suat-lop-xe-" . $item->getSlug(),
//         "title" => "Cảm biến áp suất lốp xe " . $item->getName(),
//         "type" => "productOptionscambien",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Cảm biến áp suất lốp xe " . $item->getName(),
//         "url" => "cam-bien-ap-suat-lop-xe-" . $item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptionscambien'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
// #xe theo phim cách nhiệt
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => "dan-phim-cach-nhiet-xe-" . $item->getSlug(),
//         "title" => "Dán phim cách nhiệt xe " . $item->getName(),
//         "type" => "productOptionsFim",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Dán phim cách nhiệt xe " . $item->getName(),
//         "url" => "dan-phim-cach-nhiet-xe-" . $item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptionsFim'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
// #xe theo ppf
// foreach ($listproductOptions as $item) {
//     $dataSearch = array(
//         "search_id" => $item->getId(),
//         "slug" => "dan-ppf-xe-" . $item->getSlug(),
//         "title" => "Dán PPF xe " . $item->getName(),
//         "type" => "productOptionsPpf",
//         "status" => 1,
//         "sapo" => $item->getSapo(),
//         "detail" => $item->getDetails(),
//         "store_id" => 1,
//         "keyword" => "Dán PPF xe " . $item->getName(),
//         "url" => "dan-ppf-xe-" . $item->getSlug(),
//     );
//     $check = $search->getObject($item->getId(), 'search_id', "`type` = 'productOptionsPpf'");
//     if ($check) {
//         $searchId = $search->updateData($dataSearch, $check->getId());
//     } else {
//         $searchId = $search->addData($dataSearch);
//     }
// }
echo "Thành công";
