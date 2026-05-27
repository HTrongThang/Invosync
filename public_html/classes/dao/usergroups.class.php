<?php
/*************************************************************************
Class Users
----------------------------------------------------------------
BiDo.vn Project
Company: Derasoft Co., Ltd                                  
Email: info@derasoft.com
Author: Mai Minh
Last updated: 06/19/2010
**************************************************************************/
/* Edit log:
- 30/09/2009 08:00 - Mai Minh: Initialize
*/

include_once(ROOT_PATH."classes/database/model.class.php");
include_once(ROOT_PATH."classes/dao/usergroupinfo.class.php");

class UserGroups extends Model {
	public $table;
	public $_db;
	private $store_id;
	
	public function __construct($store_id = 0, $database = '') {
		if(!$database) {
			global $db;
			$this->_db = $db;
		} else $this->_db = $database;
		$this->table = DB_PREFIX."user_group";
		$this->store_id = $store_id;
	}	
	public function UserGroups($store_id = 0, $database = '') {
		$this->__construct($store_id, $database);
	}	
/* Common methods
/*-----------------------------------------------------------------------*
* public function: getObject
* Parameter: key
* Return: Info object
*-----------------------------------------------------------------------*/
	public function getObject($value = '0', $key = 'id') {
		if(!$key || !$value) return '';
		$result = $this->select('*',"`store_id` = '".$this->store_id."' AND `$key` = '$value'");
		if($result) {
			$object = new UserGroupInfo
						(	$result[0]['store_id'],
							$result[0]['name'],
							$result[0]['slug'],
							$result[0]['status'],
							$result[0]['date_created'],
							$result[0]['date_updated'],
							$result[0]['user_created'],
							$result[0]['level'],
							$result[0]['color'],
							$result[0]['properties'],
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
	public function getObjects($page = 1, $condition = '`id` = 0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE) {
		if(!$page) $page = 1;
		$start = ($page -1) * $items_per_page;
		$results = $this->select('*',"`store_id` = '".$this->store_id."' AND $condition", $sort, $start, $items_per_page);
		if($results) {
			$objects = array();
			foreach($results as $key => $result) {
				$objects[] = new UserGroupInfo
						(	$result['store_id'],
							$result['name'],
							$result['slug'],
							$result['status'],
							$result['date_created'],
							$result['date_updated'],
							$result['user_created'],
							$result['level'],
							$result['color'],
							$result['properties'],
 							$result['id']
								);
			}
			return $objects;
		}
		return 0;
	}
/*-----------------------------------------------------------------------*
* public function: CheckDuplicate
* Parameter: Info object
* Return: 1 if key already exists, 0 if not exists
*------------------------------------------------------------------------*/
	public function checkDuplicate($value = '', $key = 'slug', $condition = '') {
		$value = str_replace(" ",'',$value);
		$value = str_replace("\\",'',$value);
		$value = str_replace("\"",'',$value);
		$value = str_replace("'",'',$value);
		$result = $this->select("`$key`",($this->store_id?"`store_id` = '".$this->store_id."' AND ":'')."`$key` = '$value'".($condition?" AND $condition":''));
		if($result) return 1;
		return 0;
	}	
/*-----------------------------------------------------------------------*
* public function: addData
* Parameter: Info object
* Return: 1 if success, 0 if fail
*-----------------------------------------------------------------------*/	
	public function addData($fields,$key = 'id') {
		$result = $this->add($fields,'$key','NULL');
		if($result)
			return $result;
		return 0;
	}	
/*-----------------------------------------------------------------------*
* public function: updateData
* Parameter: Info object
* Return: 1 if success, 0 if fail
*-----------------------------------------------------------------------*/	
	public function updateData($fields, $value = '', $key = 'id') {
		$result = $this->update($fields,"`store_id` = '".$this->store_id."' AND `$key` = '$value'");
		if($result)
			return $result;
		return 0;
	}
	public function changeStatus($id = 0, $status = '') {
		if(!$id) return 0;
		if($this->update(array('status' => $status), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	
	public function cleanTrash() {
		$result = $this->delete('status = '.S_DELETED);
		if($result) return 1;
		return 0;
	}

	public function cleanTrash1($level='') {
		if($level =='') return 0;
		$result = $this->delete('status = '.S_DELETED.' AND `level` <= '.$level);
		if($result) return 1;
		return 0;
	}

/* Special methods	
/*-----------------------------------------------------------------------*
* public function: change password
* Parameter: Info object
* Return: 1 if success, 0 if fail
*-----------------------------------------------------------------------*/	

	public function getNameFromId($id='') {
		if(!$id) return '';
		$result = $this->select('`name`',"`store_id` = '".$this->store_id."' AND `id` = '$id'");
		if($result) return $result[0]['name'];
		return '';
	}

	public function getIdFromName($name='') {
		if(!$name) return '';
		$result = $this->select('`id`',"`store_id` = '".$this->store_id."' AND `name` LIKE '$name'");
		if($result) return $result[0]['id'];
		return '';
	}

	public function getColorFromId($id='') {
		if(!$id) return '';
		$result = $this->select('`color`',"`store_id` = '".$this->store_id."' AND `id` = '$id'");
		if($result) return $result[0]['color'];
		return '';
	}
	public function getLevelFromId($id='') {
		if(!$id) return '';
		$result = $this->select('`level`',"`store_id` = '".$this->store_id."' AND `id` = '$id'");
		if($result) return $result[0]['level'];
		return '';
	}

	public function getPropertyFromId($key,$id='')
	{
		if(!$id) return '';
		$result = $this->select('`properties`',"`store_id` = '".$this->store_id."' AND `id` = '".$id."'");
		$result_key = unserialize($result[0][0])[$key] ;
		if($result) return $result_key;
		return '';
	}
	
	public function generateCombo($value='', $condition = "`status` = 1") {
		$combo = '';
		$results = $this->select('`id`,`name`',"`store_id` = '".$this->store_id."' AND $condition", array('id'=>'ASC'));
		if($results) {
			foreach($results as $key => $result) {
				$combo .= "<option value='".$result['id']."'".($value==$result['id']?" selected":"").">".$result['name']."</option>";	
			}
		}
		return $combo;
	}


	function generateHCNSCombo($value='') {
		global $amessages;
		$combo = '';
		$results = $this->select('`id`,`name`',"`store_id` = '".$this->store_id."' AND `status`='1'");
		if($results) {
			foreach($results as $key => $result) {
				$combo .= "<option value='".$result['id']."'".($value==$result['id']?" selected":"").">".$result['name']."</option>";	
			}
		}
		return $combo;
	}
	public function getName($condition = '1=1') {
		$result = $this->select('`name`',"`store_id` = '".$this->store_id."' AND $condition");
		if($result) return $result[0]['name'];
		return '';
	}
}
?>