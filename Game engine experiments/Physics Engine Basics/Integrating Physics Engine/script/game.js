﻿var game = {
    // Start initializing objects, preloading assets and display start screen
    init: function () {
        // Initialize objects
        levels.init();
        loader.init();
        keyboard.init();

        // Hide all game layers and display the start screen
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        //Get handler for game canvas and context
        game.canvas = $('#gamecanvas')[0];
        game.context = game.canvas.getContext('2d');
    },

    showLevelScreen: function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow');
    },

    // Game mode
    mode: "intro",
    // Maximum panning speed per frame in pixels
    maxSpeed: 7,
    // Minimum and Maximum panning offset
    minOffset: 0,
    maxOffset: 300,
    // Current panning offset
    offsetLeft: 0,
    // The game score
    score: 0,


    start: function () {
        $('.gamelayer').hide();
        // Display the game canvas and score
        $('#gamecanvas').show();
        $('#scorescreen').show();
        game.mode = "intro";
        game.offsetLeft = 0;
        game.ended = false;
        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },

    //Pan the screen to center on newCenter
    panTo: function (newCenter) {
        console.log("Pan to center: " + newCenter);
        if (Math.abs(newCenter - game.offsetLeft - game.canvas.width / 4) > 0
        && game.offsetLeft <= game.maxOffset && game.offsetLeft >= game.minOffset) {
            var deltaX = Math.round((newCenter - game.offsetLeft - game.canvas.width / 4) / 2);
            if (deltaX && Math.abs(deltaX) > game.maxSpeed) {
                deltaX = game.maxSpeed * Math.abs(deltaX) / (deltaX);
            }
            game.offsetLeft += deltaX;
        } else {
            return true;
        }

        if (game.offsetLeft < game.minOffset){
            game.offsetLeft = game.minOffset;
            return true;
        } else if (game.offsetLeft > game.maxOffset){
            game.offsetLeft = game.maxOffset;
            return true;
        }

        return false;
    },

    handlePanning: function () {
        if (game.mode == "intro") {
            if (game.panTo(700)) {
                game.mode = "playing";
            }
        }

        if (game.mode == "playing") {
            game.panTo(game.hero.GetPosition().x * box2d.scale);
        }

        if (game.mode == "level-success" || game.mode == "level-failure") {
            if (game.panTo(0)) {
                game.ended = true;
                game.showEndingScreen();
            }
        }
    },



    animate: function () {
        // Move character
        game.readInput();

        // Animate the background
        game.handlePanning();

        // Animate the characters
        var currentTime = new Date().getTime();
        var timeStep;
        if (game.lastUpdateTime) {
            timeStep = (currentTime - game.lastUpdateTime) / 1000;
            box2d.step(timeStep);
        }

        game.lastUpdateTime = currentTime;

        // Draw the background with parallax scrolling
        game.context.drawImage(game.currentLevel.backgroundImage, game.offsetLeft / 4, 0, 800, 600, 0, 0, 800, 600);
        game.context.drawImage(game.currentLevel.foregroundImage, game.offsetLeft, 0, 800, 600, 0, 0, 800, 600);

        // Draw all the bodies
        game.drawAllBodies();

        if (!game.ended) {
            game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        }
    },

    readInput: function () {
        var vel = game.hero.GetLinearVelocity();
        var desiredVelX = 0;
        var desiredVelY = vel.y;
        var jumped = false;
        switch (keyboard.moveState)
        {
            case "up":
                if (game.hero.numFootContacts > 0) {
                    jumped = true;
                    desiredVelY = 30;
                    //console.log("up");
                }
                console.log(game.hero.numFootContacts + " numFootContatcts");
                break;
            case "left":
                var rvel = vel.x - 0.7;
                desiredVelX = rvel > -5 ? rvel : -5;
                //console.log("left " + desiredVelX);
                break;
            case "right":
                var rvel = vel.x + 0.7;
                desiredVelX = rvel < 5 ? rvel : 5;
                //console.log("right " + desiredVelX);
                break;
            case "stop":
                desiredVelX = vel.x * 0.98;
                if (-0.5 < desiredVelX && desiredVelX < 0.5) {
                    keyboard.moveState = undefined;
                }
                //console.log("stop " + desiredVelX);
                break;
        }

        var velChangeX = desiredVelX - vel.x;
        var velChangeY = desiredVelY - vel.y;
        var impulseX = game.hero.GetMass() * velChangeX; //disregard time factor
        var impulseY = game.hero.GetMass() * velChangeY; //disregard time factor
        game.hero.ApplyImpulse(new b2Vec2(impulseX, impulseY), game.hero.GetWorldCenter());

    },

    drawAllBodies: function () {
        box2d.world.DrawDebugData();

        // Iterate through all the bodies and draw them on the game canvas
        for (var body = box2d.world.GetBodyList() ; body; body = body.GetNext()) {
            var entity = body.GetUserData();
            if (entity) {
                entities.draw(entity, body.GetPosition(), body.GetAngle())
            }
        }
    },

    showEndingScreen: function () {
        if (game.mode == "level-success") {
            if (game.currentLevel.number < levels.data.length - 1) {
                $('#endingmessage').html('Level Complete. Well Done!!!');
                $("#playnextlevel").show();
            } else {
                $('#endingmessage').html('All Levels Complete. Well Done!!!');
                $("#playnextlevel").hide();
            }
        } else if (game.mode == "level-failure") {
            $('#endingmessage').html('Failed. Play Again?');
            $("#playnextlevel").hide();
        }
        $('#endingscreen').show();
    },

    restartLevel: function () {
        window.cancelAnimationFrame(game.animationFrame);
        game.lastUpdateTime = undefined;
        levels.load(game.currentLevel.number);
    },

    startNextLevel: function () {
        window.cancelAnimationFrame(game.animationFrame);
        game.lastUpdateTime = undefined;
        levels.load(game.currentLevel.number + 1);
    },



}