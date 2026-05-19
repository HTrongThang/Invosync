<?php

/*************************************************************************
System config down module
----------------------------------------------------------------
Derasoft CMS Project
Company: Derasoft Co., Ltd                                  
Email: info@derasoft.com                                    
Last updated: 16/07/2008
 **************************************************************************/
checkPermission(array(2, 3));
include_once(ROOT_PATH . 'PHPExcel.php');
include_once(ROOT_PATH . 'PHPExcel/IOFactory.php');
include_once(ROOT_PATH . "classes/data/textfilter.class.php");
include_once(ROOT_PATH . 'classes/dao/templates.class.php');
include_once(ROOT_PATH . 'classes/dao/fields.class.php');
$templates = new Templates();
$fields = new Fields($storeId);
include_once(ROOT_PATH . 'classes/dao/trackingicons.class.php');
$trackingIcons = new TrackingIcons(1);
$templateFile = 'systemconfig.tpl.html';

$topNav = array(
    $amessages['dash_board'] => '/' . ADMIN_SCRIPT . '?op=dashboard',
    $amessages['system'] => '/' . ADMIN_SCRIPT . '?op=system',
    $amessages['system_config'] => '/' . ADMIN_SCRIPT . '?op=system&act=config',
    $amessages['site_down'] => ''
);

$tabLink = '/' . ADMIN_SCRIPT . '?op=system&act=config';
$listTabs = array(
    $amessages['general_config'] => $tabLink . '&mod=general',
    $amessages['trademark'] => $tabLink . '&mod=trademark',
    $amessages['carcompany'] => $tabLink . '&mod=carcompany',
    $amessages['size'] => $tabLink . '&mod=size',
    $amessages['countclick'] => $tabLink . '&mod=countclick',
    $amessages['site_down'] => $tabLink . '&mod=down',
);
$template->assign('listTabs', $listTabs);
$template->assign('currentTab', 5);

$month = $request->element('month');
$template->assign('month', $month);
$year = $request->element('year');
$template->assign('year', $year);
if ($month && $year) {
    $sql = "AND `date_created` LIKE '%$year-$month%'";
}
$tel = $trackingIcons->getObjects(1, "`action`='tel' $sql", array('id' => 'DESC'), 9999);
$counttel = $tel ? count($tel) : 0;
$template->assign('counttel', $counttel);
#
$map = $trackingIcons->getObjects(1, "`action`='map' $sql", array('id' => 'DESC'), 9999);
$countmap = $map ? count($map) : 0;
$template->assign('countmap', $countmap);
#
$mess = $trackingIcons->getObjects(1, "`action`='mess' $sql", array('id' => 'DESC'), 9999);
$countmess = $mess ? count($mess) : 0;
$template->assign('countmess', $countmess);
#
$zalo = $trackingIcons->getObjects(1, "`action`='zalo' $sql", array('id' => 'DESC'), 9999);
$countzalo = $zalo ? count($zalo) : 0;
$template->assign('countzalo', $countzalo);
#
$fanpage  = $trackingIcons->getObjects(1, "`action`='fanpage ' $sql", array('id' => 'DESC'), 9999);
$countfanpage  = $fanpage ? count($fanpage) : 0;
$template->assign('countfanpage', $countfanpage);
#
$google   = $trackingIcons->getObjects(1, "`action`='google  ' $sql", array('id' => 'DESC'), 9999);
$countgoogle   = $google ? count($google) : 0;
$template->assign('countgoogle', $countgoogle);
#
$tiktok   = $trackingIcons->getObjects(1, "`action`='tiktok  ' $sql", array('id' => 'DESC'), 9999);
$counttiktok   = $tiktok ? count($tiktok) : 0;
$template->assign('counttiktok', $counttiktok);
#
$youtube   = $trackingIcons->getObjects(1, "`action`='youtube  ' $sql", array('id' => 'DESC'), 9999);
$countyoutube   = $youtube ? count($youtube) : 0;
$template->assign('countyoutube', $countyoutube);


