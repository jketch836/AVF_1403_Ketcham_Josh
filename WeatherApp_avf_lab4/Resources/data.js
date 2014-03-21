var db = Ti.Database.open('weatherDB');
db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT, time TEXT, id1 TEXT, id2 TEXT, id3 TEXT, id4 TEXT)');
exports.db = db;

//Start GEOLOC and remotedata pull func
var apiGEO = function() {
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
			var url = 'http://api.wunderground.com/api/' + key + '/forecast7day/astronomy/hourly/geolookup/q/' + lat + ',' + lng + '.json';
			// console.log(url);
		}
		// End GEOLOC func

		// Start remotedata pull
		var remoteResponse = function() {
			var json, state, city, url, forecast, simfore, forecasthr;
			var feels, sunrise, sunset;

			var mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp;
			var day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels;
			var id1, id2, id3, id4;

			// Response function code
			json = JSON.parse(this.responseText);
			forecast = json.forecast.txt_forecast.forecastday;
			simfore = json.forecast.simpleforecast.forecastday;
			hrs = json.hourly_forecast;
			
			state = json.location.state;
			city = json.location.city;

			sunrise = json.sun_phase.sunrise.hour + ':' + json.sun_phase.sunrise.minute;
			sunset = json.sun_phase.sunset.hour + ':' + json.sun_phase.sunset.minute;
			
			//rich edit: added this line
			id1 = json.location.type;
			id2 = forecast.period;
			id3 = simfore[0].date.epoch;
			id4 = hrs.uvi;

			mainNight = forecast[1].title;
			mainNightIcon = forecast[1].icon_url;

			today = simfore[0].date.weekday_short;
			todayIcon = simfore[0].icon_url;
			todayTemp = hrs[0].temp.english;
			todayhumid = hrs[0].humidity + '%';
			todaySky = simfore[0].conditions;
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
			time = hrs[0].FCTTIME.pretty;
			
			// console.log(id1 + "..........");
		
			db.execute("INSERT INTO weather (state, city, sunrise, sunset, mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels, time, id1, id2, id3, id4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", state, city, sunrise, sunset, mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels, time, id1, id2, id3, id4);

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

		xhr.open("GET", url);
		xhr.send();
	});
	// End remote data pull
};
// End GEOLOC and remotedata pull func

//Export GEOLOC and remotedata pull func
exports.apiGEO = apiGEO();