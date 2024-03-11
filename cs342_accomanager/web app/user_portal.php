<?php
    session_start();

    // Check if the user is logged in
    if (!isset($_SESSION["userid"]) || !$_SESSION["userid"]) {
        // Redirect to the login page if not logged in
        header("Location: index.html");
        exit();
    }
    if ($_SESSION['role']!=1){
        header("Location: index.html");
    }

    

    include("user_portal.html");
?>

