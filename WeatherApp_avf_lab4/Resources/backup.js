// require JS files
var data = require('data');
var Cloud = require('ti.cloud');

Ti.UI.setBackgroundColor('white');

(function() {
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

var info = data.db.execute("SELECT * FROM weather");
var box = {};
box.state = info.fieldByName('state');
box.city = info.fieldByName('city');
box.sunrise = info.fieldByName('sunrise');
box.sunset = info.fieldByName('sunset');
box.mainNight = info.fieldByName('mainNight');
box.mainNightIcon = info.fieldByName('mainNightIcon');
box.today = info.fieldByName('today');
box.todayIcon = info.fieldByName('todayIcon');
box.todayTemp = info.fieldByName('todayTemp');
box.todayhumid = info.fieldByName('todayhumid');
box.todaySky = info.fieldByName('todaySky');
box.tmrwIcon = info.fieldByName('tmrwIcon');
box.tmrwTemp = info.fieldByName('tmrwTemp');
box.day3 = info.fieldByName('day3');
box.day3Icon = info.fieldByName('day3Icon');
box.day3Temp = info.fieldByName('day3Temp');
box.day4 = info.fieldByName('day4');
box.day4Icon = info.fieldByName('day4Icon');
box.day4Temp = info.fieldByName('day4Temp');
box.day5 = info.fieldByName('day5');
box.day5Icon = info.fieldByName('day5Icon');
box.day5Temp = info.fieldByName('day5Temp');
box.day6 = info.fieldByName('day6');
box.day6Icon = info.fieldByName('day6Icon');
box.day6Temp = info.fieldByName('day6Temp');
box.day7 = info.fieldByName('day7');
box.day7Icon = info.fieldByName('day7Icon');
box.day7Temp = info.fieldByName('day7Temp');
box.feels = info.fieldByName('feels');
box.time = info.fieldByName('time');
box.id1 = info.fieldByName('id1');
box.id2 = info.fieldByName('id2');
box.id3 = info.fieldByName('id3');
box.id4 = info.fieldByName('id4');

data.apiGEO;
// console.log(box.sunrise);

var wWin = Ti.UI.createWindow({
	orientationModes : [Ti.UI.LANDSCAPE_LEFT],
	backgroundColor : '#fff'
});

// wWin.addEventListener("scrollend", function() {
//
// });

var BNG = Ti.UI.createView({
	top : '3%',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	// backgroundColor : '#7D9EC0'
	backgroundImage : '8bitwallpaper.png'
});

//Main Weather INFO Start
//view to hold main weather info
var cityTemp = Ti.UI.createView({
	top : '10%',
	center : '0%',
	width : '70%',
	height : '17%',
	backgroundColor : "black",
	borderRadius : '15%'
});

//main Weather icon
var icon = Ti.UI.createImageView({
	height : '100%',
	width : '23%',
	center : '0%',
	image : box.todayIcon
});

var cityBIT = Ti.UI.createImageView({
	top : '12%',
	center : '0%',
	width : '71.5%',
	height : '18%',
	image : 'citybit.png'
});

//main Weather Labels start
var city = Ti.UI.createLabel({
	top : '25%',
	right : '65%',
	text : box.city,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var st = Ti.UI.createLabel({
	top : '47%',
	right : '65%',
	text : box.state,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var weaterCondition = Ti.UI.createLabel({
	top : '25%',
	left : '65%',
	text : box.todaySky,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var temp = Ti.UI.createLabel({
	top : '47%',
	left : '65%',
	text : box.todayTemp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var degree1 = Ti.UI.createLabel({
	top : '46%',
	left : '69.5%',
	text : 'o',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '18dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var degreeType = Ti.UI.createLabel({
	top : '47%',
	left : '71.5%',
	text : 'F',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '26dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});
//main Weather Labels end
//Main Weather INFO End

//Secondary Weather INFO Start
//view to hold sec weather info
var FHSS = Ti.UI.createView({
	bottom : '45%',
	center : '0%',
	width : '80%',
	height : '15%',
	backgroundColor : "black",
	borderRadius : '15%'
});

//8bit image
var secBIT = Ti.UI.createImageView({
	bottom : '42.5%',
	center : '0%',
	width : '81.5%',
	height : '16.5%',
	image : 'secBIT.png'
});

//main Weather Labels start
//feels like LBL
var feelsLBL = Ti.UI.createLabel({
	top : '25%',
	left : '5%',
	text : 'Feels Like:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var feelstemp = Ti.UI.createLabel({
	top : '50%',
	left : '10%',
	text : box.feels,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	color : '#fff'
});

//humidity LBL
var humidityLBL = Ti.UI.createLabel({
	top : '25%',
	left : '30%',
	text : 'Humidity:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var humidityPERCENT = Ti.UI.createLabel({
	top : '50%',
	left : '34%',
	text : box.todayhumid,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	color : '#fff'
});

//sunrise LBL
var sunriseLBL = Ti.UI.createLabel({
	top : '25%',
	right : '30%',
	text : 'Sunrise:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var sunriseTIME = Ti.UI.createLabel({
	top : '50%',
	right : '32%',
	text : box.sunrise,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	color : '#fff'
});

//sunset LBL
var sunsetLBL = Ti.UI.createLabel({
	top : '25%',
	right : '10%',
	text : 'Sunset:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var sunsetLBLtime = Ti.UI.createLabel({
	top : '50%',
	right : '11%',
	text : box.sunset,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	color : '#fff'
});
//main Weather Labels end
//Main Weather INFO End

//7day Forecast Start
var forcestV = Ti.UI.createView({
	bottom : '20.5%',
	height : '3%',
	width : Ti.UI.FILL,
	backgroundColor : '#000'
});

var forcestLBL = Ti.UI.createLabel({
	left : '3%',
	text : '5 Day Forcast',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '20dp'
	},
	color : '#fff',

});
forcestV.add(forcestLBL);

//7day View holder
var forcast5 = Ti.UI.createView({
	bottom : '3%',
	width : Ti.UI.FILL,
	height : '18.5%',
	backgroundColor : "#fff"
});

//8bit 7days
var day7BIT = Ti.UI.createImageView({
	bottom : '3%',
	width : Ti.UI.FILL,
	height : '19%',
	image : '7dayBIT.png'
});

//Tomorrow info start
var tmrwV = Ti.UI.createView({
	bottom : '0%',
	left : '0%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var tmrwLBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : 'Tomorrow',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var tmrwICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : box.tmrwIcon
	// image : 'partly_cloudy.png'
});

var tmrwTEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : box.tmrwTemp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
tmrwV.add(tmrwLBL, tmrwICON, tmrwTEMP);
//Tomorrow info end

//day3 info start
var day3V = Ti.UI.createView({
	bottom : '0%',
	left : '20%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
});

var day3LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day3,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var day3ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : box.day3Icon
});

var day3TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : box.day3Temp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day3V.add(day3LBL, day3ICON, day3TEMP);
//day3 info end

//day4 info start
var day4V = Ti.UI.createView({
	bottom : '0%',
	left : '40%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
});

var day4LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day4,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var day4ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : box.day4Icon
});

var day4TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : box.day4Temp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day4V.add(day4LBL, day4ICON, day4TEMP);
//day4 info end

//day5 info start
var day5V = Ti.UI.createView({
	bottom : '0%',
	right : '20%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
});

var day5LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day5,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var day5ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : box.day5Icon
});

var day5TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : box.day5Temp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day5V.add(day5LBL, day5ICON, day5TEMP);
//day5 info end

//day6 info start
var day6V = Ti.UI.createView({
	bottom : '0%',
	right : '0%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
});

var day6LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day6,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var day6ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : box.day6Icon
});

var day6TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : box.day6Temp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day6V.add(day6LBL, day6ICON, day6TEMP);
//day6 info end
//7day view end

//Save to cloud start
//save label
var save = Ti.UI.createLabel({
	bottom : '23%',
	right : '3%',
	text : 'Save',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
//save eventlistener
save.addEventListener('click', function() {
	//push to cloud
	Cloud.Places.create({
		name : '32Bit Weather',
		city : box.city,
		state : box.state,
		custom_fields : {
			"Day" : box.today,
			"Updated Time" : box.time
		}
	}, function(a) {
		if (a.success) {
			alert(box.city + " has been added to the Cloud");
		} else if (a.error) {
			alert('Could not save to the Cloud');
		}
	});
});
//Save to cloud end

//Last Updated start
//Last Updated view
var lastupdatedV = Ti.UI.createView({
	height : '3%',
	width : Ti.UI.FILL,
	bottom : '0%',
	backgroundColor : '#000'
});

// Last Updated Label
var lastupdatedLBL = Ti.UI.createLabel({
	right : '3%',
	text : 'Last Updated: ' + box.time,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '18dp'
	},
	color : '#fff'
});
lastupdatedV.add(lastupdatedLBL);
//Last Updated end

//refresh start
var refresh = Ti.UI.createImageView({
	height : '2%',
	width : '2%',
	right : '42%',
	bottom : '0.5%',
	image : 'refresh.png'
});

refresh.addEventListener('click', function(e) {
	var id1 = e.source.id1;
	var id2 = e.source.id2;
	var id3 = e.source.id3;
	var id4 = e.source.id4;
	data.db.execute("DELETE FROM weather");
	data.apiGEO;
	alert('Weather has Updated');

});
// refresh end

//Main Code
forcast5.add(tmrwV, day3V, day4V, day5V, day6V);
FHSS.add(feelsLBL, feelstemp, humidityLBL, humidityPERCENT, sunriseLBL, sunriseTIME, sunsetLBL, sunsetLBLtime);
cityTemp.add(city, st, icon, weaterCondition, temp, degree1, degreeType);
BNG.add(cityTemp, FHSS, forcast5);
wWin.add(BNG, save, cityBIT, secBIT, day7BIT, forcestV, lastupdatedV, refresh);
wWin.open();


\




//DATA.JS
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