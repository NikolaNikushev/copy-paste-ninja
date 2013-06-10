<?php
if($_POST)
{
	include("config.php");

	$username = $_POST['username'];
	$score  = $_POST['score'];

	if(mysql_query("INSERT INTO HightScore (PlayerName, HightScore, Date) VALUES ('". $username ."', '" . $score . "', '". date("Y-m-d") ."')"))
	{
		echo "true";
	}
	else
	{
		echo "false";
	}
}
?>