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
        //Needs KeyboardEvent to be simulated, as if the given key is pressed
        var event = Object.create(KeyboardEvent);
        var ev = jQuery.Event("keydown");
        $(".selector").trigger(ev);

        describe("press A", function () {

            ev.keycode = 65;
            ev.type = "keydown";
            ev.which = 65;
            it("will get a valid command", function () {
              
                keyboard.keyDownHandler(event);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will move left", function () {
                var action = keyboard.keyDownHandler(event);
                expect(keyboard.moveLeft).toBeTruthy();
            })
        })

        describe("press SHIFT", function () {

            ev.keycode = 16;
            ev.type = "keydown";
            ev.which = 16;

            it("will get a valid command", function () {
                var action = keyboard.keyDownHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will use power up", function () {
                var action = keyboard.keyDownHandler(ev);
                expect(keyboard.usePowerUp).toBeTruthy();
            })
        })

        describe("press D", function () {

            ev.keycode = 68;
            ev.type = "keydown";
            ev.which = 68;

            it("will get a valid command", function () {
                var action = keyboard.keyDownHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will move right", function () {
                var action = keyboard.keyDownHandler(ev);
                expect(keyboard.moveRight).toBeTruthy();
            })
        })

        describe("press W", function () {

            ev.keycode = 87;
            ev.type = "keydown";
            ev.which = 87;

            it("will get a valid command", function () {
                var action = keyboard.keyDownHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will jump", function () {
                var action = keyboard.keyDownHandler(ev);
                expect(keyboard.jump).toBeTruthy();
            })
        })
        describe("release A", function () {

            ev.keycode = 65;
            ev.type = "keyup";
            ev.which = 65;

            it("will get a valid command", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will stop moving left", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.moveLeft).toBeFalsy();
            })
        })

        describe("release SHIFT", function () {

            ev.keycode = 16;
            ev.type = "keyup";
            ev.which = 16;

            it("will get a valid command", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will not use power up", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.usePowerUp).toBeFalsy();
            })
        })

        describe("release D", function () {

            ev.keycode = 68;
            ev.type = "keyup";
            ev.which = 68;

            it("will get a valid command", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will stop moving right", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.moveRight).toBeFalsy();
            })
        })

        describe("release W", function () {

            ev.keycode = 87;
            ev.type = "keyup";
            ev.which = 87;

            it("will get a valid command", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.validKey).toBeTruthy();
            })
            it("will stop jump", function () {
                var action = keyboard.keyUpHandler(ev);
                expect(keyboard.jump).toBeFalsy();
            })
        })
    })
})