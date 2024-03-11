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
    $roomtype=$data->roomtype;
    $terms=$data->terms;
    $pc=$data->pc;
    $date_start=$data->date_start;
    $date_end = $data->date_end;
    $ppd = $data->ppd;
    $stock = $data->stock;
    $cp = $data->cp;
    $pp = $data->pp;
    $ow = $data->ow;
    $ow_start =$data->ow_start;
    $ow_end = $data->ow_end;
    $minstay = $data->min_stay;
    $maxstay = $data->max_stay;



    $sql = "EXEC spInsertProducts ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$_SESSION['userid'],&$roomtype,&$terms,&$pc,&$date_start,&$date_end,&$ppd,&$stock,&$cp,&$pp,&$ow,&$ow_start,&$ow_end,&$minstay,&$maxstay));
    $result = sqlsrv_execute($stmt);

    if (!$result) {
        //print_r(die(json_encode(["success"=>false,"message"=>"Error on inserting product"])));
        die(print_r(sqlsrv_errors(), true));
    }
    else{
        echo json_encode(["success" => true]);
    }


?>