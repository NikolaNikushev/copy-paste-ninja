<?php

	if($_POST)
	{
		include("config.php");
	
		$username = $_POST['username'];
		$password  = $_POST['password'];
	
		/* Select queries return a resultset */
		$result = $mysqli->query("SELECT * FROM Users WHERE Name='".$username."'");
		
		if ($result->num_rows > 0) {		  
			// found same user in db, registration not allowed
		    echo "false"; 
		} else {
			$result = $mysqli->query("INSERT INTO Users (Name, Password, Date) VALUES ('". $username ."', '" . $password . "', '". date("Y-m-d") ."')");
			if ($result) {
		    	echo "true";
		    	} else {
		    		echo "error bitch";
		    	}
		}
	}
	
?>