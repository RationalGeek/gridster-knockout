// http://stackoverflow.com/questions/13281561/using-mocha-phantomjs-to-automate-functional-testing

/*
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
*/

describe("gridster-knockout", function () {
    var gridster = $(".gridster>ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [25, 25],
        resize: {
            enabled: true,
        },
    }).data('gridster');

    var viewModel = {
        gridItems: [
            {row:'1',col:'1',size_x:'2',size_y:'3'},
            {row:'1',col:'3',size_x:'2',size_y:'3'},
            {row:'4',col:'1',size_x:'2',size_y:'3'},
            {row:'4',col:'3',size_x:'2',size_y:'3'},
        ],
    };
             
    var mappedViewModel = ko.mapping.fromJS(viewModel);
    ko.applyBindings(mappedViewModel);

    it("custom binding present", function () {
        ko.bindingHandlers.gridster.should.exist; 
    });

    it("gridster initialized", function () {
        $('.gridster>ul>li').length.should.equal(4);
    });
});