//requiring JS files
var geo = require('geo_api_data');
var sav = require('sav');

//Create Window
var mainWin = Ti.UI.createWindow({
	title : "Main Window"
});

//view start
var titleView = Ti.UI.createView({
	borderRadius : '5%',
	center : '0%',
	height : '40%',
	width : '60%',
	backgroundColor : '#fff'
});

var titleLabel = Ti.UI.createLabel({
	text : "NYTIMES GEO",
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	}
});

var enterBTN = Ti.UI.createButton({
	title : 'ENTER',
	bottom : '10%',
	center : '0%',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 22
	}
});

enterBTN.addEventListener('click', function() {

	// created tab group
	var theTabs = Ti.UI.createTabGroup();
	
	// created favorite tab
	var mTab = Ti.UI.createTab({
		title : 'Pictures',
		window : geo.mapWin
	});

	// created favorite tab
	var savTab = Ti.UI.createTab({
		title : 'Stored',
		window : sav.favWin
	});
	
	//Tabs Main Code
	theTabs.addTab(mTab);
	theTabs.addTab(savTab);
	theTabs.open();
});
titleView.add(titleLabel, enterBTN);
//view end

//Window Main Code
mainWin.add(titleView);
mainWin.open();
