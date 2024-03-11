<?php
    
    include("connect.php");

    session_start();

    // Check if the user is logged in
    if (!isset($_SESSION["userid"]) || !$_SESSION["userid"]) {
        // Redirect to the login page if not logged in
        header("Location: index.html");
        exit();
    }


    $data = json_decode(file_get_contents("php://input"));
    $country=$data->country;

    $sql = "EXEC spGetCities ?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$country));
    $result = sqlsrv_execute($stmt);

    $data = array();
    if ($result) {
        
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $data[] = $row;
        }
    }
    else{
        print_r(die("Error on getting accommodation types"));
    }

    $jsonResult = json_encode($data);


    // Output JSON
    header('Content-Type: application/json');
    echo $jsonResult;

?>