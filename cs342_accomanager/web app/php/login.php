<?php

include("connect.php");


session_start();



if (empty($_SESSION['login_user'])) {

    // Retrieve the POST data
    $data = json_decode(file_get_contents("php://input"));

    // Access the username and password
    $username = $data->username;
    $password = $data->password; 
    

    $sql = "EXEC spLogin ?,?";
    $stmt = sqlsrv_prepare($conn, $sql, array(&$username, &$password));
    if (!$stmt){
        //echo("Statment error");
    }

    $result = sqlsrv_execute($stmt);
    if ($result) {

        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

  
        $_SESSION['login_user'] = $row['USERNAME'];
        $_SESSION['userid'] = $row['USER_ID'];

        switch ($row['UROLE']) {
            case 'U':
                $_SESSION['role'] = 1;
                break;
        
            case 'M':
                $_SESSION['role'] = 2;
                break;
        
            case 'A':
                $_SESSION['role'] = 3;
                break;
    
        }

        echo json_encode(["success" => true,"role"=>$_SESSION['role']]);
    }
    else 
        echo json_encode(["success" => false, "message" => "Invalid credentials."]);
        
   
}








?>
