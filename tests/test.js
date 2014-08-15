// http://stackoverflow.com/questions/13281561/using-mocha-phantomjs-to-automate-functional-testing

describe("DOM Test", function () {
    var el = document.createElement("div");
    el.id = "myDiv";
    el.innerHTML = "Hello World!";
    document.body.appendChild(el);
    var myEl = document.getElementById('myDiv');

    it("can add a DIV", function () {
        (myEl.innerHTML).should.equal("Hello World!");
    });
});

describe("gridster-knockout", function () {
    it("custom binding present", function () {
        ko.bindingHandlers.gridster.should.exist; 
    });
});