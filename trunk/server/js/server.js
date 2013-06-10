var phpDirectory = "php/";

function login(respons){
	if(respons === "true"){
		console.log("login succeeded!");
	}
	else{
		console.log("login unsucceeded!");
	}
}

function register(respons){
	if(respons === "true"){
		console.log("register succeeded!");
	}
	else{
		console.log("register unsucceeded!");
	}
}

function uploadScore(respons){
	if(respons === "true"){
		console.log("upload succeeded!");
	}
	else{
		console.log("upload succeeded!");
	}
}

function getScore(respons){
	console.log(respons);
}

function submit () {
	var that = $(this);
	var url = that.attr('action');
	var type = that.attr('method');
	var data = {};

	that.find('[name]').each(function(index, value){
		var self = $(this);
		var name = self.attr('name');
		var value = self.val();
		data[name] = value;


	});

	$.ajax({
		url: url,
		type: type,
		data: data,
		success: function(respons){
			switch(url)
			{
				case phpDirectory + "login.php": login(respons); break;
				case phpDirectory + "register.php": register(respons); break;
				case phpDirectory + "uploadScore.php": uploadScore(respons); break;
				case phpDirectory + "getScore.php": getScore(respons); break;
				default: console.log("incorrect file!"); break;
			}
		}
	});

		return false;
	}

$("form.ajax").on("submit",submit);