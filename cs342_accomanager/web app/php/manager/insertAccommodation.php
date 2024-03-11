<?php
    
    include("../connect.php");

    session_start();

    // Check if the user is logged in
    if (!isset($_SESSION["userid"]) || !$_SESSION["userid"]) {
        // Redirect to the login page if not logged in
        header("Location: index.html");
        exit();
    }
    if ($_SESSION['role']!=2){
        header("Location: php/logout.php");
        exit();
    }



    // Retrieve the POST data
    $data = json_decode(file_get_contents("php://input"));

    // Insert
    $userid=$_SESSION["userid"];
    $name = $data->name;
    $lat = $data->lat;
    $lon = $data->lon;
    $address = $data->address;
    $contactid=$data->contactID;
    $accType=$data->accType;
    $city=$data->city;
    $facilities=$data->facilities;
    $policies=$data->policies;



    $sql = "EXEC spInsertAccommodation ?,?,?,?,?,?,?,?,?,?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$userid,&$userid,&$name,&$lat,&$lon,&$address,&$contactid,&$accType,&$city,&$facilities,&$policies));
    $result = sqlsrv_execute($stmt);

    if (!$result) {
        die(print_r(sqlsrv_errors()));
    }
    else{
        echo json_encode(["success" => true]);
    }


?>