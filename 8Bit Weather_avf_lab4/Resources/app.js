// require JS files
var data = require('data');
var Cloud = require('ti.cloud');

Ti.UI.setBackgroundColor('white');

//update function

var update = function() {	
	data.db.execute("DELETE FROM weather");
	data.apiGEO();
	alert('Weather has Updated');
};

var wWin = Ti.UI.createWindow({
	orientationModes : [Ti.UI.LANDSCAPE_LEFT],
	backgroundColor : '#fff'
});


var BNG = Ti.UI.createView({
	top : '3%',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	// backgroundColor : '#7D9EC0'
	backgroundImage : '8bitwallpaper.png'
});



//about Label
var aboutLBL = Ti.UI.createLabel({
	top : '5%',
	left : '2%',
	text : 'About',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '20dp'
	},
	color : '#000',
});
aboutLBL.addEventListener('click', function() {
	var info = require('about');
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
	center : '0%'
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
	text : '00',
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
	text : '00%',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
	},
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
	color : '#fff'
});

var sunriseTIME = Ti.UI.createLabel({
	top : '50%',
	right : '31%',
	text : '00:00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '24dp'
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
		fontSize : '24dp',
		fontWeight : 'bold'
	},
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
	center : '0%'
});

var thetmrwTEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : '00',
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
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
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
	center : '0%'
});

var theday3TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : '00',
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
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
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
	center : '0%'
});

var theday4TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : '00',
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
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
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
	center : '0%'
});

var theday5TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : '00',
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
	backgroundColor : "#fff",
	// borderColor : '#333',
	// borderWidth : '3%',
	// borderRadius : '3%'
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
	center : '0%'
});

var theday6TEMP = Ti.UI.createLabel({
	bottom : '10%',
	center : '0%',
	text : '00',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '22dp'
	},
	color : '#000'
});
day6V.add(theday6LBL, theday6ICON, theday6TEMP);
//day6 info end
//7day view end

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
	text : 'Last Updated on January 1st, 00:00 AM PDT',
	font : {
		fontStyle : 'Helvetica',
		fontSize : '18dp'
	},
	color : '#fff'
});
lastupdatedV.add(lastupdatedLBL);
//Last Updated end

//update
//refresh start
var refresh = Ti.UI.createImageView({
	height : '2%',
	width : '2%',
	right : '37%',
	bottom : '0.5%',
	image : 'refresh.png'
});

refresh.addEventListener('click', update);
// refresh end

//Main Code
forcast5.add(tmrwV, day3V, day4V, day5V, day6V);
FHSS.add(feelsLBL, feelstemp, humidityLBL, humidityPERCENT, sunriseLBL, sunriseTIME, sunsetLBL, sunsetLBLtime);
cityTemp.add(thecity, st, icon, weaterCondition, temp, degree1, degreeType);
BNG.add(cityTemp, FHSS, forcast5);
wWin.add(BNG, aboutLBL, cityBIT, secBIT, day7BIT, forcestV, lastupdatedV, refresh);
wWin.open();
data.apiGEO();