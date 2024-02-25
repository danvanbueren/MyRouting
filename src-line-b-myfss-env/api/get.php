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

// localhost/api/get.php ?switch=X &id=X
$switch = $_GET['switch'];
$id = $_GET['id'];

switch($switch) {
    case "users":
        if (empty($id)) {
            $sql = "SELECT * FROM users";
        } else {
            $sql = "SELECT * FROM users WHERE UID = " . $id;
        }
        break;
    case "files":
        if (empty($id)) {
            $sql = "SELECT * FROM files";
        } else {
            $sql = "SELECT * FROM files WHERE UID = " . $id;
        }
        break;
    case "phases":
        if (empty($id)) {
            $sql = "SELECT * FROM phases";
        } else {
            $sql = "SELECT * FROM phases WHERE FK_packets_UID = " . $id;
        }
        break;
    case "packets":
        if (empty($id)) {
            $sql = "SELECT * FROM packets";
        } else {
            $sql = "SELECT * FROM packets WHERE UID = " . $id;
        }
        break;
    default:
        mysqli_close($conn);
        die("ERROR: UNKNOWN SWITCH CONDITION");
}



$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    $output = [];
    while($row = mysqli_fetch_assoc($result)) {
        array_push($output, $row);
    }
    echo json_encode($output);
} else {
    echo json_encode(null);
}

mysqli_close($conn);