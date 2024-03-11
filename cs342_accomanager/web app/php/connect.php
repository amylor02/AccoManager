<?php
$serverName = "localhost\SQLEXPRESS"; //serverName\instanceName, portNumber (default is 1433)
$connectionInfo = array(
     "Database"=>"master", 
     "UID"=>"", 
     "PWD"=>""
);
     
$conn = sqlsrv_connect( $serverName, $connectionInfo);

//In case connect.php couldnt connect to database
if( !$conn ) {
     die(json_encode(["success" => false,"message"=>"Cannot connect to the database."]));
     //die( print_r( sqlsrv_errors(), true));
 }

?>

