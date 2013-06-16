"use strict";
var levelsData = [

        { // First level
            foreground: 'columns-foreground',
            background: 'hall-background',
            entities: [
                // prevent hero moving out of the world
                { type: "ground", name: "dirt", x: 4000 / 2, y: 600 - 15, width: 4000, height: 30, isStatic: true },
                { type: "ground", name: "dirt", x: 4000 / 2, y: 15, width: 4000, height: 30, isStatic: true },
                { type: "ground", name: "dirt", x: 15, y: 600 / 2, width: 30, height: 600, isStatic: true },
                { type: "ground", name: "dirt", x: 4000 - 15, y: 600 / 2, width: 30, height: 600, isStatic: true },

                // platforms
                // 
                { type: "block", name: "platform", x: 250, y: 500, width: 150, height: 30, isStatic: true },
                { type: "block", name: "platform", x: 720, y: 420, width: 350, height: 30, isStatic: true },
                { type: "block", name: "platform", x: 1100, y: 500, width: 200, height: 30, isStatic: true },
                { type: "block", name: "platform", x: 1350, y: 420, width: 200, height: 30, isStatic: true },
                { type: "block", name: "platform", x: 1600, y: 500, width: 200, height: 30, isStatic: true },

                // obstacles
                //{ type: "block", name: "box", x: 320, y: 375, width: 70, height: 50 },
                //{ type: "block", name: "box", x: 620, y: 375, width: 70, height: 50 },
                //{ type: "block", name: "box", x: 520, y: 375, width: 70, height: 50 },

                // code
                { type: "code", name: "code", x: 400, y: 290, width: 45, height: 30, isStatic: true, dead: false, score: 10, isSensor: true },
                { type: "code", name: "code", x: 300, y: 390, width: 45, height: 30, isStatic: true, dead: false, score: 10, isSensor: true },
                { type: "code", name: "code", x: 400, y: 550, width: 45, height: 30, isStatic: true, dead: false, score: 10, isSensor: true },
                { type: "code", name: "code", x: 800, y: 550, width: 45, height: 30, isStatic: true, dead: false, score: 10, isSensor: true },

                // complex shapes, defined by polygons
                //{
                //  type: "polygon", name: "chair", x: 50, y: 300, points: [
                //    { x: 0, y: 0 },
                //    { x: 40, y: 50 },
                //    { x: 50, y: 100},
                //    { x: -50, y: 100 },
                //    { x: -40, y: 50 },
                //  ]
                //},
                
                // hero
                { type: "hero", name: "ninja", x: 50, y: 410 },
                //{ type: "hero", name: "badninja", x: 550, y: 410 },
                { type: "hero", name: "nakov", x: 200, y: 510, minLeft: 200, maxRight: 850 },
                { type: "hero", name: "doncho", x: 700, y: 210, minLeft: 610, maxRight: 790 },
                { type: "hero", name: "niki", x: 1200, y: 210, minLeft: 1100, maxRight: 1800 },
            ]
        },

        { // Second level
            foreground: 'columns-foreground',
            background: 'hall-background',
            entities: [
                // prevent hero moving out of the world
                { type: "ground", name: "dirt", x: 1280 / 2, y: 600 - 15, width: 1280, height: 30, isStatic: true },
                { type: "ground", name: "dirt", x: 1280 / 2, y: 15, width: 1280, height: 30, isStatic: true },
                { type: "ground", name: "dirt", x: 15, y: 600 / 2, width: 30, height: 600, isStatic: true },
                { type: "ground", name: "dirt", x: 1280 - 15, y: 600 / 2, width: 30, height: 600, isStatic: true },

                // platforms
                { type: "block", name: "platform", x: 100, y: 450, width: 200, height: 30, isStatic: true },
                { type: "block", name: "platform", x: 700, y: 500, width: 200, height: 30, isStatic: true },

                // obstacles
                { type: "block", name: "box", x: 320, y: 375, width: 50, height: 50 },
                { type: "block", name: "box", x: 620, y: 375, width: 50, height: 50 },
                { type: "block", name: "box", x: 520, y: 375, width: 50, height: 50 },

                // code
                { type: "code", name: "code", x: 400, y: 290, width: 45, height: 30, isStatic: true, dead: false, score: 10 },
                { type: "code", name: "code", x: 400, y: 550, width: 45, height: 30, isStatic: true, dead: false, score: 10 },
                { type: "code", name: "code", x: 500, y: 390, width: 45, height: 30, isStatic: true, dead: false, score: 10 },

                // hero
                { type: "hero", name: "ninja", x: 150, y: 410 },
                { type: "hero", name: "badninja", x: 550, y: 410 },



            ]
        }
];