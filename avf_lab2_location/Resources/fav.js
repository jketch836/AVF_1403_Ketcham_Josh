//Window Start
var favWin = Ti.UI.createWindow({
	title : 'Stored',
	backgroundColor : 'red'
});
exports.favWin = favWin;
//Window End

var dataB = Ti.Database.open("GeoDB");
dataB.execute('CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');

var buildRow = function() {
	var data = [];
	var test = dataB.execute("SELECT * FROM location");

	while (test.isValidRow()) {
		var name = test.fieldByName('name');
		var state = test.fieldByName('state');
		var county = test.fieldByName('county');
		var latitude = test.fieldByName('latitude');
		var longitude = test.fieldByName('longitude');
		var distance = test.fieldByName('distance');
		var population = test.fieldByName('population');
		var id = test.fieldByName('id');

		data.push({
			title : name,
			state : state,
			county : county,
			latitude : latitude,
			longitude : longitude,
			distance : distance,
			population : population,
			id : id
		});
		test.next();
	};
	return data;
};

////////////////////////////////////// Prompt START //////////////////////////////////////
var promptHolder = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	backgroundColor : "black",
	opacity : 0.8
});
var prompt = Ti.UI.createView({
	backgroundColor : "#FFF",
	width : '40%',
	height : '20%',
	borderRadius : '15%'
});

//Delete button
var button1 = Ti.UI.createButton({
	title : "Delete",
	left : '10%',
	bottom : '5%',
	font : {
		fontSize : 22
	}
});

//Cancel (closes the prompt)
var button3 = Ti.UI.createButton({
	title : "Cancel",
	right : '10%',
	bottom : '5%',
	font : {
		fontSize : 22
	}
});
var label = Ti.UI.createLabel({
	text : "Are you sure you want to delete this item?",
	font : {
		fontSize : 26
	},
	textAlign : 'center',
	top : '7%',
	right : '3%',
	left : '3%'
});

prompt.add(button1, button3, label);
prompt.visible = false;
promptHolder.visible = false;
////////////////////////////////////// Prompt END //////////////////////////////////////

var table = Ti.UI.createTableView({
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});

table.addEventListener("scrollend", function() {
	table.setData(buildRow());
	alert("Your favorites have been updated");
});

table.addEventListener("click", function(e) {
	var id = e.source.id;
	var sec = dataB.execute("SELECT * FROM location");
	var sel = {};
	sel.name = sec.fieldByName('name');
	sel.state = sec.fieldByName('state');
	sel.county = sec.fieldByName('county');
	sel.latitude = e.source.latitude;
	sel.longitude = e.source.longitude;
	sel.distance = sec.fieldByName('distance');
	// sel.population = sec.fieldByName('population');
	var population = e.source.population;

	//Window Start
	var fWin = Ti.UI.createWindow({
		title : 'FORM',
		backgroundColor : '#fff'
	});
	//Window End

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '5%',
		left : '5%',
		font : {
			fontSize : 20
		}
	});
	cancelBTN.addEventListener('click', function() {
		fWin.close();
	});
	//cencel button end

	var deleteBTN = Ti.UI.createButton({
		title : "DELETE",
		right : '5%',
		top : '5%',
		font : {
			fontSize : 20
		},
		color : '#FF0000'
	});

	deleteBTN.addEventListener("click", function(e) {

		//console.log(e.source.id);
		//console.log(e.rowData.id);
		//Displays the prompt
		prompt.visible = true;
		promptHolder.visible = true;

		//SQL Delete
		button1.addEventListener("click", function(e) {
			dataB.execute("DELETE FROM location WHERE id=?", id);
			prompt.visible = false;
			promptHolder.visible = false;
			table.setData(buildRow());
			fWin.close();
		});

		button3.addEventListener("click", function() {
			prompt.visible = false;
			promptHolder.visible = false;
		});

	});

	//Map views start
	var Map = require('ti.map');

	var view = Map.createAnnotation({
		latitude : sel.latitude,
		longitude : sel.longitude
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		annotations : [view],
		region : {
			latitude : sel.latitude,
			longitude : sel.longitude,
			laditudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		regionFit : true,
		enableZoomControls : true
	});

	//this View holds the map
	var theMapView = Ti.UI.createView({
		top : '10%',
		height : '60%',
		width : '100%'
	});
	theMapView.add(mapview);
	//Map views end

	//Labels Begin
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '8%',
		text : sel.name + ', ' + sel.state,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '40%',
			fontWeight : 'bold'
		}
	});

	var countyLabel = Ti.UI.createLabel({
		top : '27%',
		left : '10%',
		text : sel.county,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '30%'
		}
	});

	var num = function(population) {
		// alert(population);
		return population.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",");
	};

	var popLabel = Ti.UI.createLabel({
		bottom : '27%',
		left : '12%',
		right : '15%',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	switch (population) {
		case null:
			popLabel.text = 'Population: Not Availible';
			break;
		default :
			popLabel.text = 'Population: ' + num(population);
			// popLabel.text = 'Population: ' + population;
			break;
	}

	var distLabel = Ti.UI.createLabel({
		bottom : '7%',
		left : '12%',
		right : '15%',
		text : 'Dist: ' + sel.distance + ' Mile(s)',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	var cpLabel = Ti.UI.createLabel({
		bottom : '0%',
		center : '12%',
		text : cp,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '20%'
		}
	});
	//Labels End

	var textView = Ti.UI.createView({
		top : '69.9%',
		height : '17%',
		width : '100%',
		borderRadius : '3%',
		backgroundColor : '#EBECE4'
	});
	textView.add(titleView, countyLabel, popLabel, distLabel);

	//table event listener Main Code
	fWin.add(cancelBTN, deleteBTN, theMapView, textView, cpLabel, promptHolder, prompt);
	fWin.open();
});

//Main Code
table.setData(buildRow());
favWin.add(table);
