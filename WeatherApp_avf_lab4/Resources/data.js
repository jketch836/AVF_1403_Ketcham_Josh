var db = Ti.Database.open('weatherDB');
db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, url TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrw TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT)');
exports.db = db;

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
			// console.log(url);
		}
		// End GEOLOC func

		// Start remotedata pull

		var remoteResponse = function() {
			var json, state, city, url, forecast, simfore, forecasthr;
			var feels, sunrise, sunset;

			var mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp;
			var day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels;

			// Response function code
			json = JSON.parse(this.responseText);
			forecast = json.forecast.txt_forecast.forecastday;
			simfore = json.forecast.simpleforecast.forecastday;
			hrs = json.hourly_forecast;
			// db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, url TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrw TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT)');

			state = json.location.state;
			city = json.location.city;
			url = json.location.wuiurl;

			sunrise = json.sun_phase.sunrise.hour + ':' + json.sun_phase.sunrise.minute;
			sunset = json.sun_phase.sunset.hour + ':' + json.sun_phase.sunset.minute;

			// for (var a = 0; a < forecast.length; a++) {
			mainNight = forecast[1].title;
			mainNightIcon = forecast[1].icon_url;

			// for (var b = 0; b < simfore.length; b++) {
			today = simfore[0].date.weekday_short;
			todayIcon = simfore[0].icon_url;
			todayTemp = simfore[0].high.fahrenheit + ' / ' + simfore[0].low.fahrenheit;
			todayhumid = simfore[0].avehumidity + '%';
			todaySky = simfore[0].conditions;

			// console.log(todaySky);
			// console.log(todayIcon);

			tmrw = simfore[1].date.weekday_short;
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

			// for (var c = 0; c < hrs.length; c++) {
			feels = hrs[0].feelslike.english;
			// };

			// };

			// };
			db.execute("INSERT INTO weather (state, city, url, sunrise, sunset, mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", state, city, url, sunrise, sunset, mainNight, mainNightIcon, today, todayIcon, todayTemp, todayhumid, todaySky, tmrw, tmrwIcon, tmrwTemp, day3, day3Icon, day3Temp, day4, day4Icon, day4Temp, day5, day5Icon, day5Temp, day6, day6Icon, day6Temp, day7, day7Icon, day7Temp, feels);

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


var rowInfo = function() {
	var array = [];
	var wea = db.execute("SELECT * FROM weather");

	while (wea.isValidRow()) {
		var state = wea.fieldByName('state');
		var city = wea.fieldByName('city');
		var url = wea.fieldByName('url');
		var sunrise = wea.fieldByName('sunrise');
		var sunset = wea.fieldByName('sunset');
		var mainNight = wea.fieldByName('mainNight');
		var mainNightIcon = wea.fieldByName('mainNightIcon');
		var todayIcon = wea.fieldByName('todayIcon');
		var todayTemp = wea.fieldByName('todayTemp');
		var todayhumid = wea.fieldByName('todayhumid');
		var todaySky = wea.fieldByName('todaySky');
		var county = wea.fieldByName('county');
		var tmrw = wea.fieldByName('tmrw');
		var tmrwIcon = wea.fieldByName('tmrwIcon');
		var tmrwTemp = wea.fieldByName('tmrwTemp');
		var day3 = wea.fieldByName('day3');
		var day3Icon = wea.fieldByName('day3Icon');
		var day3Temp = wea.fieldByName('day3Temp');
		var day4 = wea.fieldByName('day4');
		var day4Icon = wea.fieldByName('day4Icon');
		var day4Temp = wea.fieldByName('day4Temp');
		var day5 = wea.fieldByName('day5');
		var day5Icon = wea.fieldByName('day5Icon');
		var day5Temp = wea.fieldByName('day5Temp');
		var day6 = wea.fieldByName('day6');
		var day6Icon = wea.fieldByName('day6Icon');
		var day6Temp = wea.fieldByName('day6Temp');
		var day7 = wea.fieldByName('day7');
		var day7Icon = wea.fieldByName('day7Icon');
		var day7Temp = wea.fieldByName('day&Temp');
		var feels = wea.fieldByName('feels');
		var id = wea.fieldByName('id');

		// array.push({
			// state : state,
			// city : city,
			// url : url,
			// sunrise : sunrise,
			// sunset : sunset,
			// mainNight : mainNight,
			// mainNightIcon : mainNightIcon,
			// today : today,
			// todayIcon : todayIcon,
			// todayTemp : todayTemp,
			// todayhumid : todayhumid,
			// todaySky : todaySky,
			// tmrw : tmrw,
			// tmrwIcon : tmrwIcon,
			// tmrwTemp : tmrwTemp,
			// day3 : day3,
			// day3Icon : day3Icon,
			// day3Temp : day3Temp,
			// day4 : day4,
			// day4Icon : day4Icon,
			// day4Temp : day4Temp,
			// day5 : day5,
			// day5Icon : day5Icon,
			// day5Temp : day5Temp,
			// day6 : day6,
			// day6Icon : day6Icon,
			// day6Temp : day6Temp,
			// day7 : day7,
			// day7Icon : day7Icon,
			// day7Temp : day7Temp,
			// feels : feels
		// });
		wea.next();
	};
	// return array;
};