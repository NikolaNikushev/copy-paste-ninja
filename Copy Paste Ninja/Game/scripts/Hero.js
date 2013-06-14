"use strict";
var hero = function () {

    var JumpPauseLength = 3;

    function increaseHeroSpeed(heroSpeedIncreaseStep) {
        return 0.1 * box2d.heroSpeedIncreaseStep;
    }

    // Prototype inherit function needed for Parasitic Combination Inheritance pattern.
    function inheritPrototype(subType, superType) {
        var prototype = Object.create(superType.prototype); //create object
        prototype.constructor = subType; //augment object
        prototype.parent = superType.prototype; // save variable for calling parent methods
        subType.prototype = prototype; //assign object
    }

    function DynamicGameObject(entity) {
        this.width = entity.width || 37;
        this.height = entity.height || 50;

        // Animation variables
        this.sprite = loader.loadImage("images/" + entity.name + ".png");
        this.facingRight = true;
        this.speed = 0;
        this.animationFrame = 0;
        this.animationFrameLength = 3;
        this.animationFrameDelay = 0;
        this.animationFrameDelayLength = 5; // how many iterations to wait before advancing frame
        // The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle
        // from the coordinates specified by sx and sy to the bottom-right corner of the image is used. If you specify a negative value,
        // the image is flipped horizontally when drawn.
        this.sw = this.width;
        // The height of the sub-rectangle of the source image to draw into the destination context. If you specify a negative value, the image is flipped vertically when drawn.
        this.sh = this.height;
        this.dx = -this.width / 2 - 1; // The X coordinate in the destination canvas at which to place the top-left corner of the source image.
        this.dy = -this.height / 2 - 1; // The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
        this.dw = this.width + 2; // The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
        this.dh = this.height + 2; // The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.


        // Add GameObject to world physics simulator
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = entity.density || 1.0;
        fixtureDef.friction = entity.friction || 0;
        fixtureDef.restitution = entity.restitution || 0.1;
        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(this.width / 2 / box2d.scale, this.height / 2 / box2d.scale);

        this.body = box2d.world.CreateBody(bodyDef);
        this.body.SetFixedRotation(true);
        this.data = {
            type: "hero",
        }
        this.body.SetUserData(this.data);

        // Set user data
        //this.body.SetUserData(375);

        var fixture = this.body.CreateFixture(fixtureDef);

        // add foot sensor fixture
        // Create second fixture and attach a polygon shape to the body
        var fixtureDef = new b2FixtureDef;
        fixtureDef.shape = new b2PolygonShape;
        var points = [
        new b2Vec2(0, 0),
        new b2Vec2(0.29, 0.51),
        new b2Vec2(-0.29, 0.51),
        ];
        fixtureDef.shape.SetAsArray(points, points.length);
        fixtureDef.isSensor = true;

        var footSensorFixture = this.body.CreateFixture(fixtureDef);

        this.sensorData = {
            evaluateJump: true,
            numFootContacts: 0,
        }

        footSensorFixture.SetUserData(this.sensorData); // random choosen stupid magic number

        this.jumpPauseCount = 0;
        this.heroSpeedIncreaseStep = 1;

        this.jump = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.usePowerUp = false;
    }

    DynamicGameObject.prototype.getPosX = function () {
        var position = this.body.GetPosition();
        return position.x * box2d.scale;
    }

    DynamicGameObject.prototype.getPosY = function () {
        var position = this.body.GetPosition();
        return position.y * box2d.scale;
    }

    DynamicGameObject.prototype.draw = function () {

        // The X coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
        var sx = this.width * this.animationFrame;


        if (this.speed !== 0) {
            // change hero animating direction based on his movement direction
            if (this.speed > 0) {
                this.facingRight = true;
            } else if (this.speed < 0) {
                this.facingRight = false;
            }

            // Set animation frame delay based on hero's speed
            var speed = Math.abs(this.speed);
            if (speed < 1) {
                this.animationFrameDelayLength = 20;
            } else {
                this.animationFrameDelayLength = 5;
            }
            //console.log(engine.hero.animationFrameDelayLength + " " + speed);

            // Set animation frame based on delay
            if (this.animationFrameDelay >= this.animationFrameDelayLength) {
                this.animationFrameDelay = 0;

                this.animationFrame += 1;
                if (this.animationFrame === this.animationFrameLength) {
                    this.animationFrame = 0;
                }
            }

            this.animationFrameDelay += 1;
        }

        // The Y coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
        if (this.facingRight) {
            var sy = 0; 
        } else {
            // hero is facing left
            var sy = this.height;
        }

        var position = this.body.GetPosition();
        engine.context.translate(position.x * box2d.scale - engine.getOffsetLeft(), position.y * box2d.scale);
        engine.context.drawImage(this.sprite, sx, sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
        engine.context.translate(-position.x * box2d.scale + engine.getOffsetLeft(), -position.y * box2d.scale);
    }

    // Move hero accordin to input forces
    DynamicGameObject.prototype.update = function () {
        var vel = this.body.GetLinearVelocity();

        // save value for animation direction
        this.speed = vel.x;

        var desiredVelX = 0;
        var desiredVelY = vel.y;
        var posToApply = this.body.GetWorldCenter();

        if (this.jump) {
            if (this.sensorData.numFootContacts > 0 && this.jumpPauseCount > JumpPauseLength) {
                this.jumpPauseCount = 0;
                desiredVelY = 60;
            } else {
                this.jumpPauseCount += 1;
            }
        }

        if (this.moveLeft) {
            var rvel = vel.x - increaseHeroSpeed(this.heroSpeedIncreaseStep);
            this.heroSpeedIncreaseStep += 1;
            desiredVelX = rvel > -5 ? rvel : -5;
        }

        if (this.moveRight) {
            var rvel = vel.x + increaseHeroSpeed(this.heroSpeedIncreaseStep);
            this.heroSpeedIncreaseStep += 1;
            desiredVelX = rvel < 5 ? rvel : 5;
        }

        if (this.usePowerUp) {
            // TODO: implement
        }

        // Stop charakter if he doesn't move left or right
        if (!this.moveLeft && !this.moveRight) {
            desiredVelX = vel.x * 0.68;
            this.heroSpeedIncreaseStep = 1;
            if (-0.5 < desiredVelX && desiredVelX < 0.5) {
                keyboard.moveState = undefined;
            }
        }

        var velChangeX = desiredVelX - vel.x;
        var velChangeY = desiredVelY - vel.y;
        var impulseX = this.body.GetMass() * velChangeX; //disregard time factor
        var impulseY = this.body.GetMass() * velChangeY; //disregard time factor
        this.body.ApplyImpulse(new b2Vec2(impulseX, impulseY), posToApply);
    }

    function BadNinja(entity, age) {
        DynamicGameObject.call(this, entity);
        // add custom fields...
        this.moveLeft = true;
    }
    inheritPrototype(BadNinja, DynamicGameObject);

    // add or overwrite methods
    BadNinja.prototype.sayAge = function () {
        alert(this.age);
    };

    BadNinja.prototype.update = function () {
        // mandatory call to parents update
        this.parent.update.call(this);
        //console.log(this.getPosX());

    };

    BadNinja.prototype.patrool = function () {
    };

    /* Nakov */
    var VilianNakov = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;
        
        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
    }
    inheritPrototype(VilianNakov, DynamicGameObject);

    VilianNakov.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    }

    VilianNakov.prototype.patrol = function () {
        var currPositionX = this.getPosX();
        if (currPositionX > this.maxRight) {
            this.moveRight = false;
            this.moveLeft = true;
        }

        if (currPositionX < this.minLeft) {
            this.moveRight = true;
            this.moveLeft = false;
        }
    }

    /* Niki */
    var VilianNiki = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;
        this.jump = true;

        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
    }
    inheritPrototype(VilianNiki, DynamicGameObject);

    VilianNiki.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    }

    VilianNiki.prototype.patrol = function () {
        var currPositionX = this.getPosX();
        if (currPositionX > this.maxRight) {
            this.moveRight = false;
            this.moveLeft = true;
        }

        if (currPositionX < this.minLeft) {
            this.moveRight = true;
            this.moveLeft = false;
        }
    }

    /* Doncho */
    var VilianDoncho = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;

        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
    }
    inheritPrototype(VilianDoncho, DynamicGameObject);

    VilianDoncho.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    }

    VilianDoncho.prototype.patrol = function () {
        var currPositionX = this.getPosX();
        if (currPositionX > this.maxRight) {
            this.moveRight = false;
            this.moveLeft = true;
        }

        if (currPositionX < this.minLeft) {
            this.moveRight = true;
            this.moveLeft = false;
        }
    }

    return {
        create: function (entity) {
            if (entity.name === "ninja") {
                return new DynamicGameObject(entity);
                //return new Player(entity);
            } else if (entity.name === "nakov") {
                return new VilianNakov(entity);
            } else if (entity.name === "doncho") {
                return new VilianDoncho(entity);
            } else if (entity.name === "niki") {
                return new VilianNiki(entity);
            } else if (entity.name === "goro") {
                return new VilianGoro(entity);
            } else if (entity.name === "badninja") {
                return new BadNinja(entity, 28);
            } else {
                // TODO: exception throw etc...
                console.log("eroro");
            }
        }
    };
}();