<?php
$host = "localhost";
$username="moshensk_cpyninj";
$password="NlUPKrRk-wXd";
$db = "moshensk_copypasteninja";

$mysqli = new mysqli($host, $username, $password, $db);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

?>