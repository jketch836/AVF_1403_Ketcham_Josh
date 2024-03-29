//APP.JS
// require JS files
var data = require('data');

Ti.UI.setBackgroundColor('white');

//update function

var update = function() {
	if (Ti.Network.networkType != Ti.Network.NETWORK_NONE){
	data.db.execute("DELETE FROM weather");
	data.apiGEO();
	alert('Weather has Updated');
	} else {
		var alertDialog = Titanium.UI.createAlertDialog({
              title: 'No Internet Connection',
              message: 'There is a problem with the connection. Please try again later',
              buttonNames: ['OK']
            });
            alertDialog.show();
	}
};

var wWin = Ti.UI.createWindow({
	orientationModes : [Ti.UI.LANDSCAPE_LEFT],
	backgroundColor : '#fff'
});

var BNG = Ti.UI.createView({
	top : '3%',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	backgroundImage : '8bitwallpaper.png'
});


//Main Weather INFO Start
//view to hold main weather info
var cityTemp = Ti.UI.createView({
	top : '10%',
	center : '0%',
	width : '70%',
	height : '17%',
	opacity : .79,
	backgroundColor : "black",
	borderRadius : '15%'
});

var cityWrap = Ti.UI.createView({
	top : '10%',
	center : '0%',
	width : '70%',
	height : '17%',
	backgroundColor : "transparent",
	borderRadius : '15%'
});

//main Weather icon
var icon = Ti.UI.createImageView({
	height : '100%',
	width : '23%',
	center : '0%',
	image : 'pic.png'
});

var cityBIT = Ti.UI.createImageView({
	top : '12%',
	center : '0%',
	width : '71.5%',
	height : '18%',
	image : 'citybit.png'
});

//main Weather Labels start
var thecity = Ti.UI.createLabel({
	top : '25%',
	right : '65%',
	text : 'CITY',
	opacity : 1.0,
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
	text : 'ST',
	opacity : 1.0,
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
	text : 'Condition',
	opacity : 1.0,
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
	text : '00',
	opacity : 1.0,
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
	opacity : 1.0,
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
	opacity : 1.0,
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
	opacity : .79,
	backgroundColor : "black",
	borderRadius : '15%'
});

var FHSSWrap = Ti.UI.createView({
	bottom : '45%',
	center : '0%',
	width : '80%',
	height : '15%',
	backgroundColor : "transparent",
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
	opacity : 1.0,
	color : '#fff'
});

var feelstemp = Ti.UI.createLabel({
	top : '50%',
	left : '10%',
	text : '00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	opacity : 1.0,
	color : '#fff'
});

var degree2 = Ti.UI.createLabel({
	top : '50%',
	left : '13.5%',
	text : 'o',
	opacity : 1.0,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '12dp',
		fontWeight : 'bold'
	},
	color : '#fff'
});

var degreeType2 = Ti.UI.createLabel({
	top : '50%',
	left : '14.5%',
	text : 'F',
	opacity : 1.0,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
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
	opacity : 1.0,
	color : '#fff'
});

var humidityPERCENT = Ti.UI.createLabel({
	top : '50%',
	left : '34%',
	text : '00%',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	opacity : 1.0,
	color : '#fff'
});

//sunrise LBL
var sunriseLBL = Ti.UI.createLabel({
	top : '25%',
	right : '28%',
	text : 'Sunrise:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
	},
	opacity : 1.0,
	color : '#fff'
});

var sunriseTIME = Ti.UI.createLabel({
	top : '50%',
	right : '29.5%',
	text : '00:00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	opacity : 1.0,
	color : '#fff'
});

//sunset LBL
var sunsetLBL = Ti.UI.createLabel({
	top : '25%',
	right : '5%',
	text : 'Sunset:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp',
		fontWeight : 'bold'
	},
	opacity : 1.0,
	color : '#fff'
});

var sunsetLBLtime = Ti.UI.createLabel({
	top : '50%',
	right : '6.5%',
	text : '00:00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	opacity : 1.0,
	color : '#fff'
});
//main Weather Labels end
//Main Weather INFO End

//7day Forecast View Start
//7day View holder
var forcast5 = Ti.UI.createView({
	bottom : '3%',
	width : Ti.UI.FILL,
	height : '18.5%',
	backgroundColor : "#fff"
});

//8bit 7days
var day7BIT = Ti.UI.createImageView({
	bottom : '2.8%',
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

var thetmrwLBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : 'Tomorrow',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var thetmrwICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : 'pic.png'
});

var thetmrwTEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : 'HI / LO',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
tmrwV.add(thetmrwLBL, thetmrwICON, thetmrwTEMP);
//Tomorrow info end

//day3 info start
var day3V = Ti.UI.createView({
	bottom : '0%',
	left : '20%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff"
});

var theday3LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : 'Day2',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var theday3ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : 'pic.png'
});

var theday3TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : 'HI / LO',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day3V.add(theday3LBL, theday3ICON, theday3TEMP);
//day3 info end

//day4 info start
var day4V = Ti.UI.createView({
	bottom : '0%',
	left : '40%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff"
});

var theday4LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : 'Day3',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var theday4ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : 'pic.png'
});

