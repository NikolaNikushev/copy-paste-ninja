describe("Loader", function () {
    describe("loading", function () {
        it("should have loaded a mp3 or ogg extension", function () {
            var soundFile = loader.soundFileExtn;
            expect(soundFile).toBeDefined();
            if (soundFile === ".ogg") {

                expect(soundFile).toBe(".ogg");
            }
            else {
                expect(soundFile).toBe(".mp3");
            }
        })
        it("should have 15 items loaded", function () {
            var items = loader.loadedCount;
            expect(items).toBe(15);
        });
        it("should be complete", function () {
            var loaded = loader.loaded;
            expect(loaded).toBeTruthy();
        });
       
    })
    describe("loadImage loads", function () {
        it("ninja", function () {
            var imageLoaded = loader.loadImage("images/ninja.png").outerHTML;
            var imageExpected = "<img src=\"images/ninja.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("splashscreen", function () {
            var imageLoaded = loader.loadImage("images/splashscreen.png").outerHTML;
            var imageExpected = "<img src=\"images/splashscreen.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("loader", function () {
            var imageLoaded = loader.loadImage("images/loader.gif").outerHTML;
            var imageExpected = "<img src=\"images/loader.gif\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("splashscreen", function () {
            var imageLoaded = loader.loadImage("images/splashscreen.png").outerHTML;
            var imageExpected = "<img src=\"images/splashscreen.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("nakov", function () {
            var imageLoaded = loader.loadImage("images/nakov.png").outerHTML;
            var imageExpected = "<img src=\"images/nakov.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("niki", function () {
            var imageLoaded = loader.loadImage("images/niki.png").outerHTML;
            var imageExpected = "<img src=\"images/niki.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("bad-guys", function () {
            var imageLoaded = loader.loadImage("images/bad-guys.png").outerHTML;
            var imageExpected = "<img src=\"images/bad-guys.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("badninja", function () {
            var imageLoaded = loader.loadImage("images/badninja.png").outerHTML;
            var imageExpected = "<img src=\"images/badninja.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("all icons", function () {
            var imageLoaded = loader.loadImage("images/badninja.png").outerHTML;
            var imageExpected = "<img src=\"images/badninja.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("all entities", function () {
            var imageLoaded = loader.loadImage("images/entities/box.png").outerHTML;
            var imageExpected = "<img src=\"images/entities/box.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/entities/code.png").outerHTML;
            imageExpected = "<img src=\"images/entities/code.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/entities/nakov.png").outerHTML;
            imageExpected = "<img src=\"images/entities/nakov.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/entities/platform.png").outerHTML;
            imageExpected = "<img src=\"images/entities/platform.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })
        it("all backgrounds", function () {
            var imageLoaded = loader.loadImage("images/backgrounds/clouds-background.png").outerHTML;
            var imageExpected = "<img src=\"images/backgrounds/clouds-background.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/backgrounds/columns-foreground.png").outerHTML;
            imageExpected = "<img src=\"images/backgrounds/columns-foreground.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/backgrounds/desert-foreground.png").outerHTML;
            imageExpected = "<img src=\"images/backgrounds/desert-foreground.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/backgrounds/hall-background.png").outerHTML;
            imageExpected = "<img src=\"images/backgrounds/hall-background.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);
        })

    })
});
