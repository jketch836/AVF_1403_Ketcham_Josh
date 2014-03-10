//Creating Database
var geo = Ti.Database.open('location');
var wowData = Ti.App.Properties.getString('geoData');
geo.execute('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY, name TEXT, countryAB TEXT, latitude INTEGER, longitude INTEGER)');

//Inserting data from save func start
function insertData() {
	var data = [];

	var  secInfo = geo.execute('SELECT * FROM location');

	while (secInfo.isValidRow()) {
		var name = secInfo.fieldByName('name');
		var st = secInfo.fieldByName('st');
		var county = rowInfo.fieldByName('county');
		var country = rowInfo.fieldByName('country');
		var latitude = secInfo.fieldByName('latitude');
		var longitude = secInfo.fieldByName('longitude');
		var dist = rowInfo.fieldByName('dist');
		var id = secInfo.fieldByName('id');
		
		dataInfo.push({
			name : name,
			st : st,
			county : county,
			country : country,
			latitude : latitude,
			longitude : longitude,
			dist : dist,
			id : id
		});

		Ti.API.info('=========================');

		secInfo.next();
	};
	return data;
};
var geoData = insertData();
exports.geoData = geoData;
//Inserting data from sav func end


//saving data from app.js start
var save = function(name, st, country, latitude, longitude, county, dist) {
	input = {};
	input.name = name;
	input.countryAB = countryAB;
	input.latitude = latitude;
	input.longitude = longitude;
	geo.execute('INSERT INTO location (name, st, country, latitude, longitude, county, dist) VALUES (?, ?, ?, ?)', input.name, input.countryAB, input.latitude, input.longitude);
	geoData;
};
exports.save = save;
//saving data from app.js end


// var id = a.rowData.id;
// 
// geo.execute('SELECT * FROM location WHERE ID=?', id);
// input = {};


//delete data start
function delFunc() {
	geo.execute('DELETE FROM location WHERE id=?', id); 
	// seclist.setItems(geoData);
};
exports.delFunc = delFunc;
//delete data end