<?php
/*************************************************************************
Class ProductTypeInfo
----------------------------------------------------------------
DeraCMS 4.0 Project
Author: Mai Minh
**************************************************************************/
class ProductTypeInfo {
	var $id;			# Primary key
	var $store_id;		# Estore id
	var $name;			# Name
	var $slug;			# Slug
	var $position;		# Position
	var $status;		# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished
	var $properties;	# Properties
	var $date_created;	# Date created
	var $date_updated;	# Date updated

	# Constructor
	function __construct($store_id, $name, $slug, $position, $status, $properties, $date_created, $date_updated, $id = 0)
	{
		$this->id = $id;
		$this->store_id = $store_id;
		$this->name = $name;
		$this->slug = $slug;
		$this->position = $position;
		$this->status = $status;
		$this->properties = unserialize($properties);
		$this->date_created = $date_created;
		$this->date_updated = $date_updated;
	}

	function getId() { return $this->id; }	
	function setId($nValue) { $this->id=$nValue; }
	
	function getStoreId() { return $this->store_id; }
	function setStoreId($nValue) { $this->store_id=$nValue; }
	
	function getName($lang='vn') { return $this->name; }
	function setName($nValue,$lang='vn') { $this->name=stripslashes($nValue); }
	
	function getSlug() { return $this->slug; }
	function setSlug($nValue) { $this->slug=stripslashes($nValue); }

	function getPosition() { return $this->position; }
	function setPosition($nValue) { $this->position = $nValue; }
	
	function getStatus() { return $this->status; }
	function setStatus($nValue) { $this->status = $nValue; }
	
	function getProperties() { return $this->properties; }
	function setProperties($nValue) { $this->properties=$nValue; }
	
	function getProperty($key) { if(isset($this->properties[$key])) return $this->properties[$key]; return ''; }
	function setProperty($key,$nValue) { $this->properties[$key]=$nValue; }
	
	function getDateCreated() { return $this->date_created; }
	function setDateCreated($nValue) { $this->date_created=$nValue; }
	
	function getDateUpdated() { return $this->date_updated; }
	function setDateUpdated($nValue) { $this->date_updated=$nValue; }
	
	function getStatusTextBackend() {
		global $amessages;
		return $amessages['status'][$this->status];
	}
}
?>
