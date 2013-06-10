<?php
if($_POST)
{
	include("config.php");

	$username = $_POST['username'];
	$password  = $_POST['password'];

	$select = mysql_query("SELECT * FROM users WHERE Name='" . $username ."'");

	if(mysql_fetch_array($select))
	{
		echo "false";
	}
	else
	{
		mysql_query("INSERT INTO users (Name, Password, Date) VALUES ('". $username ."', '" . $password . "', '". date("Y-m-d") ."')");
		echo "true";
	}
}

?>