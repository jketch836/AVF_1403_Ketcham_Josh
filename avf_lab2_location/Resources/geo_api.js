// var list = require('listview');

//url variable
var url = 'http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=37.78583526611328,-122.40641784667969&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990';

//onload function start
var apiResponse = function() {
	//converting marvel api json data
	var json = JSON.parse(this.responseText);
	var times = json.results;
	var data = [];

	//setting nytimes api json data to variables
	for (var i = 0; i < times.length; i++) {
		// copyright = json[i].copyright;
		name = times[i].geocode.name;
		county = times[i].geocode.admin_name2;
		state = times[i].geocode.admin_name1;
		st = times[i].geocode.admin_code1;
		countryAB = times[i].geocode.country_code;
		country = times[i].geocode.country_name;
		latitude = times[i].geocode.latitude;
		longitude = times[i].geocode.longitude;
		dist = Math.round(times[i].geocode.distance * 10) / 10;

		// console.log(name);
		// console.log(county);
		// console.log(state);
		// console.log(country);
		// console.log(latitude);
		// console.log(longitude);

		for (var a = 0; a < json.length; a++) {
			copyright = json[a].copyright;
		}

		//creating row for times listview
		var seclist = Ti.UI.createListSection({
		});

		data.push({
			properties : {
				name : name,
				st : st,
				county : county,
				state : state,
				countryAB : countryAB,
				country : country,
				latitude : latitude,
				longitude : longitude,
				dist : dist
			},
			name : {
				text : name + ', ' + st
			},
			st : {
				text : st
			},
			county : {
				text : county
			},
			state : {
				text : state
			},
			country : {
				text : country
			},
			countryAB : {
				text : countryAB
			},
			latitude : {
				text : 'lat: ' + latitude
			},
			longitude : {
				text : 'lng: ' + longitude
			},
			dist : {
				text : dist
			}
		});
		seclist.setItems(data);

	};
	listview1.sections = [seclist];
};
//onload function end

//onerror function start
var apiError = function(e) {
	Ti.API.debug("Status: " + this.status);
	Ti.API.debug("Text: " + this.responseText);
	Ti.API.debug("Error: " + e.error);
	alert("Please connect to the Internet");
};
//onerror function end

//HTTPclient start
var xhr = Ti.Network.createHTTPClient({
	onload : apiResponse,
	onerror : apiError,
	timeout : 5000
});
//HTTPclient end

//Main Code
xhr.open('GET', url);
xhr.send();
