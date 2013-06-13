var engine = function () {
    var mode = ""; // Game mode
    var maxSpeed = 7; // Maximum panning speed per frame in pixels
    var minOffset = 0; // Minimum and Maximum panning offset
    var maxOffset = 300;
    var offsetLeft = 0; // Current panning offset
    var score = 0; // The game score
    var levelNumber = 0; // The level number
    var backgroundImage;
    var foregroundImage;
    var gameEnded;

    var player;

    function setLevelNumber(value) {
        levelNumber = 0;
    }

    function handlePanning() {
        if (mode == "intro") {
            if (panTo(700)) {
                mode = "playing";
            }
        }

        if (mode == "playing") {
            panTo(player.getPosX() * box2d.scale);
        }

        if (mode == "level-success" || mode == "level-failure") {
            if (panTo(0)) {
                gameEnded = true;
                // TODO: make it better, return state or something
                gameControler.showEndingScreen();
            }
        }
    }

    //Pan the screen to center on newCenter
    function panTo(newCenter) {
        // TODO: rename value
        var thisNeedsName = Math.abs(newCenter - offsetLeft - engine.canvas.width / 4);
        if (thisNeedsName > 0 && offsetLeft <= maxOffset && offsetLeft >= minOffset) {
            var deltaX = Math.round((newCenter - offsetLeft - engine.canvas.width / 4) / 2);
            if (deltaX && Math.abs(deltaX) > maxSpeed) {
                deltaX = maxSpeed * Math.abs(deltaX) / (deltaX);
            }
            offsetLeft += deltaX;
        } else {
            return true;
        }

        if (offsetLeft < minOffset) {
            offsetLeft = minOffset;
            return true;
        } else if (offsetLeft > maxOffset) {
            offsetLeft = maxOffset;
            return true;
        }

        return false;
    }

    // Iterate through all the bodies and draw them on the game canvas
    function drawAllBodies() {
        for (var body = box2d.world.GetBodyList() ; body; body = body.GetNext()) {
            var entity = body.GetUserData();
            if (entity) {
                if (entity.dead) {
                    box2d.world.DestroyBody(body);
                    if (entity.type === "code") {
                        score += entity.score;
                        gameControler.updateScoreScreen(score);
                    }
                } else {
                    entities.draw(entity, body.GetPosition(), body.GetAngle())
                }
            }
        }
    }

    function startGame () {
        $('.gamelayer').hide();
        // Display the game canvas and score
        $('#gamecanvas').show();
        $('#scorescreen').show();
        mode = "intro";
        offsetLeft = 0;
        gameEnded = false;
        window.requestAnimationFrame(engine.animate, engine.canvas);
    }

    return {

        getScore: function () {
            return score;
        },

        getOffsetLeft: function () {
            return offsetLeft;
        },

        getLevelNumber: function () {
            return levelNumber;
        },

        newGame: function (levelNumber) {
            setLevelNumber(levelNumber);
            score = 0;

            //Initialize Box2D world whenever a new level is loaded
            box2d.init();

            // TODO: make score
            gameControler.updateScoreScreen(score);

            var level = levelsData[levelNumber];

            //load the background, foreground 
            backgroundImage = loader.loadImage("images/backgrounds/" + level.background + ".png");
            foregroundImage = loader.loadImage("images/backgrounds/" + level.foreground + ".png");

            // Load all the entities
            for (var i = 0; i < level.entities.length; i++) {
                var entity = level.entities[i];
                if (entity.type === "hero") {
                    player = hero.create(entity);
                } else {
                    entities.create(entity);
                }
            };

            //Call game.start() once the assets have loaded
            if (loader.loaded) {
                startGame()
            } else {
                loader.onload = startGame();
            }
        },

        animate: function () {
            // Update player movement calcualtions
            player.update();

            // Animate the background
            handlePanning();

            // Animate the characters
            var currentTime = new Date().getTime();
            var timeStep;
            if (engine.lastUpdateTime) {
                timeStep = (currentTime - engine.lastUpdateTime) / 1000;
                box2d.step(timeStep);
            }

            engine.lastUpdateTime = currentTime;

            // Draw the background with parallax scrolling
            engine.context.drawImage(backgroundImage, offsetLeft / 4, 0, 800, 600, 0, 0, 800, 600);
            engine.context.drawImage(foregroundImage, offsetLeft, 0, 800, 600, 0, 0, 800, 600);

            // Draw all the bodies
            drawAllBodies();

            // Draw player
            player.draw();

            // Debug draw
            box2d.world.DrawDebugData();

            if (!gameEnded) {
                engine.animationFrame = window.requestAnimationFrame(engine.animate, engine.canvas);
            }
        },

        updateInput: function (moveLeft, moveRight, jump, usePowerUp) {
            player.moveLeft = moveLeft;
            player.moveRight = moveRight;
            player.jump = jump;
            player.usePowerUp = usePowerUp;
        }
    };
}();