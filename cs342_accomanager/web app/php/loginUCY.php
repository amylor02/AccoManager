<?php

include("connect.php");


session_start();



if (empty($_SESSION['login_user'])) {
    /*
    CREATE PROCEDURE loginSystem
    @username varchar(255),
    @password varchar(255)
    AS
    SELECT COUNT(*) AS counter FROM SYSTEMUSER WHERE
    USERNAME = @username
    and PASSWORD = @password           
     */
    /*
    PASSWORD_DEFAULT - Use the bcrypt algorithm (default as of PHP 5.5.0). Note that this constant is designed to change over time as new and stronger algorithms are added to PHP. For that reason, the length of the result from using this identifier can change over time. Therefore, it is recommended to store the result in a database column that can expand beyond 60 characters (255 characters would be a good choice).
    src:https://www.php.net/manual/en/function.password-hash.php
    */


    // Retrieve the POST data
    $data = json_decode(file_get_contents("php://input"));

    // Access the username and password
    $username = $data->username;
    $password = $data->password; 
    

    $sql = "EXEC loginSys ?,?";
    $stmt = sqlsrv_prepare($conn, $sql, array(&$username, &$password));
    if (!$stmt){
        //echo("Statment error");
    }

    $result = sqlsrv_execute($stmt);
    if ($result) {
        //echo ('<br>' . $mypassword . '<br>');

        // If result matched $myusername and $mypassword, table row must be 1 row
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        //echo("I am here in result");

        if ($row['counter'] == 1) {
            //echo("user found");
            /*
                 CREATE PROCEDURE getID
                 @username varchar(255)
                 AS
                 SELECT ID FROM SYSTEMUSER WHERE USERNAME = @username
            */    
            $sql = "EXEC getID ?";
            $stmt = sqlsrv_prepare($conn, $sql, array(&$username));
            $result = sqlsrv_execute($stmt);
            //echo ("s");
            //echo ($result);
            if ($result) {
                $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                $_SESSION['login_user'] = $username;
                $_SESSION['userid'] = $row['userid'];
                $_SESSION['role'] = $row['role'];
  
                //Debugging 
                //print_r($_SESSION);

                echo json_encode(["success" => true,"role"=>$row['role']]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid credentials."]);
            
            }



        }
        else {
            echo json_encode(["success" => false, "message" => "Invalid credentials."]);
        }
    }
    else
    {
        die(print_r(sqlsrv_errors(), true));
    }
} 
else {
    //Already logged in, redirect
    
}




?>
