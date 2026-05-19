
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
include_once(ROOT_PATH . 'classes/dao/specifications.class.php');

$db = new DB();
$productCategories = new ProductCategories(1);
$ProductOptions = new ProductOptions(1);
$products = new Products(1);
$specifications = new Specifications(1);
$estores = new Estores();
$estore = $estores->getObject(1);

#lấy dang sach theo thương hiệu
$listTrademark = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = '28'", array("id" => "ASC"), 999);
if ($listTrademark) {
    #danh sách vành lốp
    $listSize = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = '30'", array("id" => "ASC"), 999);
    $dataArrayS = [];
    $tempArray = []; // Mảng tạm thời để theo dõi giá trị 'vanh'
    foreach ($listSize as $value) {
        $vanh = $value->getClass();
        // Kiểm tra xem giá trị 'vanh' đã tồn tại trong mảng tạm thời chưa
        if (!isset($tempArray[$vanh])) {
            // Nếu chưa tồn tại, thêm vào mảng $dataArrayS và đánh dấu đã xuất hiện trong $tempArray
            $item['vanh'] = $vanh;
            array_push($dataArrayS, $item);
            $tempArray[$vanh] = true;
        }
    }
    foreach ($listTrademark as $value) {
        $htmlarray = [];
        $name = $value->getName();
        $slug = $value->getSlug();
        $idTra = $value->getId();
        foreach ($dataArrayS as $value1) {
            $vanh = $value1['vanh'];
            $listIdPO = $ProductOptions->getObjects(1, "`status` = '1' AND `class` = $vanh", array("id" => "DESC"), 999);
            $dataIdArray = [];
            foreach ($listIdPO as $value2) {
                $id = $value2->getId();
                array_push($dataIdArray, $id);
            }
            $implodeIdArray = implode(",", $dataIdArray);
            $listProduct = $products->getObjects(1, "`status` = '1' AND `trademark` = '$idTra' AND `size` IN ($implodeIdArray)", array("id" => "ASC"), 999);
            if ($listProduct) {
                $html = '<h2><strong id="Giá lốp ' . $name . ' vành ' . $vanh . '">Giá lốp ' . $name . ' vành ' . $vanh . '</strong></h2><table class="divresponsive"><tbody><tr><td><p><strong>Tên sản phẩm</strong></p></td><td><p><strong>Giá</strong></p></td><td><p><strong>Xuất xứ</strong></p></td><td><p><strong>Chi tiết</strong></p></td></tr>';
                foreach ($listProduct as $value3) {
                    $html .= '<tr>';
                    $html .= '<td>';
                    $html .= '<p>' . $value3->getName() . '</p></td>';
                    $html .= '<td>';
                    if ($estore->getProperty('custom_view_price') == 1) {
                        if ($value3->getMarketPrice() > 0) {
                            $html .= '<p>' . number_format($value3->getMarketPrice()) . '</p></td>';
                        } else if ($value3->getMarketPrice() == 0 || $value3->getPrice() == 0) {
                            $html .= '<p> Liên hệ </p></td>';
                        } else {
                            $html .= '<p>' . number_format($value3->getPrice()) . '</p></td>';
                        }
                    } else {
                        $html .= '<p> Liên hệ </p></td>';
                    }
                    $html .= '<td>';
                    if ($value3->getOrigin() != '0') {
                        $html .= '<p>' . $specifications->getNameFromId($value3->getOrigin()) . '</p></td>';
                    } else {
                        $html .= '<p>Đang cập nhật</p></td>';
                    }
                    $html .= '<td>';
                    $html .= '<p><u><a href="' . $value3->getSlug() . '">Xem</a></u></p></td>';
                    $html .= '</tr>';
                }

                $html .= '</tbody></table>';
                array_push($htmlarray, $html);
            }
        }
        $folder = ROOT_PATH . "templates/oto/cronhtml/";
        $file = $folder . $slug . '.tpl.html';
        $handle = fopen($file, 'w');
        fwrite($handle, implode('', $htmlarray)); // Convert array to string before writing
        fclose($handle);
    }
}
#lấy danh sách thương hiệu LẤP ĐƯỢC CHO CÁC XE Ô TÔ NÀO?
$listCar = $ProductOptions->getObjects(1, "`status` = '1' AND `pc_id` = 28", array("id" => "ASC"), 999);
if ($listCar) {
    foreach ($listCar as $value) {
        $htmlarray1 = [];
        $dataArraysize = [];
        $tempArraysize = []; // Mảng tạm thời để theo dõi giá trị 'size'
        $name = $value->getName();
        $slug = $value->getSlug();
        $id = $value->getId();
        $listProduct = $products->getObjects(1, "`status` = '1' AND `trademark` = '$id'", array("id" => "ASC"), 999); #lấy danh sách cái size của thương hiệu.pus vào mang.
        foreach ($listProduct as $value2) {
            $size = $value2->getSize();
            $car = $value2->getCarcompany();
            // Kiểm tra xem giá trị 'size' đã tồn tại trong mảng tạm thời chưa
            if (!isset($tempArraysize[$size]) && !isset($tempArraysize[$car])) {
                // Nếu chưa tồn tại, thêm vào mảng $dataArrayS và đánh dấu đã xuất hiện trong $tempArray
                $items['size'] = $size;
                $items['car'] = $car;
                array_push($dataArraysize, $items);
                $tempArraysize[$size] = true;
                $tempArraysize[$car] = true;
            }
        }

        $html1 = '<table class="divresponsive"><tbody><tr><td><strong>Bảng size</strong></td><td><strong>Xe tương thích</strong></td></tr>';
        foreach ($dataArraysize as $value3) {
            $listIdCar = $value3['size'];

            if ($listIdCar && $listIdCar != " ") {
                $listCars = $ProductOptions->getObjects(1, "`status` = '1' AND `list_size` LIKE '%$listIdCar%'", array("id" => "ASC"), 999);
                $dataArrayCar = [];
                foreach ($listCars as $car) {
                    $NameCar = "<a href='".$car->getSlug()."-nen-thay-lop-gi-chi-phi-bao-nhieu'>".$car->getName()."</a>";
                    $listSize = $car->getListSize();
                    $array = explode(",", $listSize);
                    if (in_array($listIdCar, $array)) {
                        array_push($dataArrayCar, $NameCar);
                    }
                }
                $imDataArrayCar = implode(",", $dataArrayCar);
            } else {
                $imDataArrayCar = 'Đang cập nhật';
            }
            $html1 .= '<tr>';
            $html1 .= '<td><a href="/'.$slug.'-kich-thuoc-'.$ProductOptions->getSlugFromId($value3['size']).'">Lốp ' . $name . ' ' . $ProductOptions->getNameFromId($value3['size']) . '</a></td>';
            $html1 .= '<td>' . $imDataArrayCar . '</td>';
            $html1 .= '</tr>';

            // if ($listIdCar && $listIdCar != " ") {
            //     $listCars = $ProductOptions->getObjects(1, "`status` = '1' AND `id` IN ($listIdCar)", array("id" => "ASC"), 999);
            //     $dataArrayCar = [];
            //     foreach ($listCars as $car) {
            //         $NameCar = $car->getName();
            //         array_push($dataArrayCar, $NameCar);
            //     }
            //     $imDataArrayCar = implode(",", $dataArrayCar);
            // } else {
            //     $imDataArrayCar = 'Đang cập nhật';
            // }
            // $html1 .= '<tr>';
            // $html1 .= '<td>Lốp ' . $name . ' ' . $ProductOptions->getNameFromId($value3['size']) . '</td>';
            // $html1 .= '<td>' . $imDataArrayCar . '</td>';
            // $html1 .= '</tr>';
        }
        $html1 .= '</tbody></table>';
        array_push($htmlarray1, $html1);
        $folder = ROOT_PATH . "templates/oto/cronhtml/";
        $file = $folder . $slug . '_c.tpl.html';
        $handle = fopen($file, 'w');
        fwrite($handle, implode('', $htmlarray1)); // Convert array to string before writing
        fclose($handle);
    }
}
echo "Success!";