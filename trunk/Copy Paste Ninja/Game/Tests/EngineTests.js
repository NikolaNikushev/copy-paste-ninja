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
        describe("getPlayer",function() {
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
                it("will stop on key release",function() {
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
    })
})