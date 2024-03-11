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


    $notes = $data->notes;

    $sql = "EXEC spInsertPriceCategory ?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$_SESSION['userid'],&$notes));
    $result = sqlsrv_execute($stmt);

    if (!$result) {
        print_r(die("Error on getting inserting price category"));
    }
    else{
        echo json_encode(["success" => true]);
    }


?>