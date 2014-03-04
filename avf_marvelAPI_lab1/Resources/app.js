//requiring app.js
var api = require('marvel_api');

//Window Start
var win = Ti.UI.createWindow({
	title : 'Marvel Comics',
	backgroundColor : '#fff'
});
//Window End

//Window Start
var navWin = Ti.UI.iOS.createNavigationWindow({
	window : win
});
//Window End

//marvel logo picture start
var logo = Ti.UI.createImageView({
	top : '43dp',
	height : '100%',
	width : '100%',
	image : 'marvel-logo-wallpaper.jpg'
});
//marvel logo picture end

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var comicTable = Titanium.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 14
	},
	opacity : .9
});
//Table End

comicTable.addEventListener('click', function(a) {

	//calling vraibles from api start

	var name, issue, desc, isbn, price;

	name = a.rowData.name;
	issue = a.rowData.issue;
	desc = a.rowData.desc;
	page = a.rowData.page;
	// price = a.rowData.price;
	// thumbnail = a.rowData.thumbnail;

	//calling vraibles from api end

	//Window Start
	var evtWin = Ti.UI.createWindow({
		title : name,
		backgroundColor : '#fff',
		nav : navWin
	});
	//Window End

	//marvel logo picture start
	var evtLogo = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		image : 'marvel-logo-wallpaper.jpg',
		// image : thumbnail,
		opacity : .1
	});
	//marvel logo picture end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '10%',
		left : '10%',
		text : 'Title: ' + name,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var issueView = Ti.UI.createLabel({
		top : '15%',
		left : '10%',
		text : 'Issue #: ' + issue,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var isbnView = Ti.UI.createLabel({
		top : '18%',
		left : '10%',
		text : '# of Pages: ' + page,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var descView = Ti.UI.createLabel({
		top : '25%',
		left : '10%',
		right : '15%',
		text : 'Description: ' + desc,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var priceView = Ti.UI.createLabel({
		top : '10%',
		right : '15%',
		text : 'Price: ' + price,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});
	//Labels End

	//EventListener Main Code
	evtWin.add(evtLogo, titleView, issueView, descView, isbnView, priceView);
	// evtWin.open();
	navWin.openWindow(evtWin, {
		animate : true
	});
});

//Main Code
win.add(logo, comicTable);
// win.open();
navWin.open();
