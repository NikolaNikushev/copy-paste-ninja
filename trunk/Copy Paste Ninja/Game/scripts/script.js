"use strict";




// Declare all the commonly used objects as variables for convenience
var B2Vec2 = Box2D.Common.Math.b2Vec2;
var B2BodyDef = Box2D.Dynamics.b2BodyDef;
var B2Body = Box2D.Dynamics.b2Body;
var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var B2Fixture = Box2D.Dynamics.b2Fixture;
var B2World = Box2D.Dynamics.b2World;
var B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var B2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var B2Listener = Box2D.Dynamics.b2ContactListener;

$(window).load(function () {
    physicsSimulation.init(); // TODO: this is not the proper way for initializing physics. Investigate why!!!
    gameControler.init(keyboard, engine, loader, levelsData);
    entities.init(loader, physicsSimulation, engine);
    engine.init(gameControler, physicsSimulation, entities, levelsData, loader, hero);
    hero.init(physicsSimulation);

    // for debuging purpose
    // start level directly
    var level = 1;
    gameControler.startGame(level - 1);

    // server side things and menus (not games one)
    var scoreTable = $("#getScore");
    scoreTable.click();


    /*
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    */

});





