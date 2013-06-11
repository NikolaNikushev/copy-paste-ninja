

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
    var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

    var world;
    var scale = 50; // 50 pixels on our canvas correspond to 1 meter in the Box2d world
    var worldHeight = 600;
    var worldWidth = 800;

    function init() {
        // Set up the Box2d world that will do most of the physics calculation
        var gravity = new b2Vec2(0, 9.8); // Declare gravity as 9.8 m/s^2 downward
        var allowSleep = true; // Allow objects that are at rest to fall asleep and be excluded from calculations
        world = new b2World(gravity, allowSleep);

        createFloor();
        createRectangularBody();
        createNinja();
        createComplexBody();

        // Create contact listeners and track events
        listenForContact();

        setupDebugDraw("canvas");
        animate();
    }

    // Setting Up a Box2D Animation Loop
    var timeStep = 1 / 60;
    // As per the Box2d manual, the suggested iteration count for Box2D is 8 for velocity and 3 for position.
    var velocityIterations = 8;
    var positionIterations = 3;

    function animate() {
        world.Step(timeStep, velocityIterations, positionIterations);
        world.ClearForces();
        world.DrawDebugData();

        console.log(numFootContacts);

        // Custom Drawing
        if (ninja) {
            drawNinja();
        }

        //Kill Special Body if Dead
        if (ninja && ninja.GetUserData().life <= 0) {
            world.DestroyBody(ninja);
            ninja = undefined;
            console.log("The special body was destroyed");
        }

        setTimeout(animate, timeStep);
    }

    function createFloor() {
        //A body definition holds all the data needed to construct a rigid body.
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = worldWidth / 2 / scale;
        bodyDef.position.y = (worldHeight - 15) / scale;
        // A fixture is used to attach a shape to a body for collision detection.
        // A fixture definition is used to create a fixture.
        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0; // used to calc weight of the body
        fixtureDef.friction = 0.5; // make sure the body slides realistically
        fixtureDef.restitution = 0.2; // bouncing value
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(worldWidth / 2 / scale, 15 / scale); // worldWidth pixels wide and 20 pixels tall
        var body = world.CreateBody(bodyDef);
        var fixture = body.CreateFixture(fixtureDef);
    }

    var context;
    function setupDebugDraw(canvasName) {
        var debugCanvas = document.getElementById(canvasName);
        console.log(debugCanvas);
        context = debugCanvas.getContext('2d');
        var debugDraw = new b2DebugDraw();
        // Use this canvas context for drawing the debugging screen
        debugDraw.SetSprite(context);
        // Set the scale
        debugDraw.SetDrawScale(scale);
        // Fill boxes with an alpha transparency of 0.3
        debugDraw.SetFillAlpha(0.3);
        // Draw lines with a thickness of 1
        debugDraw.SetLineThickness(1.0);
        // Display all shapes and joints
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        // Start using debug draw in our world
        world.SetDebugDraw(debugDraw);
    }

    function createRectangularBody(){
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = 40 / scale;
        bodyDef.position.y = 100 / scale;
        var body = world.CreateBody(bodyDef);

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.3;
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(30/scale,50/scale);
        var fixture = body.CreateFixture(fixtureDef);
    }

    var ninja;
    function createNinja(){
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = 155 / scale;
        bodyDef.position.y = 0 / scale;
        ninja = world.CreateBody(bodyDef);

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.5;
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(30 / scale, 50 / scale);
        var fixture = ninja.CreateFixture(fixtureDef);

        ninja.SetUserData({name:"special",life:250})
    }

    numFootContacts = 0;

    function listenForContact(){
        var listener = new Box2D.Dynamics.b2ContactListener;

        listener.PostSolve = function(contact,impulse){
            var body1 = contact.GetFixtureA().GetBody();
            var body2 = contact.GetFixtureB().GetBody();
            // If either of the bodies is the special body, reduce its life
            if (body1 == ninja || body2 == ninja){
                var impulseAlongNormal = impulse.normalImpulses[0];
                ninja.GetUserData().life -= impulseAlongNormal;
                console.log("The special body was in a collision with impulse", impulseAlongNormal, "and its life has now become ", ninja.GetUserData().life);
            }
        };

        listener.BeginContact = function (contact) {
            //check if fixture A was the foot sensor
            var fixtureUserData = contact.GetFixtureA().GetUserData();
            if (fixtureUserData == 375) {
                numFootContacts++;
            }

            //check if fixture B was the foot sensor
            fixtureUserData = contact.GetFixtureB().GetUserData();
            if (fixtureUserData == 3) {
                numFootContacts++;
            }
        }

        listener.EndContact = function (contact) {
            //check if fixture A was the foot sensor
            var fixtureUserData = contact.GetFixtureA().GetUserData();
            if (fixtureUserData == 3) {
                numFootContacts--;
            }

            //check if fixture B was the foot sensor
            fixtureUserData = contact.GetFixtureB().GetUserData();
            if (fixtureUserData == 3) {
                numFootContacts--;
            }
        }




        world.SetContactListener(listener);
    }

    function drawNinja() {
        // Get body position and angle
        var position = ninja.GetPosition();
        var angle = ninja.GetAngle();
        // Translate and rotate axis to body position and angle
        context.translate(position.x * scale, position.y * scale);
        context.rotate(angle);
        // Draw a filled circular face
        context.fillStyle = "rgb(200,150,250);";
        context.beginPath();
        context.arc(0, 0, 30, 0, 2 * Math.PI, false);
        context.fill();
        // Draw two rectangular eyes
        context.fillStyle = "rgb(255,255,255);";
        context.fillRect(-15, -15, 10, 5);
        context.fillRect(5, -15, 10, 5);
        // Draw an upward or downward arc for a smile depending on life
        context.strokeStyle = "rgb(255,255,255);";
        context.beginPath();
        if (ninja.GetUserData().life > 100) {
            context.arc(0, 0, 10, Math.PI, 2 * Math.PI, true);
        } else {
            context.arc(0, 10, 10, Math.PI, 2 * Math.PI, false);
        }
        context.stroke();
        // Translate and rotate axis back to original position and angle
        context.rotate(-angle);
        context.translate(-position.x * scale, -position.y * scale);
    }

    function createComplexBody(){
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = 350/scale;
        bodyDef.position.y = 50/scale;

        var body = world.CreateBody(bodyDef);

        //Create first fixture and attach a circular shape to the body
        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.7;
        fixtureDef.shape = new b2CircleShape(40/scale);
        body.CreateFixture(fixtureDef);

        // Create second fixture and attach a polygon shape to the body
        fixtureDef.shape = new b2PolygonShape;
        var points = [
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        fixtureDef.isSensor = true;
        footSensorFixture = body.CreateFixture(fixtureDef);
        footSensorFixture.SetUserData(375); // random choosen stupid magic number
    }