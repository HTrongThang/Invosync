<?php

/*************************************************************************
Class OrderItems
----------------------------------------------------------------
BiDo.vn Project
Last updated: 07/11/2010
Author: Mai Minh (http://maiminh.vnweblogs.com)
 **************************************************************************/
include_once(ROOT_PATH . "classes/database/model.class.php");
include_once(ROOT_PATH . "classes/dao/invoicenewiteminfo.class.php");

class InvoiceNewItem extends Model
{
	var $table;
	var $_db;
	var $store_id;

	function __construct($store_id, $database = '')
	{
		if (!$database) {
			global $db;
			$this->_db = $db;
		} else $this->_db = $database;
		$this->table = DB_PREFIX . "invoicenew_item";
		$this->store_id = $store_id;
	}
	function InvoiceNewItem($store_id, $database = '')
	{
		$this->__construct($store_id, $database);
	}
	/* Common methods
/*-----------------------------------------------------------------------*
* Function: getObject
* Parameter: key
* Return: Info object
*-----------------------------------------------------------------------*/
	function getObject($value = '0', $key = 'id', $condition = '1>0')
	{
		if (!$key || !$value) return '';
		$result = $this->select('*', "`store_id` = '" . $this->store_id . "' AND `$key` = '$value' AND ($condition)");
		// $result = $this->select('*', "`$key` = '$value' AND ($condition)");
		if ($result) {
			$object = new InvoiceNewItemInfo(
				$result[0]['ma_sp'],
				$result[0]['name'],
				$result[0]['dvt'],
				$result[0]['quantity'],
				$result[0]['price'],
				$result[0]['thuedv'],
				$result[0]['pricedv'],
				$result[0]['vat'],
				$result[0]['price_vat'],
				$result[0]['chietkhau'],
				$result[0]['khuyenmai'],
				$result[0]['hangHoaDacTrung'],
				$result[0]['properties'],
				$result[0]['status'],
				$result[0]['date_cretead'],
				$result[0]['id_product'],
				$result[0]['id_iv'],
				$result[0]['store_id'],
				$result[0]['id']
			);
			return $object;
		}
		return 0;
	}




	function getObjectFromOrderId($value = '0', $key = 'store_id', $condition = '1>0')
	{
		if (!$key || !$value) return '';
		$result = $this->select('*', "`$key` = '$value' AND ($condition)");
		// $result = $this->select('*', "`$key` = '$value' AND ($condition)");
		if ($result) {
			$objectf = new InvoiceNewItemInfo(
				$result[0]['ma_sp'],
				$result[0]['name'],
				$result[0]['dvt'],
				$result[0]['quantity'],
				$result[0]['price'],
				$result[0]['thuedv'],
				$result[0]['pricedv'],
				$result[0]['vat'],
				$result[0]['price_vat'],
				$result[0]['chietkhau'],
				$result[0]['khuyenmai'],
				$result[0]['hangHoaDacTrung'],
				$result[0]['properties'],
				$result[0]['status'],
				$result[0]['date_cretead'],
				$result[0]['id_product'],
				$result[0]['id_iv'],
				$result[0]['store_id'],
				$result[0]['id']
			);
			return $objectf;
		}
		return 0;
	}
	/*-----------------------------------------------------------------------*
* Function: getObjects
* Parameter: WHERE condition
* Return: Array of Info objects
*-----------------------------------------------------------------------*/
	function getObjects($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page) $page = 1;
		$start = ($page - 1) * $items_per_page;
		$results = $this->select('*', "`store_id` = '" . $this->store_id . "' AND $condition", $sort, $start, $items_per_page);
		if ($results) {
			$objects = array();
			foreach ($results as $key => $result) {
				$objects[] = new InvoiceNewItemInfo(
					$result['ma_sp'],
					$result['name'],
					$result['dvt'],
					$result['quantity'],
					$result['price'],
					$result['thuedv'],
					$result['pricedv'],
					$result['vat'],
					$result['price_vat'],
					$result['chietkhau'],
					$result['khuyenmai'],
					$result['hangHoaDacTrung'],
					$result['properties'],
					$result['status'],
					$result['date_cretead'],
					$result['id_product'],
					$result['id_iv'],
					$result['store_id'],
					$result['id']
				);
			}
			return $objects;
		}
		return '';
	}


	function getFirstObjectFromIdParent($iv = 0)
	{
		if (!$iv) return 0;
		$result = $this->select('*', "`store_id` = '" . $this->store_id . "' AND `id_iv` = '" . $iv . "'ORDER BY `id` LIMIT 1");
		if ($result) {
			$object = new InvoiceNewItemInfo(
				$result[0]['ma_sp'],
				$result[0]['name'],
				$result[0]['dvt'],
				$result[0]['quantity'],
				$result[0]['price'],
				$result[0]['thuedv'],
				$result[0]['pricedv'],
				$result[0]['vat'],
				$result[0]['price_vat'],
				$result[0]['chietkhau'],
				$result[0]['khuyenmai'],
				$result[0]['hangHoaDacTrung'],
				$result[0]['properties'],
				$result[0]['status'],
				$result[0]['date_cretead'],
				$result[0]['id_product'],
				$result[0]['id_iv'],
				$result[0]['store_id'],
				$result[0]['id']
			);
			return $object;
		}
		return 0;
	}




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
		$result = $this->update($fields, "`$key` = '$value'");
		if ($result)
			return $result;
		return 0;
	}

	# Delete record
	function DeleteData1($value = '', $key = 'id')
	{
		if (!$value) return 0;
		$result = $this->delete("`store_id` = '" . $this->store_id . "' AND `$key` = '$value'");
		if ($result) return 1;
		return 0;
	}

	# Delete record
	function DeleteData($iv = 0, $ip = 0)
	{
		$result = $this->delete("`store_id` = '" . $this->store_id . "' AND `id_iv` = '" . $iv . "' AND `id_product` = '" . $ip . "'");
		if ($result)
			return $result;
		return 0;
	}

	public function cleanTrashToId($id = 0)
	{
		if (!$id) return 0;
		$result = $this->delete("`store_id` = '" . $this->store_id . "' AND `id` = '$id'");
		if ($result) return 1;
		return 0;
	}

	function getIdFromIvAndProduct($iv = 0, $ip = 0)
	{
		if (!$iv) return 0;
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `id_iv` = '" . $iv . "' AND `id_product` = '" . $ip . "'");
		if ($result) return $result[0]['id'];
		return 0;
	}

	function getAllItemByIdIV($id_iv)
	{
		if (!$id_iv) return 0;
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `id_iv` = '" . $id_iv . "'");

		$array = [];
		foreach ($result as $key => $item) {
			// if($this->store_id == 228){
			// 	var_dump($item[$key]);exit();
			// }

			array_push($array, $item['id']);
		}
		if ($array) return $array;
		return 0;
	}

	function getObjectsGroupBy($page = 1, $condition = '1>0', $sort = array(), $items_per_page = 99999)
	{
		if (!$page) $page = 1;
		$start = ($page - 1) * $items_per_page;
		$results = $this->select('product_id,count(product_id),SUM(quantity)', $condition, $sort, $start, $items_per_page);
		if ($results) return $results;
		return 0;
	}

	function checkDuplicate($value = '', $key = 'name', $condition = '')
	{
		$result = $this->select("`$key`", "`store_id` = '" . $this->store_id . "' AND `$key` = '$value'" . ($condition ? " AND $condition" : ''));
		if ($result) return 1;
		return 0;
	}
}
