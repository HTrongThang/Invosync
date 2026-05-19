<?php
/*************************************************************************
Class EStore Info
----------------------------------------------------------------
DeraCMS 4.0 Project
Company: Derasoft Co., Ltd                                                  
Last updated: 03/06/2025 (Sửa lỗi tương thích PHP 8.x+ năm 2026)
Coder: Mai Minh
**************************************************************************/

class EStoreInfo {
    // Thay đổi từ 'var' sang 'public' để chuẩn hóa PHP hiện đại
    public $id;
    public $owner_id;
    public $area_id;
    public $cat_id;
    public $subdomain;
    public $domain;
    public $name;
    public $keywords;
    public $description;
    public $company;
    public $address;
    public $tel;
    public $cell;
    public $email;
    public $date_created;
    public $date_expire;
    public $properties;
    public $status;
                
    function __construct($owner_id, $area_id, $cat_id, $subdomain, $domain, $name, $keywords, $description, $company, $address, $tel, $cell, $email, $date_created, $date_expire, $properties, $status, $id = '0')
    {
        $this->id = $id;
        $this->owner_id = $owner_id;
        $this->area_id = $area_id;
        $this->cat_id = $cat_id;
        $this->subdomain = $subdomain;
        $this->domain = $domain;
        $this->name = $name;
        $this->keywords = $keywords;
        $this->description = $description;
        $this->company = $company;
        $this->address = $address;
        $this->tel = $tel;
        $this->cell = $cell;
        $this->email = $email;
        $this->date_created = $date_created;
        $this->date_expire = $date_expire;
        
        // [ĐÃ SỬA] Chống lỗi sập hệ thống (Passing null to unserialize)
        if (!empty($properties) && is_string($properties)) {
            $this->properties = @unserialize($properties);
            if ($this->properties === false) {
                $this->properties = array(); // Phòng trường hợp chuỗi serialize bị lỗi cấu trúc
            }
        } else {
            $this->properties = array();
        }

        $this->status = $status;
    }

