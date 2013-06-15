<?php
if($_POST)
{
	include("config.php");

	$username = $_POST['username'];
	$score  = $_POST['score'];

    $result = $mysqli->query("INSERT INTO HightScore (PlayerName, HightScore, Date) VALUES ('". $username ."', '" . $score . "', '". date("Y-m-d") ."')");
    
	if($result)
	{
		echo "true";
	}
	else
	{
		echo "false";
	}
}
?>