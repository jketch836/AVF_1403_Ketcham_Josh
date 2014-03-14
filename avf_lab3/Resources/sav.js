//Window Start
var favWin = Ti.UI.createWindow({
	title : 'Stored',
	backgroundColor : 'red'
});
exports.favWin = favWin;
//Window End

var dataB = Ti.Database.open('geoDATABASE');
dataB.execute('CREATE TABLE IF NOT EXISTS geoloc (id INTEGER PRIMARY KEY, name TEXT, pop TEXT, latitude INTEGER, longitude INTEGER, dist TEXT, st TEXT, county TEXT, us TEXT, cp TEXT)');

var rowInfo = function() {
	var data = [];
	var geo = dataB.execute("SELECT * FROM geoloc");

	while (geo.isValidRow()) {
		var name = geo.fieldByName('name');
		var pop = geo.fieldByName('pop');
		var lat = geo.fieldByName('latitude');
		var lng = geo.fieldByName('longitude');
		var dist = geo.fieldByName('dist');
		var st = geo.fieldByName('st');
		var county = geo.fieldByName('county');
		var us = geo.fieldByName('us');
		var cp = geo.fieldByName('cp');
		var id = geo.fieldByName('id');

		data.push({
			title : name,
			name : name,
			pop : pop,
			lat : lat,
			lng : lng,
			dist : dist,
			st : st,
			county : county,
			us : us,
			cp : cp,
			id : id
		});
		geo.next();
	};
	return data;
};

//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var savTable = Ti.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});
//Table End

savTable.addEventListener("scrollend", function() {
	savTable.setData(rowInfo());
	alert("Local Storage has been Updated");
});

//timesTable evt listener start
savTable.addEventListener('click', function(e) {
	var sWin = Ti.UI.createWindow({
		height : '70%',
		width : '90%'
	});

	var id = e.source.id;
	var sec = dataB.execute("SELECT * FROM geoloc");
	var sel = {};
	sel.name = sec.fieldByName('name');
	sel.pop = e.source.pop;
	sel.lat = e.source.lat;
	sel.lng = e.source.lng;
	sel.dist = e.source.dist;
	sel.st = e.source.st;
	sel.county = e.source.county;
	sel.us = e.source.us;
	sel.cp = e.source.cp;

	console.log(sel.name);

	///////////// views START /////////////
	var viewbng = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "black"
	});
	var views = Ti.UI.createView({
		backgroundColor : "#fff",
		width : '85%',
		height : '85%',
		borderRadius : '15%'
	});
	///////////// views END /////////////

	//delete button start
	var deleteBTN = Ti.UI.createButton({
		title : "DELETE",
		top : '2%',
		right : '10%',
		font : {
			fontSize : 20
		},
		color : "#FF0000"
	});

	deleteBTN.addEventListener('click', function() {
		var deleteDIA = Ti.UI.createAlertDialog({
			title : 'Delete Location?',
			buttonNames : ['Delete', 'Cancel']
		});
		deleteDIA.show();
		deleteDIA.addEventListener('click', function(a) {
			if (a.index === 0) {
				dataB.execute("DELETE FROM geoloc WHERE id=?", id);
				savTable.setData(rowInfo());
				views.visible = false;
				viewbng.visible = false;
				sWin.close();
			} else {null;
			}

		});

	});

	//delete button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '2%',
		left : '10%',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : '#00CED1'
	});
	cancelBTN.addEventListener('click', function() {
		views.visible = false;
		viewbng.visible = false;
		sWin.close();
	});
	//cancel button end

	//Map views start
	var Map = require('ti.map');

	var view = Map.createAnnotation({
		latitude : sel.lat,
		longitude : sel.lng
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		annotations : [view],
		region : {
			latitude : sel.lat,
			longitude : sel.lng,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		enableZoomControls : true,
		regionFit : true,
		width : '100%'
	});
	//Map views end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '0%',
		text : sel.name + ', ' + sel.st,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '40%',
			fontWeight : 'bold'
		},
		color : '#fff'
	});

	var countyLabel = Ti.UI.createLabel({
		top : '23%',
		left : '3%',
		text : sel.county,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '30%'
		},
		color : '#fff'
	});

	var popLabel = Ti.UI.createLabel({
		top : '45%',
		left : '7%',
		text : sel.pop,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		},
		color : '#fff'
	});

	var distLabel = Ti.UI.createLabel({
		top : '60%',
		left : '7%',
		text : 'Dist: ' + sel.dist + ' Mile(s)',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		},
		color : '#fff'
	});

	var usLabel = Ti.UI.createLabel({
		top : '0%',
		right : '3%',
		text : sel.us,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '35%'
		},
		color : '#fff'
	});

	var cpLabel = Ti.UI.createLabel({
		bottom : '0%',
		center : '0%',
		text : sel.cp,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '15%'
		},
		color : '#fff'
	});
	//Labels End

	var textView = Ti.UI.createView({
		top : '69.9%',
		height : Ti.UI.FILL,
		width : '100%',
		backgroundColor : '#000'
	});
	textView.add(titleView, countyLabel, popLabel, distLabel, usLabel, cpLabel);

	//EventListener Main Code
	views.add(mapview, textView);
	viewbng.add(views, cancelBTN, deleteBTN);
	sWin.add(viewbng);
	sWin.open();
});

savTable.setData(rowInfo());
favWin.add(savTable);
