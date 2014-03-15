//APP.JS
//requiring JS files
var geo = require('geo_api_table');
var sav = require('sav');
var puff = require('cloud');

(function() {
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function() {
		Cloud.Users.login({
			login : 'com.fullsail.demoApp',
			password : '12345'
		}, function(e) {
			// use .info method to view login info in the Console, if successful
			if (e.success) {
				var user = e.users[0];
				Ti.API.info('Success!\n' + 'ACS User ID: ' + user.id + '\n' + 'ACS App sessionId: ' + Cloud.sessionId + '\n' + 'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	};
	// loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();

//Create Window
var mainWin = Ti.UI.createWindow({
	title : "Main Window",
	backgroundColor : '#7D9EC0'
});

//view start
var titleView = Ti.UI.createView({
	borderRadius : '10%',
	center : '0%',
	height : '40%',
	width : '60%',
	backgroundColor : '#fff'
});

var titleLabel = Ti.UI.createLabel({
	text : "NYTIMES GEO",
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
		fontSize : 22
	}
});

enterBTN.addEventListener('click', function() {

	// created tab group
	var theTabs = Ti.UI.createTabGroup();

	// created favorite tab
	var mTab = Ti.UI.createTab({
		title : 'Places',
		window : geo.mapWin
	});

	// created favorite tab
	var savTab = Ti.UI.createTab({
		title : 'Local',
		window : sav.favWin
	});

	// created favorite tab
	var cTab = Ti.UI.createTab({
		title : 'Cloud',
		window : puff.cloudWin
	});

	//Tabs Main Code
	theTabs.addTab(mTab);
	theTabs.addTab(savTab);
	theTabs.addTab(cTab);
	theTabs.open();
});
titleView.add(titleLabel, enterBTN);
//view end

//Window Main Code
mainWin.add(titleView);
mainWin.open(); 





//GEO_API_TABLE.JS
//window start
var mapWin = Ti.UI.createWindow({
	title : "Map Window"
});
exports.mapWin = mapWin;
//window end

var holder = Ti.UI.createView({
	height : '80%',
	bottom : '50%',
	width : Ti.Platform.displayCaps.platformWIDTH,
});

//Start GEOLOC and remotedata pull func
var runGeo = function() {
	//Start GEOLOC func
	Ti.Geolocation.purpose = "NYTIMES GEO would like to acces your current location.";

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (Ti.Geolocation.locationServicesEnabled) {
		} else {
			alert("Location service is not enabled.");
		};
		if (e.error) {
			alert("There is an error. Cannot connect...");
		} else {
			var lat = e.coords.latitude;
			var lng = e.coords.longitude;
			var url = "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=" + lat + "," + lng + "&api-key=59cc85fa36b9786033e0c4b7afe32cd5:13:68914490";
			// console.log(url);
			var coordinateLabel = Ti.UI.createLabel({
				color : '#fff',
				// text : 'Latitude: ' + lat + ', Longitude: ' + lng,
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
		var json, results;
		var name, population, lat, lng, dist, st, county, us, cp;
		var remoteResponse = function() {
			// Response function code
			json = JSON.parse(this.responseText);
			results = json.results;
			for (var i = 0; i < results.length; i++) {
				name = results[i].geocode.name;
				population = results[i].geocode.population;
				lat = results[i].geocode.latitude;
				lng = results[i].geocode.longitude;
				dist = Math.round(results[i].geocode.distance * 10) / 10;
				st = results[i].geocode.admin_code1;
				county = results[i].geocode.admin_name2;
				us = results[i].geocode.country_code;
				cp = json.copyright;

				Number.prototype.format = function() {
					return this.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",");
				};

				switch (population) {
					case null:
						population = 'Population: NA';
						break;
					default :
						population = 'Population: ' + population.format();
						break;
				}

				var rows = Ti.UI.createTableViewRow({
					height : '10%',
					title : name + ', ' + st,
					name : name,
					population : population,
					lat : lat,
					lng : lng,
					dist : dist,
					st : st,
					county : county,
					us : us,
					cp : cp,
					id : i + 1
				});

				info.push(rows);
			};

			var Map = require('ti.map');
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE,
				region : {
					latitude : lat,
					longitude : lng,
					laditudeDelta : 0.1,
					longitudeDelta : 0.1
				},
				regionFit : true
			});

			holder.add(mapview);
			// console.log(info);

			//pushing rows to table
			cloudTable.setData(info);

		};

		//if there is a problem pulling the data
		var remoteError = function(e) {
			Ti.API.debug("Status: " + this.status);
			Ti.API.debug("Text: " + this.responseText);
			Ti.API.debug("Error: " + e.error);
			alert("There is a problem connecting to the Internet");
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
	// End remote data pull
};
// End GEOLOC and remotedata pull func

//Run GEOLOC and remotedata pull func
runGeo();

var dataB = Ti.Database.open('geoDATABASE');
dataB.execute('CREATE TABLE IF NOT EXISTS geoloc (id INTEGER PRIMARY KEY, name TEXT, pop TEXT, longitude INTEGER, latitude INTEGER, dist TEXT, st TEXT, county TEXT, us TEXT, cp TEXT)');

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var cloudTable = Ti.UI.createTableView({
	top : '50%',
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});
//Table End

//timesTable evt listener start
cloudTable.addEventListener('click', function(e) {

	//calling vraibles from api start
	var title, name, pop, dist, longitude, latitude, county, st, us, cp, id;

	title = e.rowData.title;
	name = e.rowData.name;
	pop = e.rowData.population;
	longitude = e.rowData.lng;
	latitude = e.rowData.lat;
	dist = e.rowData.dist;
	st = e.rowData.st;
	county = e.rowData.county;
	us = e.rowData.us;
	cp = e.rowData.cp;
	id = e.rowData.id;
	//calling vraibles from api end

	var tWin = Ti.UI.createWindow({
		height : '70%',
		width : '90%'
	});

	///////////// views START /////////////
	var viewbng = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "black",
		borderRadius : '15%'
	});
	var views = Ti.UI.createView({
		backgroundColor : "#fff",
		width : '85%',
		height : '85%',
		borderRadius : '15%'
	});
	///////////// views END /////////////

	//save button start
	var saveBTN = Ti.UI.createButton({
		title : 'SAVE',
		top : '2%',
		right : '7.5%',
		font : {
			fontSize : 20
		},
		color : '#00FFFF'
	});

	saveBTN.addEventListener('click', function() {
		dataB.execute("INSERT INTO geoloc (name, pop, latitude, longitude, dist, st, county, us, cp) VALUES (?,?,?,?,?,?,?,?,?)", name, pop, latitude, longitude, dist, st, county, us, cp);
		tWin.close();
		//require ti.Cloud
		var Cloud = require('ti.cloud');
		// alert(name);
		Cloud.Places.create({
			name : name,
			latitude : latitude,
			longitude : longitude
		}, function(a) {
			if (a.success) {
				alert(name + " has been added to Favorite Places and the Cloud");
			} else if (a.error) {
				alert('error');
			}
		});

		// var nm = cstore.fieldByName('name');
	});

	//save button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '2%',
		left : '7.5%',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : '#00CED1'
	});
	cancelBTN.addEventListener('click', function() {
		tWin.close();
	});
	//cancel button end

	//Map views start
	var Map = require('ti.map');

	var view = Map.createAnnotation({
		latitude : latitude,
		longitude : longitude
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		annotations : [view],
		region : {
			latitude : latitude,
			longitude : longitude,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		enableZoomControls : true,
		regionFit : true
	});
	//Map views end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '0%',
		text : title,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '32%',
			fontWeight : 'bold'
		},
		color : '#fff'
	});

	var countyLabel = Ti.UI.createLabel({
		top : '17%',
		left : '0%',
		text : county,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '28%'
		},
		color : '#fff'
	});

	var popLabel = Ti.UI.createLabel({
		top : '37%',
		left : '0%',
		text : pop,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '22%'
		},
		color : '#fff'
	});

	var distLabel = Ti.UI.createLabel({
		top : '52%',
		left : '0%',
		text : 'Dist: ' + dist + ' Mile(s)',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '22%'
		},
		color : '#fff'
	});

	var usLabel = Ti.UI.createLabel({
		top : '0%',
		right : '0%',
		text : us,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '34%'
		},
		color : '#fff'
	});

	var cpLabel = Ti.UI.createLabel({
		bottom : '0%',
		center : '0%',
		text : cp,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '15%'
		},
		color : '#fff'
	});
	//Labels End

	//View to hold all the labels
	var textView = Ti.UI.createView({
		top : '69.9%',
		height : Ti.UI.FILL,
		width : '100%',
		backgroundColor : '#000'
	});
	textView.add(titleView, countyLabel, popLabel, distLabel, usLabel, cpLabel);

	//EventListener Main Code
	views.add(mapview, textView);
	viewbng.add(views, cancelBTN, saveBTN);
	tWin.add(viewbng);
	tWin.open();
});

