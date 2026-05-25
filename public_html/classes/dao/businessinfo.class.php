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
class BusinessInfo {
	public  $id;			# Primary key
	private $store_id;		# Estore id
	private $codoBusiness;
	private $nameBusiness;
	private $addressBusiness;	
	private $properties;
	private $date_created;	# Date created
	private $status;

  
  function __construct($codoBusiness, $nameBusiness,$addressBusiness, $properties, $date_created, $status, $store_id = 0, $id = 0) 
  {
		$this->id = $id;
		$this->store_id = $store_id;
		$this->codoBusiness = stripslashes($codoBusiness);
		$this->nameBusiness = stripslashes($nameBusiness);
		$this->addressBusiness = $addressBusiness;
		$this->properties = unserialize($properties);
		$this->date_created = $date_created;
		$this->status = $status;
	}
	# Constructor
		public function BusinessInfo( $codoBusiness, $nameBusiness, $addressBusiness,$properties, $date_created, $status, $store_id = 0, $id = 0)
	{
		$this->__construct( $codoBusiness, $nameBusiness,$addressBusiness, $properties, $date_created, $status, $store_id, $id);
	}

	public function getId() {
		return $this->id;
	}	
	public function setId($nValue) {
		$this->id=$nValue;
	}
	public function getCodeBusiness() {
		return $this->codoBusiness;
	}	
	public function setCodeBusiness($nValue) {
		$this->codoBusiness=$nValue;
	}
	public function getNameBusiness() {
		return $this->nameBusiness;
	}	
	public function setNameBusiness($nValue) {
		$this->nameBusiness=$nValue;
	}
	public function getStoreId() {
		return $this->store_id;
	}
	public function setStoreId($nValue) {
		$this->store_id=$nValue;
	}

	public function getAddressBusiness() {
		return $this->addressBusiness;
	}	
	public function setNameAddressBusiness($nValue) {
		$this->addressBusiness=$nValue;
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
}	
?>