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


    $sql = "EXEC spGetPriceCategory";
    $stmt = sqlsrv_prepare($conn, $sql);
    $result = sqlsrv_execute($stmt);

    
    $data = array();
    if ($result) {
        
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $data[] = $row;
        }
    }
    else{
        print_r(die("Error on getting price categories"));
    }

    $jsonResult = json_encode($data);


    // Output JSON
    header('Content-Type: application/json');
    echo $jsonResult;

?>