//Main Code
mapWin.add(holder, cloudTable);
mapWin.open();





//SAV.JS
//Window Start
var favWin = Ti.UI.createWindow({
	title : 'Local Store',
	backgroundColor : 'red'
});
exports.favWin = favWin;
//Window End

var dataB = Ti.Database.open('geoDATABASE');
dataB.execute('CREATE TABLE IF NOT EXISTS geoloc (id INTEGER PRIMARY KEY, name TEXT, pop TEXT, latitude INTEGER, longitude INTEGER, dist TEXT, st TEXT, county TEXT, us TEXT, cp TEXT)');

var rowInfo = function() {
	var data = [];
	var geo = dataB.execute("SELECT * FROM geoloc");

	while (geo.isValidRow()) {
		var name = geo.fieldByName('name');
		var pop = geo.fieldByName('pop');
		var lat = geo.fieldByName('latitude');
		var lng = geo.fieldByName('longitude');
		var dist = geo.fieldByName('dist');
		var st = geo.fieldByName('st');
		var county = geo.fieldByName('county');
		var us = geo.fieldByName('us');
		var cp = geo.fieldByName('cp');
		var id = geo.fieldByName('id');

		data.push({
			title : name + ', ' + st,
			name : name,
			pop : pop,
			lat : lat,
			lng : lng,
			dist : dist,
			st : st,
			county : county,
			us : us,
			cp : cp,
			id : id
		});
		geo.next();
	};
	return data;
};

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var savTable = Ti.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});
//Table End

