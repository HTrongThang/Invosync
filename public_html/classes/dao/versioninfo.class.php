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
class VersionInfo {
	public  $id;			# Primary key
    private $store_id;		# Estore id
    private $title;
    private $link;
	private $name;				
	private $properties;
	private $date_created;
	private $status;		# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished


  
  function __construct($title, $link, $name, $properties, $date_created, $status, $store_id = 0, $id = 0) 
  {
		$this->id = $id;
        $this->store_id = $store_id;
        $this->title = $title;
        $this->link = $link;
		$this->name = $name;
		$this->properties = unserialize($properties);
		$this->date_created = $date_created;	
		$this->status = $status;

	}
	# Constructor
	public function StoreInfo($title, $link, $name, $properties, $date_created, $status, $store_id = 0, $id = 0)
	{
		$this->__construct($title, $link ,$name, $properties, $date_created, $status, $store_id, $id);
	}

	public function getId() {
		return $this->id;
	}	
	public function setId($nValue) {
		$this->id=$nValue;
	}
    
	public function getLink() {
		return $this->link;
	}	
	public function setLink($nValue) {
		$this->link=$nValue;
	}
	public function getStoreId() {
		return $this->store_id;
	}
	public function setStoreId($nValue) {
		$this->store_id=$nValue;
	}

	public function getTitle() {
		return $this->title;
	}	
	public function setTitle($nValue) {
		$this->title=$nValue;
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
	public function getStatusTextBackend() {
		global $amessages;
		return $amessages['status'][$this->status];
	}
}	
?>