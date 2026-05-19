<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
date_default_timezone_set('Asia/Saigon');  
$COUNT_FILE = "counter.txt";
if (file_exists($COUNT_FILE))
{
	$fp = fopen("$COUNT_FILE", "r+");
	flock($fp, 1);
	$count = fgets($fp, 4096);
	if(!isset($_SESSION['access']))
	{
			//session_register("access");
			$_SESSION['access'] = 1;
			$count += 1;
			fseek($fp,0);
			fputs($fp, $count);
			flock($fp, 3);
			fclose($fp);
	}
	}
	else
	{
	echo "Khong tim thay file: '\$file'<BR>";
	}
function OnlineCustomersCounter($sessionId='',$time=0,$time_check=0,$ip){
    // add this function by Quoc Minh
    // SET TIME CHECK = 10 minutes
    global $db;
    $sessionId="'".$sessionId."'";
    $ip="'".$ip."'";
    $tbl_name=DB_PREFIX."user_online_counter";
	$sql = "SELECT * FROM  $tbl_name WHERE `ip`=$ip";
	$result = $db->query($sql);  
	if(mysql_num_rows($result)==0){
        $sql1="INSERT INTO $tbl_name(time,session_id,ip)VALUES($time,$sessionId,$ip)";
        $result1=mysql_query($sql1);
	}else{
	   $sql2="UPDATE $tbl_name SET `time`='$time' WHERE `ip`=$ip";
        $result2=$db->query($sql2);
	}    
    $sql3 = "SELECT * FROM  $tbl_name";
    $result3 = $db->query($sql3);
    $onlineCustomersCounter=0;
    if(mysql_num_rows($result3)>0){
        $onlineCustomersCounter=mysql_num_rows($result3);
    }
    // delete if record have time<time_check 
    $sql4="DELETE FROM $tbl_name WHERE `time`<$time_check";
    $result4=$db->query($sql4);    
    return $onlineCustomersCounter;    
}
    
    
/*echo $count;
echo '<meta http-equiv="Refresh" content="20; URL=truycap.php">';
					*/
/*echo $count;*/
?>