savTable.addEventListener("scrollend", function() {
	savTable.setData(rowInfo());
	alert("Local Storage has been Updated");
});

//timesTable evt listener start
savTable.addEventListener('click', function(e) {
	var sWin = Ti.UI.createWindow({
		height : '70%',
		width : '90%'
	});

	var id = e.source.id;
	var sec = dataB.execute("SELECT * FROM geoloc WHERE id=?", id);
	var sel = {};
	sel.name = sec.fieldByName('name');
	sel.pop = e.source.pop;
	sel.lat = e.source.lat;
	sel.lng = e.source.lng;
	sel.dist = e.source.dist;
	sel.st = e.source.st;
	sel.county = e.source.county;
	sel.us = e.source.us;
	sel.cp = e.source.cp;

	console.log(sel.name);

	///////////// views START /////////////
	var viewbng = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "black",
		borderRadius : '15%'
	});
	var views = Ti.UI.createView({
		backgroundColor : "#fff",
		width : '85%',
		height : '85%',
		borderRadius : '15%'
	});
	///////////// views END /////////////

	//delete button start
	var deleteBTN = Ti.UI.createButton({
		title : "DELETE",
		top : '2%',
		right : '7.5%',
		font : {
			fontSize : 20
		},
		color : "#FF0000"
	});

	deleteBTN.addEventListener('click', function() {
		var deleteDIA = Ti.UI.createAlertDialog({
			title : 'Delete Location?',
			buttonNames : ['Delete', 'Cancel']
		});
		deleteDIA.show();
		deleteDIA.addEventListener('click', function(a) {
			if (a.index === 0) {
				dataB.execute("DELETE FROM geoloc WHERE id=?", id);		
				savTable.setData(rowInfo());
				views.visible = false;
				viewbng.visible = false;
				sWin.close();
			} else {null;
			}

		});

	});

	//delete button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '2%',
		left : '7.5%',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : '#00CED1'
	});
	cancelBTN.addEventListener('click', function() {
		views.visible = false;
		viewbng.visible = false;
		sWin.close();
	});
	//cancel button end

	//Map views start
	var Map = require('ti.map');

	var view = Map.createAnnotation({
		latitude : sel.lat,
		longitude : sel.lng
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		annotations : [view],
		region : {
			latitude : sel.lat,
			longitude : sel.lng,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		enableZoomControls : true,
		regionFit : true,
		width : '100%'
	});
	//Map views end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '0%',
		text : sel.name + ', ' + sel.st,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '32%',
			fontWeight : 'bold'
		},
		color : '#fff'
	});

	var countyLabel = Ti.UI.createLabel({
		top : '23%',
		left : '0%',
		text : sel.county,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '28%'
		},
		color : '#fff'
	});

	var popLabel = Ti.UI.createLabel({
		top : '45%',
		left : '0%',
		text : sel.pop,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '24%'
		},
		color : '#fff'
	});

	var distLabel = Ti.UI.createLabel({
		top : '60%',
		left : '0%',
		text : 'Dist: ' + sel.dist + ' Mile(s)',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '24%'
		},
		color : '#fff'
	});

	var usLabel = Ti.UI.createLabel({
		top : '0%',
		right : '0%',
		text : sel.us,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '34%'
		},
		color : '#fff'
	});

	var cpLabel = Ti.UI.createLabel({
		bottom : '0%',
		center : '0%',
		text : sel.cp,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '15%'
		},
		color : '#fff'
	});
	//Labels End

	//View to hold all the labels
	var textView = Ti.UI.createView({
		top : '69.9%',
		height : Ti.UI.FILL,
		width : '100%',
		backgroundColor : '#000'
	});
	textView.add(titleView, countyLabel, popLabel, distLabel, usLabel, cpLabel);

	//EventListener Main Code
	views.add(mapview, textView);
	viewbng.add(views, cancelBTN, deleteBTN);
	sWin.add(viewbng);
	sWin.open();
});

