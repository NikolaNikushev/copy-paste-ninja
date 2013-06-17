"use strict";
var gameControler = function () {
    var keyboard;
    var engine;
    var loader;
    var levelsData;

    function showLevelScreen() {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow');
    }

    // Initialize level selection screen
    function initLevelSelectionScreen() {
        var html = "";
        for (var i = 0; i < levelsData.length; i++) {
            html += '<input type = "button" value = "' + (i + 1) + '">';
        }

        $('#levelselectscreen').html(html);

        // Set the button click event handlers to load level
        $('#levelselectscreen input').click(function () {
            gameControler.startGame(this.value - 1);
            $('#levelselectscreen').hide();
        });
    }

    // Start initializing objects, preloading assets and display start screen
    function initializeControler() {
        // Initialize objects
        initLevelSelectionScreen();
        loader.init();

        // Hide all game layers and display the start screen
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        //Get handler for game canvas and context
        engine.canvas = $('#gamecanvas')[0];
        engine.context = engine.canvas.getContext('2d');
    }

    // Initialize gameControler

    return {

        init: function (vKeyboard, vEngine, vLoader, vLevelsData) {
            keyboard = vKeyboard;
            engine = vEngine;
            loader = vLoader;
            levelsData = vLevelsData;

            initializeControler();
        },

        // show levels
        start: function () {
            showLevelScreen();
        },

        // start game
        startGame: function (levelNumber) {
            keyboard.init();
            engine.newGame(levelNumber);
        },

        restartLevel: function () {
            window.cancelAnimationFrame(engine.animationFrame);
            engine.lastUpdateTime = undefined;
            engine.newGame(engine.getLevelNumber());
        },

        startNextLevel: function () {
            window.cancelAnimationFrame(engine.animationFrame);
            engine.lastUpdateTime = undefined;
            engine.loadLevel(engine.getLevelNumber() + 1);
        },

        updateScoreScreen: function (score) {
            $('#score').html('Score: ' + score);
        },

        showGameScreen: function () {
            $('.gamelayer').hide();
            // Display the game canvas and score
            $('#gamecanvas').show();
            $('#scorescreen').show();
        },

        showEndingScreen: function (mode, score) {
            if (mode === "level-success") {
                if (engine.getLevelNumber() < levelsData.length - 1) {
                    $('#endingmessage').html('Level Complete. Well Done!!!');
                    $("#playnextlevel").show();
                } else {
                    $('#endingmessage').html('All Levels Complete. Well Done!!!');
                    $("#playnextlevel").hide();
                }
            } else if (mode === "level-failure") {
                $('#endingmessage').html('Failed. Play Again?');
                $("#playnextlevel").hide();
            }
            $('#endingscreen').show();
            var formUplodScore = $("#getScore");
            scoreTable.click();
        }
    };
}();