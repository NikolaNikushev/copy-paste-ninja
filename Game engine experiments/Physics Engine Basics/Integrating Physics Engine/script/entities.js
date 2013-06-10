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
            friction: 0.5,
            restitution: 0.7,
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
                entity.sprite = loader.loadImage("images/"+entity.name+".png");
                box2d.createRectangle(entity,definition);
                break;
            case "ground": // simple rectangles
                // No need for health. These are indestructible
                entity.shape = "rectangle";
                // No need for sprites. These won't be drawn at all
                box2d.createRectangle(entity,definition);
                break;
            case "hero": // simple circles
            case "villain": // can be circles or rectangles
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.sprite = loader.loadImage("images/"+entity.name+".png");
                entity.shape = definition.shape;
                if(definition.shape == "circle"){
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
    }
}