savTable.setData(rowInfo());
favWin.add(savTable);





//CLOUD>JS
var Cloud = require('ti.cloud');
var cData = [];

//Window Start
var cloudWin = Ti.UI.createWindow({
	title : 'Cloud Store',
	backgroundColor : 'red'
});
exports.cloudWin = cloudWin;
//Window End

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var cloudTable = Ti.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});
//Table End

cloudTable.addEventListener("scrollend", function() {
	var nData = [];
		cloudTable.setData(nData);
	var id, name, longitude, latitude;
	//getting data from the cloud
	Cloud.Places.search({
	}, function(e) {
		if (e.success) {
			cloudTable.data = [];
			for (var i = 0; i < e.places.length; i++) {
				var place = e.places[i];
				id = place.id;
				name = place.name;
				lng = place.longitude;
				lat = place.latitude;

				var rows = Ti.UI.createTableViewRow({
					height : '5%',
					title : name,
					name : name,
					lat : lat,
					lng : lng,
					id : id
				});

				nData.push(rows);
			}
			cloudTable.data = nData;
		} else {
			alert('Error');
		}
	});
	cloudTable.setData(cData);
	alert("Cloud Storage has been Updated");
});

//timesTable evt listener start
cloudTable.addEventListener('click', function(a) {
	var sWin = Ti.UI.createWindow({
		height : '70%',
		width : '90%'
	});

	var id, name, longitude, latitude;

	id = a.rowData.id;
	name = a.rowData.name;
	longitude = a.rowData.lng;
	latitude = a.rowData.lng;

	console.log(name);

	///////////// views START /////////////
	var viewbng = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "black",
		borderRadius : '15%'
	});
	var views = Ti.UI.createView({
		backgroundColor : "#fff",
		width : '85%',
		height : '85%',
		borderRadius : '15%'
	});
	///////////// views END /////////////

	//delete button start
	var deleteBTN = Ti.UI.createButton({
		title : "DELETE",
		top : '2%',
		right : '7.5%',
		font : {
			fontSize : 20
		},
		color : "#FF0000"
	});

	deleteBTN.addEventListener('click', function() {
		var deleteDIA = Ti.UI.createAlertDialog({
			title : 'Delete Location?',
			buttonNames : ['Delete', 'Cancel']
		});
		deleteDIA.show();
		deleteDIA.addEventListener('click', function(a) {
			//delete from cloud loop
			if (a.index === 0) {
				Cloud.Places.remove({
					place_id : id
				}, function(a) {
					if (a.success) {
						alert(name + ' has been deleted from the Cloud');
						cloudTable.setData(cData);
						views.visible = false;
						viewbng.visible = false;
						sWin.close();
					} else if (a.error) {
						alert('error');
					}
				});
			} else {null;
			}

		});

	});
	//delete button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '2%',
		left : '7.5%',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : '#00CED1'
	});
	cancelBTN.addEventListener('click', function() {
		views.visible = false;
		viewbng.visible = false;
		sWin.close();
	});
	//cancel button end

	//Map views start
	var Map = require('ti.map');

	var view = Map.createAnnotation({
		latitude : lat,
		longitude : lng
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		annotations : [view],
		region : {
			latitude : lat,
			longitude : lng,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		enableZoomControls : true,
		regionFit : true,
		width : '100%'
	});
	//Map views end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '0%',
		text : name,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '36%',
			fontWeight : 'bold'
		},
		color : '#fff'
	});

	var idLabel = Ti.UI.createLabel({
		top : '45%',
		left : '7%',
		text : 'ID: ' + id,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		},
		color : '#fff'
	});
	//Labels End

	//View to hold all the labels
	var textView = Ti.UI.createView({
		top : '69.9%',
		height : Ti.UI.FILL,
		width : '100%',
		backgroundColor : '#000'
	});
	textView.add(titleView, idLabel);

	//EventListener Main Code
	views.add(mapview, textView);
	viewbng.add(views, cancelBTN, deleteBTN);
	sWin.add(viewbng);
	sWin.open();
});

cloudTable.setData(cData);
cloudWin.add(cloudTable);