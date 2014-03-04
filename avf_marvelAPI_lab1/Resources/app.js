//Window Start
var win = Ti.UI.createWindow({
	title : 'Marvel Comics',
	backgroundColor : '#fff'
});
//Window End

//marvel logo picture start
var logo = Ti.UI.createImageView({
	top : '63dp',
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
	top : '20dp',
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 14
	},
	opacity : .8
});
// console.log(comicTable);
//export table to marvel_api
exports.comicTable = comicTable;
//Table End

comicTable.addEventListener('click', function(a) {
	//calling vraibles from api start
	var name, issue, desc, isbn, price;

	title = a.rowData.title;
	issue = a.rowData.issue;
	desc = a.rowData.desc;
	isbn = a.rowData.isbn;
	price = a.rowData.price;
	//calling vraibles from api end

	//Window Start
	var evtWin = Ti.UI.createWindow({
		title : title,
		backgroundColor : '#fff'
	});
	//Window End

	//marvel logo picture start
	var evtLogo = Ti.UI.createImageView({
		top : '63dp',
		height : '100%',
		width : '100%',
		image : 'marvel-logo-wallpaper.jpg',
		opacity : .2
	});
	//marvel logo picture end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '15%',
		left : '15%',
		text : 'Title: ' + title
	});

	var issueView = Ti.UI.createLabel({
		top : '17%',
		left : '15%',
		text : 'Issue #: ' + issue
	});

	var descView = Ti.UI.createLabel({
		top : '19%',
		left : '15%',
		text : 'Description: ' + desc
	});

	var isbnView = Ti.UI.createLabel({
		top : '23%',
		left : '15%',
		text : 'ISBN #: ' + isbn
	});

	var priceView = Ti.UI.createLabel({
		top : '15%',
		right : '15%',
		text : 'Price: ' + price
	});
	//Labels End
	
	//EventListener Main Code
	evtWin.add(evtLogo, titleView, issueView, descView, isbnView, priceView);
	evtWin.open();
});

//Main Code
win.add(logo, comicTable);
win.open();