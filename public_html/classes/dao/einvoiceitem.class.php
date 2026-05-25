<?php

/*************************************************************************
Class OrderInfo
----------------------------------------------------------------
BiDo.vn Project
Last updated: 07/11/2010
Author: Mai Minh (http://maiminh.vnweblogs.com)
 **************************************************************************/
class InvoiceNewInfo
{
	public $id;			# Order ID
	private $store_id;		# Store ID
	private $id_cus;		# Customer ID
	private $id_bill;
	private $id_symbol;
	private $id_sale_channel;
	private $serial;	# 0 - Not registered, 1 - Registered users, 2 - Staff
	private $masothue;
	private $namedv;
	private $name_cus;
	private $email;
	private $address;
	private $stk;
	private $date_set;
	private $payments;
	private $date_created;
	private $subtotal_novat;
	private $sub_total;
	private $total_name;
	private $properties;
	private $status;
	private $status_sign;
	private $status_censored;
	private $status_replace;
	private $status_repair;
	private $status_pdf;
	private $status_convert;
	private $status_delete;
	private $auto_sign;
	private $auto_post_togdt;
	private $confirmation_code;
	private $status_sale;
	private $reasonsale;

	# Constructor
	public function __construct($serial, $masothue, $namedv, $name_cus, $email, $address, $stk, $date_set, $payments, $date_created, $subtotal_novat, $sub_total, $total_name, $properties, $status, $status_sign, $status_censored, $status_replace, $status_repair, $status_pdf, $status_convert, $status_delete, $auto_sign, $auto_post_togdt, $confirmation_code, $status_sale, $reasonsale, $id_sale_channel = 0, $id_symbol = 0, $id_bill = 0, $id_cus = 0, $store_id = 0, $id = 0)
	{
		$this->id = $id;
		$this->store_id = $store_id;
		$this->id_cus = $id_cus;
		$this->id_bill = $id_bill;
		$this->id_symbol = $id_symbol;
		$this->id_sale_channel = $id_sale_channel;
		$this->id_sale_channel = $id_sale_channel;
		$this->serial = $serial;
		$this->masothue = $masothue;
		$this->namedv = stripslashes($namedv);
		$this->name_cus = stripslashes($name_cus);
		$this->email = $email;
		$this->address = stripslashes($address);
		$this->stk = $stk;
		$this->date_set = $date_set;
		$this->payments = $payments;
		$this->date_created = $date_created;
		$this->subtotal_novat = $subtotal_novat;
		$this->sub_total = $sub_total;
		$this->total_name = $total_name;
		$this->properties = unserialize($properties);
		$this->status = $status;
		$this->status_sign = $status_sign;
		$this->status_censored = $status_censored;
		$this->status_replace = $status_replace;
		$this->status_repair = $status_repair;
		$this->status_pdf = $status_pdf;
		$this->status_convert = $status_convert;
		$this->status_delete = $status_delete;
		$this->auto_sign = $auto_sign;
		$this->auto_post_togdt = $auto_post_togdt;
		$this->confirmation_code = $confirmation_code;
		$this->status_sale = $status_sale;
		$this->reasonsale = $reasonsale;
	}
	public function InvoiceNewInfo($serial, $masothue, $namedv, $name_cus, $email, $address, $stk, $date_set, $payments, $date_created, $subtotal_novat, $sub_total, $total_name, $properties, $status, $status_sign, $status_censored, $status_replace, $status_repair, $status_pdf, $status_convert, $status_delete, $auto_sign, $auto_post_togdt, $confirmation_code, $status_sale, $reasonsale, $id_sale_channel = 0, $id_symbol = 0, $id_bill = 0, $id_cus = 0, $store_id = 0, $id = 0)
	{
		$this->__construct($serial, $masothue, $namedv, $name_cus, $email, $address, $stk, $date_set, $payments, $date_created, $subtotal_novat, $sub_total, $total_name, $properties, $status, $status_sign, $status_censored, $status_replace, $status_repair, $status_pdf, $status_convert, $status_delete, $auto_sign, $auto_post_togdt, $confirmation_code, $status_sale, $reasonsale, $id_sale_channel, $id_symbol, $id_bill, $id_cus, $store_id, $id);
	}

	public function getStoreId()
	{
		return $this->store_id;
	}
	public function setStoreId($nValue)
	{
		$this->store_id = $nValue;
	}

	public function getConfirmationcode()
	{
		return $this->confirmation_code;
	}
	public function setConfirmationcode($nValue)
	{
		$this->confirmation_code = $nValue;
	}

