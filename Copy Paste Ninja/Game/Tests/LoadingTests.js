describe("Loader", function () {
    describe("loading", function () {
        it("should have loaded a mp3 or ogg extension", function () {
            gameControler.startGame(0);
            var soundFile = loader.soundFileExtn;
            expect(soundFile).toBeDefined();
            if (soundFile === ".ogg") {

                expect(soundFile).toBe(".ogg");
            }
            else {
                expect(soundFile).toBe(".mp3");
            }
        })
       
        it("should be complete", function () {
            var loaded = loader.loaded;
            expect(loaded).toBeTruthy();
        });
        it("should have 15 items loaded", function () {
            var items = loader.loadedCount;
            expect(items).toBe(15);
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
            var imageLoaded = loader.loadImage("images/icons/level.png").outerHTML;
            var imageExpected = "<img src=\"images/icons/level.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/moregames.png").outerHTML;
            imageExpected = "<img src=\"images/icons/moregames.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/next.png").outerHTML;
            imageExpected = "<img src=\"images/icons/next.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/nosound.png").outerHTML;
            imageExpected = "<img src=\"images/icons/nosound.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/pause.png").outerHTML;
            imageExpected = "<img src=\"images/icons/pause.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/play.png").outerHTML;
            imageExpected = "<img src=\"images/icons/play.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/playgame.png").outerHTML;
            imageExpected = "<img src=\"images/icons/playgame.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/playmusic.png").outerHTML;
            imageExpected = "<img src=\"images/icons/playmusic.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/prev.png").outerHTML;
            imageExpected = "<img src=\"images/icons/prev.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/return.png").outerHTML;
            imageExpected = "<img src=\"images/icons/return.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/settings.png").outerHTML;
            imageExpected = "<img src=\"images/icons/settings.png\">";
            expect(imageLoaded).toBeDefined();
            expect(imageLoaded).toBe(imageExpected);

            imageLoaded = loader.loadImage("images/icons/sound.png").outerHTML;
            imageExpected = "<img src=\"images/icons/sound.png\">";
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
