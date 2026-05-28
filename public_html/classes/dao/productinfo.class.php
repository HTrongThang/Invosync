<?php
/*************************************************************************
Class Product
----------------------------------------------------------------
DeraCMS 4.0 Project
Company: Derasoft Co., Ltd
Last updated: 03/06/2025
Author: Mai Minh 
**************************************************************************/
class ProductInfo {
	public $id;			# Primary key
	public $store_id;		# Estore id
	public $category_id;		# Category id
	public $slug;			# Slug
	public $name;			# Product name
	public $keyword;		# Product keyword
	public $description;	# Description
	public $detail;		# Detail
	public $avatar;		# avatar
	public $viewed;		# Number of views
	public $date_created;	# Date created
	public $date_updated;	# Date updated
	public $position;
	public $properties;	# Properties
	public $status;		# 0-Disabled, 1-Active, 2-Deleted, 3-Unpublished
	public $home;
	public $expiration_date; # HSD
	public $availability; # tình trạng
	public $category_name;
	public $file_ids;
	public $avatarImg = null;
	public $price;
	public $opening_stock;
	public $period; # theo kỳ
	public $features; 
	public $key_features; 			# tính năng nổi bật 
	public $validation_level; 		# mức độ xác thực
	public $trust_seal_type; 		# loại con dấu trang web
	public $warranty_amount; 		# mức bảo hiểm
	public $issuance_time; 			# thời gian cấp phát
	public $green_bar; 				# hiển thị thanh địa chỉ xanh
	public $encryption_strength; 	# độ mạnh mã hóa
	public $algorithm; 				# thuật toán chữ ký
	public $san_support; 			# hỗ trợ đa tên miền
 	public $wildcard_support; 		# hỗ trợ Subdomain không giới hạn
	public $malware_scan; 			# tính năng quét mã độc
	public $vulnerability_scan; 	# đánh giá lỗ hổng bảo mật
	public $browser_compatibility; 	# độ tương thích trình duyệt
	public $server_licenses; 		# giấy phép máy chủ
	public $reissue_policy; 		# chính sách cấp lại
	public $product_feature_ids; 	# mảng chứa id của các chức năng sản phẩm
	public $highlight_feature_ids;  # mảng chứa id của các chức năng nổi bật
	public $smart_screen;  # smart screen
	public $windows_hardware;  # windows hardware 
	public $supported_platform;  # nền tảng hỗ trợ
	public $storage;  # storage
	public $time_tamping;  # time tamping
	public $supported_format;  # định dạng hỗ trợ
	public $compliance_standard;  # tiêu chuẩn tuân thủ

	public $service_type;  # Loại dịch vụ
	public $operating_system;  # Hệ điều hành
	public $storage_capacity;  # Dung lượng
	public $ram;  # ram
	public $cpu;  # cpu
	public $bandwidth;  # Băng thông
	public $ip_address;  # Địa chỉ IP
	public $web_server;  # Web server
	public $control_panel;  # Bảng điều khiển
	public $php_version;  # PHP version
	public $framework;  # Framework
	public $mysql_db_type;  # Database
	public $ssl_certificate;  # Chứng chỉ SSL
	public $backup;  # Backup
	public $ddos_protection;  # Chống DDoS
	public $uptime_commitment;  # Cam kết thời gian hoạt động
	public $allowed_accounts;  # Số lượng tài khoản
	public $mailbox_storage;  # Dung lượng mỗi hộp thư
	public $max_attachment_size;  # Kích thước file đính kèm
	public $send_limit;  # Giới hạn gửi
	public $dedicated_ip;  # IP riêng
	public $supported_protocol;  # Giao thức hỗ trợ
	public $webmail;  # Webmail
	public $has_encryption;  # Mã hóa đường truyền
	public $dns_config;  # Cấu hình DNS
	public $spam_filter;  # Lọc thư rác