	public function getStatusSale()
	{
		return $this->status_sale;
	}
	public function setStatusSale($nValue)
	{
		$this->status_sale = $nValue;
	}

	public function getReasonSale()
	{
		return $this->reasonsale;
	}
	public function setReasonSale($nValue)
	{
		$this->reasonsale = $nValue;
	}

	public function getTotalName()
	{
		return $this->total_name;
	}
	public function setTotalName($nValue)
	{
		$this->total_name = $nValue;
	}

	public function getSerial()
	{
		return $this->serial;
	}
	public function setSerial($nValue)
	{
		$this->serial = $nValue;
	}
	public function getDateCreated()
	{
		return $this->date_created;
	}
	public function setDateCreated($nValue)
	{
		$this->date_created = $nValue;
	}
	public function getIdcus()
	{
		return $this->id_cus;
	}
	public function setIdcus($nValue)
	{
		$this->id_cus = $nValue;
	}
	public function getIdBill()
	{
		return $this->id_bill;
	}
	public function setIdBill($nValue)
	{
		$this->id_bill = $nValue;
	}
	public function getIdSymboll()
	{
		return $this->id_symbol;
	}
	public function setIdSymboll($nValue)
	{
		$this->id_symbol = $nValue;
	}
	public function getIdSaleChannel()
	{
		return $this->id_sale_channel;
	}
	public function setIdSaleChannel($nValue)
	{
		$this->id_sale_channel = $nValue;
	}
	public function getMasothue()
	{
		$checknamecus11 = $this->masothue;
		if (!$checknamecus11 || $checknamecus11 == ' ' || $checknamecus11 == '') {
			return '';
		} else	return $this->masothue;
	}
	public function setMasothue($nValue)
	{
		$this->masothue = $nValue;
	}
	public function getnamedv()
	{
		$checknamecus1 = $this->namedv;
		if (!$checknamecus1 || $checknamecus1 == ' ' || $checknamecus1 == '') {
			return '';
		} else	return $this->namedv;
	}
	public function setnamedv($nValue)
	{
		$this->namedv = $nValue;
	}
	public function getnamecus()
	{
		$checknamecus = $this->name_cus;
		if (!$checknamecus || $checknamecus == ' ' || $checknamecus == '') {
			return '';
		} else return $this->name_cus;
	}
	public function setnamecus($nValue)
	{
		$this->name_cus = $nValue;
	}
	public function getSubTotal()
	{
		return $this->sub_total;
	}
	public function setSubTotal($nValue)
	{
		$this->sub_total = $nValue;
	}
	public function getSubTotalNoVat()
	{
		return $this->subtotal_novat;
	}
	public function setSubTotalNoVat($nValue)
	{
		$this->subtotal_novat = $nValue;
	}

	public function getId()
	{
		return $this->id;
	}
	public function setId($nValue)
	{
		$this->id = $nValue;
	}

	public function getEmail()
	{
		return $this->email;
	}
	public function setEmail($nValue)
	{
		$this->email = $nValue;
	}
	public function getAddress()
	{
		return $this->address;
	}
	public function setAddress($nValue)
	{
		$this->address = stripslashes($nValue);
	}
	public function getstk()
	{
		return $this->stk;
	}
	public function setstk($nValue)
	{
		$this->stk = $nValue;
	}
	public function getdateset()
	{
		return $this->date_set;
	}
	public function setdateset($nValue)
	{
		$this->date_set = $nValue;
	}
	public function getPayment()
	{
		return $this->payments;
	}
	public function setPayment($nValue)
	{
		$this->payments = $nValue;
	}
	public function getProperty($key)
	{
		if (isset($this->properties[$key])) return $this->properties[$key];
		return '';
	}
	public function setProperty($key, $nValue)
	{
		$this->properties[$key] = $nValue;
	}
	public function getProperties()
	{
		return $this->properties;
	}
	public function setProperties($nValue)
	{
		$this->properties = $nValue;
	}
	public function getStatus()
	{
		return $this->status;
	}
	public function setStatus($nValue)
	{
		$this->status = $nValue;
	}

