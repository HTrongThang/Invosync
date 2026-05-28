<?php
include_once(ROOT_PATH . "classes/database/model.class.php");
include_once(ROOT_PATH . "classes/dao/productinfo.class.php");

class Products extends Model
{
	var $table;
	var $_db;
	var $store_id;

	function __construct($store_id = 0, $database = '')
	{
		if (!$database) {
			global $db;
			$this->_db = $db;
		} else $this->_db = $database;
		$this->table = DB_PREFIX . "products";
		$this->store_id = $store_id;
	}

	/* Common methods
/*-----------------------------------------------------------------------*
* Function: getObject
* Parameter: key
* Return: Info object
*-----------------------------------------------------------------------*/
	function getObject($value = '0', $key = 'id', $condition = '1>0')
	{
		if (empty($key) || $value === null) return '';

		$result = $this->query("
			SELECT p.*, c.name AS category_name 
			FROM " . DB_PREFIX . "products p 
			LEFT JOIN " . DB_PREFIX . "product_categories c 
			ON p.category_id = c.id 
			WHERE p.store_id = '" . $this->store_id . "' 
			AND `p`.`$key` = '$value' 
			AND ($condition) 
			LIMIT 1
		");
		if ($result) {
			$object = new ProductInfo(
					$result[0]['service_type'],
					$result[0]['operating_system'],
					$result[0]['storage_capacity'],
					$result[0]['ram'],
					$result[0]['cpu'],
					$result[0]['bandwidth'],
					$result[0]['ip_address'],
					$result[0]['web_server'],
					$result[0]['control_panel'],
					$result[0]['php_version'],
					$result[0]['framework'],
					$result[0]['mysql_db_type'],
					$result[0]['ssl_certificate'],
					$result[0]['backup'],
					$result[0]['ddos_protection'],
					$result[0]['uptime_commitment'],
					$result[0]['allowed_accounts'],
					$result[0]['mailbox_storage'],
					$result[0]['max_attachment_size'],
					$result[0]['send_limit'],
					$result[0]['dedicated_ip'],
					$result[0]['supported_protocol'],
					$result[0]['webmail'],
					$result[0]['has_encryption'],
					$result[0]['dns_config'],
					$result[0]['spam_filter'],
					$result[0]['smart_screen'],
					$result[0]['windows_hardware'],
					$result[0]['supported_platform'],
					$result[0]['storage'],
					$result[0]['time_tamping'],
					$result[0]['supported_format'],
					$result[0]['compliance_standard'],
					$result[0]['highlight_feature_ids'],
					$result[0]['product_feature_ids'],
					$result[0]['reissue_policy'],
					$result[0]['server_licenses'],
					$result[0]['browser_compatibility'],
					$result[0]['vulnerability_scan'],
					$result[0]['malware_scan'],
					$result[0]['wildcard_support'],
					$result[0]['san_support'],
					$result[0]['algorithm'],
					$result[0]['encryption_strength'],
					$result[0]['green_bar'],
					$result[0]['issuance_time'],
					$result[0]['warranty_amount'],
					$result[0]['trust_seal_type'],
					$result[0]['validation_level'],
					$result[0]['key_features'],
					$result[0]['features'],
					$result[0]['period'],
					$result[0]['price'],
					$result[0]['file_ids'],
					$result[0]['category_name'],
					$result[0]['availability'],
					$result[0]['expiration_date'],
					$result[0]['home'],
					$result[0]['status'],
					$result[0]['properties'],
					$result[0]['position'],
					$result[0]['date_updated'],
					$result[0]['date_created'],
					$result[0]['viewed'],
					$result[0]['avatar'],
					$result[0]['detail'],
					$result[0]['description'],
					$result[0]['keyword'],
					$result[0]['name'],
					$result[0]['slug'],
					$result[0]['category_id'],
					$result[0]['store_id'],
					$result[0]['id']

				);
			$object->setOpeningStock($result[0]['opening_stock']);
			return $object;
		}
		return 0;
	}

	function getObjects($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page) $page = 1;
		$start = ($page - 1) * $items_per_page;

		$query = "
			SELECT p.*, c.name AS category_name
			FROM " . DB_PREFIX . "products p
			LEFT JOIN " . DB_PREFIX . "product_categories c 
			ON p.category_id = c.id
			WHERE p.store_id = '" . $this->store_id . "' AND $condition
		";

		if (!empty($sort)) {
			$orderClauses = [];
			foreach ($sort as $key => $value) {
				$orderClauses[] = "$key $value";
			}
			$query .= " ORDER BY " . implode(", ", $orderClauses);
		}

		$query .= " LIMIT $start, $items_per_page";

		$results = $this->query($query);

		if ($results) {
			$objects = array();
			foreach ($results as $key => $result) {
				$objects[] = new ProductInfo(
					$result['service_type'],
					$result['operating_system'],
					$result['storage_capacity'],
					$result['ram'],
					$result['cpu'],
					$result['bandwidth'],
					$result['ip_address'],
					$result['web_server'],
					$result['control_panel'],
					$result['php_version'],
					$result['framework'],
					$result['mysql_db_type'],
					$result['ssl_certificate'],
					$result['backup'],
					$result['ddos_protection'],
					$result['uptime_commitment'],
					$result['allowed_accounts'],
					$result['mailbox_storage'],
					$result['max_attachment_size'],
					$result['send_limit'],
					$result['dedicated_ip'],
					$result['supported_protocol'],
					$result['webmail'],
					$result['has_encryption'],
					$result['dns_config'],
					$result['spam_filter'],
					$result['smart_screen'],
					$result['windows_hardware'],
					$result['supported_platform'],
					$result['storage'],
					$result['time_tamping'],
					$result['supported_format'],
					$result['compliance_standard'],
					$result['highlight_feature_ids'],
					$result['product_feature_ids'],
					$result['reissue_policy'],
					$result['server_licenses'],
					$result['browser_compatibility'],
					$result['vulnerability_scan'],
					$result['malware_scan'],
					$result['wildcard_support'],
					$result['san_support'],
					$result['algorithm'],
					$result['encryption_strength'],
					$result['green_bar'],
					$result['issuance_time'],
					$result['warranty_amount'],
					$result['trust_seal_type'],
					$result['validation_level'],
					$result['key_features'],
					$result['features'],
					$result['period'],
					$result['price'],
					$result['file_ids'],
					$result['category_name'],
					$result['availability'],
					$result['expiration_date'],
					$result['home'],
					$result['status'],
					$result['properties'],
					$result['position'],
					$result['date_updated'],
					$result['date_created'],
					$result['viewed'],
					$result['avatar'],
					$result['detail'],
					$result['description'],
					$result['keyword'],
					$result['name'],
					$result['slug'],
					$result['category_id'],
					$result['store_id'],
					$result['id']
				);
				end($objects)->setOpeningStock($result['opening_stock']);
			}
			return $objects;
		}
		return 0;
	}

