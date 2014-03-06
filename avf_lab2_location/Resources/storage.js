var data = Ti.Database.open('location');
var wowData = Ti.App.Properties.getString('geoData');
data.execute('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY, )');

function insertData() {
	var data = [];

	var rowInfo = data.execute('SELECT * FROM location');

	while (rowInfo.isValidRow()) {
		var name = rowInfo.fieldByName('name');

		dataInfo.push({
			name : name,
			st : st,
			county : county,
			state : state,
			countryAB : countryAB,
			country : country,
			latitude : latitude,
			longitude : longitude,
			dist : dist
		});

		Ti.API.info('=========================');

		rowInfo.next();
	};
	return data;
};
var geoData = insertData();
exports.geoData = geoData;

// console.log(guildData);

var saveFunc = function() {
	input = {};
	data.execute('INSERT INTO location (name) VALUES (?)', name);
};
exports.saveFunc = saveFunc;

var id = a.rowData.id;
input = {};

data.execute('SELECT * FROM location WHERE ID=?', id);

function delFunc() {
	var id = a.rowData.id;
	data.execute('DELETE FROM location WHERE id=?', id);
	geoData;

};
exports.delFunc = delFunc;
