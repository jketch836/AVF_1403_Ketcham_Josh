// require JS files
var data = require('data');

// var db = Ti.Database.open('weatherDB');
// db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, url TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrw TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT)');


var info = data.db.execute("SELECT * FROM weather");
var box = {};
box.state = info.fieldByName('state');
box.city = info.fieldByName('city');
box.url = info.fieldByName('url');
box.sunrise = info.fieldByName('sunrise');
box.sunset = info.fieldByName('sunset');
box.mainNight = info.fieldByName('mainNight');
box.mainNightIcon = info.fieldByName('mainNightIcon');
box.today = info.fieldByName('today');
box.todayIcon = info.fieldByName('todayIcon');
box.todayTemp = info.fieldByName('todayTemp');
box.todayhumid = info.fieldByName('todayhumid');
box.todaySky = info.fieldByName('todaySky');
box.tmrw = info.fieldByName('tmrw');
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


data.apiGEO;

Ti.UI.setBackgroundColor('white');

var wWin = Ti.UI.createWindow({
	title : "WeatherWindow",
	orientationModes : [Ti.UI.LANDSCAPE_LEFT]
});

// wWin.addEventListener("scrollend", function() {
// 
// });

var BNG = Ti.UI.createView({
	top : '3%',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	backgroundColor : '#7D9EC0'
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
	// image : 'cloudy.png'
});

//main Weather Labels start
var city = Ti.UI.createLabel({
	top : '25%',
	right : '65%',
	text : box.city,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp'
	},
	color : '#fff'
});

var st = Ti.UI.createLabel({
	top : '45%',
	right : '65%',
	text : box.state,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp'
	},
	color : '#fff'
});

var weaterCondition = Ti.UI.createLabel({
	top : '25%',
	left : '65%',
	text : box.todaySky,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp'
	},
	color : '#fff'
});

var temp = Ti.UI.createLabel({
	top : '46%',
	left : '65%',
	text : box.todayTemp,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '28dp'
	},
	color : '#fff'
});

// var degree1 = Ti.UI.createLabel({
	// top : '45%',
	// left : '71%',
	// text : 'o',
	// font : {
		// fontStyle : 'Helvetica',
		// fontSize : '18dp'
	// },
	// color : '#fff'
// });
// 
// var degree2 = Ti.UI.createLabel({
	// top : '45%',
	// left : '80.5%',
	// text : 'o',
	// font : {
		// fontStyle : 'Helvetica',
		// fontSize : '18dp'
	// },
	// color : '#fff'
// });
//main Weather Labels end
//Main Weather INFO End

//Secondary Weather INFO Start
//view to hold sec weather info
var FHSS = Ti.UI.createView({
	bottom : '30%',
	center : '0%',
	width : '80%',
	height : '15%',
	backgroundColor : "black",
	borderRadius : '15%'
});
//main Weather Labels start
//feels like LBL
var feelsLBL = Ti.UI.createLabel({
	top : '25%',
	left : '7%',
	text : 'Feels Like:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	color : '#fff'
});

var feelstemp = Ti.UI.createLabel({
	top : '50%',
	left : '12%',
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
		fontSize : '24dp'
	},
	color : '#fff'
});

var humidityPERCENT = Ti.UI.createLabel({
	top : '50%',
	left : '33.5%',
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
		fontSize : '24dp'
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
	right : '7%',
	text : 'Sunset:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
	color : '#fff'
});

var sunsetLBLtime = Ti.UI.createLabel({
	top : '50%',
	right : '8%',
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
//7day View holder
var forcast7 = Ti.UI.createView({
	bottom : '0%',
	center : '0%',
	width : Ti.UI.FILL,
	height : '18.5%',
	backgroundColor : "#fff"
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
	text : box.tmrw,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
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
		fontSize : '24dp'
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
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day3LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day3,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
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
		fontSize : '24dp'
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
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day4LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day4,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
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
		fontSize : '24dp'
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
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day5LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day5,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
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
		fontSize : '24dp'
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
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day6LBL = Ti.UI.createLabel({
	top : '10%',
	center : '0%',
	text : box.day6,
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
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
		fontSize : '24dp'
	},
	color : '#000'
});
day6V.add(day6LBL, day6ICON, day6TEMP);
//day6 info end
//7day view end


//Main Code
forcast7.add(tmrwV, day3V, day4V, day5V, day6V);
FHSS.add(feelsLBL, feelstemp, humidityLBL, humidityPERCENT, sunriseLBL, sunriseTIME, sunsetLBL, sunsetLBLtime);
cityTemp.add(city, st, icon, weaterCondition, temp/*,degree1, degree2*/);
BNG.add(cityTemp, FHSS, forcast7);
wWin.add(BNG);
wWin.open();