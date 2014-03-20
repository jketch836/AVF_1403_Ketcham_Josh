// require JS files
var data = require('data');

var db = Ti.Database.open('weatherDB');
db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, url TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrw TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT)');

var info = db.execute("SELECT * FROM weather");
var box = {};
box.state = info.fieldByName('state');
box.city = info.fieldByName('city');
box.url = info.fieldByName('url');
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

Ti.UI.setBackgroundColor('white');

var wWin = Ti.UI.createWindow({
	title : "WeatherWindow",
	orientationModes : [Ti.UI.LANDSCAPE_RIGHT]
});

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
	height : '20%',
	backgroundColor : "black",
	borderRadius : '15%'
});
//main Weather Labels start
var city = Ti.UI.createLabel({
	top : '25%',
	right : '75%',
	text : box.state,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	},
	color : '#fff'
});

var st = Ti.UI.createLabel({
	top : '45%',
	right : '75%',
	text : 'ST',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	},
	color : '#fff'
});

var weaterCondition = Ti.UI.createLabel({
	top : '25%',
	left : '65%',
	text : 'WeatherLBL',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	},
	color : '#fff'
});

var temp = Ti.UI.createLabel({
	top : '46%',
	left : '65%',
	text : '7_',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 36
	},
	color : '#fff'
});

var degree = Ti.UI.createLabel({
	top : '45%',
	left : '71%',
	text : 'o',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	},
	color : '#fff'
});

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
	left : '5%',
	text : 'Feels Like:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
	},
	color : '#fff'
});

var feelstemp = Ti.UI.createLabel({
	top : '50%',
	left : '8%',
	text : box.feels,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
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
		fontSize : 24
	},
	color : '#fff'
});

var humidityPERCENT = Ti.UI.createLabel({
	top : '50%',
	left : '33.5%',
	text : '1_' + '%',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
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
		fontSize : 24
	},
	color : '#fff'
});

var sunriseTIME = Ti.UI.createLabel({
	top : '50%',
	right : '32%',
	text : '00:00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
	},
	color : '#fff'
});

//sunset LBL
var sunsetLBL = Ti.UI.createLabel({
	top : '25%',
	right : '5%',
	text : 'Sunset:',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
	},
	color : '#fff'
});

var sunsetLBLtime = Ti.UI.createLabel({
	top : '50%',
	right : '7%',
	text : '00:00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : 24
	},
	color : '#fff'
});
//main Weather Labels end
//Main Weather INFO End

var forcast7 = Ti.UI.createView({
	bottom : '0%',
	center : '0%',
	width : Ti.UI.FILL,
	height : '18.5%',
	backgroundColor : "#fff"
});

var tmrw = Ti.UI.createView({
	bottom : '0%',
	left : '0%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day3 = Ti.UI.createView({
	bottom : '0%',
	left : '20%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day4 = Ti.UI.createView({
	bottom : '0%',
	left : '40%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day5 = Ti.UI.createView({
	bottom : '0%',
	right : '20%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

var day6 = Ti.UI.createView({
	bottom : '0%',
	right : '0%',
	width : '20%',
	height : Ti.UI.FILL,
	backgroundColor : "#fff",
	borderColor : '#333',
	borderWidth : '3%',
	borderRadius : '3%'
});

//Main Code
forcast7.add(tmrw, day3, day4, day5, day6);
FHSS.add(feelsLBL, feelstemp, humidityLBL, humidityPERCENT, sunriseLBL, sunriseTIME, sunsetLBL, sunsetLBLtime);
cityTemp.add(city, st, weaterCondition, temp, degree);
BNG.add(cityTemp, FHSS, forcast7);
wWin.add(BNG);
wWin.open();
