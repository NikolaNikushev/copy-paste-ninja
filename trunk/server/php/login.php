<?php
if($_POST)
{
	include("config.php");

	$username = $_POST['username'];
	$password  = $_POST['password'];

	$select = mysql_query("SELECT * FROM users WHERE Name='" . $username ."' AND Password='" . $password ."'");

	if(mysql_fetch_array($select))
	{
		echo "true";
	}
	else
	{
	 	echo "false";
	}
	
	mysql_close();
}
?>