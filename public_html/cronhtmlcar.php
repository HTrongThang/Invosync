<?php
# Create Google Sitemap for Viviann Shop
# Created by Mai Minh minh@maingo.com
# Date: 28/11/2006
# Update By PhanTom 19/12/2013
#---------------------------------
# Autodetect current root folder
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
include_once(ROOT_PATH . 'classes/dao/products.class.php');
include_once(ROOT_PATH . 'classes/dao/articles.class.php');
include_once(ROOT_PATH . 'classes/dao/articlecategories.class.php');
include_once(ROOT_PATH . 'classes/dao/productoptions.class.php');
include_once(ROOT_PATH . 'classes/dao/comments.class.php');
include_once(ROOT_PATH . 'classes/dao/productcategories.class.php');
include_once(ROOT_PATH . 'classes/dao/productcategories.class.php');
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
$db = new DB();

$estores = new EStores();
$estore = $estores->getObject(1);

$productCategories = new ProductCategories(1);
$ProductOptions = new ProductOptions(1);
$products = new Products(1);
$date = date("Y-m-d");
#danh sách vành lốp
// $listSize = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = '30'", array("id" => "ASC"), 999);
// $dataArrayS = [];
// $tempArray = []; # Mảng tạm thời để theo dõi giá trị 'vanh'
// foreach ($listSize as $value) {
//     $vanh = $value->getId();
//     $name = $value->getName();
//     # Kiểm tra xem giá trị 'vanh' đã tồn tại trong mảng tạm thời chưa
//     if (!isset($tempArray[$vanh]) && !isset($tempArray[$name])) {
//         # Nếu chưa tồn tại, thêm vào mảng $dataArrayS và đánh dấu đã xuất hiện trong $tempArray
//         $item['vanh'] = $vanh;
//         $item['name'] = $name;
//         array_push($dataArrayS, $item);
//         $tempArray[$vanh] = true;
//         $tempArray[$name] = true;
//     }
// }

#lấy danh sách theo xe
$listCar = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = '29' AND `cat_id` <> 0", array("id" => "ASC"), 9999);
if ($listCar) {
    foreach ($listCar as $value) {
        $slug = $value->getSlug();
        $name = $value->getName();
        $idcar = $value->getId();
        #
        $listCarCon = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = '29' AND `cat_id` = '$idcar'OR `id` = '$idcar'", array("id" => "ASC"), 9999);
        if ($listCarCon) {
            $dataSize = [];
            foreach ($listCarCon as $value1) {
                if ($value1->getListSize()) {
                    array_push($dataSize, $value1->getListSize());
                }
            }

            $inputString = implode(",", $dataSize);
            $arrayOfNumbers = explode(",", $inputString);
            // Bước 2: Loại bỏ các giá trị trùng lặp
            $uniqueNumbers = array_unique($arrayOfNumbers);
            // Bước 3: Chuyển mảng các giá trị duy nhất trở lại thành chuỗi
            $dataListSize = implode(",", $uniqueNumbers);
        } else {
            $dataListSize = $value->getListSize();
        }

        if (!empty($dataListSize)) {
            $listSize = explode(",", $dataListSize);
            $htmlarray = [];
            if ($listSize) {
                foreach ($listSize as $value1) {
                    $idsize = $value1;
                    $Namesize = $ProductOptions->getNameFromId($idsize);
                    // $listProduct = $products->getObjects(1, "`status` = '1' AND `carcompany` LIKE '%$idcar%' AND `size` = $idsize", array("id" => "ASC"), 9999);
                    $listProduct = $products->getObjects(1, "`status` = '1' AND `size` = $idsize", array("id" => "ASC"), 9999);
                    if ($listProduct) {
                        $TextH1 = str_replace(['{namecar}', 'size'], [$ProductOptions->getNameFromSlug($slug), $Namesize], $estore->getProperty("custom_text3h1carcompany"));
                        $html = '<div id="Kích thước lốp ' . $Namesize . '"><h3><strong>' . $TextH1 . '</strong></h3></div>';
                        $html .= '<table class="divresponsive"><colgroup><col/><col/><col/></colgroup><tbody><tr><td><strong>Tên sản phẩm</strong></td><td><strong>Giá tham khảo</strong></td><td><strong>Chi tiết</strong></td><td><b>Cần hỗ trợ?</b></td></tr>';
                        foreach ($listProduct as $value2) {
                            $html .= '<tr>';
                            $html .= '<td>' . $value2->getName() . '</td>';
                            if ($estore->getProperty('custom_view_price') == 1) {
                                if ($value2->getMarketPrice() > 0) {
                                    $html .= '<td>Từ ' . number_format($value2->getMarketPrice()) . ' đồng/lốp</td>';
                                } else if ($value2->getMarketPrice() == 0 || $value2->getPrice() == 0) {
                                    $html .= '<td>Liên hệ</td>';
                                } else {
                                    $html .= '<td>' . number_format($value2->getPrice()) . '</td>';
                                }
                            } else {
                                $html .= '<td><a href="'.$estore->getProperty('custom_linkzalo').'" target="_blank" class="bao-gia">Báo giá</a></td>';
                            }

                            $html .= '<td><a href="' . $value2->getSlug() . '">XEM</a></td>';
                            $html .= '<td><a href="tel:{$estore->getTel()}">GỌI NGAY</a></td>';
                            $html .= '</tr>';
                        }
                        $html .= '</tbody></table>';
                        array_push($htmlarray, $html);
                    }
                }
            }
            if ($htmlarray) {
                $folder = ROOT_PATH . "templates/oto/cronhtmlcar/";
                $urls = str_replace("-", "_", $slug);
                $file = $folder . $urls . '.tpl.html';
                $handle = fopen($file, 'w');
                fwrite($handle, implode('', $htmlarray)); // Convert array to string before writing
                fclose($handle);
            }
        }
    }
}
echo "Success!";
