// Declare all the commonly used objects as variables for convenience
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


var box2d = {
    scale: 50,

    init: function () {
        // Set up the Box2D world that will do most of the physics calculation
        var gravity = new b2Vec2(0, 9.8); //declare gravity as 9.8 m/s^2 downward
        var allowSleep = true; //Allow objects that are at rest to fall asleep and be excluded from calculations
        box2d.world = new b2World(gravity, allowSleep);

        // Set up debug draw
        var debugContext = document.getElementById('debugcanvas').getContext('2d');
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(box2d.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);

        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.PostSolve = function (contact, impulse) {
            var body1 = contact.GetFixtureA().GetBody();
            var body2 = contact.GetFixtureB().GetBody();
            var entity1 = body1.GetUserData();
            var entity2 = body2.GetUserData();
            var impulseAlongNormal = Math.abs(impulse.normalImpulses[0]);
            // This listener is called a little too often. Filter out very tiny impulses.
            // After trying different values, 5 seems to work well
            if (impulseAlongNormal > 5) {
                // If objects have a health, reduce health by the impulse value
                if (entity1.health) {
                    entity1.health -= impulseAlongNormal;
                }
                if (entity2.health) {
                    entity2.health -= impulseAlongNormal;
                }
            }
        };

        listener.BeginContact = function (contact) {
            //check if fixture A was the foot sensor
            var fixtureUserData = contact.GetFixtureA().GetUserData();
            if (fixtureUserData == 375) {
                game.hero.numFootContacts++;
            }

            //check if fixture B was the foot sensor
            fixtureUserData = contact.GetFixtureB().GetUserData();
            if (fixtureUserData == 375) {
                game.hero.numFootContacts++;
            }
        }

        listener.EndContact = function (contact) {
            //check if fixture A was the foot sensor
            var fixtureUserData = contact.GetFixtureA().GetUserData();
            if (fixtureUserData == 375) {
                game.hero.numFootContacts--;
            }

            //check if fixture B was the foot sensor
            fixtureUserData = contact.GetFixtureB().GetUserData();
            if (fixtureUserData == 375) {
                game.hero.numFootContacts--;
            }
        }

        box2d.world.SetContactListener(listener);

    },

    createRectangle: function (entity, definition) {
        var bodyDef = new b2BodyDef;
        if (entity.isStatic) {
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(entity.width / 2 / box2d.scale, entity.height / 2 / box2d.scale);

        var body = box2d.world.CreateBody(bodyDef);
        body.SetUserData(entity);
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    },

    createCircle: function (entity, definition) {
        var bodyDef = new b2BodyDef;
        if (entity.isStatic) {
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2CircleShape(entity.radius/box2d.scale);

        var body = box2d.world.CreateBody(bodyDef);
        body.SetUserData(entity);
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    },

    step: function (timeStep) {
        // velocity iterations = 8
        // position iterations = 3
        if (timeStep > 2 / 60) {
            timeStep = 2 / 60
        }

        box2d.world.Step(timeStep, 8, 3);
        box2d.world.ClearForces();
    },

    heroSpeedIncreaseStep: 1,
    increaseHeroSpeed: function () {
        box2d.heroSpeedIncreaseStep++;
        return 0.1 * box2d.heroSpeedIncreaseStep;
    },

    moveHero: function () {
        //console.log(game.hero.numFootContacts + " numFootContatcts");
        var vel = game.hero.GetLinearVelocity();

        // save value for animation direction
        if (vel.x > 0) {
            game.hero.facing = "right";
        } else if (vel.x < 0) {
            game.hero.facing = "left";
        }

        var desiredVelX = 0;
        var desiredVelY = vel.y;
        var posToApply = game.hero.GetWorldCenter();

        if (keyboard.moveUp) {
            if (game.hero.numFootContacts > 0 && game.hero.jumped === false) {
                game.hero.jumped = true;

                setTimeout(function () {
                    game.hero.jumped = false;
                }, 100);
                desiredVelY = 60;
                console.log(posToApply);
            }
        }

        if (keyboard.moveLeft) {
            game.hero.moving = true;
            var rvel = vel.x - box2d.increaseHeroSpeed();
            desiredVelX = rvel > -5 ? rvel : -5;
        }

        if (keyboard.moveRight) {
            game.hero.moving = true;
            var rvel = vel.x + box2d.increaseHeroSpeed();
            desiredVelX = rvel < 5 ? rvel : 5;
        }

        if (keyboard.usePowerUp) {

        }

        // Stop charakter if he doesn't move left or right
        if (!keyboard.moveLeft && !keyboard.moveRight) {
            game.hero.moving = false;
            desiredVelX = vel.x * 0.68;
            box2d.heroSpeedIncreaseStep = 1;
            if (-0.5 < desiredVelX && desiredVelX < 0.5) {
                keyboard.moveState = undefined;
            }
        }

        var velChangeX = desiredVelX - vel.x;
        var velChangeY = desiredVelY - vel.y;
        var impulseX = game.hero.GetMass() * velChangeX; //disregard time factor
        var impulseY = game.hero.GetMass() * velChangeY; //disregard time factor

        game.hero.ApplyImpulse(new b2Vec2(impulseX, impulseY), posToApply);
    },

}