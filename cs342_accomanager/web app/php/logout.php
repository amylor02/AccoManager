<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION["userid"]) || !$_SESSION["userid"]) {
    // Redirect to the login page if not logged in
    header("Location: ../index.html");
    exit();
}

// Destroy the session variables
session_unset();
session_destroy();

// Redirect to the login page after logout
header("Location: ../index.html");
exit();
?>