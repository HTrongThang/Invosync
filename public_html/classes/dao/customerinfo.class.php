<?php
/*************************************************************************
Class Customer
----------------------------------------------------------------
BiDo.vn Project
Company: Derasoft Co., Ltd
Last updated: 09/09/2011
Coder: Tran Thi My Xuyen
**************************************************************************/
class CustomerInfo {
	public $id;			# Primary key
	private $store_id;		# Estore id
	private $area_id;	
	private $HCNS_id;	# Area id
	private $type;			# Type user
	private $username;
	private $password;
	private $fullname;		# Fullname
	private $position;		
	private $company_code;
	private $company_name;
	private $abbreviations;		
	private $tax_code;		
	private $address;
	private $debit_balance;
	private $credit_balance;
	private $bad_dept_limit;
	private $website;
	private $TKNganhang;
	private $sotaikhoan;
	private $chutaikhoan;	
	private $note;		# Address
	private $tel;			# Tel
	private $fax;	
	private $email;			# Email
	private $group_id;	
	private $details;	
	private $start_hopdong;
	private $finish_hopdong;
	private $properties;		# Properties(about, cel)
	private $status;# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished
	private $date_created;	# Date created
	private $date_updated;
	private $last_login;
	private $foundings;
	private $customer_Type;

	# Constructor
	public function __construct($type, $username, $password, $fullname, $position, $company_code, $company_name,$abbreviations,$tax_code,$address,$debit_balance,$credit_balance,$bad_dept_limit,$website,$TKNganhang, $sotaikhoan, $chutaikhoan, $note, $tel, $fax, $email, $group_id, $details, $start_hopdong, $finish_hopdong, $properties, $status, $date_created,$date_updated, $last_login,$foundings,$customer_Type, $HCNS_id=0, $area_id=0, $store_id = 0, $id = 0)
	{
		$this->id = $id;
		$this->store_id = $store_id;
		$this->area_id = $area_id;
		$this->HCNS_id = $HCNS_id;
		$this->type = $type;
		$this->username = trim($username);
		$this->password = $password;
		$this->fullname = $fullname;
		$this->position = $position;
		$this->company_code = $company_code;
		$this->company_name = $company_name;
		$this->abbreviations = $abbreviations;
		$this->tax_code = $tax_code;
		$this->address = $address;
		$this->debit_balance = $debit_balance;
		$this->credit_balance = $credit_balance;
		$this->bad_dept_limit = $bad_dept_limit;
		$this->website = $website;
		$this->TKNganhang = $TKNganhang;
		$this->sotaikhoan = $sotaikhoan;
		$this->chutaikhoan = $chutaikhoan;
		$this->note = $note;
		$this->tel = $tel;
		$this->fax = $fax;
		$this->email = $email;
		$this->group_id = $group_id;
		$this->details = $details;
		$this->start_hopdong = $start_hopdong;
		$this->finish_hopdong = $finish_hopdong;
		$this->properties = unserialize($properties);
		$this->status = $status;
		$this->date_created = $date_created;
		$this->date_updated = $date_updated;
		$this->last_login = $last_login;
		$this->foundings = $foundings;
		$this->customer_Type = $customer_Type;
		
	}
	public function CustomerInfo($type, $username, $password, $fullname, $position, $company_code, $company_name,$abbreviations,$tax_code,$address,$debit_balance,$credit_balance,$bad_dept_limit,$website,$TKNganhang, $sotaikhoan, $chutaikhoan, $note, $tel, $fax, $email, $group_id, $details, $start_hopdong, $finish_hopdong, $properties, $status, $date_created,$date_updated, $last_login,$foundings,$customer_Type, $HCNS_id=0, $area_id=0, $store_id = 0, $id = 0)
	{
		$this->__construct($type, $username, $password, $fullname, $position, $company_code, $company_name,$abbreviations,$tax_code,$address,$debit_balance,$credit_balance,$bad_dept_limit,$website,$TKNganhang, $sotaikhoan, $chutaikhoan, $note, $tel, $fax, $email, $group_id, $details, $start_hopdong, $finish_hopdong, $properties, $status, $date_created,$date_updated, $last_login,$foundings,$customer_Type, $HCNS_id, $area_id, $store_id, $id);
	}

	public function getSotaikhoan() {
		return $this->sotaikhoan;
	}	
	public function setSotaikhoan($nValue) {
		$this->sotaikhoan=$nValue;
	}

  public function getNote() {
		return $this->note;
	}	
	public function setNote($nValue) {
		$this->note=$nValue;
	}

	public function getChutaikhoan() {
		return $this->chutaikhoan;
	}	
	public function setChutaikhoan($nValue) {
		$this->chutaikhoan=$nValue;
	}

