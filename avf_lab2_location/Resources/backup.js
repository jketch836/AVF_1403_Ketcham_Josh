//APP.JS
// //require api info
var geo = require('geo_api');

//create window
var win = Ti.UI.createWindow({
	title : 'NY Times Stories',
	backgroundColor : '#fff'
});

//Scroll View Start
var timesScroll = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '94.5%',
	width : '100%',
	top : '4%',
	showVerticalScrollIndicator : true
});
//Scroll View End

//listview template start
timesTemplate = {
	properties : {
		top : '1%',
		height : '7%'
	},
	childTemplates : [{
		type : "Ti.UI.Label",
		bindId : 'name',
		properties : {
			color : "black",
			font : {
				fontSize : 16,
				fontFamily : "Arial"
			},
			left : '7%',
			top : '1%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'country',
		properties : {
			color : "black",
			font : {
				fontSize : 12,
				fontFamily : "Arial"
			},
			right : '10%',
			top : '1%'
		},
	}]
};
//listview template end

//listview start
var listview = Ti.UI.createListView({
	//	search: search,
	top : '0%',
	// height: '500dp',
	templates : {
		'defaultTemplate' : timesTemplate
	},
	defaultItemTemplate : 'defaultTemplate'
});
//listview end

//evt listener start
listview.addEventListener('itemclick', function(e) {




	//calling vraibles from geo_api start
// 
	// var name, issue, desc, isbn, cost, thumbnail1;
	//
	// name = e.section.itemIndex.name;
	// issue = a.rowData.issue;
	// desc = a.rowData.desc;
	// page = a.rowData.page;
	// cost = a.rowData.cost;
	// thumbnail1 = a.rowData.thumbnail1;
// 
	//calling vraibles from geo_api end
// 
	// //create window
	// var evtWin = Ti.UI.createWindow({
		// title : 'NY Times Location',
		// backgroundColor : '#fff'
	// });
// 
	// //back button start
	// var backView = Ti.UI.createView({
		// backgroundColor : "#333",
		// borderRadius : '3%',
		// height : '7%',
		// width : '20%',
		// top : '3%',
		// left : '0%',
		// file : 'app.js'
	// });
// 
	// var backLabel = Ti.UI.createLabel({
		// text : "Back",
		// font : {
			// fontSize : 16,
			// fontFamily : "Helvetica",
			// fontWeight : "bold"
		// },
		// color : "#fff",
		// center : 0,
		// file : 'app.js'
	// });
	// //back button end
// 
	// //city name start
	// var city = Ti.UI.createLabel({
		// text : name,
		// top : '20%',
		// font : {
			// fontSize : 16,
			// fontFamily : "Helvetica",
			// fontWeight : "bold"
		// },
		// color : "#000",
	// });
	// //city name end

	//evt Main Code
	backView.add(backLabel);
	// evtWin.add(backView, city);
	evtWin.open();
});
//evt listener end

//Main Code
timesScroll.add(listview);
win.add(timesScroll);
win.open();





//GEO_API.JS
//url variable
var url = 'http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=37.78583526611328,-122.40641784667969&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990';

//onload function start
var apiResponse = function() {
	//converting marvel api json data
	var json = JSON.parse(this.responseText);
	var times = json.results;
	var data = [];

	//setting nytimes api json data to variables
	for (var i = 0; i < times.length; i++) {
		// copyright = json[i].copyright;
		name = times[i].geocode.name;
		county = times[i].geocode.admin_name2;
		state = times[i].geocode.admin_name1;
		st = times[i].geocode.admin_code1;
		countryAB = times[i].geocode.country_code;
		country = times[i].geocode.country_name;
		latitude = times[i].geocode.latitude;
		longitude = times[i].geocode.longitude;
		dist = Math.round(times[i].geocode.distance*10)/10;

		// console.log(name);
		// console.log(county);
		// console.log(state);
		// console.log(country);
		// console.log(latitude);
		// console.log(longitude);

		//creating row for times listview
		var seclist = Ti.UI.createListSection({
		});

		data.push({
			properties : {
				name : name,
				st : st,
				county : county,
				state : state,
				countryAB : countryAB,
				country : country,
				latitude : latitude,
				longitude : longitude,
				dist : dist
			},
			name : {
				text : name + ', ' + st
			},
			st : {
				text : st
			},
			county : {
				text : county
			},
			state : {
				text : state
			},
			country : {
				text : country
			},
			countryAB : {
				text : countryAB
			},
			latitude : {
				text : latitude
			},
			longitude : {
				text : longitude
			},
			dist : {
				text : dist
			}
		});
		seclist.setItems(data);

	};
	listview.sections = [seclist];
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
xhr.open('GET', url);
xhr.send();





//STORAGE.JS
var data = Ti.Database.open('location');
var wowData = Ti.App.Properties.getString('geoData');
data.execute('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY, )');

function insertData() {
	var data = [];

	var rowInfo = data.execute('SELECT * FROM location');

	while (rowInfo.isValidRow()) {
		var name = rowInfo.fieldByName('name');

		dataInfo.push({
			name : name,
			st : st,
			county : county,
			state : state,
			countryAB : countryAB,
			country : country,
			latitude : latitude,
			longitude : longitude,
			dist : dist
		});

		Ti.API.info('=========================');

		rowInfo.next();
	};
	return data;
};
var geoData = insertData();
exports.geoData = geoData;

// console.log(guildData);

var saveFunc = function() {
	input = {};
	data.execute('INSERT INTO location (name) VALUES (?)', name);
};
exports.saveFunc = saveFunc;

var id = a.rowData.id;
input = {};

data.execute('SELECT * FROM location WHERE ID=?', id);

function delFunc() {
	var id = a.rowData.id;
	data.execute('DELETE FROM location WHERE id=?', id);
	geoData;

};
exports.delFunc = delFunc;
