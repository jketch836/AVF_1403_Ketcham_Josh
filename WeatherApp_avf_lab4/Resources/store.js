// require JS files
var data = require('data');

// var db = Ti.Database.open('weatherDB');
// db.execute('CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY, state TEXT, city TEXT, url TEXT, sunrise TEXT, sunset TEXT, mainNight TEXT, mainNightIcon TEXT, today TEXT, todayIcon TEXT, todayTemp TEXT, todayhumid INTEGER, todaySky TEXT, tmrw TEXT, tmrwIcon TEXT, tmrwTemp TEXT, day3 TEXT, day3Icon TEXT, day3Temp TEXT, day4 TEXT, day4Icon TEXT, day4Temp TEXT, day5 TEXT, day5Icon TEXT, day5Temp TEXT, day6 TEXT, day6Icon TEXT, day6Temp TEXT, day7 TEXT, day7Icon TEXT, day7Temp TEXT, feels TEXT)');

var rowInfo = function() {
	var array = [];
	var wea = data.db.execute("SELECT * FROM weather");

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