	public function getTaxCode() {
		return $this->tax_code;
	}	
	public function setTaxCode($nValue) {
		$this->tax_code=$nValue;
	}
	public function getDetails() {
		return $this->details;
	}	
	public function setDetails($nValue) {
		$this->details=$nValue;
	}
	public function getFax() {
		return $this->fax;
	}	
	public function setFax($nValue) {
		$this->fax=$nValue;
	}
	public function getIdHCNS() {
		return $this->HCNS_id;
	}	
	public function setIdHCNS($nValue) {
		$this->HCNS_id=$nValue;
	}
	public function getGroupId() {
		return $this->group_id;
	}	
	public function setGroupId($nValue) {
		$this->group_id=$nValue;
	} 
	public function getUserName()
	{
		return $this->username;
	}
	public function setUserName($nValue) {
		$this->username = $nValue;
	}
	public function getPassword()
	{
		return $this->password;
	}
	public function setPassword($nValue) {
		$this->password = $nValue;
	}
	public function getId() {
		return $this->id;
	}	
	public function setId($nValue) {
		$this->id=$nValue;
	}
	public function getStoreId() {
		return $this->store_id;
	}
	public function setStoreId($nValue) {
		$this->store_id=$nValue;
	}
	public function getAreaId() {
		return $this->area_id;
	}
	public function setAreaId($nValue) {
		$this->area_id=$nValue;
	}
	public function getType() {
		return $this->type;
	}
	public function setType($nValue) {
		$this->type=$nValue;
	}
	public function getWebsite() {
		return $this->website;
	}
	public function setWebsite($nValue) {
		$this->website=$nValue;
	}
	public function getTKNganhang() {
		return $this->TKNganhang;
	}
	public function setTKNganhang($nValue) {
		$this->TKNganhang=$nValue;
	}
	public function getPosition() {
		return $this->position;		
	}
	public function setPosition($nValue) {
		$this->position=$nValue;
	}
	public function getCompanyCode() {
		return $this->company_code;		
	}
	public function setCompanyCode($nValue) {
		$this->company_code=$nValue;
	}
	public function getCompanyName() {
		return $this->company_name;		
	}
	public function setCompanyName($nValue) {
		$this->company_name=$nValue;
	}
	public function getAbbreviations() {
		return $this->abbreviations;		
	}
	public function setAbbreviations($nValue) {
		$this->abbreviations=$nValue;
	}
	public function getFoundings() {
		return $this->foundings;		
	}
	public function setFoundings($nValue) {
		$this->foundings=$nValue;
	}
	public function getCustomerType() {
		return $this->customer_Type	;		
	}
	public function setCustomerType($nValue) {
		$this->customer_Type=$nValue;
	}
	public function getFullName() {
		return $this->fullname;		
	}
	public function setFullName($nValue) {
		$this->fullname=$nValue;
	}
	public function getAddress() {
		return $this->address;		
	}
	public function setAddress($nValue) {
		$this->address=$nValue;
	}
	public function getDebitBalance() {
		return $this->debit_balance;		
	}
	public function setDebitBalance($nValue) {
		$this->debit_balance=$nValue;
	}
	public function getCreditBalance() {
		return $this->credit_balance;		
	}
	public function setCreditBalance($nValue) {
		$this->credit_balance=$nValue;
	}
	public function getBadDeptLimit() {
		return $this->bad_dept_limit;		
	}
	public function setBadDeptLimit($nValue) {
		$this->bad_dept_limit=$nValue;
	}
	public function getEmail() {
		return $this->email;		
	}
	public function setEmail($nValue) {
		$this->email=$nValue;
	}
	public function getTel() {
		return $this->tel;		
	}
	public function setTel($nValue) {
		$this->tel=$nValue;
	}
	public function getStartHopdong() {
		return $this->start_hopdong;		
	}
	public function setStartHopdong($nValue) {
		$this->start_hopdong=$nValue;
	}
	public function getFinishHopdong() {
		return $this->finish_hopdong;		
	}
	public function setFinishHopdong($nValue) {
		$this->finish_hopdong=$nValue;
	}
	public function getDateCreated()
	{
		return $this->date_created;
	}
	public function setDateCreated($nValue)
	{
		$this->date_created=$nValue;
	}
	
	public function getProperty($key)
	{
		if(isset($this->properties[$key])) return $this->properties[$key];
		return '';
	}
	public function setProperty($key,$nValue)
	{
		$this->properties[$key]=$nValue;
	}
	
	public function getProperties()
	{
		return $this->properties;
	}
	public function setProperties($nValue)
	{
		$this->properties=$nValue;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($nValue) {
		$this->status = $nValue;
	}
	public function getStatusTextBackend() {
		global $amessages;
		return $amessages['status'][$this->status];
	}
	public function getPermissions() {
		return $this->getProperty('permissions');
	}
	public function getPermission($act='',$mod='') {
		if($act == '' || $mod == '') return 0;
		$permissions = $this->getPermissions();
		if(isset($permissions[$act][$mod])) return $permissions[$act][$mod];
		return 0;
	}
	public function checkPermission($act='',$mod='',$allow_admin = 1) {
		if($this->isSiteFounder()) return 1;
		if($allow_admin && $this->isSiteAdmin()) return 1;
		$permissions = $this->getPermissions();
		if(isset($permissions[$act][$mod]) && $permissions[$act][$mod] == 1) return 1;
		header("location: /admin.php?op=accessdenied");
		exit;
	}
	function getAllCustomerFromUserid($aId) {
		$results = $this->select("id", "`details` = '$aId'");
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
			if($aId){
			return implode(",",$categoryInfos).",$aId";
			}else{
				return implode(",",$categoryInfos);
			}
			
		}
		return($aId);
	}
	
}	
?>