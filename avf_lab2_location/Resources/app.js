// //require api info
// var geo = require('geo_api');

//create window
var win = Ti.UI.createWindow({
	
});

    var characterScroll = Ti.UI.createScrollView({
		layout: 'vertical',
		height: '530dp',
		width: 320,
	    top: 40,
	    showVerticalScrollIndicator:true
	});

	nytimesListTemplate = {
		properties:
			{
			top: 20,
			height: 74	
			},
		childTemplates:
		[
			{
				type: "Ti.UI.ImageView",
				bindId: 'thumbnail',
				properties:
				{
					width: 74,
					height: 74,
					left: 0,
					top:0
				}
			},
			{
				type: "Ti.UI.Label",
				bindId: 'name',
				properties:
				{
					color: "black",
					font: {fontSize: 18, fontFamily: "Arial", fontWeight: "bold"},
					left: 85,
					top: 5
				}
			},
			{
				type: "Ti.UI.Label",
				bindId: 'race',
				properties:
				{
					color: "grey",
					font: {fontSize: 14, fontFamily: "Arial"},
					left: 85,
					top: 40
				}
			},
			{
				type: "Ti.UI.Label",
				bindId: 'division',
				properties:
				{
					color: "black",
					font: {fontSize: 14, fontFamily: "Arial"},
					left: 200,
					top: 40
				},
			},
			{
				type: "Ti.UI.Label",
				bindId: 'level',
				properties:
				{
					color: "grey",
					font: {fontSize: 14, fontFamily: "Arial"},
					right: 10,
					top: 10
				}
			}	
		]
	};
	
	//API Object Info
	var timesList = Ti.UI.createListSection({
	});
	var timesListView = Ti.UI.createListView({	
	//	search: search,
		top:20,
		// height: '500dp',
		templates:{'defaultTemplate': nytimesListTemplate},
		defaultItemTemplate: 'defaultTemplate'
		});


//Main Code
win.open();