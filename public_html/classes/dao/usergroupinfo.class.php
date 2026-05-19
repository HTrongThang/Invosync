<?php
/*************************************************************************
Class User Info
----------------------------------------------------------------
DeraCMS Project
Company: Derasoft Co., Ltd                                  
Author: Mai Minh
Email: info@derasoft.com                                    
Last updated: 29/09/2009 (Updated for PHP 8.3 in 2026)
**************************************************************************/
class UserGroupInfo {
    public  $id;
    private $store_id;
    private $name;
    private $slug;
    private $status;
    private $properties;
    private $date_created;
    private $date_updated;
    private $user_created;
    private $level;
    private $color;

    // PHP 8.3 FIX: Chuyển $properties='' xuống cuối cùng (đứng trước $id = 0) để đúng quy chuẩn tham số tùy chọn
    function __construct($store_id, $name, $slug, $status, $date_created, $date_updated, $user_created, $level, $color, $properties = '', $id = 0)
    {
        $this->color = $color;
        $this->id = $id;
        $this->level = $level;
        $this->store_id = $store_id;
        $this->name = $name;
        $this->slug = $slug;
        $this->status = $status;
        $this->properties = unserialize($properties);
        $this->date_created = $date_created;
        $this->date_updated = $date_updated;
        $this->user_created = $user_created;
    }

    // PHP 8.3 FIX: Hàm trùng tên lớp kiểu cũ tạo ra lỗi Deprecated, sửa lại thứ tự tham số đồng bộ với __construct
    public function UserGroupInfo($store_id, $name, $slug, $status, $date_created, $date_updated, $user_created, $level, $color = '', $properties = '', $id = 0)
    {
        $this->__construct($store_id, $name, $slug, $status, $date_created, $date_updated, $user_created, $level, $color, $properties, $id);
    }

    public function getDateUpdated()
    {
        return $this->date_updated;
    }
    public function setDateUpdated($nValue)
    {
        $this->date_updated=$nValue;
    }
    public function getColor()
    {
        return $this->color;
    }
    public function setColor($nValue)
    {
        $this->color=$nValue;
    }
    public function getLevel()
    {
        return $this->level;
    }
    public function setLevel($nValue)
    {
        $this->level=$nValue;
    }
    public function getUserCreated()
    {
        return $this->user_created;
    }
    public function setUserCreated($nValue)
    {
        $this->user_created=$nValue;
    }
    public function getDateCreated()
    {
        return $this->date_created;
    }
    public function setDateCreated($nValue)
    {
        $this->date_created=$nValue;
    }
    public function getProperties()
    {
        return $this->properties;
    }
    public function setProperties($nValue)
    {
        $this->properties=$nValue;
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
    public function getStatus()
    {
        return $this->status;
    }
    public function setStatus($nValue) {
        $this->status = $nValue;
    }
    public function getSlug()
    {
        return $this->slug;
    }
    public function setSlug($nValue) {
        $this->slug = $nValue;
    }
    public function getName()
    {
        return $this->name;
    }
    public function setName($nValue) {
        $this->name = $nValue;
    }
    public function getId()
    {
        return $this->id;
    }
    public function setId($nValue) {
        $this->id = $nValue;
    }
    public function getStoreId()
    {
        return $this->store_id;
    }
    public function setStoreId($nValue) {
        $this->store_id = $nValue;
    }
    public function getPermissions() {
        return $this->getProperty('permissions');
    }
    public function getPermission($op='',$act='',$mod='') {
        if($op == '' || $act == '' || $mod == '') return 0;
        $permissions = $this->getPermissions();
        if(isset($permissions[$op][$act][$mod])) return $permissions[$op][$act][$mod];
        return 0;
    }
    public function checkPermission($op='',$act='',$mod='',$allow_admin = 1) {
        
        $permissions = $this->getPermissions();
        // if ($this->store_id==48) {
        // var_dump($permissions);die;
        // }
        if(isset($permissions[$op][$act][$mod]) && $permissions[$op][$act][$mod] == 1) return 1;
        header("location: /admin.php?op=accessdenied");
        exit;
    }
    public function getStatusTextBackend() {
        global $amessages;
        return $amessages['status_user_group'][$this->status];
    }
}
?>