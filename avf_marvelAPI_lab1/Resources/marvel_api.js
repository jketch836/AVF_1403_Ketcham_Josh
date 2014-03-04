//requiring app.js
var apps = require('app');

//variables to access marvel website api
var publicKEY = 'b2565e819b4efac81bd9df1e0486d050';
var privateKEY = 'dc653b17a624b27dd862c2d7c2c0265723bef0a1';
var ts = 100;
var hash = Ti.Utils.md5HexDigest(ts + privateKEY + publicKEY);
var marvelURL = 'http://gateway.marvel.com/v1/public/characters?ts=' + ts + '&apikey=' + publicKEY + '&hash=' + hash;

//onload function start
var apiResponse = function() {

	var json = JSON.parse(this.responseText);
	var jsonData = json.data.results;
	var array = [];

	for (var i = 0; i < jsonData.length; i++) {
		title = jsonData[i].title;
		issue = jsonData[i].issueNumber;
		desc = jsonData[i].description;
		isbn = jsonData[i].isbn;
		price = '$' + jsonData[i].prices.price;
		// thumbnail = jsonData[i].thumbnail.path + '.jpg';

		Ti.API.info("title: " + title);
		Ti.API.info("issue#: " + issue);
		Ti.API.info("description: " + desc);
		Ti.API.info("isbn#: " + isbn);
		Ti.API.info("price: " + price);

		//creating row for comicTable
		var rows = Ti.UI.createTableViewRow({
			height : '70dp',
			title : title,
			issue : issue,
			desc : desc,
			isbn : isbn,
			// title : thumbnail + "         " + title,
			price : price
		});
		//pushing api data to array and rows
		array.push(rows);
	};
	//placing data in comicTable at app.js
	apps.comicTable.setData(array);
};
//onload function end

//onerror function start
var apiError = function(e) {
	Ti.API.debug("Status: " + this.status);
	Ti.API.debug("Text: " + this.responseText);
	Ti.API.debug("Error: " + e.error);
	alert("There's a problem pulling remote data");
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