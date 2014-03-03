//requiring app.js
var table = require('app');

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
		name = jsonData[i].title;
		issue = jsonData[i].issueNumber;
		desc = jsonData[i].description;
		isbn = jsonData[i].isbn;
		// thumbnail = jsonData[i].thumbnail.path + '.jpg';

		//creating row for comic table
		var row = Ti.UI.createTableViewRow({
			title : name,
			issue : issue,
			desc : desc,
			isbn : isbn,
			// title : thumbnail + "         " + title
		});

		array.push(row);

	};
	//placing data in comic table at app.js
	table.comicTable.setData(data);
};
//onload function end

var apiError = function(e) {
	Ti.API.debug("Status: " + this.status);
	Ti.API.debug("Text: " + this.responseText);
	Ti.API.debug("Error: " + e.error);
	alert("There's a problem pulling remote data");
};

var xhr = Ti.Network.createHTTPClient({
	onload : apiResponse,
	onerror : apiError,
	timeout : 5000
});

//Main Code
xhr.open('GET', marvelURL);
xhr.send();
