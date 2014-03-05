	var win = Ti.UI.createWindow({
	});

	var topView = Ti.UI.createView({
		top: 20,
		// borderRadius: 10,
		backgroundColor: "#022d5a",
		height: '40dp',
		width: 'auto'
	});


	
	var councilRoster = Ti.UI.createLabel({
		top: '5dp',
		right: '75dp',
		text: "Guild Roster:",
		color: "#fff",
		font: {fontSize: 24, fontFamily: "Helvetica", fontStyle: 'bold', textAlign: 'center'}
	});
	topView.add(backView, councilRoster);

    var characterScroll = Ti.UI.createScrollView({
		layout: 'vertical',
		height: '530dp',
		width: 320,
	    top: 40,
	    showVerticalScrollIndicator:true
	});

	wowListTemplate = {
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
			// {
				// type: "Ti.UI.Label",
				// bindId: 'role',
				// properties:
				// {
					// color: "grey",
					// font: {fontSize: 14, fontFamily: "Arial"},
					// right: 10,
					// top: 40
				// }
			// },
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
	var secList = Ti.UI.createListSection({
	});
	var apiListView = Ti.UI.createListView({	
	//	search: search,
		top:20,
		// height: '500dp',
		templates:{'defaultTemplate': wowListTemplate},
		defaultItemTemplate: 'defaultTemplate'
		});
		

	apiListView.sections = [secList];
	characterScroll.add(apiListView);
	win.add(topView, characterScroll);
	win.open();