//APP.JS
//require api and crud info
var geo = require('geo_api');
var box = require('storage');

// created tab group
var theTabs = Ti.UI.createTabGroup();

//create window1
var win1 = Ti.UI.createWindow({
	title : 'NY Times',
	backgroundColor : '#fff'
});

// created character tab
var timesTab = Ti.UI.createTab({
	title : 'NY Times Stories',
	window : win1
});

//Scroll View Start
var timesScroll1 = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	top : '0%',
	showVerticalScrollIndicator : true
});
//Scroll View End

//listview template start
timesTemplate1 = 
{
	properties : 
	{
		top : '1%',
		height : '7%'
	},
	childTemplates : 
	[
		{
			type : "Ti.UI.Label",
			bindId : 'name',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 13,
					fontFamily : "Arial"
				},
				left : '5%',
				top : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'countryAB',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 11,
					fontFamily : "Arial"
				},
				right : '10%',
				top : '1%'
			},
		},
		{
			type : "Ti.UI.Label",
			bindId : 'latitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				left : '25%',
				bottom : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'longitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				right : '25%',
				bottom : '1%'
			}
		}
	]
};
//listview template end

//listview start
var listview1 = Ti.UI.createListView({
	//	search: search,
	top : '0%',
	// height: '500dp',
	templates : {
		'defaultTemplate' : timesTemplate1
	},
	defaultItemTemplate : 'defaultTemplate'
});
//listview end

//listview evt listener start
listview1.addEventListener('itemclick', function() {
		var deleteDIA = Ti.UI.createAlertDialog({
			title : 'Save?',
			buttonNames : ['Save', 'Cancel']
		});
		deleteDIA.show();

		deleteDIA.addEventListener('click', function(a) {
			if (a.index === 0) {
				box.save(name, countryAB, latitude, longitude);
			}
		});
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
// 
	//evt Main Code
	// backView.add(backLabel);
	// evtWin.add(backView, city);
	// evtWin.open();
});
//listview evt listener end


//create window2
var win2 = Ti.UI.createWindow({
	title : 'Favorites',
	backgroundColor : '#fff'
});


// created favorite tab
var favTab = Ti.UI.createTab({
	title : 'Favorites',
	window : win2
});

//Scroll View Start
var timesScroll2 = Ti.UI.createScrollView({
	layout : 'vertical',
	height : '100%',
	width : '100%',
	top : '0%',
	showVerticalScrollIndicator : true
});
//Scroll View End

//listview template start
timesTemplate2 = 
{
	properties : 
	{
		top : '1%',
		height : '7%'
	},
	childTemplates : 
	[
		{
			type : "Ti.UI.Label",
			bindId : 'name',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 13,
					fontFamily : "Arial"
				},
				left : '5%',
				top : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'countryAB',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 11,
					fontFamily : "Arial"
				},
				right : '10%',
				top : '1%'
			},
		},
		{
			type : "Ti.UI.Label",
			bindId : 'latitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				left : '25%',
				bottom : '1%'
			}
		}, 
		{
			type : "Ti.UI.Label",
			bindId : 'longitude',
			properties : 
			{
				color : "black",
				font : 
				{
					fontSize : 10,
					fontFamily : "Arial"
				},
				right : '25%',
				bottom : '1%'
			}
		}
	]
};
//listview template end

//creating row for favories listview
var seclist2 = Ti.UI.createListSection({
});

//listview start
var listview2 = Ti.UI.createListView({
	//	search: search,
	top : '0%',
	// height: '500dp',
	templates : {
		'defaultTemplate' : timesTemplate2
	},
	defaultItemTemplate : 'defaultTemplate'
});
//listview end


//Main Code
seclist2.setItems(box.geoData);
listview2.sections = [seclist2];
timesScroll2.add(listview2);
timesScroll1.add(listview1);
win2.add(timesScroll2);
win1.add(timesScroll1);
theTabs.addTab(timesTab);
theTabs.addTab(favTab);
theTabs.open();




//GEO_API.JS
// var list = require('listview');

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
		dist = Math.round(times[i].geocode.distance * 10) / 10;

		// console.log(name);
		// console.log(county);
		// console.log(state);
		// console.log(country);
		// console.log(latitude);
		// console.log(longitude);

		for (var a = 0; a < json.length; a++) {
			copyright = json[a].copyright;
		}

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
				text : 'lat: ' + latitude
			},
			longitude : {
				text : 'lng: ' + longitude
			},
			dist : {
				text : dist
			}
		});
		seclist.setItems(data);

	};
	listview1.sections = [seclist];
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
//Creating Database
var geo = Ti.Database.open('location');
var wowData = Ti.App.Properties.getString('geoData');
geo.execute('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY, name TEXT, countryAB TEXT, latitude INTEGER, longitude INTEGER)');

//Inserting data from save func start
function insertData() {
	var data = [];

	var  secInfo = geo.execute('SELECT * FROM location');

	while (secInfo.isValidRow()) {
		var name = secInfo.fieldByName('name');
		var st = secInfo.fieldByName('st');
		// var county = rowInfo.fieldByName('county');
		// var state = rowInfo.fieldByName('state');
		var countryAB = rowInfo.fieldByName('countryAB');
		// var country = rowInfo.fieldByName('country');
		var latitude = secInfo.fieldByName('latitude');
		var longitude = secInfo.fieldByName('longitude');
		// var dist = rowInfo.fieldByName('dist');
		var id = secInfo.fieldByName('id');
		
		dataInfo.push({
			name : name,
			st : st,
			// county : county,
			// state : state,
			countryAB : countryAB,
			// country : country,
			latitude : latitude,
			longitude : longitude,
			// dist : dist
			id : id
		});

		Ti.API.info('=========================');

		secInfo.next();
	};
	return data;
};
var geoData = insertData();
exports.geoData = geoData;
//Inserting data from sav func end


//saving data from app.js start
var save = function(name, countryAB, latitude, longitude) {
	input = {};
	input.name = name;
	input.countryAB = countryAB;
	input.latitude = latitude;
	input.longitude = longitude;
	geo.execute('INSERT INTO location (name, countryAB, latitude, longitude) VALUES (?, ?, ?, ?)', input.name, input.countryAB, input.latitude, input.longitude);
	geoData;
};
exports.save = save;
//saving data from app.js end


// var id = a.rowData.id;
// 
// geo.execute('SELECT * FROM location WHERE ID=?', id);
// input = {};


//delete data start
function delFunc() {
	geo.execute('DELETE FROM location WHERE id=?', id); 
	// seclist.setItems(geoData);
};
exports.delFunc = delFunc;
//delete data end