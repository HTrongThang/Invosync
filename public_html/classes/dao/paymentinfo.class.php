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
class PayMentInfo {
	public  $id;			# Primary key
	private $store_id;		# Estore id
	private $name;
  private $status;	# Properties		
	private $properties;	# Date created
	private $date_created;
	private $status_inv;		# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished


  
  function __construct($name, $status, $properties, $date_created, $status_inv, $store_id = 0, $id = 0) 
  {
		$this->id = $id;
		$this->store_id = $store_id;
		$this->name = stripslashes($name);
		$this->status = $status;
		$this->properties = unserialize($properties);
		$this->date_created = $date_created;	
		$this->status_inv = $status_inv;

	}
	# Constructor
	public function PayMentInfo($name, $status, $properties, $date_created, $status_inv, $store_id = 0, $id = 0)
	{
		$this->__construct($name, $status, $properties, $date_created, $status_inv, $store_id, $id);
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

	public function getName() {
		return $this->name;
	}	
	public function setName($nValue) {
		$this->name=$nValue;
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
	public function getStatusInv() {
		return $this->status_inv;
	}
	public function setStatusInv($nValue) {
		$this->status_inv = $nValue;
	}
	public function getStatusTextBackend() {
		global $amessages;
		return $amessages['status'][$this->status];
	}
}	
?>