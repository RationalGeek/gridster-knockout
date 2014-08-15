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
            {row:'1',col:'1',sizex:'2',sizey:'3'},
            {row:'1',col:'3',sizex:'2',sizey:'3'},
            {row:'4',col:'1',sizex:'2',sizey:'3'},
            {row:'4',col:'3',sizex:'2',sizey:'3'},
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
            sizex: ko.observable('2'),
            sizey: ko.observable('3'),
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
            sizex: ko.observable('4'),
            sizey: ko.observable('4'),
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

    it('should add widgetId if not present in model');
    it('should not dupe widgetId if already used in model');
    it('should not overwrite widgetId if already provided by model');

    it('should work with observables');
    it('should work with non-observables');

    it('should still fire custom resize events');
    it('should still fire custom drag events');
});