	/*-----------------------------------------------------------------------*
* Function: updateData
* Parameter: Info object
* Return: 1 if success, 0 if fail
*-----------------------------------------------------------------------*/
	# Add record
	function addData($fields, $key = 'id')
	{
		$result = $this->add($fields, '$key', 'NULL');
		if ($result) return $result;
		return 0;
	}

	# Update record
	function updateData($fields, $value = '', $key = 'id')
	{
		$result = $this->update($fields, "`store_id` = '" . $this->store_id . "' AND `$key` = '$value'");
		if ($result)
			return $result;
		return 0;
	}

	# Change status
	function changeStatus($id = 0, $status = '')
	{
		if (!$id) return 0;
		if ($this->update(array('status' => $status), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change home
	function changeHome($id = 0, $home = '')
	{
		if (!$id) return 0;
		if ($this->update(array('home' => $home), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change product category
	function changeCategoryId($id = 0, $category_id = 0)
	{
		if (!$id) return 0;
		if ($this->update(array('category_id' => $category_id), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change product position
	function changePosition($id = 0, $position = 0)
	{
		if (!$id) return 0;
		if ($this->update(array('position' => $position), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'")) return 1;
		return 0;
	}

	# Clean trash
	function cleanTrash()
	{
		$results = $this->select('*', "`store_id` = '" . $this->store_id . "' AND `status` = " . S_DELETED);
		if ($results) {
			$objects = array();
			foreach ($results as $key => $result) {
				$properties = unserialize($result['properties']);
				if ($properties['avatar']) {
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/l_" . $properties['avatar']);
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/m_" . $properties['avatar']);
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/t_" . $properties['avatar']);
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/a_" . $properties['avatar']);
				}
				foreach ($properties['photos'] as $pkey => $pvalue) {
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/l_" . $pvalue);
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/m_" . $pvalue);
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/t_" . $pvalue);
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/a_" . $pvalue);
				}
				foreach ($properties['videos'] as $pkey => $pvalue) {
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/" . $pvalue);
				}
				foreach ($properties['files'] as $pkey => $pvalue) {
					unlink(ROOT_PATH . "upload/" . $this->store_id . "/products/" . $pvalue);
				}				
			}
		}
		$result = $this->delete("`store_id` = '" . $this->store_id . "' AND `status` = " . S_DELETED);
		if ($result) return 1;
		return 0;
	}
	function increaseViewed($viewed, $pId)
	{
		$sql = $this->update(array('viewed' => $viewed), "id='$pId'");
		if ($sql) return 1;
		return 0;
	}
	# Return a Product Id from provided ID
	function getIdFromSlug($slug = '')
	{
		if (!$slug) return 0;
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND slug = '$slug'");
		if ($result) return $result[0]['id'];
		return 0;
	}
	# Return a Product Id from provided ID
	function getIdFromName($name = '')
	{
		if (!$name) return 0;
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND name = '$name'");
		if ($result) return $result[0]['id'];
		return 0;
	}

	# Return a Product Name from provided slug
	function getNameFromSlug($slug = '')
	{
		if (!$slug) return '';
		$result = $this->select('name', "`store_id` = '" . $this->store_id . "' AND slug = '$slug'");
		if ($result) return $result[0]['name'];
		return '';
	}

	# Return a Product slug from provided ID
	function getSlugFromId($id = '')
	{
		if (!$id) return '';
		$result = $this->select('slug', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result) return $result[0]['slug'];
		return '';
	}

	# Return a Product name from provided ID
	function getNameFromId($id = '')
	{
		if (!$id) return '';
		$result = $this->select('name', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result) return $result[0]['name'];
		return '';
	}

	function checkDuplicate($value = '', $key = 'name', $condition = '')
	{
		$result = $this->select("`$key`", "`store_id` = '" . $this->store_id . "' AND `$key` = '$value'" . ($condition ? " AND $condition" : ''));
		if ($result) return 1;
		return 0;
	}

	# Return a Product name from provided ID
	function getCatIdFromId($id = '')
	{
		if (!$id) return '';
		$result = $this->select('category_id', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result) return $result[0]['category_id'];
		return '';
	}
	function getProductFromPid($pId)
	{
		$results = $this->select('*', "`store_id` = '" . $this->store_id . "' AND status =1 AND `category_id`=$pId", array('date_created' => 'DESC'),  $start, '');
		if ($results) {
			$productInfos = array();
			foreach ($results as $key => $result) {
				$productInfos[] = new ProductInfo(

					$result['service_type'],
					$result['operating_system'],
					$result['storage_capacity'],
					$result['ram'],
					$result['cpu'],
					$result['bandwidth'],
					$result['ip_address'],
					$result['web_server'],
					$result['control_panel'],
					$result['php_version'],
					$result['framework'],
					$result['mysql_db_type'],
					$result['ssl_certificate'],
					$result['backup'],
					$result['ddos_protection'],
					$result['uptime_commitment'],
					$result['allowed_accounts'],
					$result['mailbox_storage'],
					$result['max_attachment_size'],
					$result['send_limit'],
					$result['dedicated_ip'],
					$result['supported_protocol'],
					$result['webmail'],
					$result['has_encryption'],
					$result['dns_config'],
					$result['spam_filter'],
					$result['smart_screen'],
					$result['windows_hardware'],
					$result['supported_platform'],
					$result['storage'],
					$result['time_tamping'],
					$result['supported_format'],
					$result['compliance_standard'],
					$result['highlight_feature_ids'],
					$result['product_feature_ids'],
					$result['reissue_policy'],
					$result['server_licenses'],
					$result['browser_compatibility'],
					$result['vulnerability_scan'],
					$result['malware_scan'],
					$result['wildcard_support'],
					$result['san_support'],
					$result['algorithm'],
					$result['encryption_strength'],
					$result['green_bar'],
					$result['issuance_time'],
					$result['warranty_amount'],
					$result['trust_seal_type'],
					$result['validation_level'],
					$result['key_features'],
					$result['features'],
					$result['period'],
					$result['price'],
					$result['file_ids'],
					$result['category_name'],
					$result['availability'],
					$result['expiration_date'],
					$result['home'],
					$result['status'],
					$result['properties'],
					$result['position'],
					$result['date_updated'],
					$result['date_created'],
					$result['viewed'],
					$result['avatar'],
					$result['detail'],
					$result['description'],
					$result['keyword'],
					$result['name'],
					$result['slug'],
					$result['category_id'],
					$result['store_id'],
					$result['id']
				);
				end($productInfos)->setOpeningStock($result['opening_stock']);
			}
			return $productInfos;
		}
		return '';
	}

	function searchCustomField($kw)
	{
		$sql = "
			SELECT p.id
			FROM dc_products p
			LEFT JOIN dc_custom_options_structure cf 
				ON cf.module = 'product' 
				AND cf.status = 1 
			JOIN dc_custom_options_value cfv 
				ON p.id = cfv.key_id 
				AND cf.id = cfv.field_id 
				AND cfv.field_value LIKE '%" . $kw . "%'
			GROUP BY p.id
			ORDER BY p.id DESC
		";

		$result = $this->_db->query($sql);

		if (!$result) {
			return false;
		}

		if ($result->num_rows == 0) {
			return false;
		}

		$ids = [];
		while ($row = $result->fetch_assoc()) {
			$ids[] = $row['id'];
		}

		return "(" . implode(",", $ids) . ")";
	}

	# handle for pagination
	public function countByCondition($condition = '1>0') {
		$sql = "
			SELECT COUNT(*) AS c
			FROM " . DB_PREFIX . "products p
			LEFT JOIN " . DB_PREFIX . "product_categories c
			ON p.category_id = c.id
			WHERE p.store_id = '" . $this->store_id . "' AND $condition
		";
		$rows = $this->query($sql);          
		return (int)($rows[0]['c'] ?? 0);
	}

	public function distinctWeights($condition = '1>0') {
		$sql = "
			SELECT DISTINCT TRIM(p.`weight`) AS w
			FROM " . DB_PREFIX . "products p
			LEFT JOIN " . DB_PREFIX . "product_categories c
			ON p.category_id = c.id
			WHERE p.store_id = '" . $this->store_id . "'
			AND $condition AND TRIM(p.`weight`) <> ''
			ORDER BY w ASC
		";
		$rows = $this->query($sql);
		return $rows ? array_column($rows, 'w') : [];
	}

	# get upload ids from these fields
	protected $uploadFields = [
		'Avatar',     // 1 upload id <==> getAvatar()
		'FileIds',    // csv upload ids
	];

	public function getTrashUploadIds()
	{
		$uploadIds = [];

		$trashProducts = $this->getObjects(1,"p.`status` = " . S_DELETED,[],100000);

		if (!$trashProducts) return [];

		foreach ($trashProducts as $product) {
			foreach ($this->uploadFields as $field) {

				$getter = 'get' . ucfirst($field);
				if (!method_exists($product, $getter)) continue;

				$value = $product->$getter();
				if (!$value) continue;

				if (is_numeric($value)) {
					$uploadIds[] = (int)$value;
				} elseif (is_string($value)) {
					$ids = array_map('intval', explode(',', $value));
					$uploadIds = array_merge($uploadIds, $ids);
				}
			}
		}

		return array_values(
			array_unique(
				array_filter($uploadIds)
			)
		);
	}

}
