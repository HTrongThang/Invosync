<?php
/*************************************************************************
Class ProductCategory
----------------------------------------------------------------
DeraCMS 4.0 Project
Company: Derasoft Co., Ltd
Last updated: 03/06/2025
Author: Mai Minh 
**************************************************************************/
class ProductCategoryInfo
{
	public $id;			# Primary key
	public $parent_id;		# Parent category
	public $list_parent_id; # List Parent category
	public $store_id;		# Estore id
	public $slug;			# Slug
	public $name;			# Category name
	public $keyword;		# Cagegory keyword
	public $description;	# Category description
	public $position;		# Position
	public $viewed;		# Number of views
	public $properties;	# Properties
	public $status;		# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished
	public $home;
	public $date_created;
	public $date_updated;
	
	# Constructor
	function __construct($parent_id, $list_parent_id, $store_id, $slug, $name, $keyword, $description, $position, $viewed, $properties, $status, $home, $date_created, $date_updated, $id = 0)
	{
		$this->id = $id;
		$this->parent_id = $parent_id;
		$this->list_parent_id = $list_parent_id;
		$this->store_id = $store_id;
		$this->slug = $slug;
		$this->name = $name;
		$this->keyword = $keyword;
		$this->description = $description;
		$this->position = $position;
		$this->viewed = $viewed;
		$this->properties = unserialize($properties);
		$this->status = $status;
		$this->home = $home;
		$this->date_created = $date_created;
		$this->date_updated = $date_updated;
	}
	function getHome()
	{
		return $this->home;
	}
	function getId()
	{
		return $this->id;
	}
	function setId($nValue)
	{
		$this->id = $nValue;
	}
	function getParentId()
	{
		return $this->parent_id;
	}
	function setParentId($nValue)
	{
		$this->parent_id = $nValue;
	}
	function getListParentId()
	{
		return $this->list_parent_id;
	}
	function setListParentId($nValue)
	{
		$this->list_parent_id = $nValue;
	}
	function getStoreId()
	{
		return $this->store_id;
	}
	function setStoreId($nValue)
	{
		$this->store_id = $nValue;
	}
	function getSlug()
	{
		return $this->slug;
	}

	function setSlug($nValue, $lang = 'vn')
	{
		if ($lang == 'vn') $this->slug = $nValue;
		else $this->properties['custom_' . $lang . '_slug'] = stripslashes($nValue);
	}
	function getName($lang = 'vn')
	{
		if ($lang == 'vn') return $this->name;
		elseif (isset($this->properties['custom_' . $lang . '_name'])) return $this->properties['custom_' . $lang . '_name'];
	}
	function setName($nValue, $lang = 'vn')
	{
		if ($lang == 'vn') $this->name = stripslashes($nValue);
		else  $this->properties['custom_' . $lang . '_name'] = stripslashes($nValue);
	}
	function getKeyword()
	{
		return $this->keyword;
	}
	function setKeyword($nValue)
	{
		$this->keyword = stripslashes($nValue);
	}
	function getDescription()
	{
		return $this->description;
	}
	function setDescription($nValue)
	{
		$this->description = stripslashes($nValue);
	}
	function getPosition()
	{
		return $this->position;
	}
	function setPosition($nValue)
	{
		$this->position = $nValue;
	}

	function getActiveProducts()
	{
		include_once(ROOT_PATH . "classes/dao/products.class.php");
		$products = new Products($this->store_id);
		$rowsPages = $products->getNumItems('id', "`category_id` = '" . $this->id . "' AND `status` = '1'");
		return $rowsPages['rows'];
	}
	function getNumProducts()
	{
		include_once(ROOT_PATH . "classes/dao/products.class.php");
		$products = new Products($this->store_id);
		$rowsPages = $products->getNumItems('id', "`category_id` = '" . $this->id . "'");
		return $rowsPages['rows'];
	}

	function getViewed()
	{
		return $this->viewed;
	}
	function setViewed($nValue)
	{
		$this->viewed = $nValue;
	}
	function getProperty($key)
	{
		if (isset($this->properties[$key])) return '' . $this->properties[$key];
		return '';
	}
	function setProperty($key, $nValue)
	{
		$this->properties[$key] = stripslashes($nValue);
	}
	function getProperties()
	{
		return $this->properties;
	}
	function setProperties($nValue)
	{
		$this->properties = $nValue;
	}
	function getStatus()
	{
		return $this->status;
	}
	function setStatus($nValue)
	{
		$this->status = $nValue;
	}

	function getDateCreated()
	{
		return $this->date_created;
	}
	function setDateCreated($nValue)
	{
		$this->date_created = $nValue;
	}
	function getDateUpdated()
	{		
		return $this->date_updated;
	}
	function setDateUpdated($nValue)	{
		$this->date_updated = $nValue;
	}
	function getStatusTextBackend()
	{
		global $amessages;
		return $amessages['status_product'][$this->status];
	}
	function getUrl($page = 1, $keywords = '', $sort_key = 'position', $sort_direction = 'asc')
	{
		$url = '';
		if (URL_TYPE == 1 || $page > 1) {	# Query string
			$url = '/' . SCRIPT . '?act=category&id=' . $this->id . '&pg=' . $page . '&kw=' . $keywords . '&sk=' . $sort_key . '&sd=' . $sort_direction;
			return $url;
		} elseif (URL_TYPE == 2) {	# SEO
			$url = '/' . $this->slug . ($page > 1 ? '-p' . $page : '') . '.html';
			return $url;
		} else return '';
	}

	function getChildren($page = 1, $condition = "`status` = '1'", $sort = array('position' => 'asc'), $items_per_page = 100)
	{
		include_once(ROOT_PATH . "classes/dao/productcategories.class.php");
		$productCategories = new ProductCategories($this->store_id);
		$productCategoryItems = $productCategories->getObjects($page, "`parent_id` = '" . $this->id . "' AND $condition", $sort, $items_per_page);
		return $productCategoryItems;
	}
	function getParentIdActive()
	{
		include_once(ROOT_PATH . "classes/dao/productcategories.class.php");
		$productCategories = new ProductCategories($this->store_id);
		if ($this->parent_id == 1) return $this->id;
		elseif ($this->parent_id > 1) {
			$categoryInfo = $productCategories->getObject($this->parent_id);
			return $categoryInfo->getId();
		} else return '';
	}
}
