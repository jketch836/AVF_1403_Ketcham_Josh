var dataB = Ti.Database.open('GeoDB');
dataB.execute('CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY, name TEXT, st TEXT, population TEXT, lat INTEGER, lng INTEGER, dist TEXT, county TEXT, us TEXT, cp TEXT)');

//window start
var mapWin = Ti.UI.createWindow({
	title : "Info"
});
exports.mapWin = mapWin;
//window end

//this View holds the map
var theMapView = Ti.UI.createView({
	top : '10%',
	height : '60%',
	width : '100%'
});

//Start GEOLOC and remotedata pull func
var runGeo = function() {
	//Start GEOLOC func
	Ti.Geolocation.purpose = "NYTIMES GEO would like to access your location.";

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

				info.push({
					properties : {
						name : name,
						population : population,
						lat : lat,
						lng : lng,
						dist : dist,
						st : st,
						county : county,
						us : us,
						cp : cp
					},
					name : {
						text : name + ', ' + st
					},
					population : {
						text : population
					},
					lat : {
						text : lat
					},
					lng : {
						text : lng
					},
					dist : {
						text : dist
					},
					st : {
						text : st
					},
					county : {
						text : county
					},
					us : {
						text : us
					},
					cp : {
						text : cp
					}
				});
			}
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
				regionFit : true
			});

			theMapView.add(mapview);

			//pushing rows to table
			secList.setItems(info);
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
		mapWin.add(coordinateLabel);

		xhr.open("GET", url);
		xhr.send();
	});
	// End remote data pull
};
// End GEOLOC and remotedata pull func

//Run GEOLOC and remotedata pull func
runGeo();

// //the Scroll View for listview
// var characterScroll = Ti.UI.createScrollView({
	// layout : 'vertical',
	// height : '100%',
	// width : '100%',
	// showVerticalScrollIndicator : true
// });

//ListView Template Start
geoListTemplate = {
	properties : {
		top : '20%',
		height : '75dp'
	},
	childTemplates : [{
		type : "Ti.UI.ImageView",
		bindId : 'theMapView',
		properties : {
			width : '20%',
			height : '20%',
			left : '5%',
			top : '0%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'name',
		properties : {
			color : "black",
			font : {
				fontSize : '18%',
				fontFamily : "Arial",
				fontWeight : "bold"
			},
			left : '15%',
			top : '20%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'county',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			left : '15%',
			top : '60%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'us',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			right : '10%',
			top : '20%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'population',
		properties : {
			color : "black",
			font : {
				fontSize : '16%',
				fontFamily : "Arial"
			},
			right : '10%',
			top : '60%'
		}
	}, {
		type : "Ti.UI.Label",
		bindId : 'cp',
		properties : {
			color : "black",
			font : {
				fontSize : '10%',
				fontFamily : "Arial"
			},
			center : '0%',
			bottom : '0%'
		}
	}]
};
//ListView Template End

//ListSection Start
var secList = Ti.UI.createListSection({
});
//ListSection End
//ListView Start
var infoListView = Ti.UI.createListView({
	templates : {
		'defaultTemplate' : geoListTemplate
	},
	defaultItemTemplate : 'defaultTemplate'
});
//ListView End

infoListView.addEventListener('itemclick', function() {
	var name, population, lat, lng, dist, st, county, us, cp; 
	name = secList.getItem('name');
	console.log(name);

	var saveDIA = Ti.UI.createAlertDialog({
		title : 'Save Info?',
		buttonNames : ['Cancel', 'Save']
	});
	saveDIA.show();
	saveDIA.addEventListener('click', function(a) {
		if (a.index === 1) {
			dataB.execute("INSERT INTO location(name, population, lat, lng, dist, st, county, us, cp) VALUES (?,?,?,?,?,?,?,?,?)", name, population, lat, lng, dist, st, county, us, cp);
			alert(name + " has been added to your favorites list");
			tWin.close();
		} else {null;
		}

	});
});

//Main Code
infoListView.sections = [secList];
// characterScroll.add(infoListView);
mapWin.add(infoListView);
mapWin.open();
