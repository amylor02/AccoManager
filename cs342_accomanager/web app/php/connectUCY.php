<?php
$serverName = "mssql.cs.ucy.ac.cy, 1433"; //serverName\instanceName, portNumber (default is 1433)
$connectionInfo = array(
     "Database"=>"yhadji02", 
     "UID"=>"yhadji02", 
     "PWD"=>"mNAbKqu7",
     "TrustServerCertificate"=>true,
     "CharacterSet"=>"UTF-8");
     
$conn = sqlsrv_connect( $serverName, $connectionInfo);

//In case connect.php couldnt connect to database
if( !$conn ) {
     die(json_encode(["success" => false,"message"=>"Cannot connect to the database."]));
     //die( print_r( sqlsrv_errors(), true));
 }

?>

