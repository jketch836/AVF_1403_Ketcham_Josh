var db = Ti.Database.open('weatherDB');
db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, url TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrw TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT)');

//Start GEOLOC and remotedata pull func
var apiGEO = function() {
	//Start GEOLOC func
	Ti.Geolocation.purpose = "WeatherAPP would like to access your current location.";

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
			var key = '4e7dc583deb76743';
			var url = 'http://api.wunderground.com/api/' + key + '/forecast7day/astronomy/hourly/geolookup/q/' + lat + ',' + lng + '.json';
			console.log(url);
		}
		// End GEOLOC func

		// Start remotedata pull
		var data = [];
		var json, results;
		var state, city, dist, url, forecast, simfore, forecasthr;
		var feels, sunrise, sunset;

		var mainNight, mainNightIcon, today, todayIcon, todayTemp, humid, todaySky, tmrw, tmrwIcon, day3, day3Icon;
		var day4, day4Icon, day5, day5Icon, day6, day6Icon, day7, day7Icon, feels;
		var remoteResponse = function() {
			// Response function code
			json = JSON.parse(this.responseText);
			state = json.location.state;
			city = json.location.city;
			url = json.location.wuiurl;

			sunrise = json.sun_phase.sunrise;
			sunset = json.sun_phase.sunset;

			forecast = json.forecast.txt_forecast.forecastday;
			simfore = json.forecast.simpleforecast.forecastday;
			hrs = json.hourly_forecast;

			for (var a = 0; a < forecast.length; a++) {
				mainNight = forecast[1].title;
				mainNightIcon = forecast[1].icon_url;

				for (var b = 0; b < simfore.length; b++) {
					today = simfore[0].date.weekday_short;
					todayIcon = simfore[0].date.icon_url;
					todayTemp = simfore[0].high.fahrenheit + ' / ' + simfore[0].low.fahrenheit;
					todayhumid = simfore[0].avehumidity + '%';
					todaySky = simfore[0].condition;

					tmrw = simfore[1].date.weekday_short;
					tmrwIcon = simfore[1].date.icon_url;
					tmrwTemp = simfore[1].high.fahrenheit + ' / ' + simfore[1].low.fahrenheit;

					day3 = simfore[2].date.weekday_short;
					day3Icon = simfore[2].date.icon_url;
					day3Temp = simfore[2].high.fahrenheit + ' / ' + simfore[2].low.fahrenheit;

					day4 = simfore[3].date.weekday_short;
					day4Icon = simfore[3].date.icon_url;
					day4Temp = simfore[3].high.fahrenheit + ' / ' + simfore[3].low.fahrenheit;

					day5 = simfore[4].date.weekday_short;
					day5Icon = simfore[4].date.icon_url;
					day5Temp = simfore[4].high.fahrenheit + ' / ' + simfore[4].low.fahrenheit;

					day6 = simfore[5].date.weekday_short;
					day6Icon = simfore[5].date.icon_url;
					day6Temp = simfore[5].high.fahrenheit + ' / ' + simfore[5].low.fahrenheit;

					day7 = simfore[6].date.weekday_short;
					day7Icon = simfore[6].date.icon_url;
					day7Temp = simfore[6].high.fahrenheit + ' / ' + simfore[6].low.fahrenheit;

					for (var c = 0; c < hrs.length; c++) {
						feels = hrs[0].feelslike.english;
					};

				};

			};
			
			db.execute("INSERT INTO weather (state, city, url, sunrise, sunset, mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", state, city, url, sunrise, sunset, mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels);

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

//Run GEOLOC and remotedata pull func
apiGEO();
