<?php

/*************************************************************************
Class Order Item
----------------------------------------------------------------
Bido.vn Project
Last updated: 07/05/2010
Author: Mai Minh (http://maiminh.vnweblogs.com)
 **************************************************************************/
class InvoiceNewItemInfo
{
	var $id;
	var $store_id;			# Order Item ID
	var $id_iv;		# Order ID
	var $id_product;	# Product ID
	var $ma_sp;			# Product name
	var $name;		# Quantity
	var $dvt;			# Unit price
	var $quantity;	# Properties (size, color,...)
	var $price;
	var $thuedv;
	var $pricedv;
	var $vat;
	var $price_vat;
	var $chietkhau;
	var $khuyenmai;
	var $hangHoaDacTrung;
	var $properties;
	var $status;
	var $date_cretead;

	# Constructor
	function __construct($ma_sp, $name,  $dvt, $quantity, $price, $thuedv, $pricedv, $vat,  $price_vat, $chietkhau, $khuyenmai, $hangHoaDacTrung, $properties, $status, $date_cretead, $id_product = 0, $id_iv = 0, $store_id = 0, $id = 0)
	{
		$this->id = $id;
		$this->store_id = $store_id;
		$this->id_iv = $id_iv;
		$this->id_product = $id_product;
		$this->ma_sp = $ma_sp;
		$this->name = stripslashes($name);
		$this->dvt = $dvt;
		$this->quantity = $quantity;
		$this->price = $price;
		$this->thuedv = $thuedv;
		$this->pricedv = $pricedv;
		$this->vat = $vat;
		$this->price_vat = $price_vat;
		$this->chietkhau = $chietkhau;
		$this->khuyenmai = $khuyenmai;
		$this->hangHoaDacTrung = $hangHoaDacTrung;
		$this->properties = unserialize($properties);
		$this->status = $status;
		$this->date_cretead = $date_cretead;
	}
	function InvoiceNewItemInfo($ma_sp, $name,  $dvt, $quantity, $price, $thuedv, $pricedv, $vat,  $price_vat, $chietkhau, $khuyenmai, $properties, $status, $date_cretead, $id_product = 0, $id_iv = 0, $store_id = 0, $id = 0)
	{
		$this->__construct($ma_sp, $name, $dvt, $quantity, $price, $thuedv, $pricedv, $vat,  $price_vat, $chietkhau, $khuyenmai, $properties, $status, $date_cretead, $id_product, $id_iv, $store_id, $id);
	}
	function getId()
	{
		return $this->id;
	}
	function setId($nValue)
	{
		$this->id = $nValue;
	}
	function getStoreId()
	{
		return $this->store_id;
	}
	function setStoreId($nValue)
	{
		$this->store_id = $nValue;
	}

	function getKhuyenmai()
	{
		return $this->khuyenmai;
	}
	function setKhuyenmai($nValue)
	{
		$this->khuyenmai = $nValue;
	}
	function gethangHoaDacTrung()
	{
		return $this->hangHoaDacTrung;
	}
	function sethangHoaDacTrung($nValue)
	{
		$this->hangHoaDacTrung = $nValue;
	}

	function getIdIv()
	{
		return $this->id_iv;
	}
	function setIdIv($nValue)
	{
		$this->id_iv = $nValue;
	}
	function getProductId()
	{
		return $this->id_product;
	}
	function setProductId($nValue)
	{
		$this->id_product = $nValue;
	}
	function getMasp()
	{
		return $this->ma_sp;
	}
	function setMasp($nValue)
	{
		$this->ma_sp = $nValue;
	}
	function getName()
	{
		return $this->name;
	}
	function setName($nValue)
	{
		$this->name = $nValue;
	}
	function getQuantity()
	{
		return $this->quantity;
	}
	function setQuantity($nValue)
	{
		$this->quantity = $nValue;
	}
	function getDVT()
	{
		return $this->dvt;
	}
	function setDVT($nValue)
	{
		$this->dvt = $nValue;
	}
	function getPrice()
	{
		return $this->price;
	}
	function setPrice($nValue)
	{
		$this->price = $nValue;
	}
	function getThuedv()
	{
		return $this->thuedv;
	}
	function setThuedv($nValue)
	{
		$this->thuedv = $nValue;
	}
	function getPriceDV()
	{
		return $this->pricedv;
	}
	function setPriceDV($nValue)
	{
		$this->pricedv = $nValue;
	}
	function getVat()
	{
		return $this->vat;
	}
	function setVat($nValue)
	{
		$this->vat = $nValue;
	}
	function getPriceVat()
	{
		return $this->price_vat;
	}
	function setPriceVat($nValue)
	{
		$this->price_vat = $nValue;
	}
	function getChietkhau()
	{
		return $this->chietkhau;
	}
	function setChietkhau($nValue)
	{
		$this->chietkhau = $nValue;
	}
	function getProperty($key)
	{
		if (isset($this->properties[$key])) return '' . $this->properties[$key];
		return '';
	}
	function setProperty($key, $nValue)
	{
		$this->properties[$key] = $nValue;
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
		return $this->date_cretead;
	}
	function setDateCreated($nValue)
	{
		$this->date_cretead = $nValue;
	}


	function getProSKU()
	{
		include_once(ROOT_PATH . "classes/dao/products.class.php");
		$products = new Products($this->store_id);
		return $products->getSKUFromId($this->product_id);
	}
	function getProWeight($storeId)
	{
		include_once(ROOT_PATH . "classes/dao/products.class.php");
		$products = new Products($storeId);
		$productItem = $products->getObject($this->product_id, 'id');
		if ($productItem) $weight = $productItem->getProperty('weight');
		return $weight;
	}
	function getProAvatar($storeId)
	{
		include_once(ROOT_PATH . "classes/dao/products.class.php");
		$products = new Products($storeId);
		$proItem = $products->getObject($this->product_id, 'id');
		if ($proItem) return $proItem->getProperty('avatar');
		else return '';
	}
	function getTotalPrice()
	{
		return $this->price * $this->quantity;
	}
	function getUrlPro($storeId)
	{
		include_once(ROOT_PATH . "classes/dao/products.class.php");
		$products = new Products($storeId);
		$productItem = $products->getObject($this->product_id, 'id');
		if ($productItem) $url = $productItem->getUrl();
		return $url;
	}
}
