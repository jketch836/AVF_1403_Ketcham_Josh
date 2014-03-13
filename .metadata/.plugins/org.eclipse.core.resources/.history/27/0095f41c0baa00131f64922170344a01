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
	Ti.Geolocation.purpose = "Your location is needed to find places near you.";

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (Ti.Geolocation.locationServicesEnabled) {
		} else {
			alert("Location service is not enabled.");
		};
		if (e.error) {
			alert("Cannot get your location. Trying to connect...");
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
				lat = response.results[i].geocode.latitude;
				lng = response.results[i].geocode.longitude;
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

			var Map = require('ti.map');
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE,
				region : {latitude : lat , longitude : lng,
						  laditudeDelta : 0.1, longitudeDelta : 0.1},
				regionFit : true
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

};
// End remote data pull
// End GEOLOC and remotedata pull func

//Run GEOLOC and remotedata pull func
runGeo();

//Main Code
mapWin.add(holder);