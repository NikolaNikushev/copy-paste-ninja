describe("Score", function () {

    it("should be zero", function () {
        var textSplit = document.getElementById('score').innerHTML.split(":");

        var result = parseInt(textSplit[1]);
        expect(result).toEqual(0);
    });
});
describe("Loading", function () {

    it("should be compplete", function () {
        var textSplit = document.getElementById('loadingmessage').innerHTML.split(" ");
        console.log(textSplit);
        var result = parseInt(textSplit[1]);
        var expected = parseInt(textSplit[3]);
        expect(result).toEqual(expected);
    });
});
