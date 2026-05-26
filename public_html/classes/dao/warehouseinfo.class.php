<?php
/*************************************************************************
Class Article
----------------------------------------------------------------
DeraCMS 3.0 Project
Company: Derasoft Co., Ltd                                  
Email: info@derasoft.com                                    
Last updated: 16/04/2012
Coder: Mai Minh (http://maiminh.vnweblogs.com)
**************************************************************************/
class WareHouseInfo {
	public  $id;			# Primary key
	private $store_id;		# Estore id
	private $cat_id;
	private $name;
	private $address;
	private $masothue_kh;
	private $address_kh;
	private $phuongxa_kh;
	private $quanhuyen_kh;
	private $tinhthanh_kh;
  	private $status;	# Properties		
	private $properties;	# Date created
	private $note;
	private $date_created;
	private $status_inv; # 1 là trạng thái kho xuất, 0 là không là gì
	private $status_out; # 1 là trạng thái kho nhập, 0 là không là gì	
	private $status_default; # Mặc định -> cho việc tự động chọn <select></select>
	private $email_warehouse;	# 

  
  function __construct($name, $address, $masothue_kh, $address_kh, $phuongxa_kh, $quanhuyen_kh, $tinhthanh_kh, $status, $note, $properties, $date_created, $status_inv, $status_out, $status_default, $email_warehouse, $cat_id = 0, $store_id = 0, $id = 0) 
  {
		$this->id = $id;
		$this->store_id = $store_id;
		$this->cat_id = $cat_id;
		$this->name = stripslashes($name);
		$this->address = $address;
		$this->masothue_kh = $masothue_kh;
		$this->address_kh = $address_kh;
		$this->phuongxa_kh = $phuongxa_kh;
	    $this->quanhuyen_kh =$quanhuyen_kh;
	    $this->tinhthanh_kh =$tinhthanh_kh;
		$this->status = $status;
		$this->properties = unserialize($properties);
		$this->note = stripslashes($note);
		$this->date_created = $date_created;	
		$this->status_inv = $status_inv;
		$this->status_out = $status_out;
		$this->status_default = $status_default;
		$this->email_warehouse = $email_warehouse;

	}
	# Constructor
	public function WareHouseInfo($name, $address, $masothue_kh, $address_kh, $phuongxa_kh, $quanhuyen_kh, $tinhthanh_kh, $status, $note, $properties, $date_created, $status_inv, $status_out, $status_default, $email_warehouse, $cat_id = 0, $store_id = 0, $id = 0)
	{
		$this->__construct($name, $address, $masothue_kh, $address_kh, $phuongxa_kh, $quanhuyen_kh, $tinhthanh_kh, $status, $note, $properties, $date_created, $status_inv, $status_out, $status_default, $email_warehouse, $cat_id, $store_id, $id);
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

	public function getCatId() {
		return $this->cat_id;
	}
	public function setCatId($nValue) {
		$this->cat_id=$nValue;
	}

	public function getName() {
		return $this->name;
	}	
	public function setName($nValue) {
		$this->name=$nValue;
	}
	public function getAddress() {
		return $this->address;
	}	
	public function setAddress($nValue) {
		$this->address=$nValue;
	}
	public function getMasothue()
	{
		return $this->masothue_kh;
	}
	public function setMasothue($nValue) 
	{
		$this->masothue_kh = $nValue;
	}
	public function getAddressKH()
	{
		return $this->address_kh;
	}
	public function setAddressKH($nValue) 
	{
		$this->address_kh = $nValue;
	}
	public function getPhuongXaKH()
	{
		return $this->phuongxa_kh;
	}
	public function setPhuongXaKH($nValue) 
	{
		$this->phuongxa_kh = $nValue;
	}
	public function getQuanHuyenKH()
	{
		return $this->quanhuyen_kh;
	}
	public function setQuanHuyenKH($nValue) 
	{
		$this->quanhuyen_kh = $nValue;
	}
	public function getTinhThanhKH()
	{
		return $this->tinhthanh_kh;
	}
	public function setTinhThanhKH($nValue) 
	{
		$this->tinhthanh_kh = $nValue;
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
	public function getNote()
	{
		return $this->note;
	}
	public function setNote($nValue)
	{
		$this->note=$nValue;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($nValue) {
		$this->status = $nValue;
	}
	public function getStatusInv() {
		return $this->status_inv;
	}
	public function setStatusInv($nValue) {
		$this->status_inv = $nValue;
	}
	public function getStatusOut() {
		return $this->status_out;
	}
	public function setStatusOut($nValue) {
		$this->status_out = $nValue;
	}
	public function getStatusDefault() {
		return $this->status_default;
	}
	public function getEmailWarehouse() {
		return $this->email_warehouse;
	}
	public function setEmailWarehouse($nValue) {
		$this->email_warehouse = $nValue;
	}
	public function getStatusTextBackend() {
		global $amessages;
		return $amessages['status'][$this->status];
	}

	public function getAddressFull() {
		$address = $this->address_kh.", ".$this->quanhuyen_kh.", ".$this->tinhthanh_kh.".";
		return $address;
	}

	
}	
?>