	# Constructor
	function __construct(
		$service_type,
		$operating_system,
		$storage_capacity,
		$ram,
		$cpu,
		$bandwidth,
		$ip_address,
		$web_server,
		$control_panel,
		$php_version,
		$framework,
		$mysql_db_type,
		$ssl_certificate,
		$backup,
		$ddos_protection,
		$uptime_commitment,
		$allowed_accounts,
		$mailbox_storage,
		$max_attachment_size,
		$send_limit,
		$dedicated_ip,
		$supported_protocol,
		$webmail,
		$has_encryption,
		$dns_config,
		$spam_filter,

		$smart_screen,
		$windows_hardware,
		$supported_platform,
		$storage,
		$time_tamping,
		$supported_format,
		$compliance_standard,
		$highlight_feature_ids,
		$product_feature_ids,
		$reissue_policy,
		$server_licenses,
		$browser_compatibility,
		$vulnerability_scan,
		$malware_scan, 
		$wildcard_support,  
		$san_support, 
		$algorithm, 
		$encryption_strength, 
		$green_bar, 
		$issuance_time, 
		$warranty_amount, 
		$trust_seal_type, 
		$validation_level, 
		$key_features, 
		$features, 
		$period, 
		$price, 
		$file_ids, 
		$category_name, 
		$availability,
		$expiration_date, 
		$home, 
		$status, 
		$properties, 
		$position, 
		$date_updated, 
		$date_created, 
		$viewed, 
		$avatar, 
		$detail, 
		$description, 
		$keyword, 
		$name, 
		$slug, 
		$category_id, 
		$store_id, 
		$id
		)
	{
		$this->id = $id;
		$this->store_id = $store_id;
		$this->category_id = $category_id;
		$this->slug = $slug;
		$this->name = $name;
		$this->keyword = $keyword;
		$this->description = $description;
		$this->detail = $detail;
		$this->avatar = $avatar;
		$this->viewed = $viewed;
		$this->date_created = $date_created;
		$this->date_updated = $date_updated;
		$this->position = $position;
		$this->properties = unserialize($properties);
		$this->status = $status;
		$this->home = $home;
		$this->expiration_date = $expiration_date;
		$this->availability = $availability;
		$this->category_name = $category_name;
		$this->file_ids = $file_ids;
		$this->price = $price;
		$this->period = $period;
		$this->features = $features;
		$this->key_features = $key_features;
		$this->validation_level = $validation_level;
		$this->trust_seal_type = $trust_seal_type;
		$this->warranty_amount = $warranty_amount;
		$this->issuance_time = $issuance_time;
		$this->green_bar = $green_bar;
		$this->encryption_strength = $encryption_strength;
		$this->algorithm = $algorithm;
		$this->san_support = $san_support;
		$this->wildcard_support = $wildcard_support;
		$this->malware_scan = $malware_scan;
		$this->vulnerability_scan = $vulnerability_scan;
		$this->browser_compatibility = $browser_compatibility;
		$this->server_licenses = $server_licenses;
		$this->reissue_policy = $reissue_policy;
		$this->product_feature_ids = $product_feature_ids;
		$this->highlight_feature_ids = $highlight_feature_ids;
		$this->smart_screen = $smart_screen;
		$this->windows_hardware = $windows_hardware;
		$this->supported_platform = $supported_platform;
		$this->storage = $storage;
		$this->time_tamping = $time_tamping;
		$this->supported_format = $supported_format;
		$this->compliance_standard = $compliance_standard;

		$this->service_type = $service_type;
		$this->operating_system = $operating_system;
		$this->storage_capacity = $storage_capacity;
		$this->ram = $ram;
		$this->cpu = $cpu;
		$this->bandwidth = $bandwidth;
		$this->ip_address = $ip_address;
		$this->web_server = $web_server;
		$this->control_panel = $control_panel;
		$this->php_version = $php_version;
		$this->framework = $framework;
		$this->mysql_db_type = $mysql_db_type;
		$this->ssl_certificate = $ssl_certificate;
		$this->backup = $backup;
		$this->ddos_protection = $ddos_protection;
		$this->uptime_commitment = $uptime_commitment;
		$this->allowed_accounts = $allowed_accounts;
		$this->mailbox_storage = $mailbox_storage;
		$this->max_attachment_size = $max_attachment_size;
		$this->send_limit = $send_limit;
		$this->dedicated_ip = $dedicated_ip;
		$this->supported_protocol = $supported_protocol;
		$this->webmail = $webmail;
		$this->has_encryption = $has_encryption;
		$this->dns_config = $dns_config;
		$this->spam_filter = $spam_filter;

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
	function getCategorySlug() {
		include_once(ROOT_PATH."classes/dao/productcategories.class.php");
		$productCategories = new ProductCategories($this->store_id);
		return $productCategories->getSlugFromId($this->category_id);
	}
	function getCategoryName() {
		include_once(ROOT_PATH."classes/dao/productcategories.class.php");
		$productCategories = new ProductCategories($this->store_id);
		return $productCategories->getNameFromId($this->category_id);
	}

	function getSlug() {
		return $this->slug;		
	}
	function setSlug($nValue) {
		$this->slug=stripslashes($nValue);
	}
	function getName($lang='vn') {
		if($lang == 'vn')	return $this->name;
		elseif(isset($this->properties['custom_'.$lang.'_name'])) return $this->properties['custom_'.$lang.'_name'];	
	}
	function setName($nValue,$lang='vn') {
		if($lang == 'vn')	$this->name=stripslashes($nValue);
		else	$this->properties['custom_'.$lang.'_name']=stripslashes($nValue);
	}
	function getKeyword($lang='vn') {
		if($lang == 'vn')	return $this->keyword;	
		elseif(isset($this->properties['custom_'.$lang.'_keyword'])) return $this->properties['custom_'.$lang.'_keyword'];		
	}
	function setKeyword($nValue, $lang='vn') {
		if($lang == 'vn')	$this->keyword=stripslashes($nValue);
		else	$this->properties['custom_'.$lang.'_keyword']=stripslashes($nValue);
	}
	function getDescription($lang='vn') {
	if($lang == 'vn')	return $this->description;
	elseif(isset($this->properties['custom_'.$lang.'_description'])) return $this->properties['custom_'.$lang.'_description'];
		}
	function setDescription($nValue,$lang='vn') {
		if($lang == 'vn')	$this->description=stripslashes($nValue);
		else  $this->properties['custom_'.$lang.'_description']=stripslashes($nValue);;	
	}
	function getDetail($lang='vn') {
		if($lang == 'vn')	return $this->detail;
		elseif(isset($this->properties['custom_'.$lang.'_detail'])) return $this->properties['custom_'.$lang.'_detail'];
	}
	function setDetail($nValue,$lang='vn') {		
		if($lang == 'vn')$this->detail=stripslashes($nValue);
		else $this->properties['custom_'.$lang.'_detail']=stripslashes($nValue);;
	}
	function getAvatar() {
		return $this->avatar;
	}
	function setAvatar($nValue) {
		$this->avatar=$nValue;
	}
	function getPhotos() {
		$photos = $this->properties['photos'];
		if($photos) return $photos[0];
		return '';
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
		return $amessages['status_product'][$this->status];
	}
	# Return 1 if File is not null
	function getNullFile($n) {
		for($i=1;$i<=$n;$i++){
		$key = "file".$i;
		if($this->$key!='')
			return 1;
		}
		return '';
	}
	function getUrl($lang = 'vn') {
		$url = '';
		if(URL_TYPE == 1) {	# Query string
			$url = '/'.SCRIPT.'?act=product&id='.$this->id;
			return $url;
		} elseif(URL_TYPE == 2) {	# SEO
			$url = '/'.$this->getCategorySlug().'/'.$this->slug.'-p'.$this->id.'.html';
			
			return $url;
		}elseif(URL_TYPE == 3) {	# SEO
			$url = '/'.$this->getCategorySlug().'/'.$this->slug.'-'.$this->id.'.html';
			
			return $url;

		} else return '';	
	}
	// function getCategoryName() {
	// 	return $this->category_name;
	// }	
	// function setCategoryName($nValue) {
	// 	$this->category_name=$nValue;
	// }
	function getExpirationDate() {
		return $this->expiration_date;
	}
	function setExpirationDate($nValue) {
		$this->expiration_date = $nValue;
	}
	function getAvailability() {
		return $this->availability;
	}
	function setAvailability($nValue) {
		$this->availability = $nValue;
	}
	function getFileIds() {
		return $this->file_ids;
	}
	function setFileIds($nValue) {
		$this->file_ids = $nValue;
	}
	function getPrice() {
		return $this->price;
	}
	function setPrice($nValue) {
		$this->price = $nValue;
	}
	function getPriceMin1Year() {
		return ($this->price * 2.9) / 3;
	}

	function getOpeningStock() {
		return $this->opening_stock;
	}
	function setOpeningStock($nValue) {
		$this->opening_stock = $nValue;
	}

	function getPrice2Year() {
		return $this->price * 1.95;
	}

	function getPrice3Year() {
		return $this->price * 2.9;
	}
	function getPeriod() {
		return $this->period;
	}
	function setPeriod($nValue) {
		$this->period = $nValue;
	}
	function getFeatures() {
		return $this->features;
	}
	function setFeatures($nValue) {
		$this->features = $nValue;
	}
	function getKeyFeatures() {
		return $this->key_features;
	}
	function setKeyFeatures($nValue) {
		$this->key_features = $nValue;
	}
	function getValidationLevel() {
		return $this->validation_level;
	}
	function setValidationLevel($nValue) {
		$this->validation_level = $nValue;
	}
	function getTrustSealType() {
		return $this->trust_seal_type;
	}
	function setTrustSealType($nValue) {
		$this->trust_seal_type = $nValue;
	}
	function getWarrantyAmount() {
		return $this->warranty_amount;
	}
	function setWarrantyAmount($nValue) {
		$this->warranty_amount = $nValue;
	}
	function getIssuanceTime() {
		return $this->issuance_time;
	}
	function setIssuanceTime($nValue) {
		$this->issuance_time = $nValue;
	}
	function getGreenBar() {
		return $this->green_bar;
	}
	function setGreenBar($nValue) {
		$this->green_bar = $nValue;
	}
	function getEncryptionStrength() {
		return $this->encryption_strength;
	}
	function setEncryptionStrength($nValue) {
		$this->encryption_strength = $nValue;
	}
	function getAlgorithm() {
		return $this->algorithm;
	}
	function setAlgorithm($nValue) {
		$this->algorithm = $nValue;
	}
	function getSanSupport() {
		return $this->san_support;
	}
	function setSanSupport($nValue) {
		$this->san_support = $nValue;
	}
	function getWildcardSupport() {
		return $this->wildcard_support;
	}
	function setWildcardSupport($nValue) {
		$this->wildcard_support = $nValue;
	}
	function getMalwareScan() {
		return $this->malware_scan;
	}
	function setMalwareScan($nValue) {
		$this->malware_scan = $nValue;
	}
	function getVulnerabilityScan() {
		return $this->vulnerability_scan;
	}
	function setVulnerabilityScan($nValue) {
		$this->vulnerability_scan = $nValue;
	}
	function getBrowserCompatibility() {
		return $this->browser_compatibility;
	}
	function setBrowserCompatibility($nValue) {
		$this->browser_compatibility = $nValue;
	}
	function getServerLicenses() {
		return $this->server_licenses;
	}
	function setServerLicenses($nValue) {
		$this->server_licenses = $nValue;
	}
	function getReissuePolicy() {
		return $this->reissue_policy;
	}
	function setReissuePolicy($nValue) {
		$this->reissue_policy = $nValue;
	}

	function getProductFeatureIds() {
		return $this->product_feature_ids;
	}
	function setProductFeatureIds($nValue) {
		$this->product_feature_ids = $nValue;
	}
	
	function getHighlightFeatureIds() {
		return $this->highlight_feature_ids;
	}
	function setHighlightFeatureIds($nValue) {
		$this->highlight_feature_ids = $nValue;
	}

	function getSmartScreen() {
		return $this->smart_screen;
	}
	function setSmartScreen($nValue) {
		$this->smart_screen = $nValue;
	}

	function getWindowsHardware() {
		return $this->windows_hardware;
	}
	function setWindowsHardware($nValue) {
		$this->windows_hardware = $nValue;
	}

	function getSupportedPlatform() {
		return $this->supported_platform;
	}
	function setSupportedPlatform($nValue) {
		$this->supported_platform = $nValue;
	}

	function getStorage() {
		return $this->storage;
	}
	function setStorage($nValue) {
		$this->storage = $nValue;
	}

	function getTimeTamping() {
		return $this->time_tamping;
	}
	function setTimeTamping($nValue) {
		$this->time_tamping = $nValue;
	}
	
	function getSupportedFormat() {
		return $this->supported_format;
	}
	function setSupportedFormat($nValue) {
		$this->supported_format = $nValue;
	}

	function getComplianceStandard() {
		return $this->compliance_standard;
	}
	function setComplianceStandard($nValue) {
		$this->compliance_standard = $nValue;
	}

	function getServiceType() {
		return $this->service_type;
	}
	function setServiceType($nValue) {
		$this->service_type = $nValue;
	}

	function getOperatingSystem() {
		return $this->operating_system;
	}
	function setOperatingSystem($nValue) {
		$this->operating_system = $nValue;
	}

	function getStorageCapacity() {
		return $this->storage_capacity;
	}
	function setStorageCapacity($nValue) {
		$this->storage_capacity = $nValue;
	}

	function getRam() {
		return $this->ram;
	}
	function setRam($nValue) {
		$this->ram = $nValue;
	}

	function getCpu() {
		return $this->cpu;
	}
	function setCpu($nValue) {
		$this->cpu = $nValue;
	}

	function getBandwidth() {
		return $this->bandwidth;
	}
	function setBandwidth($nValue) {
		$this->bandwidth = $nValue;
	}

	function getIpAddress() {
		return $this->ip_address;
	}
	function setIpAddress($nValue) {
		$this->ip_address = $nValue;
	}

	function getWebServer() {
		return $this->web_server;
	}
	function setWebServer($nValue) {
		$this->web_server = $nValue;
	}

	function getControlPanel() {
		return $this->control_panel;
	}
	function setControlPanel($nValue) {
		$this->control_panel = $nValue;	
	}

	function getPhpVersion() {
		return $this->php_version;
	}
	function setPhpVersion($nValue) {
		$this->php_version = $nValue;
	}

	function getFramework() {
		return $this->framework;
	}
	function setFramework($nValue) {
		$this->framework = $nValue;
	}

	function getMysqlDbType() {
		return $this->mysql_db_type;
	}
	function setMysqlDbType($nValue) {
		$this->mysql_db_type = $nValue;
	}

	function getSslCertificate() {
		return $this->ssl_certificate;
	}
	function setSslCertificate($nValue) {
		$this->ssl_certificate = $nValue;
	}

	function getBackup() {
		return $this->backup;
	}
	function setBackup($nValue) {
		$this->backup = $nValue;
	}

	function getDdosProtection() {
		return $this->ddos_protection;
	}
	function setDdosProtection($nValue) {
		$this->ddos_protection = $nValue;
	}

	function getUptimeCommitment() {
		return $this->uptime_commitment;
	}
	function setUptimeCommitment($nValue) {
		$this->uptime_commitment = $nValue;
	}

	function getAllowedAccounts() {
		return $this->allowed_accounts;
	}
	function setAllowedAccounts($nValue) {
		$this->allowed_accounts = $nValue;
	}

	function getMailboxStorage() {
		return $this->mailbox_storage;
	}
	function setMailboxStorage($nValue) {
		$this->mailbox_storage = $nValue;
	}

	function getMaxAttachmentSize() {
		return $this->max_attachment_size;
	}
	function setMaxAttachmentSize($nValue) {
		$this->max_attachment_size = $nValue;
	}

	function getSendLimit() {
		return $this->send_limit;
	}
	function setSendLimit($nValue) {
		$this->send_limit = $nValue;
	}

	function getDedicatedIp() {
		return $this->dedicated_ip;
	}
	function setDedicatedIp($nValue) {
		$this->dedicated_ip = $nValue;
	}

	function getSupportedProtocol() {
		return $this->supported_protocol;
	}
	function setSupportedProtocol($nValue) {
		$this->supported_protocol = $nValue;
	}

	function getWebmail() {
		return $this->webmail;
	}
	function setWebmail($nValue) {
		$this->webmail = $nValue;
	}

	function getHasEncryption() {
		return $this->has_encryption;
	}
	function setHasEncryption($nValue) {
		$this->has_encryption = $nValue;
	}

	function getDnsConfig() {
		return $this->dns_config;
	}
	function setDnsConfig($nValue) {
		$this->dns_config = $nValue;
	}

	function getSpamFilter() {
		return $this->spam_filter;
	}
	function setSpamFilter($nValue) {
		$this->spam_filter = $nValue;
	}


	public function getFeatureNamesByIds($ids) {
		if (!$ids) return array();

		$ids = array_filter(array_map('intval', explode(',', $ids)));
		if (!$ids) return array();

		static $featureMap = null;

		if ($featureMap === null) {
			include_once(ROOT_PATH.'classes/dao/productfeatures.class.php');
			$productFeatures = new ProductFeatures($this->store_id);
			$featureMap = $productFeatures->getAllFeaturesMap();
		}

		$names = array();
		foreach ($ids as $id) {
			if (isset($featureMap[$id])) {
				$names[] = $featureMap[$id];
			}
		}

		return $names;
	}

	function getProductFeatureNames() {
		return $this->getFeatureNamesByIds($this->getProductFeatureIds());
	}

	function getHighlightFeatureNames() {
		return $this->getFeatureNamesByIds($this->getHighlightFeatureIds());
	}

	public function getAvatarImage($uploads) {
		if (!$uploads) return null;

		$avatarId = $this->getAvatar();
		if (!$avatarId) return null;

		$file = $uploads->getObject($avatarId);
		return $file ? $file : null;
	}


	public function getFeatureFullByIds($ids) {
		if (!$ids) return array();

		include_once(ROOT_PATH.'classes/dao/productfeatures.class.php');
		$productFeatures = new ProductFeatures($this->store_id);

		$ids = array_filter(array_map('intval', explode(',', $ids)));
		$result = array();

		foreach ($ids as $id) {
			$feature = $productFeatures->getObject($id);
			if ($feature) {
				$result[] = array(
					'id'     => $feature->getId(),
					'name'   => $feature->getName(),
					'description' => $feature->getDescription(),
					'avatar' => $feature->getAvatar()
				);
			}
		}

		return $result;
	}

	public function getFileImages($uploads) {
		$fileIds = $this->getFileIds();
		if (!$fileIds) return array();

		$ids = explode(',', $fileIds);
		$images = array();

		foreach ($ids as $id) {
			$img = $uploads->getObject(trim($id));
			if ($img) $images[] = $img;
		}

		return $images;
	}
}	
?>