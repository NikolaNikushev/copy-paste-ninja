describe("LevelsData",function myfunction() {
    describe("Entities", function () {
        it("throws error when invalid entitie name is created", function () {
            gameControler.startGame(0);
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