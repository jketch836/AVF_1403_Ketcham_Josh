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
	Ti.Geolocation.purpose = "NYTIMES GEO would like to access your current location.";

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
