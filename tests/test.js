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

    it("should load the custom binding", function () {
        ko.bindingHandlers.gridster.should.exist; 
    });

    it("should initialize the grid", function () {
        $('.gridster>ul>li').length.should.equal(4);
    });

    it('adds to view model appear in grid', function() {
        var currCount = $('.gridster>ul>li').length;

        var item = {
            row: ko.observable('10'),
            col: ko.observable('10'),
            size_x: ko.observable('2'),
            size_y: ko.observable('3'),
        };
        mappedViewModel.gridItems.push(item);

        $('.gridster>ul>li').length.should.equal(currCount + 1);
    });

    it('removes from view model appear in grid', function(done) {
        var currCount = $('.gridster>ul>li').length;
        mappedViewModel.gridItems.pop();
        
        setTimeout(function () {
            // Remove from grid is async so we have to give it a chance to reflect
            $('.gridster>ul>li').length.should.equal(currCount - 1);
            done();
        }, 900); // HACK: Ew!
    });

    // TODO: Currently not supported
    it.skip('adds to grid are reflected in view model', function() {
        var currCount = mappedViewModel.gridItems().length;
        gridster.add_widget('<li>Added by test</li>',2,3);
        mappedViewModel.gridItems().length.should.equal(currCount + 1);
    });

    // TODO: Currently not supported
    it.skip('removes from grid are reflected in view model', function(done) {
        var item = {
            row: ko.observable('10'),
            col: ko.observable('10'),
            size_x: ko.observable('4'),
            size_y: ko.observable('4'),
        };
        mappedViewModel.gridItems.push(item);
        var currCount = mappedViewModel.gridItems().length;
        item.widgetId().should.exist;
        var widgetId = item.widgetId();

        // Find the grid element with that ID, and remove it
        var element = $('.gridster li[data-widgetId="' + widgetId + '"]');
        gridster.remove_widget(element.get(0));
        
        setTimeout(function () {
            // Remove from grid is async so we have to give it a chance to reflect
            mappedViewModel.gridItems().length.should.equal(currCount - 1);
            done();
        }, 900); // HACK: Ew!
    });

    it('resizes in grid are reflected in view model');
    it('resizes in view model are reflected in grid');
    it('moves in grid are reflected in view model');
    it('moves in view model are reflected in grid');

    it('child bindings execute');
    it('child bindings update');
});