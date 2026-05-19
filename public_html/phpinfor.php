<?php
echo mysqli_get_client_info();
phpinfo();

/*$csr_text = "-----BEGIN CERTIFICATE REQUEST-----
MIIDHzCCAgcCAQAwgYUxCzAJBgNVBAYTAlZOMRQwEgYDVQQIDAtIbyBDaGkgTWlu
aDEUMBIGA1UEBwwLSG8gQ2hpIE1pbmgxLTArBgNVBAoMJERpZ2l0YWwgRXJhIFNv
ZnR3YXJlIENvbXBhbnkgTGltaXRlZDEbMBkGA1UEAwwSd3d3LmJhb21hdC53ZWJz
aXRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApd9Dxrsiw+QJfD7U
MHVCRjYv3YILDhoifSZ6ay432/qFbhbbXIgaSE2OWICjQUoiPbaxlIpC9p8hTEM9
NsFVuwi1aBFv9GJjdhgQTW7dqh//9uLymi7GAPPpirGwA6UcHhGzD7TwN0KG7qkf
/tGOM2WbxeXMjlE7sIh3+aMDYMt0+iN1NrXjW+96mjWTeuEh2vWZPWNxHNwbK28O
FbGCEFo39av8c7kkCWCo4Sh6/pCAteAS1wQTXiWzyBf5nxs/loPHdXmNglpDjSE3
vR+jKchBrPgCDr5C0rAxoZl15kZZUD+uXepYU23TlXJjobodXSsxkPb9Z9yEiHf5
CwasUwIDAQABoFQwUgYJKoZIhvcNAQkOMUUwQzBBBgNVHREEOjA4ghF0ZXN0LmRl
cmFzb2Z0LmNvbYIOYmFvbWF0LndlYnNpdGWCE3BvcnRhbC5kZXJhc29mdC5jb20w
DQYJKoZIhvcNAQEFBQADggEBAC8rGqBRXD+m6u1keUAfvZ24xUWKDvrvdrsHzdZA
QYkxCJTOMpCaiFyoOdEiNlSnZXmCxlZutsQTPsX9XPXa0huk1ypbzrMmJWaXGPwk
VV5LCAmNYmeeGRDlC+jFkAy7KT9ovFkwhJEInewr63eLhbKDdIFz+7WOsVlhZZPw
HKIrJfO+NCqmtqKdHWLMmSL7XWp6FSk/CkapO8UdNww/2zoPt8THqcZLii+SLNBB
p1UZ4bVFR/9wS0cyttritwbKNLnFKLq/G9b38hZfJe2TD6iOT+FMTzneppyjrVl4
5dtSmpc6zxVow+Kur8thdhN89NZSRGEkFKBX/PpRHfG1c4Q=
-----END CERTIFICATE REQUEST-----";

$subject = openssl_csr_get_subject($csr_text);
print_r($subject);

#phpinfo();
echo "a";
require('ssltool/File/X509.php');
echo "b";

$x509 = new File_X509();
echo "d";
$file = $x509->loadCSR($csr_text); // see csr.csr
echo "c";
print_r($file);
echo $x509->validateSignature() ? 'valid' : 'invalid';
echo "hi";
*/
?>