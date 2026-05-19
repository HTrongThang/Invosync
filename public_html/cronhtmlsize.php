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
$db = new DB();
$productCategories = new ProductCategories(1);
$ProductOptions = new ProductOptions(1);
$products = new Products(1);
$estores = new Estores();
$estore = $estores->getObject(1);
#danh sách vành lốp


#lấy danh sách theo xe
$listCar = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = '30'", array("id" => "ASC"), 9999);
if ($listCar) {
    foreach ($listCar as $value) {
        $slug = $value->getSlug();
        $name = $value->getName();
        $idsize = $value->getId();
        $htmlarray = [];

        $listProduct = $products->getObjects(1, "`status` = '1'  AND `size` = $idsize", array("id" => "ASC"), 999);
        if ($listProduct) {
            $html = '
                <table class="divresponsive">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td><strong>Lốp xe</strong></td>
                      <td><strong>Giá bán</strong></td>
                      <td><strong>Chi tiết</strong></td>
                    </tr>';
            $dataArrayS = [];
            $tempArray = [];
            foreach ($listProduct as $value2) {
                $idTr = $value2->getTrademark();
                if (!isset($tempArray[$idTr])) {
                    $item['idTr'] = $idTr;
                    array_push($dataArrayS, $item);
                    $tempArray[$idTr] = true;
                }
            }
            $arrayPriceTra = [];
            foreach ($dataArrayS as $value3) {
                $idTr = $value3['idTr'];
                #lấy DS sp cùng thương hiệu và size
                $listPriceLimit = $products->getObjects(1, "`status` = '1' AND `size`='$idsize' AND `trademark` = '$idTr'", array("id" => "ASC"), 999);
                $LimitPrice = [];
                if ($listPriceLimit) {
                    foreach ($listPriceLimit as $valueLM) {
                        if ($valueLM->getMarketPrice() > 0) {
                            array_push($LimitPrice, $valueLM->getMarketPrice());
                        } else {
                            array_push($LimitPrice, $valueLM->getPrice());
                        }
                    }
                }
                $itemtr['nametr'] = $ProductOptions->getNameFromId($value3['idTr']);
                $itemtr['slugtr'] = $ProductOptions->getSlugFromId($value3['idTr']);
                $itemtr['minValue'] = number_format(min($LimitPrice));
                array_push($arrayPriceTra, $itemtr);
            }

            foreach ($arrayPriceTra as $value4) {
                $html .= '<tr>';
                $html .= '<td>Lốp ' . $value4['nametr'] . ' ' . $ProductOptions->getNameFromId($idsize) . '</td>';
                if ($estore->getProperty('custom_view_price') == 1) {
                    if ($value4['minValue'] > 0) {
                        $html .= '<td>Từ ' . $value4['minValue'] . ' đồng/lốp</td>';
                    } else {
                        $html .= '<td>Đang cập nhật</td>';
                    }
                } else {
                    $html .= '<td><a href="'.$estore->getProperty('custom_linkzalo').'" target="_blank" class="bao-gia">Báo giá</a></td>';
                }
                $html .= '<td><a href='. $value4['slugtr'] .'-kich-thuoc-'.$ProductOptions->getSlugFromId($idsize).'>Xem thêm</a></td>';
                $html .= '</tr>';
            }
            // 
            $html .= '</tbody></table>';
            array_push($htmlarray, $html);
        }



        $folder = ROOT_PATH . "templates/oto/cronhtmlsize/";
        $file = $folder . $slug . '.tpl.html';
        $handle = fopen($file, 'w');
        fwrite($handle, implode('', $htmlarray)); // Convert array to string before writing
        fclose($handle);
    }
}
echo "Success!";