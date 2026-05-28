<?php
class SaleChannelInfo {
	var $Id;			# Primary key
	var $store_id;		
	var $name;			# Name
	var $description;	# Description
	var $status;		# 0-Disabled, 1-Active
	var $position;		# Display order
	var $properties;	# Properties
	var $date_created;
	var $status_default;
	
	function __construct($name, $description, $status=0, $position=0, $properties='', $date_created='', $status_default=0, $store_id=0, $Id = 0)
	{
		$this->Id = $Id;
		$this->store_id=$store_id;
		$this->name = $name;
		$this->description = $description;
		$this->status = $status;
		$this->position = $position;
		$this->properties = unserialize($properties);
		$this->date_created = $date_created;
		$this->status_default = $status_default;
	}

	function getId() { return $this->Id; }	
	function setId($nValue) { $this->Id=$nValue; }	
	
	function getStoreId() { return $this->store_id; }
	function setStoreId($nValue) { $this->store_id=$nValue; }
	
	function getName() { return $this->name; }	
	function setName($nValue) { $this->name=$nValue; }
	
	function getDescription() { return $this->description; }
	function setDescription($nValue) { $this->description=$nValue; }
	
	function getProperty($key) {
		if(isset($this->properties[$key])) return $this->properties[$key];
		return '';
	}
	function setProperty($key,$nValue) { $this->properties[$key]=$nValue; }
	function getProperties() { return $this->properties; }
	function setProperties($nValue) { $this->properties=$nValue; }

	function getStatus() { return $this->status; }
	function setStatus($nValue) { $this->status = $nValue; }
	
	function getPosition() { return $this->position; }
	function setPosition($nValue) { $this->position = $nValue; }
	
	function getDateCreated() { return $this->date_created; }
	function setDateCreated($nValue) { $this->date_created = $nValue; }
	
	function getStatusDefault() { return $this->status_default; }
	function setStatusDefault($nValue) { $this->status_default = $nValue; }
	
	function getStatusTextBackend() {
		global $amessages;
		return isset($amessages['status'][$this->status]) ? $amessages['status'][$this->status] : '';
	}
}	
?>
