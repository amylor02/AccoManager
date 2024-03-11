<?php
    
    include("../connect.php");


    $sql = "EXEC spPerformanceReport3 ?,?,?";
    $stmt = sqlsrv_prepare($conn, $sql,array(1,2023,2000));
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

    print_r($data);


?>