if ($_POST) { # if form is submitted
    if ($request->element('doo') == 'submit') {    # Cancel
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->setActiveSheetIndex(0);
        $objPHPExcel->getActiveSheet()->setTitle('Danh sách học viên');
        $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(15);
        $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(10);
        $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(10);
        $vitri = 2;

        $objPHPExcel->getActiveSheet()->getStyle('A1:I1')->getFont()->setBold(true);
        $objPHPExcel->getActiveSheet()->getStyle('A1:I1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
        $objPHPExcel->getActiveSheet()->getStyle('A1:I1')->getFill()->getStartColor()->setARGB('00FFFF');
        $objPHPExcel->getActiveSheet()->setCellValue('A1', 'Ngày');
        $objPHPExcel->getActiveSheet()->setCellValue('B1', 'Số điện thoại');
        $objPHPExcel->getActiveSheet()->setCellValue('C1', 'Zalo');
        $objPHPExcel->getActiveSheet()->setCellValue('D1', 'Fanpage');
        $objPHPExcel->getActiveSheet()->setCellValue('E1', 'Map');
        $objPHPExcel->getActiveSheet()->setCellValue('F1', 'Google');
        $objPHPExcel->getActiveSheet()->setCellValue('G1', 'Tiktok');
        $objPHPExcel->getActiveSheet()->setCellValue('H1', 'Youtube');
        $objPHPExcel->getActiveSheet()->setCellValue('I1', 'Mess fb');

        // Lấy số ngày trong tháng
        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        // Tạo mảng chứa các ngày
        $days = [];
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $days[] = str_pad($day, 2, '0', STR_PAD_LEFT); // Định dạng ngày thành '01', '02', ...
        }

        // In ra danh sách ngày
        foreach ($days as $day) {
            if ($day && $month && $year) {
                $sql = "AND `date_created` LIKE '%$year-$month-$day%'";
            }
            $tel = $trackingIcons->getObjects(1, "`action`='tel' $sql", array('id' => 'DESC'), 9999);
            $counttel = $tel ? count($tel) : 0;
            $template->assign('counttel', $counttel);
            #
            $map = $trackingIcons->getObjects(1, "`action`='map' $sql", array('id' => 'DESC'), 9999);
            $countmap = $map ? count($map) : 0;
            $template->assign('countmap', $countmap);
            #
            $mess = $trackingIcons->getObjects(1, "`action`='mess' $sql", array('id' => 'DESC'), 9999);
            $countmess = $mess ? count($mess) : 0;
            $template->assign('countmess', $countmess);
            #
            $zalo = $trackingIcons->getObjects(1, "`action`='zalo' $sql", array('id' => 'DESC'), 9999);
            $countzalo = $zalo ? count($zalo) : 0;
            $template->assign('countzalo', $countzalo);
            #
            $fanpage  = $trackingIcons->getObjects(1, "`action`='fanpage ' $sql", array('id' => 'DESC'), 9999);
            $countfanpage  = $fanpage ? count($fanpage) : 0;
            $template->assign('countfanpage', $countfanpage);
            #
            $google   = $trackingIcons->getObjects(1, "`action`='google  ' $sql", array('id' => 'DESC'), 9999);
            $countgoogle   = $google ? count($google) : 0;
            $template->assign('countgoogle', $countgoogle);
            #
            $tiktok   = $trackingIcons->getObjects(1, "`action`='tiktok  ' $sql", array('id' => 'DESC'), 9999);
            $counttiktok   = $tiktok ? count($tiktok) : 0;
            $template->assign('counttiktok', $counttiktok);
            #
            $youtube   = $trackingIcons->getObjects(1, "`action`='youtube  ' $sql", array('id' => 'DESC'), 9999);
            $countyoutube   = $youtube ? count($youtube) : 0;
            $template->assign('countyoutube', $countyoutube);
            $objPHPExcel->getActiveSheet()->setCellValue('A' . $vitri, $day);
            $objPHPExcel->getActiveSheet()->setCellValue('B' . $vitri, $counttel);
            $objPHPExcel->getActiveSheet()->setCellValue('C' . $vitri, $countzalo);
            $objPHPExcel->getActiveSheet()->setCellValue('D' . $vitri, $countfanpage);
            $objPHPExcel->getActiveSheet()->setCellValue('E' . $vitri, $countmap);
            $objPHPExcel->getActiveSheet()->setCellValue('F' . $vitri, $countgoogle);
            $objPHPExcel->getActiveSheet()->setCellValue('H' . $vitri, $counttiktok);
            $objPHPExcel->getActiveSheet()->setCellValue('H' . $vitri, $countyoutube);
            $objPHPExcel->getActiveSheet()->setCellValue('I' . $vitri, $countmess);
            $vitri++;
        }





        header('Content-Type: application/vnd.ms-excel');
        if ($month && $year) {
            header('Content-Disposition: attachment;filename="Số lượt truy cập tháng ' . $month . '-' . $year . '.xls"');
        }
        header('Cache-Control: max-age=0');
        $objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);
        $objWriter->save('php://output');
        exit();
    }
}
