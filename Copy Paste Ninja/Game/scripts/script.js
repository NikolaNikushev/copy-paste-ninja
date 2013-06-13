"use strict";
$(window).load(function () {
    gameControler.init();

    // for debuging purpose
    // start level directly
    var level = 1;
    engine.newGame(level - 1);
});



