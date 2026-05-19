<?php
# CSR decoder, by Mai Minh
# Last updated: 2015-03-23
#-----
/*
$csr_text = "-----BEGIN CERTIFICATE REQUEST-----
MIIDdzCCAl8CAQAwdDELMAkGA1UEBhMCVk4xDzANBgNVBAgTBkhhIE5vaTEPMA0G
A1UEBxMGSGEgTm9pMREwDwYDVQQKEwhGb25lU2FmZTEWMBQGA1UECxMNSVQgRGVw
YXJ0bWVudDEYMBYGA1UEAxMPd3d3LmZvbmVzYWZlLnZuMIIBIjANBgkqhkiG9w0B
AQEFAAOCAQ8AMIIBCgKCAQEAwsXMhJAGMxD2SLD7fv3wfSkF9Rz3sXZLVn5nNk5f
P871WeiBq9IlFlUzw4X2+JuFydNKU2WkTS0NGCQKpc5VnjggY8prWObx6BM7TL9j
7gndd94Mzjt+ElAbJp5sbfznhshmR6AnngWUqrvXhJqtbPBiq68UaKFsrcnOpW5h
YrKNcKfYwWHpTRClfD6FMRKigHSErSi5JiOwg8mtKGaAWAIgF2+bJqTS0MLObqxw
ZJ64p6eXnmzXoNJd/dWdiBd5etBHIVrdj+vns+euFbgApwkdYj2YH0t37HfxG0UB
Ec0jHNM2d/+U8lrfGb7TdXXX2zsmTWBiKDAZbnXKtdTJyQIDAQABoIG9MIG6Bgkq
hkiG9w0BCQ4xgawwgakwCQYDVR0TBAIwADATBgNVHSUEDDAKBggrBgEFBQcDATCB
hgYDVR0RBH8wfYIPd3d3LmZvbmVzYWZlLnZuggtmb25lc2FmZS52boISc3RhdGlj
LmZvbmVzYWZlLnZughBkYXRhLmZvbmVzYWZlLnZughB0ZXN0LmZvbmVzYWZlLnZu
ghBraWRzLmZvbmVzYWZlLnZughNwcm90ZWN0LmZvbmVzYWZlLnZuMA0GCSqGSIb3
DQEBBQUAA4IBAQC7Xt1QFGge8YjA2enaH2/kN4p9N5po0yCRbjfAPb11OddC7ghS
Gcd9Yf68btA0D0Lks0Dd2ZQ9Is38IrvTttQ98Euf26wGXNtyg5HKwkWyAygDzxVm
bayHyPoFYO0aTKrOeEr+S2wUvAJiOda+df/QzVXgAeloBDWbFlulFs9zFSyg1uoH
khs9lsSA7WEpyXa8MRIofgz0hxqKUI9ZaupThW4IO1sUyiB8WHps9/jfW/GGm4nS
N80stIw6lUPEkapgbE+eLWZbPJ/VYnImVWa+ZfEXBSPkJ4v4GqTp5nAO5SAe+SZH
6HFCJXCpUAGyOVKpBnQUlOCGnX7suSpdg62e
-----END CERTIFICATE REQUEST-----
";
*/

$csr_text=$_POST['csr'];
if($csr_text)$result = array();
$subject = openssl_csr_get_subject($csr_text);
#echo "<br>Common name: ".$subject['CN'];
#echo "<br>Organization: ".$subject['O'];
#echo "<br>Organization Unit: ".$subject['OU'];
#echo "<br>City/Locality: ".$subject['L'];
#echo "<br>State/Province: ".$subject['ST'];
#echo "<br>Country: ".$subject['C'];
$error = array();
if(!validDomain($subject['CN'])){
    $error['cmname']='Tên miền không hợp lệ (ex: yourdomain.com)';
} else {
	if(strpos(strtolower($_POST['product_id']),'wildcard') && substr($subject['CN'],0,2) != '*.') $error['cmname']='Tên miền cho sản phẩm Wildcard phải có dạng *.yourdomain.com';
	
	if(strpos(strtolower($_POST['product_id']),'wildcard') == false && substr($subject['CN'],0,2) == '*.') $error['cmname']='Chỉ có các sản phẩm Wildcard mới hỗ trợ tên miền dạng *.yourdomain.com';
}

if(!validString($subject['ST'])){
    $error['sta']='Không tìm thấy State/Province trong CSR';
}

if(!validString($subject['L'])){
    $error['city']='Không tìm thấy City/Locality trong CSR';
}

if(!validString($subject['OU'])){
    $error['orgu']='Không tìm thấy Organization Unit trong CSR';
}

if(!validString($subject['O']) || strlen($subject['O']) > 64){
    $error['org']='Organization không hợp lệ (tối đa 64 ký tự)';
}

if(!validString($subject['C']) || strlen($subject['C']) != 2 || !ctype_upper($subject['C'])){
    $error['c']='Country phải là chữ in hoa và độ dài 2 ký tự. Ví dụ: VN';
}

# Get SANs list
require('File/X509.php');
$x509 = new File_X509();
$file = $x509->loadCSR($csr_text);
$sans_array = $file['certificationRequestInfo']['attributes'][0]['value'][0][2]['extnValue'];
$sans = '';
$numItems = count($sans_array);
$i = 0;
if($sans_array) {
	foreach($sans_array as $key => $value) {
		$sans .= $value['dNSName'];
		if(++$i !== $numItems) $sans .= ',';
	}
}

#echo "<br>SANs: ".$sans;

# Get Key size
$key_length = openssl_pkey_get_details(openssl_csr_get_public_key($csr_text));
#echo "<br>Key size: ".$key_length['bits']." bit";

if($key_length['bits'] < 2048){
    $error['size']='Key size hiện tại là '.$key_length['bits'].' bit (tối thiểu 2048 bit kể từ ngày 01/01/2014)';
}

if($subject){
    $result = array('data'=>array('cmname'=>$subject['CN'],
                    'org'=>$subject['O'],
                    'orgu'=>$subject['OU'],
                    'city'=>$subject['L'],
                    'sta'=>$subject['ST'],
                    'c'=>$subject['C'],
                    'san'=>$sans,
                    'size'=>$key_length['bits']." bit"),
                    'error'=>$error?$error:'');
    echo json_encode($result);
    exit();
}

/*
Old function
function validDomain($value,$name='') {	
	$regexp = '/^([a-z0-9]([a-z0-9\-]+)?[a-z0-9]?\.)+[a-z]{2,4}$/i';
	if (false == preg_match($regexp, str_replace("www.","",$value))) {
		return false;
	}
	return true;
}
*/

function validDomain($domain_name)
{
    return (preg_match("/^(\*\.)?([a-z\d](-*[a-z\d])*)(\.([a-z\d](-*[a-z\d])*))*$/i", $domain_name,$matches) //valid chars check
            && preg_match("/^.{1,253}$/", $domain_name) //overall length check
            && preg_match("/^[^\.]{1,63}(\.[^\.]{1,63})*$/", $domain_name)   ); //length of each label
}

function validString($value,$name = '') {	
	if(!trim($value)) {
		return false;
	}
	return true;	
}
?>