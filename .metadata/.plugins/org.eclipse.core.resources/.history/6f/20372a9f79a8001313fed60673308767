//APP.JS
//requiring JS files
var map = require('RemoteData');
var see = require('search');
var fav = require('fav');

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
	text : "GEO loc",
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	}
});

var enterBTN = Ti.UI.createButton({
	title : 'ENTER',
	bottom : '10%',
	center : '0%',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
	}
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
	var sTab = Ti.UI.createTab({
		title : 'Form',
		window : see.sWin
	});

	// created favorite tab
	var favTab = Ti.UI.createTab({
		title : 'Stored',
		window : fav.favWin
	});
	//Tabs Main Code
	theTabs.addTab(mapTab);
	theTabs.addTab(sTab);
	theTabs.addTab(favTab);
	theTabs.open();
});
titleView.add(titleLabel, enterBTN);

//view end

//Window Main Code
mainWin.add(titleView);
mainWin.open();





//REMOTEDATA.JS
//requiring JS files
var search = require('search');

//window start
var mapWin = Ti.UI.createWindow({
	title : "Map Window"
});
exports.mapWin = mapWin;
//window end

var holder = Ti.UI.createView({
	height : '90%',
	bottom : '0%',
	width : Ti.Platform.displayCaps.platformWIDTH,
});

//Start GEOLOC and remotedata pull func
var runGeo = function() {
	//Start GEOLOC func
	Ti.Geolocation.purpose = "Your location is needed to gather lat/long coords.";

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (Ti.Geolocation.locationServicesEnabled) {
		} else {
			alert("Location service is not enabled.");
		};
		if (e.error) {
			alert("Getting your location has returned an error. Trying to connect...");
		} else {
			var lat = e.coords.latitude;
			var lng = e.coords.longitude;
			var url = "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=" + lat + "," + lng + "&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990";
			var coordinateLabel = Ti.UI.createLabel({
				color : '#fff',
				text : 'Latitude: ' + lat + ', Longitude: ' + lng,
				height : Ti.Platform.displayCaps.platformHEIGHT,
				textAlign : 'center',
				font : {
					fontSize : '20dp',
					fontWeight : 'bold'
				}
			});
		}
		// End GEOLOC func

		// Start remotedata pull
		var info = [];
		var response, name, population, lat, lng, dist, county;
		var remoteResponse = function() {
			// Response function code
			response = JSON.parse(this.responseText);
			for (var i = 0; i < response.results.length; i++) {
				name = response.results[i].geocode.name;
				population = response.results[i].geocode.population;
				lat = Math.round(response.results[i].geocode.latitude * 1000) / 1000;
				lng = Math.round(response.results[i].geocode.longitude * 1000) / 1000;
				dist = Math.round(response.results[i].geocode.distance * 10) / 10;
				st = response.results[i].geocode.admin_code1;
				county = response.results[i].geocode.admin_name2;
				cp = response.copyright;

				// pushing data to rows
				var rows = Ti.UI.createTableViewRow({
					height : '6%',
					id : i + 1,
					title : name,
					name : name,
					st : st,
					county : county,
					population : population,
					lat : lat,
					lng : lng,
					distance : dist,
					cp : cp
				});

				info.push(rows);
			};
			// Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_KILOMETER;
			// var kilo = Ti.Geolocation.accuracy;
			var Map = require('ti.map');
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE,
				// accuracy : kilo
			});
			
			mapWin.add(mapview);
			// console.log(info);

			//pushing rows to table
			search.timesTable.setData(info);

		};
		
		//if there is a problem pulling the data
		var remoteError = function(e) {
			Ti.API.debug("Status: " + this.status);
			Ti.API.debug("Text: " + this.responseText);
			Ti.API.debug("Error: " + e.error);
			alert("There's a problem pulling remote data");
		};

		//getting the data
		var xhr = Ti.Network.createHTTPClient({
			onload : remoteResponse,
			onerror : remoteError,
			timeout : 5000
		});
		holder.add(coordinateLabel);

		xhr.open("GET", url);
		xhr.send();
	});

};
// End remote data pull
// End GEOLOC and remotedata pull func

//Run GEOLOC and remotedata pull func
runGeo();

//Main Code
mapWin.add(holder);




//FAV.JS
//Window Start
var favWin = Ti.UI.createWindow({
	title : 'Stored',
	backgroundColor : 'red'
});
exports.favWin = favWin;
//Window End

var dataB = Ti.Database.open("GeoDB");
dataB.execute('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');

var buildRow = function() {
	var data = [];
	var test = dataB.execute("SELECT * FROM location");

	while (test.isValidRow()) {
		var name = test.fieldByName('name');
		var state = test.fieldByName('state');
		var county = test.fieldByName('county');
		var latitude = test.fieldByName('latitude');
		var longitude = test.fieldByName('longitude');
		var distance = test.fieldByName('distance');
		var population = test.fieldByName('population');
		var id = test.fieldByName('id');

		data.push({
			title : name,
			state : state,
			county : county,
			latitude : latitude,
			longitude : longitude,
			distance : distance,
			population : population,
			id : id
		});
		test.next();
	};
	return data;
};

