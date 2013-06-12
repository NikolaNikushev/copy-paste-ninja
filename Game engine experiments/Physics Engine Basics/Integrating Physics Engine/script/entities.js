var entities = {
    definitions: {
        "glass": {
            fullHealth: 100,
            density: 2.4,
            friction: 0.4,
            restitution: 0.15,
        },
        "wood": {
            fullHealth: 500,
            density: 0.7,
            friction: 0.4,
            restitution: 0.4,
        },
        "dirt": {
            density: 1,
            friction: 1,
            restitution: 0.1,
        },
        "platform": {
            density: 1,
            friction: 1,
            restitution: 0.1,
        },
        "rock": {
            density: 3.0,
            friction: 1.5,
            restitution: 0.2,
        },
        "card": {
            shape: "circle",
            fullHealth: 40,
            radius: 5,
            density: 1,
            friction: 0.5,
            restitution: 0.4,
        },
        "ninja": {
            shape: "rectangle",
            fullHealth: 80,
            width: 37,
            height: 50,
            density: 1,
            friction: 0,
            restitution: 0,
        },
        "box": {
            shape: "rectangle",
            fullHealth: 80,
            width: 37,
            height: 50,
            density: 1,
            friction: 0.5,
            restitution: 0.1,
        },
    },

    // take the entity, create a Box2D body, and add it to the world
    create: function (entity) {
        var definition = entities.definitions[entity.name];
        if(!definition){
            console.log ("Undefined entity name", entity.name);
            return;
        }

        switch (entity.type) {
            case "block": // simple rectangles
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.shape = "rectangle";
                entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                box2d.createRectangle(entity, definition);
                break;
            case "ground": // simple rectangles
                // No need for health. These are indestructible
                entity.shape = "rectangle";
                // No need for sprites. These won't be drawn at all
                box2d.createRectangle(entity,definition);
                break;
            case "hero": 
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.sprite = loader.loadImage("images/" + entity.name + ".png");
                entity.shape = definition.shape;
                entity.width = definition.width;
                entity.height = definition.height;
                game.hero = box2d.createRectangle(entity, definition);
                game.hero.SetFixedRotation(true);

                // add foot sensor fixture
                // Create second fixture and attach a polygon shape to the body
                var fixtureDef = new b2FixtureDef;
                //fixtureDef.density = 1;
                fixtureDef.shape = new b2PolygonShape;
                var points = [
                new b2Vec2(0, 0),
                new b2Vec2(0.29, 0.51),
                new b2Vec2(-0.29, 0.51),
                ];
                fixtureDef.shape.SetAsArray(points, points.length);
                fixtureDef.isSensor = true;
                footSensorFixture = game.hero.CreateFixture(fixtureDef);
                footSensorFixture.SetUserData(375); // random choosen stupid magic number
                game.hero.numFootContacts = 0;
                game.hero.jumped = false;
                game.hero.facingRight = true;
                game.hero.speed = 0;
                game.hero.animationFrame = 0;
                game.hero.animationFrameLength = 3;
                game.hero.animationFrameDelay = 0;
                game.hero.animationFrameDelayLength = 5; // how many iterations to wait before advancing frame
                break;
            case "villain": // can be circles or rectangles
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.sprite = loader.loadImage("images/"+entity.name+".png");
                entity.shape = definition.shape;
                if (definition.shape == "circle") {
                    entity.radius = definition.radius;
                    box2d.createCircle(entity,definition);
                } else if (definition.shape == "rectangle") {
                    entity.width = definition.width;
                    entity.height = definition.height;
                    box2d.createRectangle(entity, definition);
                }
                break;
            default:
                console.log("Undefined entity type", entity.type);
                break;
        }
    },

    // take the entity, its position, and its angle and draw it on the game canvas
    draw: function (entity, position, angle) {
        game.context.translate(position.x * box2d.scale - game.offsetLeft, position.y * box2d.scale);
        game.context.rotate(angle);
        switch (entity.type) {
            case "block":
                game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                -entity.width/2-1, -entity.height/2-1, entity.width+2, entity.height+2);
                break;
            case "villain":
            case "hero":
                entities.drawHero(entity);
                break;
            case "ground":
                // do nothing... We will draw objects like the ground & slingshot separately
                break;
        }
        game.context.rotate(-angle);
        game.context.translate(-position.x * box2d.scale + game.offsetLeft, -position.y * box2d.scale);
    },

    drawHero: function (entity) {
        var image = entity.sprite;

        // The X coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
        var sx = entity.width * game.hero.animationFrame;


        if (game.hero.speed !== 0) {
            // change hero animating direction based on his movement direction
            if (game.hero.speed > 0) {
                game.hero.facingRight = true;
            } else if (game.hero.speed < 0) {
                game.hero.facingRight = false;
            }

            // Set animation frame delay based on hero's speed
            var speed = Math.abs(game.hero.speed);
            if (speed < 1) {
                game.hero.animationFrameDelayLength = 20;
            } else {
                game.hero.animationFrameDelayLength = 5;
            }
            console.log(game.hero.animationFrameDelayLength + " " + speed);

            // Set animation frame based on delay
            if (game.hero.animationFrameDelay >= game.hero.animationFrameDelayLength) {
                game.hero.animationFrameDelay = 0;

                game.hero.animationFrame += 1;
                if (game.hero.animationFrame === game.hero.animationFrameLength) {
                    game.hero.animationFrame = 0;
                }
            }

            game.hero.animationFrameDelay += 1;
        }

        // The Y coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
        if (game.hero.facingRight) {
            var sy = 0; 
        } else {
            // hero is facing left
            var sy = entity.height;
        }

        // The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle
        // from the coordinates specified by sx and sy to the bottom-right corner of the image is used. If you specify a negative value,
        // the image is flipped horizontally when drawn.
        var sw = 37;
        // The height of the sub-rectangle of the source image to draw into the destination context. If you specify a negative value, the image is flipped vertically when drawn.
        var sh = 50;

        var dx = -entity.width / 2 - 1; // The X coordinate in the destination canvas at which to place the top-left corner of the source image.
        var dy = -entity.height / 2 - 1; // The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
        var dw = entity.width + 2; // The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
        var dh = entity.height + 2; // The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.

        game.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        //game.context.drawImage(image, dx, dy, dw, dh);
    }
}