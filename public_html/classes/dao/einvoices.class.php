<?php

/*************************************************************************
Class Invoicenew
----------------------------------------------------------------
 **************************************************************************/
include_once(ROOT_PATH . "classes/database/model.class.php");
include_once(ROOT_PATH . "classes/dao/einvoiceitem.class.php");
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
include_once(ROOT_PATH . 'classes/dao/symbols.class.php');

class EInvoice extends Model
{
	public $table;
	public $_db;
	private $store_id;

	public function __construct($store_id = 0, $database = '')
	{
		if (!$database) {
			global $db;
			$this->_db = $db;
		} else
			$this->_db = $database;
		$this->table = DB_PREFIX . "invoicenew";
		$this->store_id = $store_id;
	}
	public function EInvoice($store_id = 0, $database = '')
	{
		$this->__construct($store_id, $database);
	}
	/* Common methods
/*-----------------------------------------------------------------------*
* public function: getObject
* Parameter: key
* Return: Info object
*-----------------------------------------------------------------------*/
	public function getObject($value = '0', $key = 'id', $condition = '1>0')
	{
		if (!$key || !$value)
			return '';
		$result = $this->select('*', "`store_id` = '" . $this->store_id . "' AND `$key` = '$value' AND ($condition)");
		if ($result) {
			$object = new InvoiceNewInfo(
				$result[0]['serial'],
				$result[0]['masothue'],
				$result[0]['namedv'],
				$result[0]['name_cus'],
				$result[0]['email'],
				$result[0]['address'],
				$result[0]['stk'],
				$result[0]['date_set'],
				$result[0]['payments'],
				$result[0]['date_created'],
				$result[0]['subtotal_novat'],
				$result[0]['sub_total'],
				$result[0]['total_name'],
				$result[0]['properties'],
				$result[0]['status'],
				$result[0]['status_sign'],
				$result[0]['status_censored'],
				$result[0]['status_replace'],
				$result[0]['status_repair'],
				$result[0]['status_pdf'],
				$result[0]['status_convert'],
				$result[0]['status_delete'],
				$result[0]['auto_sign'],
				$result[0]['auto_post_togdt'],
				$result[0]['confirmation_code'],
				$result[0]['status_sale'],
				$result[0]['reasonsale'],
				$result[0]['id_sale_channel'],
				$result[0]['id_symbol'],
				$result[0]['id_bill'],
				$result[0]['id_cus'],
				$result[0]['store_id'],
				$result[0]['id']
			);
			return $object;
		}
		return 0;
	}
	/*-----------------------------------------------------------------------*
	 * public function: getObjects
	 * Parameter: WHERE condition
	 * Return: Array of Info objects
	 *-----------------------------------------------------------------------*/
	public function getObjects($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page)
			$page = 1;
		$start = ($page - 1) * $items_per_page;
		$results = $this->select('*', "`store_id` = '" . $this->store_id . "' AND $condition", $sort, $start, $items_per_page);
		if ($results) {
			$objects = array();
			foreach ($results as $key => $result) {
				$objects[] = new InvoiceNewInfo(
					$result['serial'],
					$result['masothue'],
					$result['namedv'],
					$result['name_cus'],
					$result['email'],
					$result['address'],
					$result['stk'],
					$result['date_set'],
					$result['payments'],
					$result['date_created'],
					$result['subtotal_novat'],
					$result['sub_total'],
					$result['total_name'],
					$result['properties'],
					$result['status'],
					$result['status_sign'],
					$result['status_censored'],
					$result['status_replace'],
					$result['status_repair'],
					$result['status_pdf'],
					$result['status_convert'],
					$result['status_delete'],
					$result['auto_sign'],
					$result['auto_post_togdt'],
					$result['confirmation_code'],
					$result['status_sale'],
					$result['reasonsale'],
					$result['id_sale_channel'],
					$result['id_symbol'],
					$result['id_bill'],
					$result['id_cus'],
					$result['store_id'],
					$result['id']
				);
			}
			return $objects;
		}
		return 0;
	}

	public function getObjects_DISTINCT($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page)
			$page = 1;
		$start = ($page - 1) * $items_per_page;

		$results = $this->select('DISTINCT `masothue`, `namedv`, `name_cus`', "`store_id` = '" . $this->store_id . "' AND $condition", $sort, $start, $items_per_page);

		if ($results) {
			$objects = array();
			foreach ($results as $key => $result) {

				$objects[] = new InvoiceNewInfo(
					$result['serial'],
					$result['masothue'],
					$result['namedv'],
					$result['name_cus'],
					$result['email'],
					$result['address'],
					$result['stk'],
					$result['date_set'],
					$result['payments'],
					$result['date_created'],
					$result['subtotal_novat'],
					$result['sub_total'],
					$result['total_name'],
					$result['properties'],
					$result['status'],
					$result['status_sign'],
					$result['status_censored'],
					$result['status_replace'],
					$result['status_repair'],
					$result['status_pdf'],
					$result['status_convert'],
					$result['status_delete'],
					$result['auto_sign'],
					$result['auto_post_togdt'],
					$result['confirmation_code'],
					$result['status_sale'],
					$result['reasonsale'],
					$result['id_sale_channel'],
					$result['id_symbol'],
					$result['id_bill'],
					$result['id_cus'],
					$result['store_id'],
					$result['id']
				);
			}
			return $objects;
		}
		return 0;
	}

	#Lay tat ca hoa don sai sot.
	public function getObjectsHDSS($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page)
			$page = 1;
		$start = ($page - 1) * $items_per_page;
		// $results = $this->select('*', "`store_id` = '".$this->store_id."' AND $condition", $sort, $start, $items_per_page);
		$allData = $this->select('*', "`store_id` = '" . $this->store_id . "' AND $condition", $sort);
		if ($allData) {
			$objects = array();
			$filterArray = [];
			#filter
			$i = 0;
			foreach ($allData as $key => $result) {
				$properties = unserialize($result['properties']);
				if (isset($properties['create_error_notify_xml_success']) && isset($properties['send_record_error_notify_xml_success'])) {
					if ($properties['create_error_notify_xml_success'] == 1 && $properties['send_record_error_notify_xml_success'] == 1) {
						array_push($filterArray, $result);
					} else if ($properties['create_error_notify_xml_success'] == 1 && $properties['send_record_error_notify_xml_success'] == "") {
						array_push($filterArray, $result);
					}
				}
			}
			#pagination
			$finalFilterArr = $this->filterItemsHDSS($filterArray, $start, $items_per_page);

			#return
			foreach ($finalFilterArr as $key => $result) {
				$objects[] = new InvoiceNewInfo(
					$result['serial'],
					$result['masothue'],
					$result['namedv'],
					$result['name_cus'],
					$result['email'],
					$result['address'],
					$result['stk'],
					$result['date_set'],
					$result['payments'],
					$result['date_created'],
					$result['subtotal_novat'],
					$result['sub_total'],
					$result['total_name'],
					$result['properties'],
					$result['status'],
					$result['status_sign'],
					$result['status_censored'],
					$result['status_replace'],
					$result['status_repair'],
					$result['status_pdf'],
					$result['status_convert'],
					$result['status_delete'],
					$result['auto_sign'],
					$result['auto_post_togdt'],
					$result['confirmation_code'],
					$result['status_sale'],
					$result['reasonsale'],
					$result['id_sale_channel'],
					$result['id_symbol'],
					$result['id_bill'],
					$result['id_cus'],
					$result['store_id'],
					$result['id']
				);
			}
			return array("objects" => $objects, "numItems" => count($filterArray));
		}
		return 0;
	}
	public function getDistinctColumnValues($columnName = "", $page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page) {
			$page = 1;
		}

		$allowedColumns = [
			'masothue',
			'namedv',
			'email',
			'address',
			'stk',
			'payments',
			'serial',
			'name_cus',
			'date_set',
			'date_created',
			'subtotal_novat',
			'sub_total',
			'total_name',
			'properties',
			'status',
			'status_sign',
			'status_censored',
			'status_replace',
			'status_repair',
			'status_pdf',
			'status_convert',
			'status_delete',
			'auto_sign',
			'auto_post_togdt',
			'confirmation_code',
			'status_sale',
			'reasonsale',
			'id_sale_channel',
			'id_symbol',
			'id_bill',
			'id_cus',
			'id_attanched',
			'store_id',
			'id'
		];

		if (!in_array($columnName, $allowedColumns)) {
			return [];
		}
		$start = ($page - 1) * $items_per_page;

		// Sửa lỗi cú pháp ở đây
		$results = $this->select("DISTINCT `" . $columnName . "`", "`store_id` = '" . $this->store_id . "' AND $condition", $sort, $start, $items_per_page);

		if ($results) {
			$objects = array();
			foreach ($results as $result) {
				$objects[] = $result[$columnName];
			}
			return $objects;
		}
		return [];
	}


	function filterItemsHDSS($array, $start, $item_per_page)
	{
		$newArr = [];
		//Thực hiện lấy đúng số lượng cho phân trang.
		$dem = 1;
		for ($i = $start; $i < count($array); $i++) {

			if ($i >= $start && $dem <= $item_per_page) {
				$dem++;
				array_push($newArr, $array[$i]);
			} else {
			}
		}
		return $newArr;
	}

	public function getObjectsReturnNull($page = 1, $condition = '1>0', $sort = array(), $items_per_page = DEFAULT_ADMIN_ROWS_PER_PAGE)
	{
		if (!$page)
			$page = 1;
		$start = ($page - 1) * $items_per_page;
		$results = $this->select('*', "`store_id` = '" . $this->store_id . "' AND $condition", $sort, $start, $items_per_page);
		if ($results) {
			$objects = array();
			foreach ($results as $key => $result) {
				$objects[] = new InvoiceNewInfo(
					$result['serial'],
					$result['masothue'],
					$result['namedv'],
					$result['name_cus'],
					$result['email'],
					$result['address'],
					$result['stk'],
					$result['date_set'],
					$result['payments'],
					$result['date_created'],
					$result['subtotal_novat'],
					$result['sub_total'],
					$result['total_name'],
					$result['properties'],
					$result['status'],
					$result['status_sign'],
					$result['status_censored'],
					$result['status_replace'],
					$result['status_repair'],
					$result['status_pdf'],
					$result['status_convert'],
					$result['status_delete'],
					$result['auto_sign'],
					$result['auto_post_togdt'],
					$result['confirmation_code'],
					$result['status_sale'],
					$result['reasonsale'],
					$result['id_symbol'],
					$result['id_bill'],
					$result['id_cus'],
					$result['store_id'],
					$result['id']
				);
			}
			return $objects;
		}
		return '';
	}

	/*-----------------------------------------------------------------------*
	 * public function: updateData
	 * Parameter: Info object
	 * Return: 1 if success, 0 if fail
	 *-----------------------------------------------------------------------*/
	//Count invoice used
	function getCountInvoiceUse($key = 'id', $condition)
	{
		$data = $this->countItems($key, "`store_id` = '" . $this->store_id . "' AND $condition");
		if (!empty($data))
			return $data;
		return 0;
	}
	# Add record
	public function addData($fields, $key = 'id')
	{
		$result = $this->add($fields, '$key', 'NULL');
		if ($result)
			return $result;
		return 0;
	}

	# Update record
	public function updateData($fields, $value = '', $key = 'id')
	{
		$result = $this->update($fields, "`store_id` = '" . $this->store_id . "' AND `$key` = '$value'");
		if ($result)
			return $result;
		return 0;
	}

	public function getMaxSerialBC($key = 'id_symbol', $key2 = 'id_bill', $date_first = '0000-00-00', $date_last = '0000-00-00')
	{
		if (!$date_first || !$date_first)
			return 0;
		$result = $this->select('MAX(`serial`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2' AND (`date_set` BETWEEN '$date_first' AND '$date_last')");
		if ($result)
			return $result[0][0];
		return 0;
	}
	public function getMaxSerial($key = 'id_symbol', $key2 = 'id_bill')
	{
		$result = $this->select('MAX(`serial`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2'");
		if ($result)
			return $result[0][0];

		return 0;
	}
	public function getMaxSerial_test($key = 'id_symbol', $key2 = 'id_bill')
	{
		global $storeId;
		$symbolss = new Symbols($storeId);
		$objSymbol = $symbolss->getObject($key);
		if (!$objSymbol) return 0;
		$infoCheck = $objSymbol->getProperty('info');
		if (!isset($infoCheck['hidden_symbol']) || strlen($infoCheck['hidden_symbol']) < 4) {
			return 0;
		}
		$yearInSymbol = substr($infoCheck['hidden_symbol'], 2, 2);
		
   		$yearSymbolActive = '20' . $yearInSymbol;
		$currentYearTest = (string)date('Y');
		if($currentYearTest ==  $yearSymbolActive)
		{
			$result = $this->select('*', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2'");
			if ($result)
				return $result[0][0];
		}
		return 0;
	}
	public function getTop3MaxSerial($key = 'id_symbol', $key2 = 'id_bill', $key3 = 'serial')
	{
		$result = $this->select(
			'`id`, `serial`, `date_set`',
			"`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2' AND CAST(`serial` AS UNSIGNED) < CAST('$key3' AS UNSIGNED)",
			array('serial' => 'DESC'),
			0,
			1
		);

		$invoiceData = [];
		if (!empty($result)) {
			foreach ($result as $row) {
				$invoiceData[] = [
					'id' => $row['id'],
					'serial' => $row['serial'],
					'date_set' => $row['date_set'],


				];
			}
			return $invoiceData;
		}
		return 0;
	}

	public function checkInvoiceSignedPreceding($invoiceData, $invoiceBatchIds)
	{

		$arrSerial = [];
		$completedStatusCodes = [15, 14, 18, 10, 11];
		if (!is_array($invoiceBatchIds)) {
			$invoiceBatchIds = [];
		}
		foreach ($invoiceData as $serialInfo) {
			if (!is_array($serialInfo) || !isset($serialInfo['id']) || !isset($serialInfo['serial'])) {
				error_log("Dữ liệu hóa đơn không hợp lệ trong checkInvoiceSignedPreceding: " . json_encode($serialInfo));
				continue;
			}
			$currentInvoiceIdBeingChecked = (int) $serialInfo['id'];
			if (in_array($currentInvoiceIdBeingChecked, $invoiceBatchIds)) {
				continue;
			}
			$invoiceObj = $this->getObject($serialInfo['id']);

			if (!$invoiceObj) {
				error_log("Không tìm thấy đối tượng hóa đơn với ID: " . $serialInfo['id']);
				continue;
			}
			$isCheckStatusSign = $invoiceObj->getStatusTextBackendNumber();
			if (!in_array($isCheckStatusSign, $completedStatusCodes)) {
				$arrSerial[] = [
					'serial' => $serialInfo['serial'],
					'date_set' => $serialInfo['date_set']
				];
			}
		}
		return $arrSerial;
	}
	public function getMaxSerialSigned($key = 'id_symbol', $key2 = 'id_bill')
	{
		$result = $this->select('MAX(`serial`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2' AND `status_sign`='2'");
		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getMaxSerialSignedDelete($key = 'id_symbol', $key2 = 'id_bill')
	{
		$result = $this->select('MAX(`serial`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2' AND `status_delete`= '1'");

		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getMinSerialBC($key = 'id_symbol', $key2 = 'id_bill', $date_first = '0000-00-00', $date_last = '0000-00-00')
	{
		if (!$date_first || !$date_first)
			return 0;
		$result = $this->select('MIN(`serial`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2' AND (`date_set` BETWEEN '$date_first' AND '$date_last')");
		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getMinSerial($key = 'id_symbol', $key2 = 'id_bill')
	{
		$result = $this->select('MIN(`serial`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2'");
		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getCountSerial($key = 'id_symbol', $key2 = 'id_bill')
	{
		$result = $this->select('count(`id`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '$key' AND `id_bill`='$key2'");
		if ($result)
			return $result[0][0];
		return 0;
	}

	# Change status
	public function changeStatus($id = 0, $status = '')
	{
		if (!$id)
			return 0;
		if ($this->update(array('status' => $status), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'"))
			return 1;
		return 0;
	}

	public function changeStatusSign($id = 0, $status_sign = '')
	{
		if (!$id)
			return 0;
		if ($this->update(array('status_sign' => $status_sign), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'"))
			return 1;
		return 0;
	}

	public function changeStatusConvert($id = 0, $status_convert = '')
	{
		if (!$id)
			return 0;
		if ($this->update(array('status_convert' => $status_convert), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'"))
			return 1;
		return 0;
	}

	public function changeStatusDelete($id = 0, $status_delete = '')
	{
		if (!$id)
			return 0;
		if ($this->update(array('status_delete' => $status_delete), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'"))
			return 1;
		return 0;
	}

	public function changeStatusReplace($id = 0, $status_replace = '')
	{
		if (!$id)
			return 0;
		if ($this->update(array('status_replace' => $status_replace), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'"))
			return 1;
		return 0;
	}

	public function changeStatusRepair($id = 0, $status_repair = '')
	{
		if (!$id)
			return 0;
		if ($this->update(array('status_repair' => $status_repair), "`store_id` = '" . $this->store_id . "' AND `id` = '$id'"))
			return 1;
		return 0;
	}

	public function getSerialFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('serial', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['serial'];
		return '';
	}

	// public function getMaxSerial($key = 'id_symbol',$key2 = 'id_bill') {
	// 	$result = $this->select('MAX(`serial`)', "`id_symbol` = '$key' AND `id_bill`='$key2'");
	// 	if($result) return $result[0][0];
	// 	return 0;
	// }

	public function getIdFromSerial($serial = 'serial', $key = 'id_symbol', $key2 = 'id_bill')
	{
		if (!$serial)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `serial` = '$serial' AND `id_symbol` = '$key' AND `id_bill`='$key2'");
		if ($result)
			return $result[0]['id'];
		return '';
	}

	public function getDateSetFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('date_set', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['date_set'];
		return '';
	}
	public function getNameDVFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('namedv', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['namedv'];
		return '';
	}
	public function getNameCusFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('name_cus', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['name_cus'];
		return '';
	}
	public function getNoteByIdInvoice($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('properties', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if (isset(unserialize($result[0]['properties'])['ghichu']))
			return unserialize($result[0]['properties'])['ghichu'];
		return 0;
	}
	public function getIdFromNameCus($namecus = '')
	{
		if (!$namecus)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `name_cus` = '$namecus'");
		if ($result)
			return $result[0]['id'];
		return '';
	}
	public function getIdFromNameDV($namedv = '')
	{
		if (!$namedv)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `namedv` = '$namedv'");
		if ($result)
			return $result[0]['id'];
		return '';
	}
	public function getIdFromMST($mst = '')
	{
		if (!$mst)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `masothue` = '$mst'");
		if ($result)
			return $result[0]['id'];
		return '';
	}
	public function getMSTFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('masothue', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['masothue'];
		return '';
	}

	public function getAddressFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('address', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['address'];
		return '';
	}

	public function getPaymentFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('payments', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['payments'];
		return '';
	}

	public function getIdromConfirmationcode($confirmation_code = '')
	{
		if (!$confirmation_code)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND confirmation_code = '$confirmation_code'");
		if ($result)
			return $result[0]['id'];
		return '';
	}

	public function getIdBillFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('id_bill', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['id_bill'];
		return '';
	}
	public function getNguoiMuaKhongLayHoaDonFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('properties', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if (isset(unserialize($result[0]['properties'])['nguoimuakhonglayhoadon']))
			return unserialize($result[0]['properties'])['nguoimuakhonglayhoadon'];
		return 0;
	}
	public function getPropertyFromId($id = '', $key = "")
	{
		if (!$id)
			return '';
		$result = $this->select('properties', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if (unserialize($result[0]['properties']))
			return unserialize($result[0]['properties']);
		return 0;
	}

	public function getPropertyKeyFromId($id = '', $key = "")
	{
		if (!$id)
			return '';
		$result = $this->select('properties', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if (isset(unserialize($result[0]['properties'])[$key]))
			return unserialize($result[0]['properties'])[$key];
		return 0;
	}
	public function getAllFileDowFromCondition($condition = "", $type)
	{
		if (!$condition)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND" . $condition);
		// var_dump($result);die;
		$arrdata = array();
		for ($i = 0; $i < count($result); $i++) {
			$detaildata = array();
			$id_invoice = $result[$i]['id'];
			$store_id = $this->store_id;
			$dataproperty = $this->getPropertyFromId($id_invoice);
			$serialHD = $this->getSerialFromId($id_invoice);
			if ($type == 1) {
				if (empty($dataproperty['hienthipdflan2'])) {
					$namepdf = $dataproperty['view_mpdfinvoice'];
				} else {
					$namepdf = $dataproperty['view_mpdf_hienthipdflan2'];
				};
				$detaildata['urlfile'] = "upload/newinvoice/$store_id/$id_invoice/$namepdf";
				$detaildata['newfilename'] = "HD-$serialHD.pdf";
			} elseif ($type == 2) {
				$namexml = $dataproperty['xmlfinvoice_signed'];
				$detaildata['urlfile'] = "upload/newinvoice/$store_id/$id_invoice/$namexml";
				$detaildata['newfilename'] = "HD-$serialHD.xml";
			}

			array_push($arrdata, $detaildata);
		}
		return $arrdata;
	}
	public function getAllFileDowWithNameFileFromCondition($condition = "", $type, $namefile = "")
	{
		if (!$condition)
			return '';
		$result = $this->select('id', "`store_id` = '" . $this->store_id . "' AND" . $condition);
		// var_dump($result);die;
		$arrdata = array();
		for ($i = 0; $i < count($result); $i++) {
			$detaildata = array();
			$id_invoice = $result[$i]['id'];
			$store_id = $this->store_id;
			$dataproperty = $this->getPropertyFromId($id_invoice);
			$serialHD = $this->getSerialFromId($id_invoice);

			$namexml = $dataproperty[$namefile];
			$detaildata['urlfile'] = "upload/newinvoice/$store_id/$id_invoice/$namexml";
			if ($type == 1) {
				$detaildata['newfilename'] = "HD-$serialHD.pdf";
			} elseif ($type == 2) {
				$detaildata['newfilename'] = "HD-$serialHD.xml";
			}


			array_push($arrdata, $detaildata);
		}
		return $arrdata;
	}
	public function CheckInvoiveSamevatOrOtherVat($bill_id = "")
	{
		include_once(ROOT_PATH . 'classes/dao/invoiceforms.class.php');
		include_once(ROOT_PATH . 'classes/dao/bill.class.php');
		$invoiceforms = new InvoiceForm($this->store_id);
		$bills = new Bills($this->store_id);
		if (!$bill_id)
			return '';
		$form_hd = $invoiceforms->getFormHDFromId($bills->getIvFormFromId($bill_id));
		if (!empty($form_hd)) {
			if ($form_hd == 22 || $form_hd == 15 || $form_hd == 17 || $form_hd == 18 || $form_hd == 20 || $form_hd == 24 || $form_hd == 25) {
				return 1; //cùng vat
			} else {
				return 2; //khác vats
			}
		} else {
			return 0; //không có giá trị form_hd
		}
	}


	public function getIdSymbollFromId($id = '')
	{
		if (!$id)
			return '';
		$result = $this->select('id_symbol', "`store_id` = '" . $this->store_id . "' AND id = '$id'");
		if ($result)
			return $result[0]['id_symbol'];
		return '';
	}

	# Clean trash
	public function cleanTrash()
	{
		include_once(ROOT_PATH . 'classes/dao/orderitems.class.php');
		$listOrder = $this->select('id', "`store_id` = '" . $this->store_id . "' AND `status` = " . S_DELETED);
		if ($listOrder) {
			foreach ($listOrder as $order) {
				$orderObject = new OrderItems($order['id']);
				$orderObject->deleteData($order['id'], 'order_id');
			}
		}
		$result = $this->delete("`store_id` = '" . $this->store_id . "' AND `status` = " . S_DELETED);
		if ($result)
			return 1;
		return 0;
	}

	public function cleanTrashToId($id = 0)
	{
		if (!$id)
			return 0;
		$result = $this->delete("`store_id` = '" . $this->store_id . "' AND `id` = '$id'");
		if ($result)
			return 1;
		return 0;
	}

	# Check duplicate
	public function duplicateSlug($slug, $id = 0)
	{
		$rows = $this->countItems('id', "`store_id` = '" . $this->store_id . "' AND `slug` = '$slug'" . ($id ? " AND `id` <> '$id'" : ''));
		if ($rows)
			return 1;
		return 0;
	}

	public function checkDuplicate($value = '', $key = 'title', $condition = '')
	{
		$result = $this->select("`$key`", "`store_id` = '" . $this->store_id . "' AND `$key` = '$value'" . ($condition ? " AND $condition" : ''));
		if ($result)
			return 1;
		return 0;
	}

	public function getTopStoreOrder()
	{
		$results = $this->select('*,count(`id`)', "1=1 group by `store_id`", array('id' => 'asc'), 10);
		$objects = array();
		if ($results) {
			foreach ($results as $key => $result) {
				$objects[] = $result['store_id'];
			}
			return implode(",", $objects);
		} else
			return 0;
	}

	public function getMaxDateSet()
	{
		$result = $this->select('MAX(`date_set`)', "`store_id` = '" . $this->store_id . "'");
		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getCountInvoiceFromIdSymbol($idSymbol = '')
	{
		$result = $this->select('COUNT(`id`)', "`store_id` = '" . $this->store_id . "' AND `id_symbol` = '" . $idSymbol . "'");
		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getCountInvoice_Dashboard()
	{
		$result = $this->select('COUNT(`id`)', "`store_id` = '" . $this->store_id . "' AND `status_delete` = 1 AND `status_convert` = 1");
		if ($result)
			return $result[0][0];
		return 0;
	}

	public function getStoreIdFromMTDTChieu($MTDTChieu = '')
	{
		if (!$MTDTChieu)
			return '';
		$result = $this->select('store_id', "`properties` LIKE '%$MTDTChieu%'");
		if ($result)
			return $result[0]['store_id'];
		return '';
	}
	public function showTextLoaiThongBao($number)
	{
		$array = [1 => "Hủy", 2 => "Điều chỉnh", 3 => "Thay thế", 4 => "Giải trình"];
		foreach ($array as $key => $item) {
			if ($key == $number) {
				return $item;
			}
		}
		return '';
	}

	public function countUseInvoice($invoicenewss, $symbol)
	{
		$estores_datatable = new EStores();
		$obSymbol = $symbol->getObject(1, "status_set");
		if (empty($obSymbol)) {
			echo "<script>alert('Không có hiệu lực hóa đơn');window.location.href='/admin.php?op=newinvoice&act=new&mod=list'</script>";
			exit();
		} else {

			$idSymbol = $obSymbol->getId();
			//số hóa đơn đã ký

			$countslhd = $invoicenewss->getCountInvoiceUse("id", "`id_symbol`='$idSymbol' AND `status_sign`='2'") ?
				$invoicenewss->getCountInvoiceUse("id", "`id_symbol`='$idSymbol' AND `status_sign`='2'") : 0;
			//số hóa đơn chưa ký 
			$countslhd_chuaky = $invoicenewss->getCountInvoiceUse("id", "`id_symbol`='$idSymbol' AND `status_sign`='1'") ?
				$invoicenewss->getCountInvoiceUse("id", "`id_symbol`='$idSymbol' AND `status_sign`='1'") : 0;

			$totalUseIv = (int) $countslhd + (int) $countslhd_chuaky;
			if ($totalUseIv >= $obSymbol->getQuantity()) {
				// $symbol->changeStatusUseup($idSymbol,1);
				// $symbol->changeStatusSet($idSymbol,0);
				echo "<script>alert('Đã sử dụng hết số hóa đơn.');window.location.href='/admin.php?op=newinvoice&act=new&mod=list'</script>";
				exit();
			}
		}
	}

	public function countUseInvoiceApi($invoicenewss, $symbol)
	{ #for api
		$estores_datatable = new EStores();
		$obSymbol = $symbol->getObject(1, "status_set");
		$bool = 0;
		if (empty($obSymbol)) {
			// echo "<script>alert('Không có hiệu lực hóa đơn');window.location.href='/admin.php?op=newinvoice&act=new&mod=list'</script>";
			// exit();
			$bool = 1;
			return $bool;
		} else {
			$idSymbol = $obSymbol->getId();
			//số hóa đơn đã ký
			$countslhd = $invoicenewss->getObjects(1, "`id_symbol`=$idSymbol AND `status_sign`='2'", "", 999999) ?
				$invoicenewss->getObjects(1, "`id_symbol`=$idSymbol AND `status_sign`='2'", "", 999999) : [];
			//số hóa đơn chưa ký 
			$countslhd_chuaky = $invoicenewss->getObjects(1, "`id_symbol`=$idSymbol AND `status_sign` = 1 ", "", 999999) ?
				$invoicenewss->getObjects(1, "`id_symbol`=$idSymbol AND `status_sign` = 1 ", "", 999999) : [];

			$totalUseIv = count($countslhd) + count($countslhd_chuaky);
			if ($totalUseIv >= $obSymbol->getQuantity()) {
				// $symbol->changeStatusUseup($idSymbol,1);
				// $symbol->changeStatusSet($idSymbol,0);
				// echo "<script>alert('Đã sử dụng hết số hóa đơn.');window.location.href='/admin.php?op=newinvoice&act=new&mod=list'</script>";
				// exit();
				$bool = 2;
				return $bool;
			}
		}
		return 3; # 3 is ok;
	}
}
