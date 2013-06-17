describe("Hero", function () {
    describe("hero.create", function () {

        it("creates a hero", function () {
            gameControler.startGame(0);
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
    });
})