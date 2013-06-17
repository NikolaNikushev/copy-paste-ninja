describe("Score", function () {

    it("should be zero", function () {
        var textSplit = document.getElementById('score').innerHTML.split(":");

        var result = parseInt(textSplit[1]);
        expect(result).toEqual(0);
    });
});

describe("Loader", function () {
    describe("loading", function () {
        it("should be complete", function () {
       
            var loaded = loader.loaded;
            expect(loaded).toBeTruthy();
        });
        it("should have 15 items loaded", function () {
            var items = loader.loadedCount;
            expect(items).toBe(15);
        });
        it("should have loaded a mp3 or ogg extension",function() {
            var soundFile = loader.soundFileExtn;
            expect(soundFile).toBeDefined();
            if (soundFile === ".ogg") {
          
                expect(soundFile).toBe(".ogg");
            }
            else {
                expect(soundFile).toBe(".mp3");
            }
        })
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

describe("gameengine", function () {
    it("tests for creating an engine", function () {
        var newEngine = engine;
        expect(newEngine).toBeDefined();
    })
    describe("tests for:", function () {
        describe("getScore", function () {
            it("should be 0", function () {
                var score = engine.getScore();
                expect(score).toBe(0);
            })

        })

        describe("getOffsetLeft", function () {
            it("should be 0", function () {
                var offset = engine.getOffsetLeft()
                expect(offset).toBe(0);
            })
        })

        describe("getLevelNumber", function () {
            it("should be 0", function () {
                var level = engine.getLevelNumber()
                expect(level).toBe(0);
            })


        })
        describe("getPlayer", function () {
            it("should return the player", function () {

                var player = engine.getPlayer();

                expect(player.data.name).toBe("ninja");
                expect(player.data.type).toBe("hero");
                expect(player.data.villain).toBeFalsy();
            })
        })
        describe("updateInput", function () {

            it("should have been called", function () {
                spyOn(engine, 'updateInput').toHaveBeenCalled;
            })
            describe("moving left", function () {
                it("change the player moveLeft to true", function () {
                    var player = engine.getPlayer();
                    player.moveLeft = false;
                    keyboard.keyDownHandler({ which: 65 });
                    var action = player.moveLeft;

                    expect(action).toBeTruthy();
                })
                it("will stop on key release", function () {
                    var player = engine.getPlayer();
                    var action = player.moveLeft;
                    expect(action).toBeTruthy();

                    keyboard.keyUpHandler({ which: 65 });
                    action = player.moveLeft;
                    expect(action).toBeFalsy();
                })
            })

            describe("using powerup", function () {
                it("will change usePowerUp to true", function () {
                    var player = engine.getPlayer();
                    player.usePowerUp = false;
                    keyboard.keyDownHandler({ which: 16 });
                    var action = player.usePowerUp;

                    expect(action).toBeTruthy();
                })
                it("will stop on key release", function () {
                    var player = engine.getPlayer();
                    var action = player.usePowerUp;
                    expect(action).toBeTruthy();

                    keyboard.keyUpHandler({ which: 16 });
                    action = player.usePowerUp;
                    expect(action).toBeFalsy();
                })
            })

            describe("moving right", function () {
                it("will move right", function () {
                    var player = engine.getPlayer();
                    player.moveRight = false;
                    keyboard.keyDownHandler({ which: 68 });
                    var action = player.moveRight;

                    expect(action).toBeTruthy();
                })
                it("will stop on key release", function () {
                    var player = engine.getPlayer();
                    var action = player.moveRight;
                    expect(action).toBeTruthy();

                    keyboard.keyUpHandler({ which: 68 });
                    action = player.moveRight;
                    expect(action).toBeFalsy();
                })
            })

            describe("jumping", function () {
                it("will jump", function () {
                    var player = engine.getPlayer();
                    player.jump = false;
                    keyboard.keyDownHandler({ which: 87 });
                    var action = player.jump;

                    expect(action).toBeTruthy();
                })
                it("will stop on key release", function () {
                    var player = engine.getPlayer();
                    var action = player.jump;
                    expect(action).toBeTruthy();

                    keyboard.keyUpHandler({ which: 87 });
                    action = player.jump;
                    expect(action).toBeFalsy();
                })
            })
        })
        describe("newGame", function () {
            it("level should be 0", function () {
                var restart = engine.newGame(0);
                var level = engine.getLevelNumber();
                expect(level).toBe(0);
            })
            it("should be called", function () {
                var level = engine.getLevelNumber();
                spyOn(engine, 'newGame').toHaveBeenCalled;
            })

        })
    })
})
describe("Keyboard", function () {
    describe("tests for start of:", function () {
        beforeEach(function() {
            keyboard.jump = false;
            keyboard.moveLeft = false;
            keyboard.moveRight = false;
            keyboard.usePowerUp = false;
        })
        it("init", function () {
            var action = keyboard.init;
            expect(action).toBeDefined();
        })
        it("keyDownHandler", function () {
            var action = keyboard.keyDownHandler;
            expect(action).toBeDefined();
        })
        it("keyUpHandler", function () {
            var action = keyboard.keyUpHandler;
            expect(action).toBeDefined();
        })
        it("validKey", function () {
            var action = keyboard.validKey;
            expect(action).toBeFalsy();
        })
        it("jump", function () {
            var action = keyboard.jump;
            expect(action).toBeFalsy();
        })

        it("moveLeft", function () {
            var action = keyboard.moveLeft;
            expect(action).toBeFalsy();
        })
        it("moveRight", function () {
            var action = keyboard.moveRight;
            expect(action).toBeFalsy();
        })
        it("usePowerUp", function () {
            var action = keyboard.usePowerUp;
            expect(action).toBeFalsy();
        })
    })
    describe("Tests for key ", function () {
        beforeEach(function() {
            keyboard.moveLeft = false;
            keyboard.moveRight = false;
            keyboard.jump = false;
            keyboard.usePowerUp = false;
        })

        describe("press A", function () {
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyDownHandler({ which: 65 });
            })
            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp;
                expect(action).toBeTruthy();
            })
            it("will move left", function () {
                var action = keyboard.moveLeft;
                expect(action).toBeTruthy();
            })
        })

        describe("press SHIFT", function () {

            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyDownHandler({ which: 16 });
            })
            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp
                expect(action).toBeTruthy();
            })
            it("will use power up", function () {
                var action = keyboard.usePowerUp;
                expect(action).toBeTruthy();
            })
        })

        describe("press D", function () {
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyDownHandler({ which: 68 });
            })
            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp
                expect(action).toBeTruthy();
            })
            it("will move right", function () {
                var action = keyboard.moveRight;
                expect(action).toBeTruthy();
            })
        })

        describe("press W", function () {
           
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyDownHandler({ which: 87 });
            })
            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp;
                expect(action).toBeTruthy();
            })
            it("will jump", function () {
                var action = keyboard.jump;
                expect(action).toBeTruthy();
            })
        })
        describe("release A", function () {
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyUpHandler({ which: 65 });
            })

            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp
                expect(action).toBeFalsy();
            })
            it("will stop moving left", function () {

                var action = keyboard.moveLeft;
                expect(action).toBeFalsy();
            })
        })

        describe("release SHIFT", function () {
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyUpHandler({ which: 16 });
            })
            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp;
                expect(action).toBeFalsy();
            })
            it("will not use power up", function () {
                var action = keyboard.usePowerUp;
                expect(action).toBeFalsy();
            })
        })

        describe("release D", function () {
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyUpHandler({ which: 68 });
            })

            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp;
                expect(action).toBeFalsy();
            })
            it("will stop moving right", function () {
                var action = keyboard.moveRight;
                expect(action).toBeFalsy();
            })
        })

        describe("release W", function () {
            beforeEach(function () {
                keyboard.moveLeft = false;
                keyboard.moveRight = false;
                keyboard.jump = false;
                keyboard.usePowerUp = false;
                keyboard.keyUpHandler({ which: 87 });
            })

            it("will get a valid command", function () {
                var action = keyboard.moveLeft || keyboard.moveRight || keyboard.jump || keyboard.usePowerUp;
                expect(action).toBeFalsy();
            })
            it("will stop jump", function () {
                var action = keyboard.jump;
                expect(action).toBeFalsy();
            })
        })
    })
})
describe("Hero", function () {
    describe("hero.create", function () {
        it("creates a hero", function () {
            var entity = {
                name: "ninja",
                type: "hero"
            }
            var newhero = hero.create(entity);
            expect(newhero.data.name).toBe("ninja");
            expect(newhero.data.villain).toBeFalsy();
            expect(newhero.data.type).toBe("hero");
        });
        describe("creates a villan", function () {
            it("nakov", function () {
                var entity = {
                    name: "nakov",
                    type: "hero"
                }
                var newhero = hero.create(entity);
                expect(newhero.data.name).toBe("nakov");
                expect(newhero.data.villain).toBeTruthy();
                expect(newhero.data.type).toBe("hero");
                expect(newhero.moveRight).toBeTruthy();
            });
            it("niki", function () {
                var entity = {
                    name: "niki",
                    type: "hero"
                }
                var newhero = hero.create(entity);
                expect(newhero.data.name).toBe("niki");
                expect(newhero.data.villain).toBeTruthy();
                expect(newhero.data.type).toBe("hero");
                expect(newhero.moveRight).toBeTruthy();
            });

            it("doncho", function () {
                var entity = {
                    name: "doncho",
                    type: "hero"
                }
                var newhero = hero.create(entity);
                expect(newhero.data.name).toBe("doncho");
                expect(newhero.data.villain).toBeTruthy();
                expect(newhero.data.type).toBe("hero");
                expect(newhero.moveRight).toBeTruthy();

            });
            it("that does not exist", function () {
                var entity = {
                    name: "Stefan"
                }
                var thrown = false;
                var thrownMessage = "";
                try {
                    hero.create(entity);
                } catch (e) {
                    thrown = true
                    thrownMessage = e;

                }
                expect(thrown).toBeTruthy();
                expect(thrownMessage).toBe("There is no such hero");
            });

            it("that does not have a name", function () {
                var entity = {
                }
                var thrown = false;
                var thrownMessage = "";
                try {
                    var newHero = hero.create(entity);
                } catch (e) {
                    thrown = true
                    thrownMessage = e;

                }
                expect(thrown).toBeTruthy();
                expect(thrownMessage).toBe("There is no such hero");
            });
        });
        describe("hero.getPosX", function () {
            it("gets the current hero(player) position starting is 50", function () {
                var player = engine.getPlayer();
                var playerX = player.getPosX();
                expect(playerX).toBe(50);
            });
        });
    });
    
})
describe("LevelsData",function myfunction() {
    describe("Entities", function () {
        it("throws error when invalid entitie name is created", function () {
            var entity = {
                name: "ninja",
                type: "heroMiro"
            }
            var thrown = false;
            var thrownMessage = "";
            try {
                entities.create(entity);
            } catch (e) {
                thrown = true;
                thrownMessage = e;
            }
            expect(thrown).toBeTruthy();
            var expectedMessage =  "Undefined entity name " + entity.name;
            expect(thrownMessage).toBe(expectedMessage);
          
        })
        it("throws error when invalid entitie type is created", function () {
            var entity = {
                name: "dirt",
                type: "Banana"
            }
            var thrown = false;
            var thrownMessage = "";
            try {
                entities.create(entity);
            } catch (e) {
                thrown = true;
                thrownMessage = e;
            }
            expect(thrown).toBeTruthy();
            var expectedMessage = "Undefined entity type " + entity.type;
            expect(thrownMessage).toBe(expectedMessage);

        })
        it("throws error when invalid entitie is created", function () {
            var entity = {
                name: "ninjacat",
                hero: "plant"
            }
            var thrown = false;
            var thrownMessage = "";
            try {
                entities.create(entity);
            } catch (e) {
                thrown = true;
                thrownMessage = e;
            }
            expect(thrown).toBeTruthy();
            var expectedMessage = "Undefined entity name " + entity.name;
            expect(thrownMessage).toBe(expectedMessage);

        })
       
        describe("creates",function() {
            it("code", function () {
                var entity = {
                    name: "code",
                    score: 10,
                    dead:true,
                    type: "code"
                };
                var body = entities.create(entity);
                var codeInfo = body.GetUserData();
                expect(codeInfo.name).toBe("code");
                expect(codeInfo.type).toBe("code");
                expect(codeInfo.score).toBe(10);
                expect(codeInfo.dead).toBeTruthy();
                expect(codeInfo.shape).toBe("rectangle");
                var picture = codeInfo.sprite.outerHTML.split("=")[1];
                expect(picture).toBe("\"images/entities/code.png\">");
               
            });
            it("ground", function () {
                var entity = {
                    name: "dirt",
                    score: 10,
                    dead: true,
                    type: "ground"
                };
                var body = entities.create(entity);
                var codeInfo = body.GetUserData();
                expect(codeInfo.name).toBe("dirt");
                expect(codeInfo.type).toBe("ground");
                expect(codeInfo.fullHealth).toBeUndefined();
                expect(codeInfo.health).toBeUndefined();
                expect(codeInfo.shape).toBe("rectangle");

            });
            it("platform", function () {
                var entity = {
                    name: "platform",
                    type: "block"
                };
                var body = entities.create(entity);
                var codeInfo = body.GetUserData();
                expect(codeInfo.name).toBe("platform");
                expect(codeInfo.type).toBe("block");
                expect(codeInfo.fullHealth).toBeUndefined();
                expect(codeInfo.health).toBeUndefined();
                expect(codeInfo.shape).toBe("rectangle");
                var picture = codeInfo.sprite.outerHTML.split("=")[1];
                expect(picture).toBe("\"images/entities/platform.png\">");

            });
        }); 
     });
 });