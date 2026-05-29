<?php
/*************************************************************************
Company Config module
----------------------------------------------------------------
**************************************************************************/

$templateFile = 'managecompanyconfig.tpl.html';

global $estore, $storeId, $request, $template;
include_once(ROOT_PATH . 'classes/dao/estores.class.php');
$stores = new EStores();
$doo = $request->element('doo');

if ($doo == 'submit') {
    $company_name = $request->element('company_name');
    $tax_code = $request->element('tax_code');
    $phone = $request->element('phone');
    $address = $request->element('address');
    $account_no = $request->element('account_no');
    $bank_name = $request->element('bank_name');
    $bank_branch = $request->element('bank_branch');
    $website = $request->element('website');
    $hide_invoice_border = $request->element('hide_invoice_border', 0);
    $invoice_border_color = $request->element('invoice_border_color');
    $invoice_header_font_size = $request->element('invoice_header_font_size');
    $invoice_table_font_size = $request->element('invoice_table_font_size');

    $storeData = array(
        'company' => $company_name,
        'tel' => $phone,
        'address' => $address
    );
    $stores->updateData($storeData, $storeId);

    $properties = $estore->getProperties();
    $properties['tax_code'] = $tax_code;
    $properties['account_no'] = $account_no;
    $properties['bank_name'] = $bank_name;
    $properties['bank_branch'] = $bank_branch;
    $properties['website'] = $website;
    $properties['hide_invoice_border'] = $hide_invoice_border;
    $properties['invoice_border_color'] = $invoice_border_color;
    $properties['invoice_header_font_size'] = $invoice_header_font_size;
    $properties['invoice_table_font_size'] = $invoice_table_font_size;

    $uploadPath = ROOT_PATH . 'upload/' . $storeId . '/';
    if (!is_dir($uploadPath)) @mkdir($uploadPath, 0755, true);

    if (isset($_FILES['company_logo']) && $_FILES['company_logo']['error'] == 0) {
        $logoExt = pathinfo($_FILES['company_logo']['name'], PATHINFO_EXTENSION);
        $logoFilename = 'logo_' . time() . '.' . $logoExt;
        if (move_uploaded_file($_FILES['company_logo']['tmp_name'], $uploadPath . $logoFilename)) {
            $properties['company_logo'] = $logoFilename;
        }
    }

    if (isset($_FILES['company_watermark']) && $_FILES['company_watermark']['error'] == 0) {
        $watermarkExt = pathinfo($_FILES['company_watermark']['name'], PATHINFO_EXTENSION);
        $watermarkFilename = 'watermark_' . time() . '.' . $watermarkExt;
        if (move_uploaded_file($_FILES['company_watermark']['tmp_name'], $uploadPath . $watermarkFilename)) {
            $properties['company_watermark'] = $watermarkFilename;
        }
    }

    $stores->updateData(array('properties' => serialize($properties)), $storeId);
    
    $estore->setProperties($properties);
    $estore->setCompany($company_name);
    $estore->setTel($phone);
    $estore->setAddress($address);

    header('Location: /' . ADMIN_SCRIPT . '?op=manage&act=company&mod=config&result_code=1');
    exit;
}


$configInfo = array(
    'company_name' => $estore->getCompany(),
    'tax_code' => $estore->getProperty('tax_code'),
    'phone' => $estore->getTel(),
    'address' => $estore->getAddress(),
    'account_no' => $estore->getProperty('account_no'),
    'bank_name' => $estore->getProperty('bank_name'),
    'bank_branch' => $estore->getProperty('bank_branch'),
    'website' => $estore->getProperty('website'),
    'hide_invoice_border' => $estore->getProperty('hide_invoice_border'),
    'invoice_border_color' => $estore->getProperty('invoice_border_color'),
    'invoice_header_font_size' => $estore->getProperty('invoice_header_font_size'),
    'invoice_table_font_size' => $estore->getProperty('invoice_table_font_size'),
    'company_logo' => $estore->getProperty('company_logo'),
    'company_watermark' => $estore->getProperty('company_watermark'),
);

$template->assign('configInfo', $configInfo);
$template->assign('pageTitle', 'Thông tin đơn vị');

?>
