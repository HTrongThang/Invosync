<?php
/*************************************************************************
Class Articles
----------------------------------------------------------------
DeraCMS 3.0 Project
Company: Derasoft Co., Ltd
Last updated: 09/09/2011
Coder: Mai Minh
Checked by: Mai Minh (10/05/2012)
**************************************************************************/
include_once(ROOT_PATH."classes/database/model.class.php");
include_once(ROOT_PATH."classes/dao/warehouseinfo.class.php");

class WareHouse extends Model {
	public $table;
	public $_db;
	private $store_id;
	
	public function __construct($store_id = 0, $database = '') {
		if(!$database) {
			global $db;
			$this->_db = $db;
		} else $this->_db = $database;
		$this->table = DB_PREFIX."warehouse";
		$this->store_id = $store_id;
	}
	public function WareHouse($store_id = 0, $database = '') {
		$this->__construct($store_id, $database);
	}

/* Common methods
/*-----------------------------------------------------------------------*
* public function: getObject
* Parameter: key
* Return: Info object
*-----------------------------------------------------------------------*/
	public function getObject($value = '0', $key = 'id', $condition = '1>0') {
		if(!$key || !$value) return '';
		$result = $this->select('*', "`store_id` = '".$this->store_id."' AND `$key` = '$value' AND ($condition)");
		if($result) {
			$object = new WareHouseInfo
						(	$result[0]['name'],
							$result[0]['address'],
							$result[0]['masothue_kh'],
							$result[0]['address_kh'],
							$result[0]['phuongxa_kh'],
							$result[0]['quanhuyen_kh'],
							$result[0]['tinhthanh_kh'],
							$result[0]['status'],
							$result[0]['note'],
							$result[0]['properties'],
							$result[0]['date_created'],
							$result[0]['status_inv'],
							$result[0]['status_out'],
							$result[0]['status_default'],
							$result[0]['email_warehouse'],
							$result[0]['cat_id'],
							$result[0]['store_id'],
							$result[0]['id']
						);
			return $object;
		}
		return 0;
	}
/*-----------------------------------------------------------------------*
* public function: getObjects
* Parameter: WHERE condition
* Return: Array of Info objects
*-----------------------------------------------------------------------*/
	public function getObjects($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE) {
		if(!$page) $page = 1;
		$start = ($page -1) * $items_per_page;
		$results = $this->select('*', "`store_id` = '".$this->store_id."' AND $condition", $sort, $start, $items_per_page);
		if($results) {
			$objects = array();
			foreach($results as $key => $result) {
				$objects[] = new WareHouseInfo
								(	$result['name'],
									$result['address'],
									$result['masothue_kh'],
									$result['address_kh'],
									$result['phuongxa_kh'],
									$result['quanhuyen_kh'],
									$result['tinhthanh_kh'],
									$result['status'],
									$result['note'],
									$result['properties'],
									$result['date_created'],
									$result['status_inv'],
									$result['status_out'],
									$result['status_default'],
									$result['email_warehouse'],
									$result['cat_id'],
									$result['store_id'],
									$result['id']
								);
			}
			return $objects;
			
		}
		return 0;
	}

/*-----------------------------------------------------------------------*
* public function: updateData
* Parameter: Info object
* Return: 1 if success, 0 if fail
*-----------------------------------------------------------------------*/	
	# Add record
	public function addData($fields,$key = 'id') {
		$result = $this->add($fields,'$key','NULL');
		if($result) return $result;
		return 0;
	}

	# Update record
	public function updateData($fields, $value = '', $key = 'id') {
		$result = $this->update($fields,"`store_id` = '".$this->store_id."' AND `$key` = '$value'");
		if($result)
			return $result;
		return 0;
	}

	public function cleanTrashToId($id = 0) {
		if(!$id) return 0;
		$result = $this->delete("`store_id` = '".$this->store_id."' AND `id` = '$id'");
		if($result) return 1;
		return 0;
	}

