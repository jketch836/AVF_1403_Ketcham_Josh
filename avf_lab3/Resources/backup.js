(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function(){
		Cloud.Users.login({
			login: 'com.fullsail.demoApp',
			password: '12345'
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				Ti.API.info('Success!\n' + 
					'ACS User ID: ' + user.id + '\n' + 
					'ACS App sessionId: ' + Cloud.sessionId + '\n' + 
					'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();



//requiring JS files
var pics = require('photos');

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
			var api = 'e75955012e89d04a309c7585f8c140df';
			var url = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.photosForLocation&api_key=" + api + '&lat=' + lat + '&lon=' + lng + '&accuracy=11' + '&per_page=15';
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
		var remoteResponse = function() {
			// Response function code
			json = JSON.parse(this.responseText);
			var picjson = json.photos.photo;
			for (var i = 0; i < json.photos.photo.length; i++) {
				name = picjson[i].name;
				place = picjson[i].place;
				thumbnail = picjson[i].photo;
			}
			data.push({
				properties : {
					name : name,
					place : place,
					thumbnail : thumbnail,
				},
				name : {
					text : name
				},
				place : {
					text : place
				},
				thumbnail : {
					image : thumbnail
				}
			});

			// Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_KILOMETER;
			// var kilo = Ti.Geolocation.accuracy;
			var Map = require('ti.map');
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE,
				// accuracy : kilo
			});

			mapWin.add(mapview);

			//pushing rows to table
			pics.secList.setItems(data);(info);
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



//requiring JS files
var pics = require('photos');

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
			var api = 'e75955012e89d04a309c7585f8c140df';
			var url = "http://api.wikilocation.org/articles?lat=" + lat + '&lon=' + lng;
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
		var remoteResponse = function() {
			// Response function code
			json = JSON.parse(this.responseText);
			var articlejson = json.articles;
			for (var i = 0; i < articlejson.length; i++) {
				title = articlejson[i].title;
				lat = articlejson[i].lat;
				lng = articlejson[i].lng;
				dist = articlejson[i].distance;
			}
			data.push({
				properties : {
					title : title,
					lat : lat,
					lng : lng,
					dist : dist,
				},
				title : {
					text : title
				},
				lat : {
					text : lat
				},
				lng : {
					text : lng
				},
				dist : {
					text : dist
				}
			});

			// Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_KILOMETER;
			// var kilo = Ti.Geolocation.accuracy;
			var Map = require('ti.map');
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE,
				// accuracy : kilo
			});

			mapWin.add(mapview);

			//pushing rows to table
			pics.secList.setItems(info);
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

