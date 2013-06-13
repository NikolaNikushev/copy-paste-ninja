describe("Player", function () {
    var result = 5;
    console.log(result); //5
    result = parseInt(document.getElementById("result").innerHTML);
    console.log(result); //3 it takes it from tests.html
    var answer = result === 3;
    console.log(answer); // --> true
    expect(answer).toBeTruthy; // answer --> null??
   
    it("should test", function () {
        console.log("test"); // It doesn't Start
    });
});