////////////////////////////////////// Prompt START //////////////////////////////////////
var promptHolder = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	backgroundColor : "black",
	opacity : 0.8
});
var prompt = Ti.UI.createView({
	backgroundColor : "#FFF",
	width : '40%',
	height : '20%',
	borderRadius : '15%'
});

//Delete button
var button1 = Ti.UI.createButton({
	title : "Delete",
	left : '10%',
	bottom : '5%',
	font : {
		fontSize : 22
	}
});

//Cancel (closes the prompt)
var button3 = Ti.UI.createButton({
	title : "Cancel",
	right : '10%',
	bottom : '5%',
	font : {
		fontSize : 22
	}
});
var label = Ti.UI.createLabel({
	text : "Are you sure you want to delete this item?",
	font : {
		fontSize : 26
	},
	textAlign : 'center',
	top : '7%',
	right : '3%',
	left : '3%'
});

prompt.add(button1, button3, label);
prompt.visible = false;
promptHolder.visible = false;
////////////////////////////////////// Prompt END //////////////////////////////////////

var table = Ti.UI.createTableView({
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});

table.addEventListener("scrollend", function() {
	table.setData(buildRow());
	alert("Your favorites have been updated");
});

table.addEventListener("click", function(e) {
	var id = e.source.id;
	var sec = dataB.execute("SELECT * FROM location");
	var sel = {};
	sel.name = sec.fieldByName('name');
	sel.state = sec.fieldByName('state');
	sel.county = sec.fieldByName('county');
	sel.latitude = e.source.latitude;
	sel.longitude = e.source.longitude;
	sel.distance = sec.fieldByName('distance');
	sel.population = sec.fieldByName('population');

	//Window Start
	var fWin = Ti.UI.createWindow({
		title : 'FORM',
		backgroundColor : '#fff'
	});
	//Window End

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'Cancel',
		top : '5%',
		left : '5%',
		font : {
			fontSize : 22
		}
	});
	cancelBTN.addEventListener('click', function() {
		fWin.close();
	});
	//cencel button end
	var deleteBTN = Ti.UI.createButton({
		title : "DELETE",
		style : Ti.UI.iPhone.SystemButtonStyle.ACTION,
		right : '5%',
		top : '5%',
		font : {
			fontSize : 22
		},
		color :'#FF0000'
	});

	deleteBTN.addEventListener("click", function(e) {

		//console.log(e.source.id);
		//console.log(e.rowData.id);
		//Displays the prompt
		prompt.visible = true;
		promptHolder.visible = true;

		//SQL Delete
		button1.addEventListener("click", function(e) {
			dataB.execute("DELETE FROM location WHERE id=?", id);
			prompt.visible = false;
			promptHolder.visible = false;
			table.setData(buildRow());
			fWin.close();
		});

		button3.addEventListener("click", function() {
			prompt.visible = false;
			promptHolder.visible = false;
		});

	});

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '8%',
		text : sel.name + ', ' + sel.state,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '40%',
			fontWeight : 'bold'
		}
	});

	var countyLabel = Ti.UI.createLabel({
		top : '15%',
		left : '10%',
		text : sel.county,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '30%'
		}
	});

	Number.prototype.format = function() {
		return this.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",");
	};

	var popLabel = Ti.UI.createLabel({
		top : '30%',
		left : '12%',
		right : '15%',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	switch (sel.population) {
		case null:
			popLabel.text = 'Population: Not Avalible';
			break;
		default :
			popLabel.text = 'Population: ' + sel.population.format();
			break;
	}

	var distLabel = Ti.UI.createLabel({
		top : '40%',
		left : '12%',
		right : '15%',
		text : 'Dist: ' + sel.distance + ' Miles',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	var latLabel = Ti.UI.createLabel({
		top : '50%',
		left : '12%',
		right : '15%',
		text : 'Latitude: ' + sel.latitude,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	var lngLabel = Ti.UI.createLabel({
		top : '60%',
		left : '12%',
		right : '15%',
		text : 'Longitude: ' + sel.longitude,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	var cpLabel = Ti.UI.createLabel({
		bottom : '0%',
		center : '12%',
		text : cp,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '20%'
		}
	});
	//Labels End

	var textView = Ti.UI.createView({
		top : '50%',
		height : '30%',
		width : '100%',
		borderRadius : '3%',
		backgroundColor : '#EBECE4'
	});
	textView.add(titleView, countyLabel, popLabel, distLabel, latLabel, lngLabel);

	//table event listener Main Code
	fWin.add(cancelBTN, deleteBTN, textView, cpLabel, promptHolder, prompt);
	fWin.open();
});

//Main Code
table.setData(buildRow());
favWin.add(table);