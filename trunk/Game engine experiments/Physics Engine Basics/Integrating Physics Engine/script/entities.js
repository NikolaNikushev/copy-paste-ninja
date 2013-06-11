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
            width: 30,
            height: 50,
            density: 1,
            friction: 0,
            restitution: 0,
        },
        "box": {
            shape: "rectangle",
            fullHealth: 80,
            width: 30,
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
                if (entity.shape == "circle") {
                    game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                        -entity.radius - 1, -entity.radius - 1, entity.radius * 2 + 2, entity.radius * 2 + 2);
                } else if (entity.shape == "rectangle") {
                    game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                        -entity.width / 2 - 1, -entity.height / 2 - 1, entity.width + 2, entity.height + 2);
                }
                break;
            case "ground":
                // do nothing... We will draw objects like the ground & slingshot separately
                break;
        }
        game.context.rotate(-angle);
        game.context.translate(-position.x * box2d.scale + game.offsetLeft, -position.y * box2d.scale);
    }
}