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
		$select = mysql_query("SELECT * FROM HightScore WHERE PlayerName='" . $username ."' AND Date='". $date . "' ORDER BY HightScore DESC");
	}
	else if($username == "" && $date == "")
	{
		$select = mysql_query("SELECT * FROM HightScore ORDER BY HightScore DESC");
	}
	else if($date == "")
	{
		$select = mysql_query("SELECT * FROM HightScore WHERE PlayerName='" . $username ."' ORDER BY HightScore DESC");
	}
	else
	{
		$select = mysql_query("SELECT * FROM HightScore WHERE Date='". $date . "' ORDER BY HightScore DESC");
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