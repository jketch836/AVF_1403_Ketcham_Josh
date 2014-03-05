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
