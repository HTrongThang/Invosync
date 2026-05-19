<?php
/*************************************************************************
Class Article
----------------------------------------------------------------
DeraCMS 4.0 Project
Company: Derasoft Co., Ltd                                  
Last updated: 03/06/2025 
Coder: Mai Minh 
**************************************************************************/
class ArticleInfo {
	public $id;				# Primary key
	public $store_id;		# Estore id
	public $category_id;	# Category id
	public $category_name;	# Category name
	public $category_slug;	# Category slug
	public $poster_id;		# Poster user id
	public $poster_name;	# Poster user name
	public $poster_fullname;# Poster full name
	public $updater_id;		# Updater user id
	public $updater_name;	# Updater user name
	public $updater_fullname;# Updater full name
	public $slug;			# Slug
	public $title;			# Title
	public $keyword;		# Keyword
	public $description;	# Description
	public $detail;			# Detail
	public $viewed;			# Number of views
	public $date_created;	# Date created
	public $date_updated;	# Date created
	public $position;		# Position
	public $properties;		# Properties
	public $status;			# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished
	public $home;			# Display in home page
	# Constructor
	function __construct($slug, $title, $keyword, $description, $detail, $viewed, $date_created, $date_updated, $position, $properties, $status, $home, $updater_fullname, $updater_name, $updater_id, $poster_fullname, $poster_name, $poster_id, $category_slug, $category_name, $category_id = 0, $store_id = 0, $id = 0)
	{
		$this->id = $id;
		$this->store_id = $store_id;
		$this->category_id = $category_id;
		$this->category_name = $category_name;
		$this->category_slug = $category_slug;
		$this->poster_id = $poster_id;
		$this->poster_name = $poster_name;
		$this->poster_fullname = $poster_fullname;
		$this->updater_id = $updater_id;
		$this->updater_name = $updater_name;
		$this->updater_fullname = $updater_fullname;
		$this->slug = $slug;
		$this->title = $title;
		$this->keyword = $keyword;
		$this->description = $description;
		$this->detail = $detail;
		$this->viewed = $viewed;
		$this->date_created = $date_created;
		$this->date_updated = $date_updated;
		$this->position = $position;
		$this->properties = unserialize($properties);
		$this->status = $status;
		$this->home = $home;
	}
	function getId() {
		return $this->id;
	}	
	function setId($nValue) {
		$this->id=$nValue;
	}
	function getStoreId() {
		return $this->store_id;
	}
	function setStoreId($nValue) {
		$this->store_id=$nValue;
	}
	function getCategoryId() {
		return $this->category_id;
	}
	function setCategoryId($nValue) {
		$this->category_id=$nValue;
	}
	function getCategoryName() {
		return $this->category_name;
	}
	function getCategorySlug() {
		return $this->category_slug;
	}
	function getPosterId() {
		return $this->poster_id;
	}
	function setPosterId($nValue) {
		$this->poster_id=$nValue;
	}
	function getPosterName() {
		return $this->poster_name;
	}
	function getPosterFullName() {
		return $this->poster_fullname;
	}
	function getUpdaterId() {
		return $this->updater_id;
	}
	function setUpdaterId($nValue) {
		$this->updater_id=$nValue;
	}
	function getUpdaterName() {
		return $this->updater_name;
	}
	function getUpdaterFullName() {
		return $this->updater_fullname;
	}
	function getSlug() {
		return $this->slug;		
	}
	function setSlug($nValue) {
		$this->slug=stripslashes($nValue);
	}
	function getTitle($lang = 'vn') {
		if($lang == 'vn')	return $this->title;
		else return $this->properties['custom_'.$lang.'_title'];
	}
	function setTitle($nValue, $lang = 'vn') {
		if($lang == 'vn')	$this->title=stripslashes($nValue);
		else $this->properties['custom_'.$lang.'_title']=stripslashes($nValue);
	}
	function getKeyword($lang = 'vn') {
		if($lang == 'vn')	return $this->keyword;
		else return $this->properties['custom_'.$lang.'_keyword'];		
	}
	function setKeyword($nValue, $lang = 'vn') {
		if($lang == 'vn')	$this->keyword=stripslashes($nValue);
		else $this->properties['custom_'.$lang.'_keyword']=stripslashes($nValue);
	}
	function getDescription($lang = 'vn') {
		if($lang == 'vn')	return $this->description;
		else return $this->properties['custom_'.$lang.'_description'];
	}
	function setDescription($nValue,$lang = 'vn') {
		if($lang == 'vn')	$this->description=stripslashes($nValue);
		else $this->properties['custom_'.$lang.'_description']=stripslashes($nValue);
	}
	function getDetail($lang = 'vn') {
		if($lang == 'vn')	return $this->detail;
		elseif($lang == 'en')	return $this->properties['custom_'.$lang.'_detail'];
		else return $this->properties['custom_'.$lang.'_detail'];
	}
	function setDetail($nValue,$lang = 'vn') {
		if($lang == 'vn') $this->detail=stripslashes($nValue);
		else $this->properties['custom_'.$lang.'_detail']=stripslashes($nValue);
	}
	function getViewed() {
		return $this->viewed;
	}	
	function setViewed($nValue) {
		$this->viewed=$nValue;
	}
	function getDateCreated()
	{
		return $this->date_created;
	}
	function setDateCreated($nValue)
	{
		$this->date_created=$nValue;
	}
	function getDateUpdated()
	{
		return $this->date_updated;
	}
	function setDateUpdated($nValue)
	{
		$this->date_updated=$nValue;
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
	function getPosition() {
		return $this->position;
	}
	function setPosition($nValue) {
		$this->position = $nValue;
	}
	function getProperties()
	{
		return $this->properties;
	}
	function setProperties($nValue)
	{
		$this->properties=$nValue;
	}
	function getStatus() {
		return $this->status;
	}
	function setStatus($nValue) {
		$this->status = $nValue;
	}
	function getHome() {
		return $this->home;
	}
	function setHome($nValue) {
		$this->home = $nValue;
	}
	function getStatusTextBackend() {
		global $amessages;
		return $amessages['status'][$this->status];
	}
	function getHomeTextBackend() {
		global $amessages;
		return $amessages['status_home'][$this->home];
	}
	function getUrl() {
		$url = '';
		if(URL_TYPE == 1) {	# Query string
			$url = "/$lang/".SCRIPT.'?act=article&id='.$this->id;
			return $url;
		} elseif(URL_TYPE == 2) {	# SEO
			$url = "/".$this->category_slug.'/'.$this->slug.'-'.$this->id.'.htm';
			return $url;
		} elseif(URL_TYPE == 3) {	# SEO, near root path
			$url = "/".$this->slug.'-a'.$this->id.'.html';
			return $url;
		}
		else return '';	
	}
	function getAvatar() {
		if($this->getProperty('avatarId')) {
			include_once(ROOT_PATH . "classes/dao/uploads.class.php");
			$uploads = new Uploads($this->store_id);
			$avatar = $uploads->getObject($this->getProperty('avatarId'));
			if($avatar) return $avatar;
		}
		return '';		
	}
	function getFiles() {
		if($this->getProperty('fileIds')) {
			include_once(ROOT_PATH . "classes/dao/uploads.class.php");
			$uploads = new Uploads($this->store_id);
			$files = $uploads->getObjects(1,'id IN ('.implode(',',$this->getProperty('fileIds').')',[],999));
			if($files) return $files;
		}
		return '';	
	}

	public function getAvatarImage($uploads) {
		if (!$uploads) return null;

		$avatarId = $this->getProperty('avatarId');
		if (!$avatarId) return null;

		$file = $uploads->getObject($avatarId);
		return $file ?: null;
	}
}	
?>
