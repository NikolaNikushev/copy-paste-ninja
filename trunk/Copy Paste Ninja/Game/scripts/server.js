"use strict";
var phpDirectory = "http://www.copy-paste-ninja.moshensky.com/php/";

function login(respons) {
    if (respons === "true") {
        alert("Login succeeded");
        window.location = "game.html";
    }
    else {
        alert("login unsucceeded!");
    }
}

function register(respons) {
    if (respons === "true") {
        alert("register succeeded!");
        window.location = "game.html";
    }
    else {
        alert("register unsucceeded!");
    }
}

function uploadScore(respons) {
    if (respons === "true") {
        console.log("upload succeeded!");
    }
    else {
        console.log("upload succeeded!");
    }
}

function getScore(respons) {
    console.log(respons);
    var response = JSON.parse(respons);
    var table = $(".scoreTable");
    var text = "<tr><th>Place</th><th>Player's Name</th><th>Best Score</th><th>Date</th></tr>";

    for (var index = 0; index < response.length && index < 10; index++) {
        text += "<tr><td>" + (index + 1) + "</td>";
        text += "<td>" + response[index].PlayerName + "</td>";
        text += "<td>" + response[index].HightScore + "</td>";
        text += "<td>" + response[index].Date + "</td></tr>";
    }
    table.html("");
    table.append(text);
}

function submit() {
    var that = $(this);
    var url = that.attr('action');
    var type = that.attr('method');
    var data = {};

    that.find('[name]').each(function (index, value) {
        var self = $(this);
        var name = self.attr('name');
        var valuee = self.val();
        data[name] = valuee;


    });

    $.ajax({
        url: url,
        type: type,
        data: data,
        success: function (respons) {
            switch (url) {
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

$("form.ajax").on("submit", submit);