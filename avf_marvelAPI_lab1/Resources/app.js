//requiring app.js
var api = require('marvel_api');

//Window Start
var win = Ti.UI.createWindow({
	title : 'Marvel Comics',
	backgroundColor : '#fff'
});
//Window End

// //Window Start
// var navWin = Ti.UI.iOS.createNavigationWindow({
// window : win
// });
// //Window End

// marvel logo picture start
var logo = Ti.UI.createImageView({
	top : '6%',
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
	top : '2%',
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	},

	opacity : .9
});
//Table End

comicTable.addEventListener('click', function(a) {
	//calling vraibles from api start

	var name, issue, desc, isbn, cost, thumbnail1;

	name = a.rowData.title;
	issue = a.rowData.issue;
	desc = a.rowData.desc;
	page = a.rowData.page;
	cost = a.rowData.cost;
	thumbnail1 = a.rowData.thumbnail1;

	//calling vraibles from api end

	//Window Start
	var evtWin = Ti.UI.createWindow({
		title : name,
		// nav : navWin,
		backgroundColor : '#fff'
	});
	//Window End

	//view start
	var theview = Ti.UI.createView({
		top : '2%',
		height : '5%',
		width : '100%',
		backgroundColor : '#333'
	});

	var titleBar = Ti.UI.createLabel({
		center : '0%',
		text : name,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 28,
			fontWeight : 'bold'
		},
		color : '#fff'
	});

	var arrow = Ti.UI.createImageView({
		left : '0%',
		height : '50%',
		width : '25%',
		image : 'forward_arrow.png'
	});

	var backview = Ti.UI.createView({
		left : '0%',
		height : '100%',
		width : '15%',
		backgroundColor : '#fff'
	});

	var backBTN = Ti.UI.createLabel({
		right : '10%',
		text : 'Back',
		font : {
			fontStyle : 'Helvetica',
			fontSize : 28,
			fontWeight : 'bold'
		}
	});
	backview.add(arrow, backBTN);
	theview.add(backview, titleBar);

	theview.addEventListener('click', function() {
		evtWin.close();
	});
	//view end

	//comic picture start
	var evtLogo = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		image : thumbnail1,
		opacity : .1
	});
	//comic picture end

	//Labels Begin
	var thumbView = Ti.UI.createImageView({
		height : '30%',
		width : '30%',
		top : '10%',
		left : '10%',
		image : thumbnail1
	});

	var titleView = Ti.UI.createLabel({
		top : '10%',
		left : '43%',
		text : name,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 28,
			fontWeight : 'bold'
		}
	});

	var issueView = Ti.UI.createLabel({
		top : '16%',
		left : '43%',
		text : 'ISSUE #: ' + issue,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		}
	});

	var isbnView = Ti.UI.createLabel({
		top : '22%',
		left : '43%',
		text : page + ' pages',
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		}
	});

	var priceView = Ti.UI.createLabel({
		top : '27%',
		left : '43%',
		text : cost,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		}
	});

	var descView = Ti.UI.createLabel({
		top : '43%',
		left : '10%',
		right : '15%',
		text : 'DESCRIPTION:',
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		}
	});

	var descInfoView = Ti.UI.createLabel({
		top : '47%',
		left : '10%',
		right : '15%',
		text : desc,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		}
	});
	//Labels End

	//EventListener Main Code
	// evtWin.add();
	evtWin.add(evtLogo, theview, thumbView, titleView, issueView, priceView, descView, descInfoView, isbnView);
	evtWin.open();
	// navWin.openWindow(evtWin, {
	// animate : true
	// });
});

//Main Code
win.add(comicTable, logo);
win.open();
// navWin.open();
