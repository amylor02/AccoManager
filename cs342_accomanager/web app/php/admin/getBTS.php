<?php
    
    include("../connect.php");

    session_start();

    // Check if the user is logged in
    if (!isset($_SESSION["userid"]) || !$_SESSION["userid"]) {
        // Redirect to the login page if not logged in
        header("Location: index.html");
        exit();
    }
    if ($_SESSION['role']!=3){
        header("Location: php/logout.php");
        exit();
    }



    // Retrieve the POST data
    $data = json_decode(file_get_contents("php://input"));

    $acctype = $data->acctype;
    $roomtype = $data->roomtype;
    $country = $data->country;
    $city = $data->city;
    $time = $data->time;
    $startdate = $data->startdate;
    $enddate = $data->enddate;
    

    $sql = "EXEC spBookingTotalStatistics ?,?,?,?,?,?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$acctype, &$roomtype, &$city, &$country, &$time, &$startdate, &$enddate));
    $result = sqlsrv_execute($stmt);

    $data = array();
    if ($result) {
        
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $data[] = $row;
        }
    }
    else{
        die(print_r(sqlsrv_errors()));
    }

    $jsonResult = json_encode($data);


    // Output JSON
    header('Content-Type: application/json');
    echo $jsonResult;


?>