//APP.JS

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
		fontSize : 18
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
	cost = a.rowData.cost;
	thumbnail = a.rowData.thumbnail1;

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
		// image : 'marvel-logo-wallpaper.jpg',
		image : thumbnail,
		opacity : .1
	});
	//marvel logo picture end

	//Labels Begin
	var thumbView = Ti.UI.createImageView({
		height : '20%',
		width : '20%',
		top : '10%',
		left : '10%',
		image : thumbnail
	});

	var titleView = Ti.UI.createLabel({
		top : '10%',
		left : '33%',
		text : 'Title: ' + name,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var issueView = Ti.UI.createLabel({
		top : '16%',
		left : '33%',
		text : 'Issue #: ' + issue,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var isbnView = Ti.UI.createLabel({
		top : '22%',
		left : '33%',
		text : 'Number of Pages: ' + page,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var priceView = Ti.UI.createLabel({
		top : '27%',
		left : '33%',
		text : 'Price: $ ' + cost,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var descView = Ti.UI.createLabel({
		top : '33%',
		left : '10%',
		right : '15%',
		text : 'Description:',
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});

	var descInfoView = Ti.UI.createLabel({
		top : '36%',
		left : '10%',
		right : '15%',
		text : desc,
		font : {
			fontStyle : 'Helvetica',
			fontSize : 22
		},
	});
	//Labels End

	//EventListener Main Code
	evtWin.add(evtLogo, thumbView, titleView, issueView, descView, descInfoView, isbnView, priceView);
	// evtWin.open();
	navWin.openWindow(evtWin, {
		animate : true
	});
});

//Main Code
win.add(logo, comicTable);
// win.open();
navWin.open();





//MARVEL_API.JS

//requiring app.js
// var apps = require('app');

//variables to access marvel website api
var publicKEY = 'b2565e819b4efac81bd9df1e0486d050';
var privateKEY = 'dc653b17a624b27dd862c2d7c2c0265723bef0a1';
var ts = 2;
var hash = Ti.Utils.md5HexDigest(ts + privateKEY + publicKEY);
var marvelURL = 'http://gateway.marvel.com/v1/public/comics?ts=' + ts + '&apikey=' + publicKEY + '&hash=' + hash;
// var marvelURL = 'http://gateway.marvel.com/v1/public/comics?ts=2&apikey=b2565e819b4efac81bd9df1e0486d050&hash=08deafbaf58bb34a798973523f032104';'

//onload function start
var apiResponse = function() {
	//converting marvel api json data
	var json = JSON.parse(this.responseText);
	var jsonData = json.data.results;
	var array = [];

	//setting marvel api json data to variables
	for (var i = 0; i < jsonData.length; i++) {
		name = jsonData[i].title;
		issue = jsonData[i].issueNumber;
		desc = jsonData[i].description;
		page = jsonData[i].pageCount;
		format = jsonData[i].format;
		cost = jsonData[i].prices.price;
		thumbnail1 = jsonData[i].thumbnail.path + '/portrait_xlarge.jpg';
		thumbnail2 = jsonData[i].thumbnail.path + '/portrait_small.jpg';

		// console.log(name);
		// console.log(issue);
		// console.log(page);
		// console.log(format);
		// console.log(cost);

		// Ti.API.info("title: " + name);
		// Ti.API.info("issue#: " + issue);
		// Ti.API.info("description: " + desc);
		// Ti.API.info("pages#: " + page);
		// Ti.API.info("format: " + format);
		// Ti.API.info("price: " + cost);
		// Ti.API.info("thumbnail: " + thumbnail);

		//marvel logo picture start
		var comicPic = Ti.UI.createImageView({
			height : '10%',
			width : '10%',
			image : thumbnail2
		});
		//marvel logo picture end

		//creating row for comicTable
		var rows = Ti.UI.createTableViewRow({
			height : '10%',
			title : name,
			issue : issue,
			desc : desc,
			page : page,
			format : format,
			thumbnail1 : thumbnail1,
			cost : cost,
			// image : comicPic,
			font : {
				fontStyle : 'Helvetica',
				fontSize : 18
			},
		});
		//pushing api data to array and rows
		array.push(rows);
	};
	//placing data in comicTable at app.js
	comicTable.setData(array);
};
//onload function end

//onerror function start
var apiError = function(e) {
	Ti.API.debug("Status: " + this.status);
	Ti.API.debug("Text: " + this.responseText);
	Ti.API.debug("Error: " + e.error);
	alert("Please connect to the Internet");
};
//onerror function end

//HTTPclient start
var xhr = Ti.Network.createHTTPClient({
	onload : apiResponse,
	onerror : apiError,
	timeout : 5000
});
//HTTPclient end

//Main Code
xhr.open('GET', marvelURL);
xhr.send();
