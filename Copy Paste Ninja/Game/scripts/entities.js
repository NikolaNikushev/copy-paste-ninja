"use strict";
var entities = function () {
    var definitions = {
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
        "code": {
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
        "box": {
            shape: "rectangle",
            fullHealth: 80,
            width: 37,
            height: 50,
            density: 1,
            friction: 0.5,
            restitution: 0.1,
        },
        "chair": {
            fullHealth: 500,
            density: 0.7,
            friction: 0.4,
            restitution: 0.4,
        },
    };

    var engine;
    var loader;
    var physicsSimulation;
    var scale;

    function createRectangle(entity, definition) {
        var bodyDef = new B2BodyDef();
        if (entity.isStatic) {
            bodyDef.type = B2Body.b2_staticBody;
        } else {
            bodyDef.type = B2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / scale;
        bodyDef.position.y = entity.y / scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        var fixtureDef = new B2FixtureDef();
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new B2PolygonShape();
        fixtureDef.shape.SetAsBox(entity.width / 2 / scale, entity.height / 2 / scale);

        var body = physicsSimulation.addBody(bodyDef);
        body.SetUserData(entity);
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    }

    function createCircle(entity, definition) {
        var bodyDef = new B2BodyDef();
        if (entity.isStatic) {
            bodyDef.type = B2Body.b2_staticBody;
        } else {
            bodyDef.type = B2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / scale;
        bodyDef.position.y = entity.y / scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        var fixtureDef = new B2FixtureDef();
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new B2CircleShape(entity.radius / scale);

        var body = physicsSimulation.addBody(bodyDef);
        body.SetUserData(entity);
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    }

    function createSimplePolygonBody(entity, definition) {
        var bodyDef = new B2BodyDef();
        if (entity.isStatic) {
            bodyDef.type = B2Body.b2_staticBody;
        } else {
            bodyDef.type = B2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / scale;
        bodyDef.position.y = entity.y / scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        var fixtureDef = new B2FixtureDef();
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new B2PolygonShape;
        // Create an array of b2Vec2 points in clockwise direction
        var x;
        var y;
        var points = [];
        for (var i = 0; i < entity.points.length; i++) {
            x = entity.points[i].x / scale;
            y = entity.points[i].y / scale;
            console.log(x + " " + y);
            points.push(new B2Vec2(x, y));
        }

        // Use SetAsArray to define the shape using the points array
        fixtureDef.shape.SetAsArray(points, points.length);
        var body = physicsSimulation.addBody(bodyDef);
        body.SetUserData(entity);
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    }

    function test(){
        var bodyDef = new B2BodyDef;
        bodyDef.type = B2Body.b2_dynamicBody;
        bodyDef.position.x = 230/scale;
        bodyDef.position.y = 50/scale;
        var fixtureDef = new B2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2
        fixtureDef.shape = new B2PolygonShape;
        // Create an array of b2Vec2 points in clockwise direction
        var points = [
            new B2Vec2(0,0),
            new B2Vec2(40/scale,50/scale),
            new B2Vec2(50/scale,100/scale),
            new B2Vec2(-50 / scale, 100 / scale),
            new B2Vec2(-40 / scale, 50 / scale),
        ];
        // Use SetAsArray to define the shape using the points array
        fixtureDef.shape.SetAsArray(points, points.length);
        //var body = world.CreateBody(bodyDef);
        var body = physicsSimulation.addBody(bodyDef);
        var fixture = body.CreateFixture(fixtureDef);
    }

    return {
        init: function (vLoader, vPhysicsSimulation, vEngine) {
            engine = vEngine;
            physicsSimulation = vPhysicsSimulation;
            loader = vLoader;
            scale = physicsSimulation.getScale();
        },

        // take the entity, create a Box2D body, and add it to the world
        create: function (entity) {
            var body;
            var definition = definitions[entity.name];
            if (!definition) {
                console.log("Undefined entity name", entity.name);
                return;
            }

            switch (entity.type) {
                case "block": // simple rectangles
                    entity.health = definition.fullHealth;
                    entity.fullHealth = definition.fullHealth;
                    entity.shape = "rectangle";
                    entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                    body = createRectangle(entity, definition);
                    break;
                case "code": // simple rectangles
                    entity.shape = "rectangle";
                    entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                    body = createRectangle(entity, definition);
                    break;
                case "ground": // simple rectangles
                    // No need for health. These are indestructible
                    entity.shape = "rectangle";
                    // No need for sprites. These won't be drawn at all
                    body = createRectangle(entity, definition);
                    break;
                case "polygon": // complex shapes
                    entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                    body = createSimplePolygonBody(entity, definition);
                    //test();
                    break;
                default:
                    throw new Error("Undefined entity type ", entity.type);
            }
            return body;
        },

        // take the entity, its position, and its angle and draw it on the game canvas
        draw: function (entity, position, angle) {
            engine.context.translate(position.x * scale - engine.getOffsetLeft(), position.y * scale);
            engine.context.rotate(angle);
            switch (entity.type) {
                case "block":
                case "code":
                    engine.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                    -entity.width / 2 - 1, -entity.height / 2 - 1, entity.width + 2, entity.height + 2);
                    break;
                case "polygon":
                    // TODO: DRAW!!!
                    break;
                case "ground":
                    // do nothing... We will draw objects like the ground & slingshot separately
                    break;
            }
            engine.context.rotate(-angle);
            engine.context.translate(-position.x * scale + engine.getOffsetLeft(), -position.y * scale);
        }

    };
}();