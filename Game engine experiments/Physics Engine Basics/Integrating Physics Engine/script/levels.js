var levels = {
    data: [
    { // First level
        foreground: 'desert-foreground',
        background: 'clouds-background',
        entities: [
            { type: "ground", name: "dirt", x: 1280 / 2, y: 600 - 15, width: 1280, height: 30, isStatic: true },
            { type: "ground", name: "dirt", x: 1280 / 2, y: 15, width: 1280, height: 30, isStatic: true },
            { type: "ground", name: "dirt", x: 15, y: 600 / 2, width: 30, height: 600, isStatic: true },
            { type: "ground", name: "dirt", x: 1280 - 15, y: 600 / 2, width: 30, height: 600, isStatic: true },
            { type: "ground", name: "dirt", x: 300, y: 390, width: 200, height: 30, isStatic: true },
            { type: "ground", name: "dirt", x: 700, y: 500, width: 200, height: 30, isStatic: true },

            // obstacles
            { type: "block", name: "box", x: 320, y: 375, width: 50, height: 50 },
            { type: "block", name: "box", x: 620, y: 375, width: 50, height: 50 },
            { type: "block", name: "box", x: 520, y: 375, width: 5, height: 50 },

            //{ type: "block", name: "glass", x: 520, y: 275, angle: 90, width: 100, height: 25 },
            //{ type: "villain", name: "burger", x: 520, y: 200, calories: 590 },
            //{ type: "block", name: "wood", x: 620, y: 375, angle: 90, width: 100, height: 25 },
            //{ type: "block", name: "glass", x: 620, y: 275, angle: 90, width: 100, height: 25 },
            //{ type: "villain", name: "fries", x: 620, y: 200, calories: 420 },
            //{ type: "hero", name: "orange", x: 90, y: 410 },

            { type: "hero", name: "ninja", x: 150, y: 410 },
        ]
    },
    { // Second level
        foreground: 'desert-foreground',
        background: 'clouds-background',
        entities: [
            { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
            { type: "ground", name: "wood", x: 180, y: 390, width: 40, height: 80, isStatic: true },
            { type: "block", name: "wood", x: 820, y: 375, angle: 90, width: 100, height: 25 },
            { type: "block", name: "wood", x: 720, y: 375, angle: 90, width: 100, height: 25 },
            { type: "block", name: "wood", x: 620, y: 375, angle: 90, width: 100, height: 25 },
            { type: "block", name: "glass", x: 670, y: 310, width: 100, height: 25 },
            { type: "block", name: "glass", x: 770, y: 310, width: 100, height: 25 },
            { type: "block", name: "glass", x: 670, y: 248, angle: 90, width: 100, height: 25 },
            { type: "block", name: "glass", x: 770, y: 248, angle: 90, width: 100, height: 25 },
            { type: "block", name: "wood", x: 720, y: 180, width: 100, height: 25 },
            { type: "villain", name: "burger", x: 715, y: 160, calories: 590 },
            { type: "villain", name: "fries", x: 670, y: 400, calories: 420 },
            { type: "villain", name: "sodacan", x: 765, y: 395, calories: 150 },
            { type: "hero", name: "strawberry", x: 40, y: 420 },
            { type: "hero", name: "orange", x: 90, y: 410 },
            { type: "hero", name: "apple", x: 150, y: 410 },
        ]
    }
    ],

    // Initialize level selection screen
    init: function () {
        var html = "";
        for (var i = 0; i < levels.data.length; i++) {
            var level = levels.data[i];
            html += '<input type = "button" value = "' + (i + 1) + '">';
        };

        $('#levelselectscreen').html(html);

        // Set the button click event handlers to load level
        $('#levelselectscreen input').click(function(){
            levels.load(this.value-1);
            $('#levelselectscreen').hide();
        });
    },

    // Load all data and images for a specific level
    load: function (number) {
        //Initialize Box2D world whenever a level is loaded
        box2d.init();
        // declare a new current level object
        game.currentLevel = {
            number: number,
            hero: []
        };
        game.score = 0;
        $('#score').html('Score: ' + game.score);
        game.hero = undefined;
        var level = levels.data[number];

        //load the background, foreground, and slingshot images
        game.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/" + level.background + ".png");
        game.currentLevel.foregroundImage = loader.loadImage("images/backgrounds/" + level.foreground + ".png");

        // Load all the entities
        for (var i = level.entities.length - 1; i >= 0; i--) {
            var entity = level.entities[i];
            entities.create(entity);
        };

        //Call game.start() once the assets have loaded
        if (loader.loaded) {
            game.start()
        } else {
            loader.onload = game.start;
        }
    }

}