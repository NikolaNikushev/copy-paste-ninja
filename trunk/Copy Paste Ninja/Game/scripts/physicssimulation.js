"use strict";

var physicsSimulation = function () {

    var world;
    var scale;

    function initDebugDraw() {
        var debugContext = document.getElementById('debugcanvas').getContext('2d');
        var debugDraw = new B2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
    }

    function initContactListener() {

        var listener = new Box2D.Dynamics.b2ContactListener();

        listener.PostSolve = function (contact, impulse) {
            var body1 = contact.GetFixtureA().GetBody();
            var body2 = contact.GetFixtureB().GetBody();
            var entity1 = body1.GetUserData();
            var entity2 = body2.GetUserData();

            if (entity1 && entity2) {
                if (entity1.type === "hero" && entity1.name === "ninja") {
                    if (entity2.villain) {
                        entity1.dead = true;
                    }
                } else if (entity2.type === "hero" && entity2.name === "ninja") {
                    if (entity1.villain) {
                        entity2.dead = true;
                    }
                }
            }
        };

        listener.BeginContact = function (contact) {
            var body1 = contact.GetFixtureA().GetBody();
            var body2 = contact.GetFixtureB().GetBody();
            var entity1 = body1.GetUserData();
            var entity2 = body2.GetUserData();

            if (entity1 && entity2) {
                if (entity1.type === "hero" && entity1.name === "ninja") {
                    if (entity2.type === "code") {
                        entity2.dead = true;
                    } 
                } else if (entity2.type === "hero" && entity2.name === "ninja") {
                    if (entity1.type === "code") {
                        entity1.dead = true;
                    }
                }
            }

            //check if fixture A was the foot sensor
            var fixtureUserData = contact.GetFixtureA().GetUserData();
            if (fixtureUserData) {
                // used for checking if hero can jump
                if (fixtureUserData.evaluateJump) {
                    fixtureUserData.numFootContacts += 1;
                }
            }

            //check if fixture B was the foot sensor
            fixtureUserData = contact.GetFixtureB().GetUserData();
            if (fixtureUserData) {
                // used for checking if hero can jump
                if (fixtureUserData.evaluateJump) {
                    fixtureUserData.numFootContacts += 1;
                }
            }
        };

        listener.EndContact = function (contact) {
            //check if fixture A was the foot sensor
            var fixtureUserData = contact.GetFixtureA().GetUserData();
            if (fixtureUserData) {
                // used for checking if hero can jump
                if (fixtureUserData.evaluateJump) {
                    fixtureUserData.numFootContacts -= 1;
                }
            }

            //check if fixture B was the foot sensor
            fixtureUserData = contact.GetFixtureB().GetUserData();
            if (fixtureUserData) {
                // used for checking if hero can jump
                if (fixtureUserData.evaluateJump) {
                    fixtureUserData.numFootContacts -= 1;
                }
            }
        };

        world.SetContactListener(listener);
    }

    return {

        init: function () {
            // Set up the Box2D world that will do most of the physics calculation
            var gravity = new B2Vec2(0, 9.8); //declare gravity as 9.8 m/s^2 downward
            var allowSleep = true; //Allow objects that are at rest to fall asleep and be excluded from calculations
            world = new B2World(gravity, allowSleep);
            scale = 50;

            initContactListener();

            // Set up debug draw
            initDebugDraw();
        },

        step: function (timeStep) {
            // velocity iterations = 8
            // position iterations = 3
            if (timeStep > 2 / 60) {
                timeStep = 2 / 60;
            }

            world.Step(timeStep, 8, 3);
            world.ClearForces();
        },

        getBodyList: function () {
            return world.GetBodyList();
        },

        destroyBody: function (body) {
            world.DestroyBody(body);
        },

        drawDebugData: function () {
            world.DrawDebugData();
        },

        getScale: function () {
            return scale;
        },

        addBody: function (bodyDef) {
            return world.CreateBody(bodyDef);
        },
    };
}();