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


    $title = $data->title;
    $notes = $data->notes;
    $accid = $data->accid;
    $maxpersons = $data->maxpersons;
    $subrooms = $data->subrooms;
    $amenities = $data->amenities;

    $sql = "EXEC spInsertRoomType ?,?,?,?,?,?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$_SESSION['userid'],&$title,&$notes,&$accid,&$maxpersons,&$subrooms,&$amenities));
    $result = sqlsrv_execute($stmt);

    if (!$result) {
        die(print_r(sqlsrv_errors()));
    }
    else{
        echo json_encode(["success" => true]);
    }


?>