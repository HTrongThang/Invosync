<?php
    //   ini_set('display_errors', 1);
    //     ini_set('display_startup_errors', 1);
    //     error_reporting(E_ALL);
include_once(ROOT_PATH . "classes/data/textfilter.class.php");
include_once(ROOT_PATH . 'classes/dao/products.class.php');
include_once(ROOT_PATH . 'classes/dao/productcategories.class.php');
include_once(ROOT_PATH . "classes/dao/uploadalbums.class.php");
include_once(ROOT_PATH . "classes/dao/uploads.class.php");
include_once(ROOT_PATH . "classes/dao/articles.class.php");
include_once(ROOT_PATH . "classes/PhpSpreadSheet/PhpOffice/autoload.php");

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

$products = new Products($storeId);
$productCategories = new ProductCategories($storeId);
$uploadAlbums = new UploadAlbums($storeId);
$uploads = new Uploads($storeId);
$articles = new Articles($storeId);

$templateFile = 'manageimport.tpl.html';

$listTabs = array(
	"Nhập liêu" => '/' . ADMIN_SCRIPT . '?op=manage&act=import&mod=data',
	// "Xuất liêu" => '/' . ADMIN_SCRIPT . '?op=manage&act=export&mod=data',
);
$template->assign('listTabs', $listTabs);
$template->assign('currentTab', 1);

if ($_POST) {
	if (!isset($_FILES['linkfile']) || $_FILES['linkfile']['error'] != 0) {
		die("Không có file upload");
	}
	$file_type = $_FILES['linkfile']['type'];
	if (
		$file_type == "application/vnd.ms-excel" ||
		$file_type == "application/x-ms-excel" ||
		$file_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	) {
		$filename = basename($_FILES["linkfile"]["name"]);
		$uploadPath = "./upload/1/excel/" . $filename;
		if (!move_uploaded_file($_FILES["linkfile"]["tmp_name"], $uploadPath)) {
			die("Upload file thất bại");
		}
		$type = $request->element("type");
		if ($type == 1) { # bài viết
			try {
				$spreadsheet = IOFactory::load($uploadPath);
				// Bắt đầu transaction
				$db->query("START TRANSACTION");
				foreach ($spreadsheet->getWorksheetIterator() as $worksheet) {
					$highestRow = $worksheet->getHighestRow();
					for ($row = 2; $row <= $highestRow; $row++) {
						$getCatId          = trim($worksheet->getCellByColumnAndRow(1, $row)->getValue());
						$getSlug           = trim($worksheet->getCellByColumnAndRow(2, $row)->getValue());
						$getTitle          = trim($worksheet->getCellByColumnAndRow(3, $row)->getValue());
						$getKeyword        = trim($worksheet->getCellByColumnAndRow(4, $row)->getValue());
						$getDescription    = $worksheet->getCellByColumnAndRow(5, $row)->getValue();
						$getDetail         = $worksheet->getCellByColumnAndRow(6, $row)->getValue();
						$getTitleSEO       = trim($worksheet->getCellByColumnAndRow(7, $row)->getValue());
						$getKeywordSEO     = trim($worksheet->getCellByColumnAndRow(8, $row)->getValue());
						$getDescriptionSEO = trim($worksheet->getCellByColumnAndRow(9, $row)->getValue());
						// Clean HTML
						$getDetail = stripslashes($getDetail);
						$getDetail = html_entity_decode($getDetail, ENT_QUOTES, 'UTF-8');
						$getDetail = str_replace(['\&quot;', '&quot;'], '"', $getDetail);

						// Xóa style trong span
						$getDetail = preg_replace('/<span\b[^>]*style="[^"]*"([^>]*)>/i', '<span$1>', $getDetail);

						// Xóa span rỗng attribute (optional)
						$getDetail = preg_replace('/<span\s*>/i', '<span>', $getDetail);
						if (!$getSlug) {
							continue;
						}
						$article = $articles->getObject($getSlug, 'slug');

						// Avatar theo slug
						$getSlugSafe = addslashes($getSlug);
						$list = $uploads->getObjects(1, "u.name = '$getSlugSafe'", ["id" => "DESC"], 1);
						$avatarNew = $list ? $list[0] : null;

						if ($article) {
							# UPDATE
							$properties = $article->getProperties();
							if (!is_array($properties)) {
								$properties = [];
							}
							$avatarIdOld = $article->getProperty('avatarId');
							if ($avatarNew && $avatarNew->getId() != $avatarIdOld) {
								if ($avatarIdOld) {
									$uploadList = $uploads->getObjects(1, "u.id = '$avatarIdOld'", ["id" => "DESC"], 1);
									$upload = $uploadList ? $uploadList[0] : null;
									if ($upload) {
										$upload->deleteFiles();
										$uploads->DeteImg($avatarIdOld);
									}
								}
								$properties['avatarId'] = $avatarNew->getId();
							} else {
								$properties['avatarId'] = $avatarIdOld;
							}
							$properties['custom_titleSeo'] = $getTitleSEO ?: $article->getProperty('custom_titleSeo');
							$properties['custom_meta_keyword'] = $getKeywordSEO ?: $article->getProperty('custom_meta_keyword');
							$properties['custom_captionSeo'] = $getDescriptionSEO ?: $article->getProperty('custom_captionSeo');
							$data = [
								'category_id'  => $getCatId ?: $article->getCategoryId(),
								'title'        => $getTitle ?: $article->getTitle(),
								'keyword'      => $getKeyword ?: $article->getKeyword(),
								'description'  => $getDescription ?: $article->getDescription(),
								'detail'       => $getDetail ?: $article->getDetail(),
								'updater_id'   => 100,
								'properties'   => serialize($properties),
								'status'       => 1,
								'date_updated' => date("Y-m-d H:i:s")
							];
							if (!$articles->updateData($data, $article->getId())) {
								throw new Exception("Update failed at row " . $row);
							}
						} else {
							# INSERT
							$properties = [
								'avatarId'            => is_object($avatarNew) ? $avatarNew->getId() : null,
								'custom_titleSeo'     => $getTitleSEO,
								'custom_meta_keyword' => $getKeywordSEO,
								'custom_captionSeo'   => $getDescriptionSEO,
							];
							$data = [
								'store_id'     => $storeId,
								'category_id'  => $getCatId,
								'slug'         => $getSlug,
								'title'        => $getTitle,
								'keyword'      => $getKeyword,
								'description'  => $getDescription,
								'detail'       => $getDetail,
								'poster_id'    => 100,
								'status'       => 1,
								'properties'   => serialize($properties),
								'date_created' => date("Y-m-d H:i:s")
							];
							if (!$articles->addData($data)) {
								throw new Exception("Insert failed at row " . $row);
							}
						}
					}
				}
				//commit
				$db->query("COMMIT");
				$template->assign('importsuccess', "Thành công");
			} catch (Exception $e) {
				//lỗi -> rollback toàn bộ
				$db->query("ROLLBACK");
				$template->assign('importfail', "Lỗi import: " . $e->getMessage());
			}
		} else {
			$template->assign('importfail', "Lỗi import");
		}
	}
}