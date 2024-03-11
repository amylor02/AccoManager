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

    // Access the username and password
    $name = $data->fn;
    $lastname = $data->ln;
    $phone = $data->phone;
    $mgrid=$_SESSION["userid"];


    $sql = "EXEC spCreateContactPerson ?,?,?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(&$mgrid,&$name,&$lastname,&$phone));
    
    //$sql = "EXEC spGetContactsALL";
    //$stmt = sqlsrv_prepare($conn, $sql);
    $result = sqlsrv_execute($stmt);

    $data = array();
    $data = array();
    if ($result) {
        // Move to the next result set
        while (sqlsrv_next_result($stmt)) {
            // Fetch rows from the next result set
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $data[] = $row;
            }
        }
    }
    else{
        print_r(die("Error on inserting contact"));
    }

    $jsonResult = json_encode($data);


    // Output JSON
    header('Content-Type: application/json');
    echo $jsonResult;

?>