/*!
 * gridster-knockout v0.0.1
 * (c) Justin Kohlhepp - 
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

ko.bindingHandlers.gridster = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var gridster = $(element).data('gridster');
		var itemsArray = valueAccessor().items;
		var templateName = ko.unwrap(valueAccessor().templateName);
		var templateContents = $('#'+templateName).html();
		var idCounter = 1;

		var addWidget = function(widget) {
			var col = (widget.col !== undefined) ? parseInt(widget.col()) : null;
			var row = (widget.row !== undefined) ? parseInt(widget.row()) : null;
			var size_x = parseInt(widget.size_x());
			var size_y = parseInt(widget.size_y());
			var addedWidget = gridster.add_widget(templateContents,size_x,size_y,col,row);

			// Update the col and row based on it being added
			if (widget.col === undefined)
				widget.col = ko.observable(addedWidget.attr('data-col'));
			if (widget.row === undefined)
				widget.row = ko.observable(addedWidget.attr('data-row'));

			// Keep an id for each widget so we can keep our sanity
			if (widget.widgetId === undefined)
				widget.widgetId = ko.observable();
			widget.widgetId(idCounter++);
			addedWidget.attr('data-widgetId', widget.widgetId());

			// Keep track of the element that was created with the widget
			widget.gridsterElement = addedWidget.get(0);
			
			// http://knockoutjs.com/documentation/custom-bindings-controlling-descendant-bindings.html
			var childBindingContext = bindingContext.createChildContext(
				widget, 
				null, // Optionally, pass a string here as an alias for the data item in descendant contexts
				function(context) {
					ko.utils.extend(context, valueAccessor());
				});
			ko.applyBindingsToDescendants(childBindingContext, addedWidget.get(0));

			return addedWidget;
		};

		var getWidgetModelById = function(widgetId) {
			for (var i = 0; i < itemsArray().length; i++) {
				var item = itemsArray()[i];
				if (item.widgetId() == widgetId)
					return item;
			}
			return null;
		};

		for (var i = 0; i < itemsArray().length; i++) {
			item = itemsArray()[i];
			addWidget(item);
		}

		itemsArray.subscribe(function (changes) {
			changes.forEach(function (change) {
				switch(change.status) {
					case 'added':
						var addedWidget = addWidget(change.value);
						break;
					case 'deleted':
						gridster.remove_widget(change.value.gridsterElement);
						break;
					default:
						throw new Error('Unexpected change.status');
						break;
				}
			});
		}, null, "arrayChange");

		// Just in case the consumer set up their own resize handler, we need to chain the calls
		var oldOnResize = gridster.options.resize.stop;
		gridster.options.resize.stop = function(event, ui, $widget) {
			//alert('binding onresize');

			var widgetId = $widget.attr('data-widgetId');
			var newSizeX = $widget.attr('data-sizex');
			var newSizeY = $widget.attr('data-sizey');

			var widgetModel = getWidgetModelById(widgetId);
			widgetModel.size_x(newSizeX);
			widgetModel.size_y(newSizeY);

			if (oldOnResize !== undefined)
				oldOnResize(event, ui, $widget);
		};

		var oldOnMove = gridster.options.draggable.stop;
		gridster.options.draggable.stop = function(event, ui) {
			//alert('binding on move');

			// TODO: Figure out what widget moved, and to where

			if (oldOnMove !== undefined)
				oldOnMove(event, ui);
		};

		// We are controlling sub-bindings, so don't have KO do it
		return { controlsDescendantBindings: true };
	},

	//update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	//    alert('update called');
	//},
};