var db = Ti.Database.open('weatherDB');
db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, sunrise TEXT, sunset TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT, time TEXT)');
exports.db = db;

//Start GEOLOC and remotedata pull func
var apiGEO = function() {
	if (Ti.Network.networkType != Ti.Network.NETWORK_NONE){
	//Start GEOLOC func
	Ti.Geolocation.purpose = "8Bit Weather would like to use your current location.";

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (Ti.Geolocation.locationServicesEnabled) {
		} else {
			alert("Location is not availble. Please go to Settings to change this.");
		};
		if (e.error) {
			alert("Cannot Connect to the Internet");
		} else {
			
		
			var lat = e.coords.latitude;
			var lng = e.coords.longitude;
			var key = '4e7dc583deb76743';
			var url = 'http://api.wunderground.com/api/' + key + '/forecast7day/conditions/astronomy/hourly/geolookup/q/' + lat + ',' + lng + '.json';
			// var url = 'http://api.wunderground.com/api/' + key + '/forecast7day/astronomy/hourly/geolookup/q/' + '37.782227' + ',' + '-122.393159' + '.json';
			
			// console.log(url);
		}
		// End GEOLOC func

		// Start remotedata pull
		var remoteResponse = function() {
			var json, state, city, url, forecast, con, simfore, forecasthr;
			var feels, sunrise, sunset;

			var today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp;
			var day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels;
			var id1, id2, id3, id4;

			// Response function code
			json = JSON.parse(this.responseText);
			simfore = json.forecast.simpleforecast.forecastday;
			hrs = json.hourly_forecast;
			con = json.current_observation;
			
			state = json.location.state;
			city = json.location.city;

			sunrise = json.sun_phase.sunrise.hour + ':' + json.sun_phase.sunrise.minute;
			sunset = json.sun_phase.sunset.hour + ':' + json.sun_phase.sunset.minute;
			
			// //rich edit: added this line
			// id1 = json.location.type;
			// id3 = simfore[0].date.epoch;
			// id4 = hrs.uvi;

			todayIcon = hrs[0].icon_url;
			todayTemp = hrs[0].temp.english;
			todayhumid = hrs[0].humidity + '%';
			todaySky = hrs[0].condition;
			// console.log(todayIcon);
			// console.log(todaySky);

			tmrwIcon = simfore[1].icon_url;
			tmrwTemp = simfore[1].high.fahrenheit + ' / ' + simfore[1].low.fahrenheit;

			day3 = simfore[2].date.weekday_short;
			day3Icon = simfore[2].icon_url;
			day3Temp = simfore[2].high.fahrenheit + ' / ' + simfore[2].low.fahrenheit;

			day4 = simfore[3].date.weekday_short;
			day4Icon = simfore[3].icon_url;
			day4Temp = simfore[3].high.fahrenheit + ' / ' + simfore[3].low.fahrenheit;
			// console.log(day4);

			day5 = simfore[4].date.weekday_short;
			day5Icon = simfore[4].icon_url;
			day5Temp = simfore[4].high.fahrenheit + ' / ' + simfore[4].low.fahrenheit;

			day6 = simfore[5].date.weekday_short;
			day6Icon = simfore[5].icon_url;
			day6Temp = simfore[5].high.fahrenheit + ' / ' + simfore[5].low.fahrenheit;

			day7 = simfore[6].date.weekday_short;
			day7Icon = simfore[6].icon_url;
			day7Temp = simfore[6].high.fahrenheit + ' / ' + simfore[6].low.fahrenheit;

			feels = hrs[0].feelslike.english;
			time = con.observation_time;
		
			db.execute("INSERT INTO weather (state, city, sunrise, sunset, todayIcon, todayTemp, todayhumid, todaySky, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, feels, time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", state, city, sunrise, sunset, todayIcon, todayTemp, todayhumid, todaySky, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, feels, time);

			var info = db.execute("SELECT * FROM weather");
			st.text = info.fieldByName('state');
			thecity.text = info.fieldByName('city');
			sunriseTIME.text = info.fieldByName('sunrise');
			sunsetLBLtime.text = info.fieldByName('sunset');
			icon.image = info.fieldByName('todayIcon');
			temp.text = info.fieldByName('todayTemp');
			humidityPERCENT.text = info.fieldByName('todayhumid');
			weaterCondition.text = info.fieldByName('todaySky');
			thetmrwICON.image = info.fieldByName('tmrwIcon');
			thetmrwTEMP.text = info.fieldByName('tmrwTemp');
			theday3LBL.text = info.fieldByName('day3');
			theday3ICON.image = info.fieldByName('day3Icon');
			theday3TEMP.text = info.fieldByName('day3Temp');
			theday4LBL.text = info.fieldByName('day4');
			theday4ICON.image = info.fieldByName('day4Icon');
			theday4TEMP.text = info.fieldByName('day4Temp');
			theday5LBL.text = info.fieldByName('day5');
			theday5ICON.image = info.fieldByName('day5Icon');
			theday5TEMP.text = info.fieldByName('day5Temp');
			theday6LBL.text = info.fieldByName('day6');
			theday6ICON.image = info.fieldByName('day6Icon');
			theday6TEMP.text = info.fieldByName('day6Temp');
			feelstemp.text = info.fieldByName('feels');
			lastupdatedLBL.text = info.fieldByName('time');
		};

		//if there is a problem pulling the data
		var remoteError = function(e) {
			Ti.API.debug("Status: " + this.status);
			Ti.API.debug("Text: " + this.responseText);
			Ti.API.debug("Error: " + e.error);
			alert("There is a problem connecting to the Internet. Cannot update data");
		};

		//getting the data
		var xhr = Ti.Network.createHTTPClient({
			onload : remoteResponse,
			onerror : remoteError,
			timeout : 5000
		});

		xhr.open("GET", url);
		xhr.send();
	});
	// End remote data pull
	} else {
		var alertDialog = Titanium.UI.createAlertDialog({
              title: 'Network Issues',
              message: 'Your device is not online.',
              buttonNames: ['OK']
            });
            alertDialog.show();
	}
};
// End GEOLOC and remotedata pull func

//Export GEOLOC and remotedata pull func
exports.apiGEO = apiGEO;
