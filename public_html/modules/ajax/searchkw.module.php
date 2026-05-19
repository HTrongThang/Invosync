<?php

include_once(ROOT_PATH . "classes/dao/searchs.class.php");
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
include_once(ROOT_PATH . 'classes/dao/products.class.php');
include_once(ROOT_PATH . 'classes/dao/specifications.class.php');
include_once(ROOT_PATH . 'classes/dao/productoptions.class.php');
include_once(ROOT_PATH . 'classes/dao/productaccessorys.class.php');
$productaccessorys = new Productaccessorys(1);
$productOptions = new ProductOptions(1);
$specification = new Specifications(1);
$searchs = new Search(1);
$products = new Products(1);
$estores = new EStores();
$estore = $estores->getObject(1);
$key = '';
$keywords1 = ($request->element('valkw'));
include_once(ROOT_PATH . 'classes/dao/imgs.class.php');

$imgs = new Imgs();
$keywords = htmlentities($request->element('valkw'));

#lôp xe
$condition = "`status` = '1' AND `type`='product'";
$condition .= $keywords ? " AND (`slug` LIKE '%$keywords%' OR `keyword` LIKE '%$keywords%' OR `title` LIKE '%$keywords1%' OR `tag` LIKE '%$keywords1%')" : '';
$listPro = $searchs->getObjects(1, "$condition", array("id" => "DESC"), 20);
if ($listPro) {
    $arrayIdPro = [];
    foreach ($listPro as $item) {
        array_push($arrayIdPro, $item->getSearchId());
    }
    $listIdPro = implode(",", $arrayIdPro);
    if ($listIdPro) {
        $listProductsx = $products->getObjects(1, "`id` IN ($listIdPro)", array("id" => "DESC"), 999);
        $dataArrayHome = [];
        foreach ($listProductsx as $item) {
            $itemPro["id"] = $item->getId();
            $itemPro["name"] = $item->getName();
            $itemPro["slug"] = $item->getSlug();
            $avatarTl = $specification->getPropertiesFromId($item->getThornLine());
            $itemPro['avatar'] = "/" . $estore->getProperty('custom_name_file_img') . "/" . $imgs->getUrlFromId($avatarTl['photos']['0']);
            array_push($dataArrayHome, $itemPro);
        }
    }
}
#Phụ kiện
$conditionaccessorys = "`status` = '1' AND `type`='productaccessorys'";
$conditionaccessorys .= $keywords ? " AND (`slug` LIKE '%$keywords%' OR `keyword` LIKE '%$keywords%' OR `title` LIKE '%$keywords1%' OR `tag` LIKE '%$keywords1%')" : '';
$listProaccessorys = $searchs->getObjects(1, "$conditionaccessorys", array("id" => "DESC"), 20);
if ($listProaccessorys) {
    $arrayIdProaccessorys = [];
    foreach ($listProaccessorys as $item) {
        array_push($arrayIdProaccessorys, $item->getSearchId());
    }
    $listIdProaccessorys = implode(",", $arrayIdProaccessorys);
    if ($listIdProaccessorys) {
        $listProductsxaccessorys = $productaccessorys->getObjects(1, "`id` IN ($listIdProaccessorys)", array("id" => "DESC"), 999);
        $dataArrayHomeaccessorys = [];
        foreach ($listProductsxaccessorys as $item) {
            $proFinalItem1['id'] = $item->getId();
            $proFinalItem1['catid'] = $item->getCatId();
            $proFinalItem1['slug'] = $item->getSlug();
            $proFinalItem1['name'] = $item->getName();
            $proFinalItem1['avatar'] = "/" . $estore->getProperty('custom_name_file_img') . "/" . $imgs->getUrlFromId($item->getProperty("photos")['0']);
            array_push($dataArrayHomeaccessorys, $proFinalItem1);
        }
    }
}
#category
$conditionca = "`status` = '1' AND `type` IN ('productOptions','productOptionsacquy','productOptionslop','productOptionscamera')";
$conditionca .= $keywords ? " AND (`slug` LIKE '%$keywords%' OR `keyword` LIKE '%$keywords%' OR `title` LIKE '%$keywords1%' OR `tag` LIKE '%$keywords1%')" : '';
$listCate = $searchs->getObjects(1, "$conditionca", array("title" => "DESC"),6);
if ($listCate) {
    $dataArrayHomeCat = [];
    foreach ($listCate as $item) {
        $itemCat["id"] = $item->getId();
        $itemCat["name"] = $item->getTitle();
        $itemCat["slug"] = $item->getSlug();
        // $pcId = $item->getPcId();
        // if ($pcId == '30') { //size
        //     $itemCat["slug"] = "/lop-xe-" . $item->getSlug();
        // } elseif ($pcId == '29') { //xe
        //     $itemCat["slug"] =  "/" . $item->getSlug() . "-nen-thay-lop-gi-chi-phi-bao-nhieu";
        // } elseif ($pcId == '28') { //thương hiệu
        //     $itemCat["slug"] =  "/" . $item->getSlug();
        // }
        array_push($dataArrayHomeCat, $itemCat);
    }
}


$result = array("listPro" => $dataArrayHome, "listCate" => $dataArrayHomeCat, "accessorys" => $dataArrayHomeaccessorys);
echo json_encode($result);
