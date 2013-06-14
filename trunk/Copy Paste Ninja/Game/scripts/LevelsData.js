"use strict";
var levelsData = [

        { // First level
            foreground: 'columns-foreground',
            background: 'hall-background',
            entities: [
                // prevent hero moving out of the world
                { type: "ground", name: "dirt", x: 1280 / 2, y: 600 - 15, width: 1280, height: 30, isStatic: true },
                { type: "ground", name: "dirt", x: 1280 / 2, y: 15, width: 1280, height: 30, isStatic: true },
                { type: "ground", name: "dirt", x: 15, y: 600 / 2, width: 30, height: 600, isStatic: true },
                { type: "ground", name: "dirt", x: 1280 - 15, y: 600 / 2, width: 30, height: 600, isStatic: true },

                // platforms
                { type: "block", name: "platform", x: 300, y: 390, width: 200, height: 30, isStatic: true },
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
                //{ type: "hero", name: "badninja", x: 550, y: 410 },
                { type: "hero", name: "nakov", x: 650, y: 410, minLeft: 500, maxRight: 900 },
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