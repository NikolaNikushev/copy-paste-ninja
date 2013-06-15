<?php

if($_POST)
{

	include("config.php");

	$username = $_POST['username'];
	$password  = $_POST['password'];
	
	/* Select queries return a resultset */
	$result = $mysqli->query("SELECT * FROM Users WHERE Name='" . $username ."' AND Password='" . $password ."'");
		
	if ($result->num_rows === 1) {		  
		// user found, allow login
		echo "true"; 
	} else {
	 	echo "false";
	}
	
}
?>