	# Change status
	public function changeStatus($id = 0, $status = '') {
		if(!$id) return 0;
		if($this->update(array('status' => $status), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	# Change status default
	public function changeStatusDefault($id = 0, $status = '') {
		if(!$id) return 0;
		if($this->update(array('status_default' => $status), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	public function changeStatusInv($id = 0, $status_inv = '') {
		if(!$id) return 0;
		if($this->update(array('status_inv' => $status_inv), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	public function changeStatusOut($id = 0, $status_out = '') {
		if(!$id) return 0;
		if($this->update(array('status_out' => $status_out), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	# Change home
	public function changeHome($id = 0, $home = '') {
		if(!$id) return 0;
		if($this->update(array('home' => $home), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	# Change banner
	public function changeBanner($id = 0, $banner = '') {
		if(!$id) return 0;
		if($this->update(array('banner' => $banner), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change article category
	public function changeCatId($id = 0, $catId = 0) {
		if(!$id) return 0;
		if($this->update(array('cat_id' => $catId), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change article position
	public function changePosition($id = 0, $position = 0) {
		if(!$id) return 0;
		if($this->update(array('position' => $position), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	# Clean trash
	public function cleanTrash() {
		$results = $this->select('*', "`store_id` = '".$this->store_id."' AND `status` = ".S_DELETED);
		if($results) {
			$objects = array();
			foreach($results as $key => $result) {
				$properties = unserialize($result['properties']);
				$avalue = $properties['avatar'];
				if($properties['avatar']) {
					unlink(ROOT_PATH."upload/".$this->store_id."/articles/l_".$properties['avatar']);
					unlink(ROOT_PATH."upload/".$this->store_id."/articles/a_".$properties['avatar']);
				}
				foreach($properties['photos'] as $pkey => $pvalue) {
					unlink(ROOT_PATH."upload/".$this->store_id."/articles/l_".$pvalue);
					unlink(ROOT_PATH."upload/".$this->store_id."/articles/a_".$pvalue);					
				}
				foreach($properties['videos'] as $pkey => $pvalue) {
					unlink(ROOT_PATH."upload/".$this->store_id."/articles/".$pvalue);					
				}
				foreach($properties['files'] as $pkey => $pvalue) {
					unlink(ROOT_PATH."upload/".$this->store_id."/articles/".$pvalue);					
				}
			}
		}	
		$result = $this->delete("`store_id` = '".$this->store_id."' AND `status` = ".S_DELETED);
		if($result) return 1;
		return 0;
	}	
		
	# Return a Article Id from provided ID
	public function getIdFromSlug($slug='') {
		if(!$slug) return 0;
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND slug = '$slug'");
		if($result) return $result[0]['id'];
		return 0;
	}


	# Return 
	public function getIdFromStatusInv($status_inv='') {
		if(!$slug) return 0;
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND status_inv = '$status_inv'");
		if($result) return $result[0]['id'];
		return 0;
	}

	# Return a Article Name from provided slug
	public function getNameFromId($id='') {
		if(!$id) return '';
		$result = $this->select('name',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['name'];
		return '';
	}

	# Return a Article Name from provided slug
	public function getAddressFromId($id='') {
		if(!$id) return '';
		$result = $this->select('address',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['address'];
		return '';
	}

	# Return a Article Name from provided slug
	public function getTaxCodeReceiFromId($id='') {
		if(!$id) return '';
		$result = $this->select('masothue_kh',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['masothue_kh'];
		return '';
	}

	# Return a Article Id from name
	public function getIdFromName($name='') {
		if(!$name) return 0;
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND name = '$name'");
		if($result) return $result[0]['id'];
		return 0;
	}


/*-----------------------------------------------------------------------*
* public function: CheckDuplicate
* Parameter: Info object
* Return: 1 if key already exists, 0 if not exists
*------------------------------------------------------------------------*/
	public function checkDuplicate($value = '', $key = 'title', $condition = '') {
		$result = $this->select("`$key`","`store_id` = '".$this->store_id."' AND `$key` = '$value'".($condition?" AND $condition":''));
		if($result) return 1;
		return 0;
	}

	# Return a Article name from provided ID
	public function getCatIdFromId($id='') {
		if(!$id) return '';
		$result = $this->select('cat_id',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['cat_id'];
		return '';
	}

	public function generateCombos($value='', $noroot = 0) {
		global $amessages;
		$combo = '';
		if(!$noroot) $combo = '<option value="0"'.($value=='0'?" selected":"").'>'.$amessages['root'].'</option>';
		$results = $this->select('id,name',"`store_id` = '".$this->store_id."' ");
		if($results) {
			foreach($results as $key => $result) {
				$combo .= "<option value='".$result['id']."'".($value==$result['id']?" selected":"").">&nbsp;&nbsp;&nbsp;l--".$result['name']."</option>";	
				$s1results = $this->select('id,name',"`store_id` = '".$this->store_id."'");
				if($s1results) {
					foreach($s1results as $key1 => $result1) {
						$combo .= "<option value='".$result1['id']."'".($value==$result1['id']?" selected":"").">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l--".$result1['name']."</option>";
					}
				}			
			}
		}
		return $combo;
	}
}
?>