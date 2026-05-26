<?php
/*************************************************************************
Class Customers
----------------------------------------------------------------
BiDo.vn Project
Company: Derasoft Co., Ltd
Last updated: 09/09/2011
Coder: Tran Thi My Xuyen
**************************************************************************/
include_once(ROOT_PATH."classes/database/model.class.php");
include_once(ROOT_PATH."classes/dao/customerinfo.class.php");

class Customers extends Model {
	public $table;
	public $_db;
	private $store_id;
	
	public function __construct($store_id = 0, $database = '') {
		if(!$database) {
			global $db;
			$this->_db = $db;
		} else $this->_db = $database;
		$this->table = DB_PREFIX."customers";
		$this->store_id = $store_id;
	}
	public function Customers($store_id = 0, $database = '') {
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
			$object = new CustomerInfo
						(	$result[0]['type'],
							$result[0]['username'],
							$result[0]['password'],
							$result[0]['fullname'],
							$result[0]['position'],
							$result[0]['company_code'],
							$result[0]['company_name'],
							$result[0]['abbreviations'],
							$result[0]['tax_code'],
							$result[0]['address'],
							$result[0]['debit_balance'],
							$result[0]['credit_balance'],
							$result[0]['bad_dept_limit'],
							$result[0]['website'],
							$result[0]['TKNganhang'],
							$result[0]['sotaikhoan'],
							$result[0]['chutaikhoan'],
							$result[0]['note'],
							$result[0]['tel'],
							$result[0]['fax'],
							$result[0]['email'],
							$result[0]['group_id'],
							$result[0]['details'],
							$result[0]['start_hopdong'],
							$result[0]['finish_hopdong'],
							$result[0]['properties'],
							$result[0]['status'],
							$result[0]['date_created'],
							$result[0]['date_updated'],
							$result[0]['last_login'],
							$result[0]['foundings'],
							$result[0]['customer_Type'],
							$result[0]['HCNS_id'],
							$result[0]['area_id'],
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
				$objects[] = new CustomerInfo
								(	
									$result['type'],
									$result['username'],
									$result['password'],
									$result['fullname'],
									$result['position'],
									$result['company_code'],
									$result['company_name'],
									$result['abbreviations'],
									$result['tax_code'],
									$result['address'],
									$result['debit_balance'],
									$result['credit_balance'],
									$result['bad_dept_limit'],
									$result['website'],
							    $result['TKNganhang'],
							    $result['sotaikhoan'],
									$result['chutaikhoan'],
									$result['note'],
									$result['tel'],
									$result['fax'],
									$result['email'],
									$result['group_id'],
									$result['details'],
									$result['start_hopdong'],
							    $result['finish_hopdong'],
									$result['properties'],
									$result['status'],
									$result['date_created'],
									$result['date_updated'],
									$result['last_login'],
									$result['foundings'],
									$result['customer_Type'],
									$result['HCNS_id'],
									$result['area_id'],
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
	public function getCustomerId($condition = '1=1') {
		$result = $this->select('`id`',"`store_id` = '".$this->store_id."' AND $condition");
		if($result) return $result[0]['id'];
		return 0;
	}
	# Update record
	public function updateData($fields, $value = '', $key = 'id') {
		$result = $this->update($fields,"`store_id` = '".$this->store_id."' AND `$key` = '$value'");
		if($result)
			return $result;
		return 0;
	}

	# Change status
	public function changeStatus($id = 0, $status = '') {
		if(!$id) return 0;
		if($this->update(array('status' => $status), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change customer area
	public function changeAreaId($id = 0, $areaId = 0) {
		if(!$id) return 0;
		if($this->update(array('area_id' => $areaId), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	# Change customer position
	public function changePosition($id = 0, $position = 0) {
		if(!$id) return 0;
		if($this->update(array('position' => $position), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}
	
	public function cleanTrashToId($id = 0) {
		if(!$id) return 0;
		$result = $this->delete("`store_id` = '".$this->store_id."' AND `id` = '$id'");
		if($result) return 1;
		return 0;
	}

	# Clean trash
	public function cleanTrash() {
		$result = $this->delete("`store_id` = '".$this->store_id."' AND `status` = ".S_DELETED);
		if($result) return 1;
		return 0;
	}	
	public function changePassword($id = 0, $password = '') {
		if(!$id) return 0;
		if($this->update(array('`password`' => $password), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}	
	public function changeDetails($id = 0, $catId = 0) {
		if(!$id) return 0;
		if($this->update(array('area_id' => $catId), "`store_id` = '".$this->store_id."' AND `id` = '$id'")) return 1;
		return 0;
	}

	# Return a Customer name from provided ID
	public function getFullNameFromId($id='') {
		if(!$id) return '';
		$result = $this->select('fullname',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['fullname'];
		return '';
	}
	# Return a Customer username from provided ID
	public function getCompanyNameFromId($id='') {
		if(!$id) return '';
		$result = $this->select('company_name',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['company_name'];
		return '';
	}

	public function getIdFromTaxcode($tax_code='') {
		if(!$tax_code) return '';
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND `tax_code` = '$tax_code'");
		if($result) return $result[0]['id'];
		return '';
	}	
	
	public function getIdFromNameCus($namecus='') {
		if(!$namecus) return '';
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND `fullname` = '$namecus'");
		if($result) return $result[0]['id'];
		return '';
	}

	public function getIdFromNameDV($namedv='') {
		if(!$namedv) return '';
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND `company_name` = '$namedv'");
		if($result) return $result[0]['id'];
		return '';
	}

	public function getIdFromAbbreviations($abbreviations='') {
		if(!$abbreviations) return '';
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND abbreviations = '$abbreviations'");
		if($result) return $result[0]['id'];
		return '';
	}

	public function getTaxcodeFromAbbreviations($abbreviations='') {
		if(!$abbreviations) return '';
		$result = $this->select('tax_code',"`store_id` = '".$this->store_id."' AND abbreviations = '$abbreviations'");
		if($result) return $result[0]['tax_code'];
		return '';
	}	

	public function getUserNameFromId($id='') {
		if(!$id) return '';
		$result = $this->select('username',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['username'];
		return '';
	}
    # Return a Customer username from provided ID
	public function getIdFromEmail($email='abc') {
		if(!$email) return '';
		$result = $this->select('id',"`store_id` = '".$this->store_id."' AND email = '$email'");
		if($result) return $result[0]['id'];
		return '';
	}		
	public function getEmailFromId($id='') {
		if(!$id) return '';
		$result = $this->select('email',"`store_id` = '".$this->store_id."' AND id = '$id'");
		if($result) return $result[0]['email'];
		return '';
	}	
/*-----------------------------------------------------------------------*
* public function: CheckDuplicate
* Parameter: Info object
* Return: 1 if key already exists, 0 if not exists
*------------------------------------------------------------------------*/
	public function checkDuplicate($value = '', $key = 'username', $condition = '') {
		$result = $this->select("`$key`,`id`","`store_id` = '".$this->store_id."' AND `$key` = '$value'".($condition?" AND $condition":''));
		if($result) return $result[0]['id'];
		return 0;
	}
	public function getUsername($condition = '1=1') {
		$result = $this->select('`username`',"`store_id` = '".$this->store_id."' AND $condition");
		if($result) return $result[0]['username'];
		return '';
	}
	public function authenticateUser($username,$password) {
		if(!$username || !$password) return 0;
		$username = str_replace(" ",'',$username);
		$username = str_replace("\\",'',$username);
		$username = str_replace("\"",'',$username);
		$username = str_replace("'",'',$username);	
		$password = md5($password);
		$result = $this->select('`id`,`status`',"`store_id` = '".$this->store_id."' AND `username` = '$username' AND `password` = '$password'");# AND `status` = 1");
		if($result) { # User o trang thai kich hoat, cho phep dang nhap
			if($result[0]['status'] == 1) {
				$last_login = array('last_login'=>date("Y-m-d H:i:s"));
				$this->update($last_login,"`id`='".$result[0]['id']."'");
				return $result[0]['id'];
			} else return '-1';
		}
		return 0;
	}
	public function authenticateUserAdmin($username,$password) {
		if(!$username || !$password) return 0;
		$username = str_replace(" ",'',$username);
		$username = str_replace("\\",'',$username);
		$username = str_replace("\"",'',$username);
		$username = str_replace("'",'',$username);
		$password = md5($password);
		$result = $this->select('`id`',"`store_id` = '".$this->store_id."' AND `username` = '$username' AND `password` = '$password' AND type >= '".U_MERCHANT."'");
		if($result) {
			$last_login = array('last_login'=>date("Y-m-d H:i:s"));
			$this->update($last_login,"`id`='".$result[0]['id']."'");
			return $result[0]['id'];
		}
		return 0;
	}
	function getAllCustomerFromUserid($pId) {
		$results = $this->select("id", "`details` = '$pId'");
		if($results) {
			$categoryInfos = array();
			foreach($results as $key => $result) {
				$a= $result['id'];
				$categoryInfos[]=$result['id'];
			$results1 = $this->select("id", " `details` = '$a'");	
			foreach($results1 as $key => $result_1) {
					$b = $result_1['id'];
					$categoryInfos[]=$result_1['id'];
					$results2 = $this->select("id", " `details` = '$b'");					
			foreach($results2 as $key => $result_2) {
				$c = $result_2['id'];
				$categoryInfos[]=$result_2['id'];
					$results3 = $this->select("id", " `details` = '$c'");
			foreach($results3 as $key => $result_3) {
					$d=$result_3['id'];
					$categoryInfos[]=$result_3['id'];
				
			}
			}		
			}
			}
			if($pId){
			return implode(",",$categoryInfos).",$pId";
			}else{
				return implode(",",$categoryInfos);
			}
			
		}
		return($pId);
	}
}
?>