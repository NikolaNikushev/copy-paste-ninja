"use strict";
var hero = function () {
    var physicsSimulation;
    var scale;

    var JumpPauseLength = 3;

    function increaseHeroSpeed(heroSpeedIncreaseStep) {
        return 0.1 * heroSpeedIncreaseStep;
    }

    // Prototype inherit function needed for Parasitic Combination Inheritance pattern.
    function inheritPrototype(subType, superType) {
        var prototype = Object.create(superType.prototype); //create object
        prototype.constructor = subType; //augment object
        prototype.parent = superType.prototype; // save variable for calling parent methods
        subType.prototype = prototype; //assign object
    }

    function DynamicGameObject(entity) {
        this.width = entity.width || 40
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
        var bodyDef = new B2BodyDef();
        bodyDef.type = B2Body.b2_dynamicBody;
        bodyDef.position.x = entity.x / scale;
        bodyDef.position.y = entity.y / scale;

        var fixtureDef = new B2FixtureDef();
        fixtureDef.density = entity.density || 1.0;
        fixtureDef.friction = entity.friction || 0;
        fixtureDef.restitution = entity.restitution || 0.1;
        fixtureDef.shape = new B2PolygonShape();
        fixtureDef.shape.SetAsBox(this.width / 2 / scale, this.height / 2 / scale);

        this.body = physicsSimulation.addBody(bodyDef);
        this.body.SetFixedRotation(true);
        this.data = {
            type: entity.type,
            villain: false,
            name: entity.name,
        };
        this.body.SetUserData(this.data);

        // Set user data
        //this.body.SetUserData(375);

        var fixture = this.body.CreateFixture(fixtureDef);

        // add foot sensor fixture
        // Create second fixture and attach a polygon shape to the body
        fixtureDef = new B2FixtureDef();
        fixtureDef.shape = new B2PolygonShape();
        var points = [
        new B2Vec2(0, 0),
        new B2Vec2(0.29, 0.51),
        new B2Vec2(-0.29, 0.51),
        ];
        fixtureDef.shape.SetAsArray(points, points.length);
        fixtureDef.isSensor = true;

        var footSensorFixture = this.body.CreateFixture(fixtureDef);

        this.sensorData = {
            evaluateJump: true,
            numFootContacts: 0,
        };

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
        return position.x * scale;
    };

    DynamicGameObject.prototype.getPosY = function () {
        var position = this.body.GetPosition();
        return position.y * scale;
    };

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
        var sy;
        if (this.facingRight) {
            sy = 0;
        } else {
            // hero is facing left
            sy = this.height;
        }

        var position = this.body.GetPosition();
        engine.context.translate(position.x * scale - engine.getOffsetLeft(), position.y * scale);
        engine.context.drawImage(this.sprite, sx, sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
        engine.context.translate(-position.x * scale + engine.getOffsetLeft(), -position.y * scale);
    };

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

        var rvel;
        if (this.moveLeft) {
            rvel = vel.x - increaseHeroSpeed(this.heroSpeedIncreaseStep);
            this.heroSpeedIncreaseStep += 1;
            desiredVelX = rvel > -5 ? rvel : -5;
        }

        if (this.moveRight) {
            rvel = vel.x + increaseHeroSpeed(this.heroSpeedIncreaseStep);
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
        this.body.ApplyImpulse(new B2Vec2(impulseX, impulseY), posToApply);
    };

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

    };

    BadNinja.prototype.patrool = function () {
    };

    function setPatroling (hero) {
        var currPositionX = hero.getPosX();
        if (currPositionX > hero.maxRight) {
            hero.moveRight = false;
            hero.moveLeft = true;
        }

        if (currPositionX < hero.minLeft) {
            hero.moveRight = true;
            hero.moveLeft = false;
        }
    }

    function setChasing(hero, isJumping){
        if (isJumping == undefined) {
            isJumping = false;
        };

        var currPositionX = hero.getPosX(),
            player = engine.getPlayer();

        // if (!player.facingRight && !player.facingRight) {
            var leftObserve = (player.getPosX() > currPositionX - hero.chaseOffset) && (player.getPosX() < currPositionX);
            var rightObserve = (player.getPosX() > currPositionX) && (player.getPosX() < hero.getPosX() + hero.width + hero.chaseOffset);
            if (leftObserve) {
                if (player.moveRight) {
                    if (hero.getPosX() > hero.minLeft) {
                        hero.moveLeft = true;
                    };
                    hero.moveRight = false;
                };
            };

            if (rightObserve) {
                if (player.moveRight && player.moveRight) {
                    hero.moveLeft = false;
                    if (hero.getPosX() < hero.maxRight) {
                        hero.moveRight = true;
                    }
                };
            };
        // };
    }

    /* Nakov */
    var VilianNakov = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;
        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
        this.data.villain = true;
        this.chaseOffset = 200; //entity.chaseOffset; // TODO move to levelsdata
    };
    inheritPrototype(VilianNakov, DynamicGameObject);

    VilianNakov.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    };

    VilianNakov.prototype.patrol = function () {
        setPatroling(this);
        setChasing(this);
    };

    /* Niki */
    var VilianNiki = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;
        this.jump = true;
        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
        this.data.villain = true;
        this.chaseOffset = 150; //entity.chaseOffset; // TODO move to levelsdata
    };

    inheritPrototype(VilianNiki, DynamicGameObject);

    VilianNiki.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    };

    VilianNiki.prototype.patrol = function () {
        setPatroling(this);
        setChasing(this);
    };

    /* Doncho */
    var VilianDoncho = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;
        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
        this.chaseOffset = 100; //entity.chaseOffset; // TODO move to levelsdata
        
        this.data.villain = true;
    };

    inheritPrototype(VilianDoncho, DynamicGameObject);

    VilianDoncho.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    };

    VilianDoncho.prototype.patrol = function () {
        setPatroling(this);
        setChasing(this);
    }

    /* Goro */
    var VilianGoro = function (entity) {
        DynamicGameObject.call(this, entity);
        this.moveRight = true;
        this.maxRight = entity.maxRight;
        this.minLeft = entity.minLeft;
        this.data.villain = true;

        this.spriteMoving = loader.loadImage("images/" + entity.name + "Moving.png");
        this.spriteSleeping = loader.loadImage("images/" + entity.name + "Sleeping.png");
        this.sprite = this.spriteSleeping;
    };

    inheritPrototype(VilianGoro, DynamicGameObject);

    VilianGoro.prototype.update = function () {
        this.parent.update.call(this);
        this.patrol();
    };

    VilianGoro.prototype.wakeUp = function () {
        this.sprite = this.spriteMoving;
    };

    VilianGoro.prototype.sleep = function () {
        this.sprite = this.spriteSleep;
    };

    VilianGoro.prototype.patrol = function () {
        var currPositionX = this.getPosX();
        if (currPositionX > this.maxRight) {
            this.moveRight = false;
            this.moveLeft = true;
        }

        if (currPositionX < this.minLeft) {
            this.moveRight = true;
            this.moveLeft = false;
        }
    };

    return {
        init: function(vPhysicsSimulation) {
            physicsSimulation = vPhysicsSimulation;
            scale = physicsSimulation.getScale();
        },

        create: function (entity) {
            if (entity.name === "ninja") {
                return new DynamicGameObject(entity);
                // return new Ninja(entity);
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
                throw "There is no such hero";
            }
        }
    };
}();