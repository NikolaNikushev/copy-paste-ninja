$(window).load(function () {
    game.init();

    // for debuging purpose
    // start level directly
    var level = 1;
    levels.load(level - 1);
});