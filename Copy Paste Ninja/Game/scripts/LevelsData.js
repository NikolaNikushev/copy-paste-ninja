var levelsData = [

        { // First level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: [
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
            ]
        },

        { // Second level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 180, y: 390, width: 40, height: 80, isStatic: true },
                { type: "block", name: "wood", x: 820, y: 375, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 720, y: 375, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 620, y: 375, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 670, y: 310, width: 100, height: 25 },
                { type: "block", name: "glass", x: 770, y: 310, width: 100, height: 25 },
                { type: "block", name: "glass", x: 670, y: 248, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 770, y: 248, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 720, y: 180, width: 100, height: 25 },
                { type: "villain", name: "burger", x: 715, y: 160, calories: 590 },
                { type: "villain", name: "fries", x: 670, y: 400, calories: 420 },
                { type: "villain", name: "sodacan", x: 765, y: 395, calories: 150 },
                { type: "hero", name: "strawberry", x: 40, y: 420 },
                { type: "hero", name: "orange", x: 90, y: 410 },
                { type: "hero", name: "apple", x: 150, y: 410 },
            ]
        }
];