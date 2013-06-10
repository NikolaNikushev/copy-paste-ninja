<?php
if($_POST)
{
	include("config.php");

	$username = $_POST['username'];
	$date = $_POST['date'];
	$data = array();
    $select;

	if($username != "" && $date != "")
	{
		$select = mysql_query("SELECT * FROM HightScore WHERE PlayerName='" . $username ."' AND Date='". $date . "'");
	}
	else if($username == "" && $date == "")
	{
		$select = mysql_query("SELECT * FROM HightScore");
	}
	else if($date == "")
	{
		$select = mysql_query("SELECT * FROM HightScore WHERE PlayerName='" . $username ."'");
	}
	else
	{
		$select = mysql_query("SELECT * FROM HightScore WHERE Date='". $date . "'");
	}

	while($row = mysql_fetch_array($select))
	{
		$newData = array();
		$newData['PlayerName'] = $row['PlayerName'];
		$newData['HightScore'] = $row['HightScore'];
		$newData['Date'] = $row['Date'];
		array_push($data, $newData);
	}

	echo json_encode($data);
}
?>