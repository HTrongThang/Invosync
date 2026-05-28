<?php
include_once(ROOT_PATH.'classes/database/model.class.php');
include_once(ROOT_PATH.'classes/dao/salechannelinfo.class.php');

class SaleChannels extends Model {
	var $table;
	var $_db;
	var $store_id;
	
	function __construct($store_id = 0, $database = '') {
		if(!$database) {
			global $db;
			$this->_db = $db;
		} else $this->_db = $database;
		
		$this->table = DB_PREFIX."sale_channels";
		$this->store_id = $store_id;
	}

	function getObject($value = '0', $key = 'id', $condition = '1>0') {
		$result = $this->select('*', "(`store_id` = '".$this->store_id."' or `store_id`=0) AND `$key` = '$value' AND ($condition)");
		if($result) {
			$object = new SaleChannelInfo(
				$result[0]['name'],
				$result[0]['description'],
				$result[0]['status'],
				$result[0]['position'],
				$result[0]['properties'],
				$result[0]['date_created'],
				isset($result[0]['status_default']) ? $result[0]['status_default'] : 0,
				$result[0]['store_id'],
				$result[0]['id']
			);
			return $object;
		}
		return null;
	}

	function getObjects($page = 1, $condition = '1>0', $sort = array(), $items_per_page = 999999) {
		if(!$page) $page = 1;
		$start = ($page -1) * $items_per_page;
		$results = $this->select('*', "(`store_id` = '".$this->store_id."' or `store_id`=0) AND $condition", $sort, $start, $items_per_page);
		if($results) {
			$objects = array();
			foreach($results as $key => $result) {
				$objects[] = new SaleChannelInfo(
					$result['name'],
					$result['description'],
					$result['status'],
					$result['position'],
					$result['properties'],
					$result['date_created'],
					isset($result['status_default']) ? $result['status_default'] : 0,
					$result['store_id'],
					$result['id']
				);
			}
			return $objects;
		}
		return null;
	}

	function addData($object, $key = 'id') {
		return $this->add($object, '$key', 'NULL');
	}

	function updateData($object, $value = '', $key = 'id') {
		return $this->update($object, "(`store_id` = '".$this->store_id."' or `store_id`=0) AND `$key` = '$value'");
	}
	
	function changeStatus($id = 0, $status = '') {
		if(!$id) return 0;
		if($this->update(array('status' => $status), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	
	function cleanTrash() {
		$result = $this->delete("`store_id` = '".$this->store_id."' AND `status` = 2");
		if($result) return 1;
		return 0;
	}	

	function getNameFromId($id='0') {
		if(!$id) return '';
		$result = $this->select('name'," id = '$id'");
		if($result) return $result[0]['name'];
		return '';
	}

	function checkDuplicate($value = '', $key = 'name', $condition = '') {
		$result = $this->select("`$key`", "(`store_id` = '".$this->store_id."' or `store_id`=0) AND `$key` = '$value'".($condition?" AND $condition":''));
		if($result) return 1;
		return 0;
	}
}
?>
