
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
