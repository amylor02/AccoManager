<?php
    
    include("connect.php");

    // Retrieve the POST data
    $data = json_decode(file_get_contents("php://input"));

    $fname=$data->fname;
    $mname=$data->mname;
    $lname=$data->lname;
    $bdate=$data->bdate;
    $sex=$data->sex;
    $username=$data->username;
    $email=$data->email;
    $password=$data->password;
    $role=$data->role;

    $command='';
    if ($role==='user')
        $command='spInsertUser';
    else
        $command='spInsertManager';



    $sql = "EXEC $command ?,?,?,?,?,?,?,?";


    $stmt = sqlsrv_prepare($conn, $sql,array(&$fname,&$mname,&$lname,&$bdate,&$sex,&$username,&$email,&$password));
    $result = sqlsrv_execute($stmt);

    $data = array();

    if (!$result) {
        die(print_r(sqlsrv_errors()));
    }
    else{
        echo json_encode(["success" => true]);
    }



?>