var theday4TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : 'HI / LO',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day4V.add(theday4LBL, theday4ICON, theday4TEMP);
//day4 info end

//day5 info start
var day5V = Ti.UI.createView({
	bottom : '0%',
	right : '20%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff"
});

var theday5LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : 'Day4',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var theday5ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : 'pic.png'
});

var theday5TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : 'HI / LO',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day5V.add(theday5LBL, theday5ICON, theday5TEMP);
//day5 info end

//day6 info start
var day6V = Ti.UI.createView({
	bottom : '0%',
	right : '0%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff"
});

var theday6LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : 'Day5',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

var theday6ICON = Ti.UI.createImageView({
	height : '45%',
	width : '45%',
	center : '0%',
	image : 'pic.png'
});

var theday6TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : 'HI / LO',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day6V.add(theday6LBL, theday6ICON, theday6TEMP);
//day6 info end
//7day view end


//7day Forecast View Start
var forcestV = Ti.UI.createView({
	bottom : '0%',
	height : '26%',
	width : Ti.UI.FILL,
	opacity : .79,	
	backgroundColor : '#000'
});

var forcestVWrap = Ti.UI.createView({
	bottom : '0%',
	height : '26%',
	width : Ti.UI.FILL,
	backgroundColor : "transparent",
	borderRadius : '15%'
});

var forcestLBL = Ti.UI.createLabel({
	top : '0.5%',
	left : '0.5%',
	text : '5 Day Forcast',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '20dp'
	},
	opacity : 1.0,
	color : '#fff',

});

//Last Updated start
// Last Updated Label
var lastupdatedLBL = Ti.UI.createLabel({
	bottom : '0%',
	right : '0.5%',
	text : 'Last Updated on January 1st, 00:00 AM PDT',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '20dp'
	},
	opacity : 1.0,
	color : '#fff'
});

//about Label
var aboutLBL = Ti.UI.createLabel({
	bottom : '0.5%',
	left : '0.5%',
	text : 'About 32-Bit Weather',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '20dp'
	},
	opacity : 1.0,
	color : '#fff',
});
aboutLBL.addEventListener('click', function() {
	var info = require('about');
});
//Last Update end

//update
//refresh start
var refresh = Ti.UI.createImageView({
	bottom : '2%',
	height : '7%',
	width : '2.5%',
	right : '40%',
	opacity : 1.0,
	image : 'refresh.png'
});

refresh.addEventListener('click', update);
// refresh end


//Main Code
forcestVWrap.add(forcestLBL, lastupdatedLBL, aboutLBL, refresh);
forcast5.add(tmrwV, day3V, day4V, day5V, day6V);
FHSSWrap.add(feelsLBL, feelstemp, degree2, degreeType2, humidityLBL, humidityPERCENT, sunriseLBL, sunriseTIME, sunsetLBL, sunsetLBLtime);
cityWrap.add(thecity, st, icon, weaterCondition, temp, degree1, degreeType);
BNG.add(cityTemp, cityWrap, FHSS, FHSSWrap, forcestV, forcestVWrap, forcast5);
wWin.add(BNG, cityBIT, secBIT, day7BIT);
wWin.open();
data.ifNet(); 





//DATA.JS
var db = Ti.Database.open('weatherDB');
db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, sunrise TEXT, sunset TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT, time TEXT)');
exports.db = db;

//Start GEOLOC and remotedata pull func
var apiGEO = function() {
	//Start GEOLOC func
	Ti.Geolocation.purpose = "32-Bit Weather would like to use your current location.";

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (Ti.Geolocation.locationServicesEnabled) {
		} else {
			alert("Location settings turned off. To change this go to Settings > Privacy > Location Services.");
		};
		if (e.error) {
			alert("There is an error. Cannot Connect to the Internet");
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

			sunrise = '0' + json.sun_phase.sunrise.hour + ':' + json.sun_phase.sunrise.minute;
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
			alert("There is a problem. Cannot update data");
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

var ifNet = function() {
	if (Ti.Network.networkType != Ti.Network.NETWORK_NONE) {
		apiGEO();
	} else {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'No Internet Connection',
			message : 'Your device is offline. Please go to Settings to turn on WiFi, or swipe from the bottom of the iPad screen and click on the WiFi option.',
			buttonNames : ['OK']
		});
		alertDialog.show();
	}
};
//Export ifNet and apiGEO func
exports.ifNet = ifNet; 
exports.apiGEO = apiGEO;





//ABOUT.JS
var aWin = Ti.UI.createWindow({
	center : '0%',
	height : '35%',
	width : '35%',
	backgroundColor : '#fff',
	borderRadius : '7%'
});

var close = Ti.UI.createLabel({
	top : '3%',
	left : '3%',
	text : 'Close',
		font : {
		fontStyle : 'Helvetica',
		fontSize : '18dp'
	},
	color : '#0000CD'
});

close.addEventListener('click', function(){
	aWin.close();
});

var infoLBL = Ti.UI.createLabel({
	center : '0%',
	left : '10%',
	right : '10%',
	text : '32-Bit Weather was inspired by a many other weather apps. It shows the current weather where you are, as well as the humidity and 7-Day forecast. I hope you enjoy it!',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});

aWin.add(close, infoLBL);
aWin.open();