	public function getStatusTextBackend()
	{
		global $amessages;
		$mccqtValue = $this->getProperty("MCCQT");
		$recordXMLValue = $this->getProperty("send_record_xml_success");
		$td999linkValue = $this->getProperty("HD_TD999_link");
		$td202linkValue = $this->getProperty("HD_TD202_link");
		$td204linkValue = $this->getProperty("HD_TD204_link");
		$HD_TD204_status = $this->getProperty("HD_TD204_status");
		if ($this->getStatusDelete() != 2 && $this->getStatusDelete() != '2') {
			if ($td999linkValue != "") {
				if ($td202linkValue == "" && $td204linkValue == "" && file_exists($td999linkValue)) {
					return $amessages['invoice_status'][15];
				}
			}
			if ($td204linkValue != "") {
				if ($HD_TD204_status != "Lỗi" && $mccqtValue != "" && $recordXMLValue == 1 && file_exists($td204linkValue)) {
					return $amessages['invoice_status'][18];
				}
			}
			if ($td202linkValue != "") {
				if ($mccqtValue != "" && $recordXMLValue == 1 && file_exists($td202linkValue)) {
					return $amessages['invoice_status'][14];
				}
			}
		}

		return $amessages['invoice_status'][$this->status];
	}
	public function getStatusTextBackendNumber()
	{
		$mccqtValue = $this->getProperty("MCCQT");
		$recordXMLValue = $this->getProperty("send_record_xml_success");
		$td999linkValue = $this->getProperty("HD_TD999_link");
		$td202linkValue = $this->getProperty("HD_TD202_link");
		$td204linkValue = $this->getProperty("HD_TD204_link");
		$HD_TD204_status = $this->getProperty("HD_TD204_status");
		if ($this->getStatusDelete() != 2 && $this->getStatusDelete() != '2') {
			if ($td999linkValue != "") {
				if ($td202linkValue == "" && $td204linkValue == "" && file_exists($td999linkValue)) {
					return 15;
				}
			}
			if ($td204linkValue != "") {
				if ($HD_TD204_status != "Lỗi" && $mccqtValue != "" && $recordXMLValue == 1 && file_exists($td204linkValue)) {
					return 18;
				}
			}
			if ($td202linkValue != "") {
				if ($mccqtValue != "" && $recordXMLValue == 1 && file_exists($td202linkValue)) {
					return 14;
				}
			}
		}

		return $this->status;
	}


	public function getTypeInvoiceTextBackend()
	{

		if ($this->status_repair == 1) {
			$type_invoice = "Hóa đơn điều chỉnh";
		} elseif ($this->status_replace == 1) {
			$type_invoice = "Hóa đơn thay thế";
		} else {
			$type_invoice = "Hóa đơn GTGT";
		}

		return $type_invoice;
	}
	public function getTypeInvoiceNumberBackend()
	{

		if ($this->status_repair == 1) {
			$type_invoice = "2";
		} elseif ($this->status_replace == 1) {
			$type_invoice = "3";
		} else {
			$type_invoice = "1";
		}
		return $type_invoice;
	}

	public function getProduct()
	{
		include_once(ROOT_PATH . "classes/daos/products.class.php");
		$products = new Products($this->store_id);
		$product = $products->getObject($this->product_id);
		if ($product) return $product;
		return '';
	}

	public function getStatusPdf()
	{
		return $this->status_pdf;
	}
	public function setStatusPdf($nValue)
	{
		$this->status_pdf = $nValue;
	}

	public function getStatuscensored()
	{
		return $this->status_censored;
	}
	public function setStatuscensored($nValue)
	{
		$this->status_censored = $nValue;
	}

	public function getStatusReplace()
	{
		return $this->status_replace;
	}
	public function setStatusReplace($nValue)
	{
		$this->status_replace = $nValue;
	}

	public function getStatusRepair()
	{
		return $this->status_repair;
	}
	public function setStatusRepair($nValue)
	{
		$this->status_repair = $nValue;
	}

	public function getStatusSign()
	{
		return $this->status_sign;
	}
	public function setStatusSign($nValue)
	{
		$this->status_sign = $nValue;
	}

	public function getStatusConvert()
	{
		return $this->status_convert;
	}
	public function setStatusConvert($nValue)
	{
		$this->status_convert = $nValue;
	}

	public function getStatusDelete()
	{
		return $this->status_delete;
	}
	public function setStatusDelete($nValue)
	{
		$this->status_delete = $nValue;
	}

	public function getAutoSign()
	{
		return $this->auto_sign;
	}
	public function setAutoSign($nValue)
	{
		$this->auto_sign = $nValue;
	}

	public function getAutoPostToGDT()
	{
		return $this->auto_post_togdt;
	}
	public function setAutoPostToGDT($nValue)
	{
		$this->auto_post_togdt = $nValue;
	}

	public function getPaymentStatusTextBackend()
	{
		global $amessages;
		return $amessages['payment_sta'][$this->payments];
	}
}