    function getId()
    {
        return $this->id;
    }
    function setId($nValue)
    {
        $this->id=$nValue;
    }
    function getOwnerId()
    {
        return $this->owner_id;
    }
    function setOwnerId($nValue)
    {
        $this->owner_id=$nValue;
    }
    function getOwnerUsername() {
        include_once(ROOT_PATH."classes/dao/users.class.php");
        $users = new Users($this->id);
        return $users->getUsername("`id` = '".$this->owner_id."'"); 
    }
    function getAreaId()
    {
        return $this->area_id;
    }
    function setAreaId($nValue)
    {
        $this->area_id=$nValue;
    }
    function getCatId()
    {
        return $this->cat_id;
    }
    function setCatId($nValue)
    {
        $this->cat_id=$nValue;
    }
    function getCatName() {
        include_once(ROOT_PATH."classes/dao/estorecategories.class.php");
        $estoreCategories = new EstoreCategories();
        return $estoreCategories->getNameFromId($this->cat_id);
    }
    function getSubdomain()
    {
        return $this->subdomain;
    }
    function setSubdomain($nValue)
    {
        $this->subdomain=$nValue;
    }
    function getDomain()
    {
        return $this->domain;
    }
    function setDomain($nValue)
    {
        $this->domain=$nValue;
    }
    function getName($lang='vn')
    {
        if($lang=='vn') return $this->name;
        // Thêm kiểm tra isset tránh lỗi Undefined array key trên PHP 8
        else return isset($this->properties['custom_'.$lang.'_name']) ? $this->properties['custom_'.$lang.'_name'] : '';
    }
    function setName($nValue,$lang='vn')
    {
        if($lang=='vn') $this->name=$nValue;
        else  $this->properties['custom_'.$lang.'_name'] = $nValue;
    }
    function getKeywords($lang='vn')
    {
        if($lang=='vn') return $this->keywords;
        else return isset($this->properties['custom_'.$lang.'_keyword']) ? $this->properties['custom_'.$lang.'_keyword'] : '';
    }
    function setKeywords($nValue,$lang='vn')
    {
        // [ĐÃ SỬA] Đổi từ $this->keyword sang chuẩn gốc $this->keywords
        if($lang=='vn') $this->keywords=$nValue;
        else  $this->properties['custom_'.$lang.'_keyword']=$nValue;
    }
    function getDescription($lang='vn')
    {
        if($lang=='vn') return $this->description;
        else return isset($this->properties['custom_'.$lang.'_description']) ? $this->properties['custom_'.$lang.'_description'] : '';
    }
    function setDescription($nValue,$lang='vn')
    {
        if($lang=='vn') $this->description=$nValue;
        else  $this->properties['custom_'.$lang.'_description']=$nValue;
    }
    function getCompany($lang='vn')
    {
        if($lang=='vn') return $this->company;
        else return isset($this->properties['custom_'.$lang.'_company']) ? $this->properties['custom_'.$lang.'_company'] : '';
    }
    function setCompany($nValue,$lang='vn')
    {
        if($lang=='vn') $this->company=$nValue;
        else  $this->properties['custom_'.$lang.'_company']=$nValue;
    }
    function getAddress($lang='vn')
    {
        if($lang=='vn') return $this->address;
        else return isset($this->properties['custom_'.$lang.'_address']) ? $this->properties['custom_'.$lang.'_address'] : '';
    }
    function setAddress($nValue,$lang='vn')
    {
        if($lang=='vn') $this->address=$nValue;
        else  $this->properties['custom_'.$lang.'_address']=$nValue;
    }
    function getTel()
    {
        return $this->tel;
    }
    function setTel($nValue)
    {
        $this->tel=$nValue;
    }
    function getCell()
    {
        return $this->cell;
    }
    function setCell($nValue)
    {
        $this->cell=$nValue;
    }
    function getEmail()
    {
        return $this->email;
    }
    function setEmail($nValue)
    {
        $this->email=$nValue;
    }
    function getDateCreated()
    {
        return $this->date_created;
    }
    function setDateCreated($nValue)
    {
        $this->date_created=$nValue;
    }
    function getDateExpire()
    {
        return $this->date_expire;
    }
    function setDateExpire($nValue)
    {
        $this->date_expire=$nValue;
    }
    function getProperty($key)
    {
        if(isset($this->properties[$key])) return $this->properties[$key];
        return '';
    }
    function setProperty($key,$nValue)
    {
        $this->properties[$key]=$nValue;
    }
    function getProperties()
    {
        return $this->properties;
    }
    function setProperties($nValue)
    {
        $this->properties=$nValue;
    }
    function getStatus()
    {
        return $this->status;
    }
    function setStatus($nValue)
    {
        $this->status=$nValue;
    }
    function getStatusTextBackend() {
        global $amessages;
        return isset($amessages['status'][$this->status]) ? $amessages['status'][$this->status] : '';
    }
    function getAdsCategoryInfo($cId = 0) {
        $catItems = $this->getProperty('ads_category');
        if(!empty($catItems) && isset($catItems[$cId]['rows'])) {
            return $catItems[$cId];
        } else {
            include_once(ROOT_PATH.'classes/dao/adscategories.class.php');
            $adsCategories = new AdsCategories();
            $adsCategoryInfo = $adsCategories->getObject($cId);
            if($adsCategoryInfo) {
                return $adsCategoryInfo->getProperties();
            }
        }
        return array(); // Mặc định trả về mảng rỗng nếu không tìm thấy dữ liệu quảng cáo
    }
    function getCurrency() {
        include_once(ROOT_PATH.'classes/dao/currencies.class.php');
        $currencies = new Currencies($this->id);
        $currency = $currencies->getPrimaryCurrency();
        return $currency ? $currency->getName() : '';
    }
}
?>