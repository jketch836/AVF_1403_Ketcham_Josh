<<<<<<< HEAD
//requiring JS files
var map = require('RemoteData');
var see = require('search');

//Create Window
var mainWin = Ti.UI.createWindow({
	title : "Main Window",
	backgroundImage : "map.png"
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
	text : "Location, Location",
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	}
});

var enterBTN = Ti.UI.createButton({
	title : 'ENTER',
	bottom : '10%',
	center : '0%'
});

enterBTN.addEventListener('click', function() {
	
	// created tab group
	var theTabs = Ti.UI.createTabGroup();

	// created character tab
	var mapTab = Ti.UI.createTab({
		title : 'Map',
		window : map.mapWin
	});

	// created favorite tab
	var favTab = Ti.UI.createTab({
		title : 'Search',
		window : see.sWin
	});

	//Tabs Main Code
	theTabs.addTab(mapTab);
	theTabs.addTab(favTab);
	theTabs.open();
});

titleView.add(titleLabel, enterBTN);
//view end

//Window Main Code
mainWin.add(titleView);
mainWin.open(); 
=======
var mainWin = Ti.UI.createWindow({
	title: "Main Window",
	backgroundColor: "#535353"	,
	url: "RemoteData.js"
});

mainWin.open();
>>>>>>> FETCH_HEAD
