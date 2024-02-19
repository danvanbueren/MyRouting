<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "myrouting";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}



$sql = "INSERT INTO packets (name, type, FK_users_UID) VALUES ('" . $PACKET_NAME . "', '" . $PACKET_TYPE . "', '" . $REF_USER_UID . "')";



if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);