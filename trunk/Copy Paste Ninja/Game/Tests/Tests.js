describe("Score", function () {

    it("should be zero", function () {
        var textSplit = document.getElementById('score').innerHTML.split(":");

        var result = parseInt(textSplit[1]);
        expect(result).toEqual(0);
    });
});

//describe("Loading", function () {

//    it("should be compplete", function () {
//        console.log(document.getElementById("loadingscreen").innerHTML.toString());
//        var textSplit = document.getElementById('loadingscreen').innerHTML.split(" ");
//        console.log(textSplit);
//        var result = parseInt(textSplit[1]);
//        var expected = parseInt(textSplit[3]);
//        expect(result).toEqual(expected);
//    });
//});

describe("gameengine", function () {
    it("tests for creating an engine", function() {
        var newEngine = engine;
        expect(newEngine).toBeDefined();
    })
    describe("tests for:", function () {
        describe("getScore", function () {
            it("should be 0",function () {
                var score = engine.getScore();
                expect(score).toBe(0);
            })
           
        })
       
        describe("getOffsetLeft", function () {
            it("should be 0",function () {
                var offset = engine.getOffsetLeft()
                expect(offset).toBe(0);
            })
        })
       
        describe("getLevelNumber", function () {
            it("should be 0",function () {
                var level = engine.getLevelNumber()
                expect(level).toBe(0);
            })
        })
       
        describe("newGame", function () {
            it("level should be 0",function () {
                var restart = engine.newGame(0);
                var level = engine.getLevelNumber();
                expect(level).toBe(0);
            })
            it("should be called", function () {
                var level = engine.getLevelNumber();
                spyOn(engine, 'newGame').toHaveBeenCalled;
            })
           
        })
       
        describe("updateInput", function () {
            it("should be called", function () {
                spyOn(engine, 'updateInput').toHaveBeenCalled;
            })
           
        })
       
    })

})

describe("Keyboard", function () {
    describe("tests for start of:", function() {
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
                console.log(keyboard.jump);
                var action = keyboard.jump;
                expect(action).toBeFalsy();
            })
        })
    })
})
describe("LevelsData",function myfunction() {
    describe("Entities", function () {
        it("creates a hero", function () {
            var entity = {
                name: "ninja"
            }
            var newhero = hero.create(entity);
            expect(newhero.data.name).toBe("ninja");
            expect(newhero.data.type).toBe("hero");
        });
        describe("creates a villan", function () {
            it("nakov", function () {
                var entity = {
                    name: "nakov"
                }
                var newhero = hero.create(entity);
                expect(newhero.data.name).toBe("nakov");
                expect(newhero.data.type).toBe("hero");
                expect(newhero.moveRight).toBeTruthy();
            });
            it("nakov", function () {
                var entity = {
                    name: "niki"
                }
                var newhero = hero.create(entity);
                expect(newhero.data.name).toBe("niki");
                expect(newhero.data.type).toBe("hero");
                expect(newhero.moveRight).toBeTruthy();
            });

            it("nakov", function () {
                var entity = {
                    name: "doncho"
                }
                var newhero = hero.create(entity);
                expect(newhero.data.name).toBe("doncho");
                expect(newhero.data.type).toBe("hero");
                expect(newhero.moveRight).toBeTruthy();

            });
            //it("that does not exist", function () {
            //    var entity = {
            //        name: "Stefan"
            //    }
            //    expect(hero.create(entity)).toThrow(new Error("There is no such hero"));

            //});
        });
        describe("creates",function() {
            it("code", function () {
                var entity = {
                    name: "code",
                    shape: "rectangle",
                    isStatic: true,
                    dead: false, 
                    score: 10,
                    sprite: loader.loadImage("images/entities/" + entity.name + ".png"),
                    type: "code"
                };
                console.log(entities.createRectangle());
                 
                console.log(entities.createRectangle(entity, "code"));
                var code = entities.createRectangle(entity, "code");
               
                console.log(code.GetUserData());
                expect(code.name).toBe("code");
                expect(code.type).toBe("code");
               
            });
        });
     });
 });